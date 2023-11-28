import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./global.css";

const rootContainer = document.getElementById("root")!;
const root = createRoot(rootContainer);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
