import React, { useState } from 'react'

function Navbar ({ selectedMonth, setSelectedMonth }) {

  


  return (
    <div

      className={`
             border border-[#363F43]
              flex flex-row gap-3 items-center justify-around
              px-2 py-2 sticky top-4 z-100 w-11/12 md:w-7/12 mx-auto
              backdrop-blur-lg rounded-full backdrop-brightness-100
              text-white 
            `}
    >
      <div onClick={() => setSelectedMonth('Year')}
        className={`opacity-100 font-semibold px-3 rounded-full 
                    text-[#f16e5f] hover:text-black hover:bg-[#f16e5f] text-lg
                    backdrop-blur-lg
                    ${selectedMonth === 'Year' ? 'bg-[#f16e5f] text-black' : 'bg-transparent'}
                    `}
      >
        2024
      </div>
      <div className='overflow-x-auto scrollbar-hide flex gap-2'>
        <div
          onClick={() => setSelectedMonth('Jan')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Jan' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jan
        </div>
        <div
          onClick={() => setSelectedMonth('Feb')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Feb' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Feb
        </div>
        <div
          onClick={() => setSelectedMonth('Mar')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Mar' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Mar
        </div>
        <div
          onClick={() => setSelectedMonth('Apr')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Apr' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Apr
        </div>
        <div
          onClick={() => setSelectedMonth('May')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'May' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          May
        </div>
        <div
          onClick={() => setSelectedMonth('Jun')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Jun' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jun
        </div>
        <div
          onClick={() => setSelectedMonth('Jul')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Jul' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jul
        </div>
        <div
          onClick={() => setSelectedMonth('Aug')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Aug' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Aug
        </div>
        <div
          onClick={() => setSelectedMonth('Sep')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Sep' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Sep
        </div>
        <div
          onClick={() => setSelectedMonth('Oct')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Oct' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Oct
        </div>
        <div
          onClick={() => setSelectedMonth('Nov')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Nov' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Nov
        </div>
        <div
          onClick={() => setSelectedMonth('Dec')}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 'Dec' ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Dec
        </div>
      </div>
    </div>
  )
}

export default Navbar
