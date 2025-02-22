import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/lib/store";

// ✅ Crear el store y persistor desde makeStore()
const { store, persistor } = makeStore();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* ✅ Evita renderizar la app hasta que el estado persistido esté cargado */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
