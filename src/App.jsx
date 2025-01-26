import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BatchReport from './components/batchReport/BatchReport';
import Batch from './components/batchReport/Batch';
import RefreshDB from './components/refreshdb/RefreshDB';
import Home from './components/home/Home';
import Layout from './Layout';
import PlayGround from './components/Play/PlayGround';
import Play from './components/playground/Play';
import Compare from './components/compare/Compare';
import ContestAnalysis from './components/contestanalysis/ContestAnalysis';
import StudentReport from './components/studentReport/StudentReport';
import Student from './components/studentReport/Student';
import Rewind from './components/rewind/Rewind';
import Login from './components/auth/Login';
import Dashboard from './components/super/Dashboard';
import { AuthProvider } from './store/authContext';
import ProtectedRoutes from './components/protectedroutes/ProtectedRoute';
import StudentConfig from './components/super/studentconfig/StudentConfig';
import { ToastBar, Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'studentreport', element: <StudentReport /> },
        { path: 'student/:rollNo', element: <Student /> },
        { path: 'batchreport', element: <BatchReport /> },
        {
          path: 'batch',
          children: [
            { path: '', element: <Batch /> },
            { path: ':year', element: <Batch /> },
            { path: ':year/:branch', element: <Batch /> }
          ]
        },
        { path: 'refreshdb', element: <RefreshDB /> },
        { path: 'playground', element: <Play /> },
        { path: 'compare', element: <Compare /> },
        { path: 'play', element: <PlayGround /> },
        { path: 'contestanalysis', element: <ContestAnalysis /> },
        { path: 'rewind', element: <Rewind /> },
        { path: 'login', element: <Login /> },
      ]
    },
    {
      path: '/super',
      element: <ProtectedRoutes/>,
      children:[
        {
          path:'',
          element:<Dashboard/>
        },
        {
          path:"edit/:year/:branch",          
          element:<StudentConfig/>
        }
      ]
    }
    
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </AuthProvider>
  );
}

export default App;