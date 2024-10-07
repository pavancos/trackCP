import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Home.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CodechefIcon from '../../assets/codechef.svg';
import CodeforcesIcon from '../../assets/codeforces.svg';
import LeetcodeIcon from '../../assets/leetcode.svg';
import SpojIcon from '../../assets/spoj.svg';
import AtcoderIcon from '../../assets/atcoder.svg';
import HackerearthIcon from '../../assets/hackerearth.svg';

function HomeFooter() {

    let stickersArray = [CodechefIcon, CodeforcesIcon, LeetcodeIcon, SpojIcon, AtcoderIcon, HackerearthIcon];
    let currentIndex = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Stickers
        const stickersDiv = document.querySelector('.stickersDiv');
        // stickersDiv.style.position = 'relative';
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

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.footer-text', {
            scrollTrigger: {
                trigger: '.footer-text',
                start: 'top 95%',
                end: 'bottom 96%',
                scrub: 1,
                // markers: true,
                toggleActions: 'restart none none none',
            },
            opacity: 0,
            delay: 0.5,
            duration: 0.3,
            stagger: 0.15,
            y: 30,
            ease: 'expo.out(2)',
            // ease: 'elastic.out(0.9, 0.5)',
        });

    }, []);

    return (
        <div>
            <div className='stickersDiv' >
            </div>
            <div className='footer-page font-advent font-mediumbold'>
                <span className='footer-text'>t</span>
                <span className='footer-text'>r</span>
                <span className='footer-text'>a</span>
                <span className='footer-text'>c</span>
                <span className='footer-text pe-5'>k</span>
                <span className='footer-text'>c</span>
                <span className='footer-text'>o</span>
                <span className='footer-text'>d</span>
                <span className='footer-text'>e</span>
                {/* <h1 className='footer-text text-8xl'>Track Code</h1> */}
            </div >
            <div className='mb-30 ps-5 footer-names'>
                <h1 className='font-mediumbold text-3xl'>
                    <span className='hover:text-orange-400 transition-colors duration-300 cursor-pointer'>
                        @Vignesh Varanasi
                    </span>
                    <span className='ps-5 hover:text-orange-400 transition-colors duration-300 cursor-pointer'>
                        @Pavan Chennupati
                    </span>
                </h1>
            </div>
        </div>
    );
}

export default HomeFooter;
