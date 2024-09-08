import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'


function BatchRepportSection() {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to('.pg-1', {
            scrollTrigger: {
                trigger: '.pg-1',
                start: 'top 40%',
                end: 'bottom 50%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#3295c9';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#3295c9';
                },
                onLeaveBack: () => {
                    document.body.style.backgroundColor = '';
                }
            }
        });
        gsap.to('.pg-2', {
            scrollTrigger: {
                trigger: '.pg-2',
                start: 'top 40%',
                end: 'bottom 50%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onLeaveBack: () => {
                    document.body.style.backgroundColor = '3295c9';
                }
            }
        });
        
    }, [])

    return (
        <>
            <div className='pg-1' >
                <div className='m-5 sm:m-20 mt-1 mb-1 bg-[#3295c9] p-5 sm:p-10 rounded-28px'>
                    <h1 className='text-white text-4xl sm:text-7xl font-bold'>Batch Report</h1>
                    <h1 className='text-[#16435a] text-4xl sm:text-7xl font-bold mt-2'>Get detailed report of your batch's performance.</h1>
                </div>
                <div className='m-5 sm:m-20 mt-1 bg-[#ffffff] p-5 sm:p-10 rounded-28px'>
                    <h1 className='text-[#1d1d1f] text-3xl sm:text-5xl font-bold'>Display contest participation details for the selected date range.</h1>
                    <h1 className='text-[#3295c9] text-3xl sm:text-5xl font-bold mt-2'>Filter data by specifying roll number ranges.</h1>

                </div>
            </div>
            <div className='pg-2' >
                <div className='m-5 sm:m-20 mt-1 mb-1 bg-[#fcad00] p-5 sm:p-10 rounded-28px'>
                    <h1 className='text-white text-4xl sm:text-7xl font-bold'>Batch Report</h1>
                    <h1 className='text-[#835a00] text-4xl sm:text-7xl font-bold mt-2'>Get detailed report of your batch's performance.</h1>
                </div>
                <div className='m-5 sm:m-20 mt-1 bg-[#ffffff] p-5 sm:p-10 rounded-28px'>
                    <h1 className='text-[#1d1d1f] text-3xl sm:text-5xl font-bold'>Display contest participation details for the selected date range.</h1>
                    <h1 className='text-[#fcad00] text-3xl sm:text-5xl font-bold mt-2'>Filter data by specifying roll number ranges.</h1>

                </div>
            </div>
        </>
    )
}

export default BatchRepportSection