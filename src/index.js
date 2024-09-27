import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

// REDUX
import { Provider } from 'react-redux';
import { store } from './store';

// ROUTER
import { RouterProvider } from 'react-router-dom';
import router from './router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
