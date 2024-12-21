import React from 'react'
import { use } from 'react';

function TopContests ({title, content}) {
  // console.log('content: ', content);

  return (
    <div className='text-black px-5 py-3 rounded-lg '>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <div className='mt-3'>
        {
          content.length===0 ? <p className='text-lg'>No contests</p> :
          content.map((item, index) => (
            <p key={index} className='text-lg'>{index+1}. {item}</p>
          ))
        }
      </div>
    </div>
  )
}

export default TopContests
