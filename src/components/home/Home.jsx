import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Home.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UpcomingContests from './UpcomingContests';
import BatchRepportSection from './BatchRepportSection';
import CodechefIcon from '../../assets/codechef.svg';
import CodeforcesIcon from '../../assets/codeforces.svg';
import LeetcodeIcon from '../../assets/leetcode.svg';
import SpojIcon from '../../assets/spoj.svg';
import AtcoderIcon from '../../assets/atcoder.svg';
import HackerearthIcon from '../../assets/hackerearth.svg';

import Sticker1 from '../../assets/Stickers/Sticker1.svg';
import Sticker2 from '../../assets/Stickers/Sticker2.svg';
import Sticker3 from '../../assets/Stickers/Sticker3.svg';
import Sticker4 from '../../assets/Stickers/Sticker4.svg';
import Sticker5 from '../../assets/Stickers/Sticker5.svg';

function Home() {
  let stickersArray = [CodechefIcon, CodeforcesIcon, LeetcodeIcon, SpojIcon, AtcoderIcon, HackerearthIcon];
  let currentIndex = 0;  
  let lastMouseX = 0;
  let lastMouseY = 0;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hide bubbles
    gsap.set('.bubble', { opacity: 0, y: 90 });

    // Show bubbles
    gsap.to('.bubble', {
      opacity: 1,
      delay: 0.3,
      duration: 0.6,
      stagger: 0.3,
      y: 10,
      ease: 'back.out(5)',
    });

    // Stickers
    const stickersDiv = document.querySelector('.stickersDiv');
    let lastTime = 0;
    const minMoveDistance = 30;

    stickersDiv.addEventListener('mousemove', (dets) => {
      const currentTime = Date.now();
      const mouseX = dets.pageX;
      const mouseY = dets.pageY;

      const distanceMoved = Math.sqrt(Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2));
      if (distanceMoved < minMoveDistance) return;
      if (currentTime - lastTime < 250) return;

      lastTime = currentTime;

      const deltaX = mouseX - lastMouseX;
      const deltaY = mouseY - lastMouseY;

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Create the sticker element
      let sticker = document.createElement('div');
      sticker.classList.add('sticker');
      let imgElement = document.createElement('img');
      imgElement.style.width = '40px';
      imgElement.src = stickersArray[currentIndex];
      imgElement.classList.add('sticker-image');
      sticker.style.left = mouseX + 'px';
      sticker.style.top = mouseY + 'px';
      sticker.appendChild(imgElement);
      stickersDiv.appendChild(sticker);

      // Calculate the direction based on mouse movement
      const stickerMotionX = deltaX * 0.3;  // Adjust the multiplier to control motion effect
      const stickerMotionY = deltaY * 0.3;

      // GSAP animation
      gsap.fromTo(
        sticker,
        { scale: 1, opacity: 1, x: 0, y: 0 },  // Initial state
        {
          scale: 0.5,
          opacity: 0,
          x: stickerMotionX,  // Move in the direction of the mouse movement
          y: stickerMotionY,
          duration: 2,
          ease: 'power2.out',
          onComplete: () => {
            sticker.remove();
          },
        }
      );

      currentIndex = (currentIndex + 1) % stickersArray.length;
    });
  }, []);

  return (
    <>
      <div className='stickersDiv h-screen flex justify-center items-center'>
        <div className="grid grid-cols-8 grid-rows-3 auto-rows-fr grid-flow-row w-full h-1/2 md:w-2/3">
          <div className="bubble col-span-3 row-span-1 flex justify-center items-start">
            <button
              className="
                 backdrop-blur-sm shadow-xl text-white  py-2 px-4 rounded-lg z-50 bg-vividBlue rotate-[3deg]
                 hover:scale-125 hover:rotate-0 transition-all duration-300
                "
            >
              <a href="/batchreport">Batch Report</a>
            </button>
          </div>
          <div className="bubble col-span-3 col-start-6 row-span-1 flex justify-center items-center ">
            <button
              className="
                 backdrop-blur-sm shadow-xl text-white py-2 px-4 rounded-lg z-50 bg-coral rotate-[-7deg]
                 hover:scale-125 hover:rotate-0 transition-all duration-300
                "
            >
              <a href="/playground">CP Report</a>
            </button>
          </div>
          <div className="col-span-4 col-start-3 row-span-1">
            <h1 className='main-heading text-5xl text-center font-medium sm:text-6xl md:text-7xl lg:text-8xl font-advent tracking-wider'>
              Track io
            </h1>
          </div>
          <div className="bubble col-span-3 row-span-1 flex flex-row justify-center sm:items-center items-start">
            <button
              className="
                 backdrop-blur-sm shadow-xl text-white  py-2 px-2 rounded-lg bg-softRed z-50 rotate-[-7deg]
                 hover:scale-125 hover:rotate-0 transition-all duration-300
                "
            >
              <a href="/studentreport">Student Report</a>
            </button>
          </div>
          <div className="bubble col-span-3 col-start-6 row-span-1 flex flex-row justify-center items-start sm:items-end">
            <button
              className="
                 backdrop-blur-sm shadow-xl text-white py-2 px-4 rounded-lg z-50 bg-deepTeal rotate-[5deg]
                 hover:scale-125 hover:rotate-0 transition-all duration-300
                "
            >
              <a href="/compare">Compare</a>
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: '100vh' }}>
        <UpcomingContests />
      </div>
      <BatchRepportSection />
      <div className='page'></div>
      <div className='page'></div>
    </>
  );
}

export default Home;

// function Home() {
//   const stickersArray = [Sticker1, Sticker2, Sticker3, Sticker4, Sticker5];
//   useEffect(() => {
//     let currentIndex = 0;

//     const container = document.querySelector('.stickersDiv');

//     container.addEventListener('mousemove', (e) => {
//       const sticker = document.createElement('div');
//       sticker.classList.add('sticker');
//       const img = document.createElement('img');
//       img.src = stickersArray[currentIndex];
//       img.style.width = '50px'; // Customize the size

//       sticker.style.position = 'absolute';
//       sticker.style.left = `${e.pageX}px`;
//       sticker.style.top = `${e.pageY}px`;
//       sticker.appendChild(img);
//       container.appendChild(sticker);

//       gsap.fromTo(
//         sticker,
//         { x: 0, y: 0, opacity: 1, scale: 1 },
//         {
//           x: e.movementX * 5,
//           y: e.movementY * 5,
//           opacity: 0,
//           scale: 0.2,
//           duration: 2,
//           onComplete: () => sticker.remove(),
//         }
//       );

//       currentIndex = (currentIndex + 1) % stickersArray.length;
//     });
//   }, []);
//   return <div className="stickersDiv h-screen w-full"></div>;
// }

// export default Home;
