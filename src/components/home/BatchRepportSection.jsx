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
                end: 'bottom 40%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#3FA2F6';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#3FA2F6';
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
                end: 'bottom 40%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '#51be3d';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#fcad00';
                },
                onLeaveBack: () => {
                    document.body.style.backgroundColor = '#3FA2F6';
                }
            }
        });
        gsap.to('.pg-3', {
            scrollTrigger: {
                trigger: '.pg-3',
                start: 'top 40%',
                end: 'bottom 40%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#51be3d';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '#f16e5f';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#51be3d';
                },
                onLeaveBack: () => {
                    document.body.style.backgroundColor = '#fcad00';
                }
            }
        });
        gsap.to('.pg-4', {
            scrollTrigger: {
                trigger: '.pg-4',
                start: 'top 40%',
                end: 'bottom 40%',
                // markers: true,
                onEnter: () => {
                    document.body.style.backgroundColor = '#f16e5f';
                },
                onLeave: () => {
                    document.body.style.backgroundColor = '';
                },
                onEnterBack: () => {
                    document.body.style.backgroundColor = '#f16e5f';
                },
                onLeaveBack: () => {
                    document.body.style.backgroundColor = '#51be3d';
                }
            }
        });

        // Cleanup function to reset the background when the component unmounts
        return () => {
            document.body.style.backgroundColor = ''; // Reset to default or intended background
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clear all scroll triggers
            // console.log("Unmounted");
        };

    }, [])

    return (
        <>
        <div className='flex flex-col gap-7 pt-28 md:gap-20'>
            <div className='pg-1 px-6 flex flex-col gap-4 py-2'>
                <div className='bg-[#3FA2F6] rounded-20px md:rounded-28px p-6 md:p-10'>
                    <h1 className='text-white text-4xl md:text-6xl font-bold'>Batch Report</h1>
                    <h1 className='text-[#164D7B] text-4xl md:text-6xl font-bold mt-2'>Data-driven insights.</h1>
                    <h1 className='text-[#164D7B] text-4xl md:text-6xl font-bold mt-2'>Track across platforms.</h1>
                </div>
                <div className='flex flex-col md:flex-row h-auto gap-4'>
                    <div className='bg-[#fcfcfc] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#1e1e1f] text-3xl lg:text-4xl xl:text-5xl font-bold'>Batch insights.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>The data you need.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>all in one place.</h1>
                    </div>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Filter contests.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>By roll number.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>By platform.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>With no extra steps.</h1>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  gap-4 mt-0 md:mt-4'>
                    <div className='bg-[#fcfcfc] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#1d1d1f] text-3xl lg:text-4xl xl:text-5xl font-bold'>Contest Performance</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Rankings.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>View history.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Analyze easily.</h1>
                    </div>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Download Reports.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>From dashboard to .xlsx.</h1>
                        <h1 className='text-[#3FA2F6] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>With just one click.</h1>
                    </div>
                </div>
            </div>
            <div className='pg-2  px-6 flex flex-col gap-4 py-2'>
                <div className='bg-[#fcad00] rounded-20px md:rounded-28px p-6 md:p-10'>
                    <h1 className='text-white text-4xl md:text-6xl font-bold'>CP Report</h1>
                    <h1 className='text-[#835a00] text-4xl md:text-6xl font-bold mt-2'>Track performance.</h1>
                    <h1 className='text-[#835a00] text-4xl md:text-6xl font-bold mt-2'>Across platforms.</h1>
                </div>
                <div className='flex flex-col md:flex-row h-auto gap-4'>
                    <div className='bg-[#fcfcfc] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#1e1e1f] text-3xl lg:text-4xl xl:text-5xl font-bold'>Instant Insights.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Check progress.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Visualize data</h1>
                    </div>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Pick your platforms.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Choose Codechef.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Leetcode</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Codeforces.</h1>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row mt-0 md:mt-4'>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Dot Graphs for Performance</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Interactive dot graphs.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Visualize your rankings & contest participation.</h1>
                        <h1 className='text-[#fcad00] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Track your progress over time.</h1>
                    </div>
                </div>
            </div>
            <div className='pg-3  px-6 flex flex-col gap-4 py-2'>
                <div className='bg-[#51be3d] rounded-20px md:rounded-28px p-6 md:p-10'>
                    <h1 className='text-white text-4xl md:text-6xl font-bold'>Student Report</h1>
                    <h1 className='text-[#29631f] text-4xl md:text-6xl font-bold mt-2'>Personalized insights.</h1>
                    <h1 className='text-[#29631f] text-4xl md:text-6xl font-bold mt-2'>Filter by roll number.</h1>
                </div>
                <div className='flex flex-col md:flex-row h-auto gap-4'>
                    <div className='bg-[#fcfcfc] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#1e1e1f] text-3xl lg:text-4xl xl:text-5xl font-bold'>Cross-platform performance.</h1>
                        <h1 className='text-[#51be3d] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>All your contests,</h1>
                        <h1 className='text-[#51be3d] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>all in one place.</h1>
                    </div>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Contest details.</h1>
                        <h1 className='text-[#51be3d] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Across Leetcode.</h1>
                        <h1 className='text-[#51be3d] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Codechef.</h1>
                        <h1 className='text-[#51be3d] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Codeforces.</h1>
                    </div>
                </div>
            </div>
            <div className='pg-4  px-6 flex flex-col gap-4 py-2'>
                <div className='bg-[#f16e5f] rounded-20px md:rounded-28px p-6 md:p-10'>
                    <h1 className='text-white text-4xl md:text-6xl font-bold'>Compare</h1>
                    <h1 className='text-[#6f352f] text-4xl md:text-6xl font-bold mt-2'>Measure performance.</h1>
                    <h1 className='text-[#6f352f] text-4xl md:text-6xl font-bold mt-2'>Compare across platforms.</h1>
                </div>
                <div className='flex flex-col md:flex-row h-auto gap-4'>
                    <div className='bg-[#fcfcfc] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#1e1e1f] text-3xl lg:text-4xl xl:text-5xl font-bold'>Multi-user, Multi-platform</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>One view, complete analysis.</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Multiple contest stats.</h1>
                    </div>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full md:w-1/2 p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Comprehensive Comparison</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Analyze in unified view.</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Visualize Progress.</h1>
                        {/* <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Interactive Dotted Graphs.</h1> */}
                    </div>
                </div>
                <div className='flex flex-col md:flex-row mt-0 md:mt-4'>
                    <div className='bg-[#282828] rounded-20px md:rounded-28px w-full p-6 md:p-10'>
                        <h1 className='text-[#e0e0e0] text-3xl lg:text-4xl xl:text-5xl font-bold'>Performance Analysis</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Dot graphs for all selected users.</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>Track rankings & contest participation.</h1>
                        <h1 className='text-[#f16e5f] text-3xl lg:text-4xl xl:text-5xl font-bold mt-2'>See trends in user performance.</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BatchRepportSection;