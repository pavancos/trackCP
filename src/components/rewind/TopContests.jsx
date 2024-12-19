import React from 'react'

function TopContests ({title, content}) {
    console.log('content: ', content);
  return (
    <div className='text-white px-3 py-3 m-5 w-11/12 md:w-7/12 mx-auto bg-[#ffffff04] backdrop-blur-lg rounded-lg '>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <div className='mt-3'>
        {
          content.map((item, index) => (
            <p key={index} className='text-lg'>{index+1}. {item}</p>
          ))
        }
      </div>
    </div>
  )
}

export default TopContests
