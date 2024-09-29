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
  Colors,
  Legend,
  Title,
  LineController,
} from 'chart.js';

// REDUX
import { Provider } from 'react-redux';
import { store } from './store';

// ROUTER
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { defineRouter } from './router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Colors,
  Legend,
  Title,
  LineController,
);

const router = createBrowserRouter(defineRouter);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
