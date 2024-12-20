import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const GradientBackground = () => {
  useEffect(() => {
    gsap.to('.gradient', {
      duration: 8,
      backgroundPosition: '200% 0',
      ease: 'linear',
      repeat: -1
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = e => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 100
      const y = (e.clientY / innerHeight) * 100
      console.log('y: ', y);

      gsap.to('.gradient', {
        backgroundPosition: `${x}% ${y}%`,
        duration: 1.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      {/* Animated Gradient Background */}
      <div
        className='gradient absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        animate-gradient bg-[length:200%_200%]'
      ></div>

      {/* Content */}
      <div className='relative z-10 flex h-full w-full items-center justify-center text-white'>
        <h1 className='text-4xl font-bold'>Elegant Gradient Animation</h1>
      </div>
    </div>
  )
}

export default GradientBackground
