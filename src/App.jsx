import React from 'react'
import { Children } from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BatchReport from './components/batchReport/BatchReport';
import UserForm from './components/studentReport/StudentReport';
import RefreshDB from './components/refreshdb/RefreshDB';
import Home from './components/home/Home';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import { fetchFromDB } from './functions/fetchFromDB/fetchFromDB';
import PlayGround from './components/Play/PlayGround';
import Play from './components/playgorund/Play';

function App() {
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);
  useEffect(() => {
    fetchFromDB(setstudentsInfo).then(() => {
      setIsFetchedFromAPI(true);
    });
  }, []);

  const browserRouter = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'batchreport',
          element: <BatchReport
            studentsInfo={studentsInfo}
            isFetchedFromAPI={isFetchedFromAPI}
            />
          },
          {
            path: 'studentreport',
            element: <UserForm
            studentsInfo={studentsInfo}
            isFetchedFromAPI={isFetchedFromAPI}
          />
        },
        {
          path: 'refreshdb',
          element: <RefreshDB />
        },
        {
          path:'playground',
          element:<Play/>
        },
        {
          path:'play',
          element:<PlayGround/>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={browserRouter}>
      {Children}
    </RouterProvider>
  )
}

export default App
