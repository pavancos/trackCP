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
import { fetchFromDB,fetch21BatchData,fetch22BatchData } from './functions/fetchFromDB/fetchFromDB';
import PlayGround from './components/Play/PlayGround';
import Play from './components/playground/Play';
import Compare from './components/compare/Compare';
import ContestAnalysis from './components/contestanalysis/ContestAnalysis';

function App() {
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [Batch21Data, setBatch21Data] = useState([]);
  const [Batch22Data, setBatch22Data] = useState([]);
  const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);
  // useEffect(() => {
  //   fetchFromDB(setstudentsInfo).then(() => {
  //     setIsFetchedFromAPI(true);
  //   });
  // }, []);

  // Getting data of Batches 21,22
  useEffect(()=>{
    fetch21BatchData(setBatch21Data).then(()=>{
      fetch22BatchData(setBatch22Data).then(async()=>{
        setIsFetchedFromAPI(true);
      });
    });
  },[])

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
            studentsInfo={{Batch21Data,Batch22Data}}
            isFetchedFromAPI={isFetchedFromAPI}
            />
          },
          {
            path: 'studentreport',
            element: <UserForm
            studentsInfo={[...Batch21Data,...Batch22Data]}
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
          path:'compare',
          element:<Compare/>
        },
        {
          path:'play',
          element:<PlayGround/>
        },
        {
          path:'contestanalysis',
          element:<ContestAnalysis
          studentsInfo={{Batch21Data,Batch22Data}}
          isFetchedFromAPI={isFetchedFromAPI}
          />
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
