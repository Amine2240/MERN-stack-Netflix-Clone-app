import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Authcontextprovider from "./context/authcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Authcontextprovider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Authcontextprovider>
  </Provider>
);
