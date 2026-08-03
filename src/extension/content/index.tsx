import { createRoot, type Root } from "react-dom/client";
import { FloatingApp } from "../floating/FloatingApp";
import {
  TOGGLE_FLOATING_PANEL,
  type ExtensionMessage,
} from "../messages";
import { shadowStyles } from "./shadowStyles";

const HOST_ID = "miricanvas-keyword-floating-host";
const CONTROLLER_KEY = "__miricanvasKeywordFloatingController__";

interface MountedPanel {
  host: HTMLDivElement;
  root: Root;
}

class FloatingPanelController {
  private panel: MountedPanel | null = null;
  private dragCleanup: (() => void) | null = null;

  open() {
    if (this.panel?.host.isConnected) return;

    this.close();
    document.getElementById(HOST_ID)?.remove();

    const host = document.createElement("div");
    host.id = HOST_ID;
    Object.assign(host.style, {
      position: "fixed",
      top: "24px",
      right: "24px",
      width: "min(500px, calc(100vw - 48px))",
      height: "min(300px, calc(100vh - 48px))",
      zIndex: "2147483647",
      margin: "0",
      padding: "0",
    });

    const shadowRoot = host.attachShadow({ mode: "open" });

    const resetStyle = document.createElement("style");
    resetStyle.textContent = shadowStyles;
    shadowRoot.append(resetStyle);

    const appStyles = document.createElement("link");
    appStyles.rel = "stylesheet";
    appStyles.href = chrome.runtime.getURL("content.css");
    shadowRoot.append(appStyles);

    const mountPoint = document.createElement("div");
    mountPoint.className = "miricanvas-floating-root";
    shadowRoot.append(mountPoint);
    document.documentElement.append(host);

    const root = createRoot(mountPoint);
    this.panel = { host, root };
    root.render(
      <FloatingApp
        onClose={() => this.close()}
        onDragStart={(event) => this.startDrag(event.nativeEvent)}
      />,
    );
  }

  close() {
    this.stopDragging();

    const panel = this.panel;
    this.panel = null;

    if (!panel) return;

    panel.root.unmount();
    panel.host.remove();
  }

  toggle() {
    if (this.panel?.host.isConnected) {
      this.close();
    } else {
      this.open();
    }
  }

  private startDrag(event: PointerEvent) {
    const host = this.panel?.host;

    if (!host || event.button !== 0) return;

    event.preventDefault();
    this.stopDragging();

    const pointerId = event.pointerId;
    const rect = host.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    host.style.left = `${rect.left}px`;
    host.style.top = `${rect.top}px`;
    host.style.right = "auto";

    const movePanel = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;

      const maxLeft = Math.max(0, window.innerWidth - rect.width);
      const maxTop = Math.max(0, window.innerHeight - rect.height);
      const left = Math.min(Math.max(0, moveEvent.clientX - offsetX), maxLeft);
      const top = Math.min(Math.max(0, moveEvent.clientY - offsetY), maxTop);

      host.style.left = `${left}px`;
      host.style.top = `${top}px`;
    };

    const finishDrag = (finishEvent: PointerEvent) => {
      if (finishEvent.pointerId === pointerId) this.stopDragging();
    };

    window.addEventListener("pointermove", movePanel);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);

    this.dragCleanup = () => {
      window.removeEventListener("pointermove", movePanel);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
      this.dragCleanup = null;
    };
  }

  private stopDragging() {
    this.dragCleanup?.();
  }
}

declare global {
  interface Window {
    [CONTROLLER_KEY]?: FloatingPanelController;
  }
}

const existingController = window[CONTROLLER_KEY];

if (existingController) {
  existingController.toggle();
} else {
  const controller = new FloatingPanelController();
  window[CONTROLLER_KEY] = controller;

  chrome.runtime.onMessage.addListener(
    (message: ExtensionMessage, _sender, sendResponse) => {
      if (message.type !== TOGGLE_FLOATING_PANEL) return false;

      controller.toggle();
      sendResponse({ handled: true });
      return false;
    },
  );

  controller.open();
}
