import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import BatchReport from './components/batchReport/BatchReport';
import UserForm from './components/userform/UserForm';
import {fetchFromDB} from './functions/fetchFromDB/fetchFromDB';

function App() {
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);
  const [areThereAnyContests, setAreThereAnyContests] = useState();

  useEffect(() => {
    fetchFromDB(setstudentsInfo).then(()=>{
      setIsFetchedFromAPI(true);
    })
  }, [])

  return (
    <>
      <BatchReport 
        isFetchedFromAPI={isFetchedFromAPI} 
        studentsInfo={studentsInfo}
        areThereAnyContests={areThereAnyContests}
        setAreThereAnyContests={setAreThereAnyContests}
      >
       </BatchReport>
      {
        isFetchedFromAPI &&
        <UserForm studentsInfo={studentsInfo}></UserForm>
      }
      
      {/* <Toaster /> */}
    </>
  )
}

export default App
