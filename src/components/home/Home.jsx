import React from 'react'

function Home() {
  return (
    <div className={`w-full h-full bg-zinc-200 flex flex-col items-center pt-3 `} style={{ minHeight: "100vh" }}>
      <div className={`flex items-center gap-3 bg-white p-7 rounded-md m-3`}>
          <h1 className='text-justify'>Under Maintanance! We are currently improving this page. Meanwhile, checkout Batch Report and Student Report.</h1>
      </div>
    </div>
  )
}

export default Home