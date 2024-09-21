import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import homeIcon from '../../assets/navbar/home.svg';
import BatchIcon from '../../assets/navbar/batch.svg';
import studentIcon from '../../assets/navbar/student.svg';

function MobileNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const location = useLocation();

  const backgroundColor = `${location.pathname === '/batchreport' ? 'bg-[#3fa2f6]' :
    location.pathname === '/studentreport' ? 'bg-[#51be3d]' :
      location.pathname === '/playground' ? 'bg-[#fcad00]' :
        location.pathname === '/compare' ? 'bg-[#f16e5f]' :
          location.pathname === '/contestanalysis' ? 'bg-[#3ff67f]' :
            'bg-blue-100' // Default background color
    }`;

  return (
    <header
      className={`${backgroundColor} w-full flex md:hidden flex-col justify-center items-center py-4 px-2 md:px-6`}
    >
      <div onClick={toggleExpand} className="cursor-pointer">
        <h3 className="text-[#ffffff] text-4xl font-mono text-center">track code</h3>
      </div>

      {/* Conditionally render the expanded section with smooth transition */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="flex justify-center mt-2">
          <ul className="flex flex-row items-center gap-4">
            <li>
              <Link to="/" className="flex flex-col items-center justify-center">
                <img src={homeIcon} alt="home" className="w-6 h-6 mb-1" />
                <p className='text-sm'>Home</p>
              </Link>
            </li>
            <li>
              <Link to="batchreport" className="flex flex-col items-center justify-center">
                <img src={BatchIcon} alt="batch" className="w-6 h-6 mb-1" />
                <p className='text-sm'>Batch Report</p>
              </Link>
            </li>
            <li>
              <Link to="studentreport" className="flex flex-col items-center justify-center">
                <img src={studentIcon} alt="batch" className="w-6 h-6 mb-1" />
                <p className='text-sm'>Student Reoprt</p>
              </Link>
            </li>
            {/* <li>
              <Link to="batchreport" className="flex flex-col items-center justify-center">
                <img src={BatchIcon} alt="batch" className="w-6 h-6 mb-1" />
                <p className='text-sm'>Batch Report</p>
              </Link>
            </li> */}
            {/* <li>
              <Link to="studentreport">SR</Link>
            </li>
            <li>
              <Link to="playground">CPR</Link>
            </li>
            <li>
              <Link to="compare">Compare</Link>
            </li>
            <li>
              <Link to="contestanalysis">CA</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MobileNav;
