import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  // use default (browser history), if running in isolation
  const history = defaultHistory || createMemoryHistory();

  // for child to container communication
  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  // for container to child communication
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container, and we should export mount
export { mount };
