import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import BatchReport from './components/batchReport/BatchReport';
import RefreshDB from './components/refreshdb/RefreshDB';
import Home from './components/home/Home';
import Layout from './Layout';
import PlayGround from './components/Play/PlayGround';
import Play from './components/playground/Play';
import Compare from './components/compare/Compare';
import ContestAnalysis from './components/contestanalysis/ContestAnalysis';
import StudentReport from './components/studentReport/StudentReport';
import Student from './components/studentReport/Student';


function App() {

  // Define routes
  const browserRouter = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        // {
        //   path: 'batchreport/:year/:branch',
        //   element: (
        //     <BatchReport  />
        //   )
        // },
        {
          path: 'studentreport',
          element: (
            <StudentReport/>
          )
        },
        {
          path: 'student/:rollNo',
          element: <Student/>
        }
        // { path: 'refreshdb', element: <RefreshDB /> },
        // { path: 'playground', element: <Play /> },
        // { path: 'compare', element: <Compare /> },
        // { path: 'play', element: <PlayGround /> },
        // {
        //   path: 'contestanalysis',
        //   element: (
        //     <ContestAnalysis/>
        //   )
        // },
        // {
        //   path: 'rewind',
        //   element: <Rewind />
        // }
      ]
    }
  ]);
  return (
    <RouterProvider router={browserRouter}/>
  );
}


export default App;

