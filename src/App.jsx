// import React from 'react'
// import { Children } from 'react';
// import './App.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import BatchReport from './components/batchReport/BatchReport';
// import UserForm from './components/studentReport/StudentReport';
// import RefreshDB from './components/refreshdb/RefreshDB';
// import Home from './components/home/Home';
// import Layout from './Layout';
// import { useEffect, useState } from 'react';
// import { fetchFromDB,fetch21BatchData,fetch22BatchData } from './functions/fetchFromDB/fetchFromDB';
// import PlayGround from './components/Play/PlayGround';
// import Play from './components/playground/Play';
// import Compare from './components/compare/Compare';
// import ContestAnalysis from './components/contestanalysis/ContestAnalysis';

// function App() {
//   const [studentsInfo, setstudentsInfo] = useState([]);
//   const [Batch21Data, setBatch21Data] = useState([]);
//   const [Batch22Data, setBatch22Data] = useState([]);
//   const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);
//   // useEffect(() => {
//   //   fetchFromDB(setstudentsInfo).then(() => {
//   //     setIsFetchedFromAPI(true);
//   //   });
//   // }, []);

//   // Getting data of Batches 21,22
//   useEffect(()=>{
//     fetch21BatchData(setBatch21Data).then(()=>{
//       fetch22BatchData(setBatch22Data).then(async()=>{
//         setIsFetchedFromAPI(true);
//       });
//     });
//   },[])

//   const browserRouter = createBrowserRouter([
//     {
//       path: '',
//       element: <Layout />,
//       children: [
//         {
//           path: '',
//           element: <Home />
//         },
//         {
//           path: 'batchreport',
//           element: <BatchReport
//             studentsInfo={{Batch21Data,Batch22Data}}
//             isFetchedFromAPI={isFetchedFromAPI}
//             />
//           },
//           {
//             path: 'studentreport',
//             element: <UserForm
//             studentsInfo={[...Batch21Data,...Batch22Data]}
//             isFetchedFromAPI={isFetchedFromAPI}
//           />
//         },
//         {
//           path: 'refreshdb',
//           element: <RefreshDB />
//         },
//         {
//           path:'playground',
//           element:<Play/>
//         },
//         {
//           path:'compare',
//           element:<Compare/>
//         },
//         {
//           path:'play',
//           element:<PlayGround/>
//         },
//         {
//           path:'contestanalysis',
//           element:<ContestAnalysis
//           studentsInfo={{Batch21Data,Batch22Data}}
//           isFetchedFromAPI={isFetchedFromAPI}
//           />
//         }
//       ]
//     },
//   ]);

//   return (
//     <RouterProvider router={browserRouter}>
//       {Children}
//     </RouterProvider>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import BatchReport from './components/batchReport/BatchReport';
import UserForm from './components/studentReport/StudentReport';
import RefreshDB from './components/refreshdb/RefreshDB';
import Home from './components/home/Home';
import Layout from './Layout';
import { fetch21BatchData, fetch22BatchData } from './functions/fetchFromDB/fetchFromDB';
import PlayGround from './components/Play/PlayGround';
import Play from './components/playground/Play';
import Compare from './components/compare/Compare';
import ContestAnalysis from './components/contestanalysis/ContestAnalysis';

// Import React-GA for Google Analytics
import ReactGA from 'react-ga';
import Rewind from './components/rewind/Rewind';

// Initialize Google Analytics with your tracking ID
const TRACKING_ID = 'G-QW1VSHJK2L'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const [Batch21Data, setBatch21Data] = useState([]);
  const [Batch22Data, setBatch22Data] = useState([]);
  const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);

  // Fetch data for Batches 21 and 22
  useEffect(() => {
    const fetchData = async () => {
      await fetch21BatchData(setBatch21Data);
      await fetch22BatchData(setBatch22Data);
      setIsFetchedFromAPI(true);
    };
    fetchData();
  }, []);

  // Custom hook to track page views
  const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
      ReactGA.pageview(location.pathname + location.search);
    }, [location]);
  };

  // Define routes
  const browserRouter = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        {
          path: 'batchreport',
          element: (
            <BatchReport
              studentsInfo={{ Batch21Data, Batch22Data }}
              isFetchedFromAPI={isFetchedFromAPI}
            />
          )
        },
        {
          path: 'studentreport',
          element: (
            <UserForm
              studentsInfo={[...Batch21Data, ...Batch22Data]}
              isFetchedFromAPI={isFetchedFromAPI}
            />
          )
        },
        { path: 'refreshdb', element: <RefreshDB /> },
        { path: 'playground', element: <Play /> },
        { path: 'compare', element: <Compare /> },
        { path: 'play', element: <PlayGround /> },
        {
          path: 'contestanalysis',
          element: (
            <ContestAnalysis
              studentsInfo={{ Batch21Data, Batch22Data }}
              isFetchedFromAPI={isFetchedFromAPI}
            />
          )
        },
        {
          path:'rewind',
          element:<Rewind/>
        }
      ]
    }
  ]);

  // Track page views on route changes
  return (
    <RouterProvider router={browserRouter}>
      <PageTracking />
    </RouterProvider>
  );
}

// Component to trigger page tracking on route changes
function PageTracking() {
  usePageTracking();
  return null;
}

export default App;

