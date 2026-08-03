export const shadowStyles = `
  :host {
    all: initial;
    color-scheme: light;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .miricanvas-floating-root {
    width: 100%;
    height: 100%;
    color: #0e0e0e;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button {
    all: unset;
    font: inherit;
  }

  input, textarea, select {
    font: inherit;
    color: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #8b9095;
  }

  ::selection {
    color: white;
    background: #4f46e5;
  }
`;
