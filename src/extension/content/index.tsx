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
    root.render(<FloatingApp onClose={() => this.close()} />);
  }

  close() {
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
