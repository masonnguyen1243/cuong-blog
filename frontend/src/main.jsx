import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

import store from "~/store/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);

import { ThemeProvider } from "~/components/theme/ThemeProvider";

//
import { injectStore } from "~/utils/authorizeAxios";
injectStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <ToastContainer position="bottom-right" />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
