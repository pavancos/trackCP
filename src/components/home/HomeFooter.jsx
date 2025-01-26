import React, { useEffect } from 'react'
import gsap from 'gsap'
import './Home.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

function HomeFooter() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.footer-text', {
      scrollTrigger: {
        trigger: '.footer-text',
        start: 'top 95%',
        end: 'bottom 96%',
        scrub: 1,
        // markers: true,
        toggleActions: 'restart none none none'
      },
      opacity: 0,
      delay: 0.5,
      duration: 0.3,
      stagger: 0.15,
      y: 30,
      ease: 'expo.out(2)'
      // ease: 'elastic.out(0.9, 0.5)',
    })
  }, [])

  return (
    <div>
      <div className='footer-page font-advent font-mediumbold'>
          <span className='footer-text'>t</span>
          <span className='footer-text'>r</span>
          <span className='footer-text'>a</span>
          <span className='footer-text'>c</span>
          <span className='footer-text pe-5'>k</span>
        <Link to="/login">
          <span className='footer-text'>c</span>
          <span className='footer-text'>o</span>
          <span className='footer-text'>d</span>
          <span className='footer-text'>e</span>
        </Link>

        {/* <h1 className='footer-text text-8xl'>Track Code</h1> */}
      </div>
      <div className='devNames font-sans flex gap-3 px-3 sm:px-7'>
        <a
          className='hover:text-orange-400 transition duration-300'
          href='https://www.linkedin.com/in/vigneshvaranasi'
        >
          @<span className='font-mono'>Vignesh Varanasi</span>
        </a>
        <a
          className='hover:text-orange-400 transition duration-300'
          href='https://www.linkedin.com/in/pavankch/'
        >
          @<span className='font-mono'>Pavan Chennupati</span>
        </a>
      </div>

      <div className='mb-30'></div>
    </div>
  )
}

export default HomeFooter
