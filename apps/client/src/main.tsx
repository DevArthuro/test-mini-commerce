import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store, { persistor } from './store/store';
import { fetchPoducts } from './store/slice/products.js';
import { PersistGate } from 'redux-persist/integration/react';

store.dispatch(fetchPoducts())

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
