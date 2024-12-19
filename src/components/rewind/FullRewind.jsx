import React, { useState, useEffect, isValidElement } from 'react'
import Navbar from './Navbar'
import TopContests from './TopContests'

function FullRewind ({topContest,topPlatforms,totalContests,totalProblems,quote,monthlyData}) {
  console.log('topContest: ', topContest);
  const [selectedMonth, setSelectedMonth] = useState('Year');

  const [isNoContests,setIsNoContests] = useState(false);

  const [top5Contests, setTop5Contests] = useState([])
  useEffect(()=>{
    if(topContest.length>0){
      let temp = []
      for(let i=0;i<5;i++){
        temp.push(topContest[i].contest)
      }
      setTop5Contests(prev=>[...temp])
    }
  },[topContest])

  useEffect(()=>{
    // set body color to black
    document.body.style.backgroundColor = '#1e1e1e'
    return () => {
      document.body.style.backgroundColor = 'white'
    }
  },[]);
  useEffect(() => {
    console.log(selectedMonth);
    if(selectedMonth==='Year'){
      if(totalContests.length===0){
        setIsNoContests(true)
      }
    }else{
      if(monthlyData[selectedMonth].contests.length===0){
        setIsNoContests(true)
      }
    }
  }, [selectedMonth])
  return (
    <div className='w-full h-auto bg-[#1e1e1e] pt-6'>
      <div>
        <Navbar
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>
      {
        !isNoContests?
        selectedMonth === 'Year' && <TopContests 
          title='Top Contests'
          content={top5Contests}
        />:
        <div>
            No Contests
        </div>
        
        
      }
    </div>
  )
}

export default FullRewind
