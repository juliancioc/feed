import ReactDOM from "react-dom/client";

import { Provider } from "src/components/ui/provider";

import { App } from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Provider>
    <App />
  </Provider>
);
