import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className={` bg-blue-100 flex w-full flex-col gap-6 md:gap-0 md:flex-row justify-between items-center py-4 px-2 md:px-6 `}>
      <Link to="/">
        <h3 className='text-blue-700  text-2xl font-mono '>trackio</h3>
      </Link>
      <nav className='flex'>
        <ul className='flex flex-row justify-evenly gap-8'>
          <li>
            <Link to="batchreport">Batch Report</Link>
          </li>
          <li>
            <Link to="studentreport">Student Report</Link>
          </li>
          <li>
            <Link to="playground">Play Ground</Link>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export default Navbar