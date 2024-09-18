import React, { useEffect, useState } from 'react'
import CodechefIcon from '../../assets/codechef.svg'
import CodeforcesIcon from '../../assets/codeforces.svg'
import LeetcodeIcon from '../../assets/leetcode.svg'
import SpojIcon from '../../assets/spoj.svg'
import AtcoderIcon from '../../assets/atcoder.svg'
import HackerearthIcon from '../../assets/hackerearth.svg'
import NotFoundIcon from '../../assets/challenge.svg'
import OpenInNewTab from '../../assets/arrow.svg'
import Loading from '../Loading'
import { parse } from 'postcss'
import rightArrow from '../../assets/right-arrow.svg'
import leftArrow from '../../assets/left-arrow.svg'
import { useRef } from 'react'
import disabedLeftArrow from '../../assets/disabled-left.svg'
import disabledRightArrow from '../../assets/disabled-right.svg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function UpcomingContests() {
    const [upcoming, setUpcoming] = useState([]);
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [isFetchedUpcomingContests, setIsFetchedUpcomingContests] = useState(false);

    const formatToIST = (dateString) => {
        const gmtDate = new Date(dateString);

        const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // GMT+5:30
        const istDate = new Date(gmtDate.getTime() + istOffset);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = istDate.toLocaleDateString('en-IN', options);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const time = istDate.toLocaleTimeString('en-IN', timeOptions);
        return { date, time };
    };

    const fetchUpcommingContests = async () => {
        try {
            const url = 'https://getdata-contests.vercel.app/getLatestContest';
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                return parseTheData(data.result);
            } else {
                throw new Error(data);
            }
        } catch (err) {
            console.error(err);
            return null;
        }
        finally {
            setIsFetchedUpcomingContests(true);
        }
    }
    const parseTheData = (data) => {
        let ConvertedContestsData = data.map(contest => {
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            if (contest.platform === 'AtCoder') {
                const abcPattern = /AtCoder\s+Beginner\s+Contest\s+(\d+)/i;
                const heuristicPattern = /AtCoder\s+Heuristic\s+Contest\s+(\d+)/i;
                let formattedName;
                if (abcPattern.test(contest.event)) {
                    const match = contest.event.match(abcPattern);
                    formattedName = `AtCoder Beginner Contest ${match[1]}`;
                }
                else if (heuristicPattern.test(contest.event)) {
                    const match = contest.event.match(heuristicPattern);
                    formattedName = `AtCoder Heuristic Contest ${match[1]}`;
                } else {
                    formattedName = contest.event;
                }
                contest.event = formattedName;
            }
            if (contest.platform.toLowerCase() === 'hackerearth') {
                contest.event = contest.event.split('.')[0];
            }
            return {
                name: contest.event,
                Image: contest.host === 'codechef.com' ? CodechefIcon : contest.host === 'codeforces.com' ? CodeforcesIcon : contest.host === 'leetcode.com' ? LeetcodeIcon : contest.host === 'spoj.com' ? SpojIcon : contest.host === 'atcoder.jp' ? AtcoderIcon : contest.host === 'hackerearth.com' ? HackerearthIcon : NotFoundIcon,
                platofrm: contest.platform.toLowerCase(),
                Date: formatToIST(contest.start).date,
                StartTime: formatToIST(contest.start).time.toUpperCase(),
                EndTime: formatToIST(contest.end).time.toUpperCase(),
                href: contest.href
            }
        });
        // Filter the contests which are only upto 2 weeks from now
        ConvertedContestsData = ConvertedContestsData.filter(contest => {
            const contestDate = new Date(contest.Date);
            const today = new Date();
            const diffTime = Math.abs(contestDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 14;
        });
        return ConvertedContestsData;
    }

    useEffect(() => {
        fetchUpcommingContests().then(data => {
            // console.log(data);
            setUpcoming(data);
        });
    }, [])

    // useEffect(() => {
    //     console.log(upcoming);
    // }, [upcoming]);

    useEffect(() => {
        const scrollElement = scrollRef.current;

        const handleScroll = () => {
            if (scrollElement) {
                const scrollLeftValue = scrollElement.scrollLeft;
                const scrollWidthValue = scrollElement.scrollWidth - scrollElement.clientWidth;

                setAtStart(scrollLeftValue === 0); // Reached start
                setAtEnd(scrollLeftValue >= scrollWidthValue); // Reached end
            }
        };

        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [upcoming]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -336, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 336, behavior: 'smooth' });
        }
    };

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        gsap.set('.upContests', {
            opacity: 0,
            y: 90
        })
        gsap.to('.upContests', {
            scrollTrigger: {
                trigger: '.upContests',
                start: 'top 80%',
                end: 'bottom 80%',
                // markers: true,
                scrub: 1,
            },
            y: 30,
            opacity: 1,
            duration: 1
        })
    }, [])


    return (
        <div className='upContests ms-10 scroll-section pt-12 mb-8'>
            <h1 className='text-5xl font-afacad font-medium mb-12'>Upcoming Contests</h1>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto py-4 rounded-xl scrollbar-hide">
                <div className='flex gap-4 me-2'>
                    {
                        isFetchedUpcomingContests === false ?
                            <>
                                <div className="flex flex-col w-80 p-6 pb-4 sm:pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                    <h2 className='text-2xl font-semibold p-1 px-0'>{<Skeleton />}</h2>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />}</p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-2 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                </div>
                                <div className="flex flex-col w-80 p-6 pb-4 sm:pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                    <h2 className='text-2xl font-semibold p-1 px-0'>{<Skeleton />}</h2>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />}</p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-2 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                </div>
                                <div className="flex flex-col w-80 p-6 pb-4 sm:pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                    <h2 className='text-2xl font-semibold p-1 px-0'>{<Skeleton />}</h2>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />}</p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-0 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                    <p className="text-md p-2 pb-2 px-0"><span className='font-semibold'></span> {<Skeleton />} </p>
                                </div>
                            </>
                            :
                            upcoming.map((contest, index) => {
                                return (
                                    <div key={index} className="flex flex-col w-80 p-6 pb-4 sm:pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                        <img src={contest.Image} alt="icon" className="w-8 mb-2" />
                                        <h2 className='text-2xl font-semibold mb-2'>{contest.platofrm}</h2>
                                        <p className="text-md">
                                            {/* <span className='font-semibold'>Contest Name: </span> */}
                                            {contest.name}</p>
                                        <p className="text-md"><span className='font-semibold'>Date:</span> {contest.Date}</p>
                                        <p className="text-md"><span className='font-semibold'>Time:</span> {contest.StartTime} - {contest.EndTime}</p>
                                        <div className='flex justify-end mt-4'>
                                            <a href={contest.href} target="_blank" rel="noreferrer">
                                                <div className='bg-[#37373a] p-3 sm:p-2 rounded-full'>
                                                    <img src={OpenInNewTab} alt="open in new tab" className="w-5 sm:w-4 rotate-[-45deg]" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <div className='flex justify-end me-10 mt-12 gap-6 sm:gap-4'>
                {
                    atStart &&
                    <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full' src={disabedLeftArrow} alt="" />
                }
                {
                    !atStart &&
                    <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full hover:cursor-pointer' src={leftArrow} alt="" onClick={scrollLeft} />
                }
                {
                    !atEnd &&
                    <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full hover:cursor-pointer' src={rightArrow} alt="" onClick={scrollRight} />
                }
                {
                    atEnd &&
                    <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full' src={disabledRightArrow} alt="" />
                }
            </div>
        </div>
    )
}

export default UpcomingContests