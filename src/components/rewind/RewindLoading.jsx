import React, { useEffect } from 'react'
import rewindLogo from '../../assets/rewind/rewindlogo.svg'
import gsap from 'gsap'
import './rewind.css'
function RewindLoading () {
  useEffect(() => {
    const tl = gsap.timeline()
    tl.set('.container', { opacity: 0, x: 50 })
    const tl1 = gsap.timeline()
    tl1.to('.container', {
      duration: 1,
      x: 0,
      opacity: 1,
      ease: 'back'
    })    
    const tl3 = gsap.timeline({ repeat: -1 })
    tl3
    .to('.tri2', {
      // delay: 1,
      duration: 0.7,
      x: -35
    })
    .to('.tri2', {
      duration: 0.7,
      x: 0
    })
    tl.add(tl1, '+=1')
    // tl1.add(tl3, '+=0.2')

    // Text blur animation
    // gsap.timeline({ repeat: -1 })
    //     .to('.text', {
    //         opacity: 1,
    //         filter: 'blur(2px)',
    //         duration: 1,
    //         repeat: -1,
    //         yoyo: true,
    //         ease: 'power1.inOut',
    //     });
  }, [])

  return (
    <div className='container'>
      <div className='flex'>
        <img src={rewindLogo} className='w-50 h-10' alt='' />
        <img src={rewindLogo} className='tri2 w-50 h-10' alt='' />
      </div>
      <h1 className='text font-semibold text-4xl ml-2'>Rewind</h1>
    </div>
  )
}

export default RewindLoading
