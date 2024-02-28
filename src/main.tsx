import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'virtual:svg-icons-register';
import App from './App';
import './index.css';
import store, { persistor } from './store';

const routeDOM = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const RootRender = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

routeDOM.render(RootRender);
