import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login'; // Uncomment this
import { AuthPrivateRouter, HomePrivateRouter } from './Router/PrivateRouter';
import HistoryReport from './Dashboard/HistoryReport';
import Notification from './Notification/Notification';
import Navbar from './Navbar/Navbar';


function App() {
  const router = createBrowserRouter([
    {
     
      element: <HomePrivateRouter />,
      children: [
        {
          path: "/",
          element: <Navbar />,
          children: [
            {
              path: "dash",
              element: <Dashboard />,
            },
            {
              path: "history",
              element: <HistoryReport />, // Ensure this is under HomePrivateRouter
            },
            {
              path: "notification",
              element: <Notification />, // Ensure this is under HomePrivateRouter
            },
            
          ],
        },
      ],
    },



  
    {
      path: "/",
      element: <AuthPrivateRouter />, // Parent for login route
      children: [
        {
          path: "login",
          element: <Login />, // Ensure this is under AuthPrivateRouter
        },
      ],
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
