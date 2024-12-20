import React, { useEffect } from 'react'
import rewindLogo from '../../assets/rewind/rewindlogo.svg'
import gsap from 'gsap'
import './rewind.css'

function RewindLoadingGradient () {
  useEffect(() => {
    const tl = gsap.timeline()
    // tl.set('.container1', { opacity: 0, y: 50 })
    tl.set('.container1', { opacity: 0, x: 50 })
    
    const tl1 = gsap.timeline()
    tl1.to('.container1', {
      duration: 1,
    //   y: 0,
      x: 0,
      opacity: 1,
      ease: 'back'
    })
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3
      .to('.tri2', {
        duration: 0.7,
        x: -20
      })
      .to('.tri2', {
        duration: 0.7,
        x: 0
      })
    tl.add(tl1, '+=1')
  }, [])

  return (
    <div className='loading-box w-screen h-screen'>
      {/* Moving gradient background */}
      <div className='gradient-background'></div>

      {/* Content */}
      <div className='container1 flex'>
        <img src={rewindLogo} className='h-12' alt='Rewind Logo' />
        <img
          src={rewindLogo}
          className='tri2 h-12'
          alt='Rewind Logo Animation'
        />
        <h1 className='text font-semibold text-5xl ms-2 mb-14 sm:mb-4'>Rewind</h1>
      </div>
    </div>
  )
}

export default RewindLoadingGradient
