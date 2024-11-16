import React from 'react'
import './Menu.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Menu({ toggleMenu }) {

    useEffect(() => {
        gsap.set('.full-menu nav ul li', {
            opacity: 0,
            y: 30
        });

        gsap.to('.full-menu nav ul li', {
            opacity: 1,
            delay: 0.1,
            duration: 0.15,
            stagger: 0.1,
            y: 10,
            // ease: 'back.out(5)',
            ease: 'power1.in'
            // ease: 'elastic.out(0.9, 0.5)',
        });
    })

    return (
        <div className='full-menu'>
            <nav className="flex text-[#1d4ed8] text-3xl">
                <ul className="flex flex-col gap-8">
                    {/* <li>
                        <Link to="/">Home</Link>
                    </li> */}
                    <li>
                        <Link onClick={toggleMenu} to="batchreport">Batch Report</Link>
                    </li>
                    <li>
                        <Link onClick={toggleMenu} to="studentreport">Student Report</Link>
                    </li>
                    <li>
                        <Link onClick={toggleMenu} to="playground">CP Report</Link>
                    </li>
                    <li>
                        <Link onClick={toggleMenu} to="compare">Compare</Link>
                    </li>
                    <li>
                        <Link onClick={toggleMenu} to="contestanalysis">Contest Analysis</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu