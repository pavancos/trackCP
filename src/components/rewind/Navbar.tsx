import React, { useState } from 'react'

function Navbar ({ selectedMonth, setSelectedMonth, themeColor }) {
  return (
    <div

      className={`
             border 
              flex flex-row gap-3 items-center justify-around
              px-2 py-2 sticky top-4 z-100  mx-auto
              backdrop-blur-lg rounded-full backdrop-brightness-100
              ${themeColor != 'dark' ? 'bg-[#363f435d] border-[#b0b3b483] ' : 'bg-[#f0f0f05e] border-[#363F43]'}
              text-white 
            `}
    >
      <div onClick={() => setSelectedMonth('Year')}
        className={`opacity-100 font-semibold px-3 rounded-full 
                    text-[#f16e5f] hover:text-black hover:bg-[#f16e5f] text-lg
                    backdrop-blur-lg
                    ${selectedMonth === 'Year' ? 'bg-[#f16e5f] text-black' : 'bg-[#363f435d]'}
                    `}
      >
        2024
      </div>
      <div className='overflow-x-auto scrollbar-hide flex gap-2'>
        <div
          onClick={() => setSelectedMonth(0)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 0 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jan
        </div>
        <div
          onClick={() => setSelectedMonth(1)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 1 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Feb
        </div>
        <div
          onClick={() => setSelectedMonth(2)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 2 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Mar
        </div>
        <div
          onClick={() => setSelectedMonth(3)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 3 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Apr
        </div>
        <div
          onClick={() => setSelectedMonth(4)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 4 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          May
        </div>
        <div
          onClick={() => setSelectedMonth(5)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 5 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jun
        </div>
        <div
          onClick={() => setSelectedMonth(6)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 6 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Jul
        </div>
        <div
          onClick={() => setSelectedMonth(7)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 7 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Aug
        </div>
        <div
          onClick={() => setSelectedMonth(8)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 8 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Sep
        </div>
        <div
          onClick={() => setSelectedMonth(9)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 9 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Oct
        </div>
        <div
          onClick={() => setSelectedMonth(10)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 10 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Nov
        </div>
        <div
          onClick={() => setSelectedMonth(11)}
          className={`opacity-100 px-3 rounded-full hover:text-black hover:bg-[#fff]  text-lg ${selectedMonth === 11 ? 'font-semibold bg-[#fff] text-black' : 'bg-transparent'}`}
        >
          Dec
        </div>
      </div>
    </div>
  )
}

export default Navbar
