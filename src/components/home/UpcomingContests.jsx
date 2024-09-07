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


function UpcomingContests() {
    const [upcoming, setUpcoming] = useState([]);
    let ComingContestsData = [
        {
            "duration": 5400,
            "end": "2024-09-08T04:00:00",
            "event": "Weekly Contest 414",
            "host": "leetcode.com",
            "href": "https://leetcode.com/contest/weekly-contest-414",
            "id": 53729394,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "leetcode.com",
            "resource_id": 102,
            "start": "2024-09-08T02:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 7200,
            "end": "2024-09-11T16:30:00",
            "event": "Starters 151",
            "host": "codechef.com",
            "href": "https://www.codechef.com/START151",
            "id": 51906861,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "codechef.com",
            "resource_id": 2,
            "start": "2024-09-11T14:30:00"
        },
        {
            "duration": 6000,
            "end": "2024-09-14T13:40:00",
            "event": "AtCoder Beginner Contest 371",
            "host": "atcoder.jp",
            "href": "https://atcoder.jp/contests/abc371",
            "id": 53472956,
            "n_problems": null,
            "n_statistics": null,
            "parsed_at": null,
            "problems": null,
            "resource": "atcoder.jp",
            "resource_id": 93,
            "start": "2024-09-14T12:00:00"
        }
    ]



    const fetchUpcommingContests = async () => {
        try {
            const url = 'https://getdata-contests.vercel.app/getUpcomingContests';
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                return parseTheData(data);
            } else {
                throw new Error(data);
            }
        } catch (err) {
            console.error(err);
            return null;
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
                }else{
                    formattedName = contest.event;
                }
                contest.event = formattedName;
            }
            if(contest.platform.toLowerCase() === 'hackerearth'){
                contest.event = contest.event.split('.')[0];
            }
            return {
                name: contest.event,
                Image: contest.host === 'codechef.com' ? CodechefIcon : contest.host === 'codeforces.com' ? CodeforcesIcon : contest.host === 'leetcode.com' ? LeetcodeIcon : contest.host === 'spoj.com' ? SpojIcon : contest.host === 'atcoder.jp' ? AtcoderIcon : contest.host === 'hackerearth.com' ? HackerearthIcon : NotFoundIcon,
                platofrm: contest.platform.toLowerCase(),
                Date: new Date(contest.start).toLocaleDateString(),
                StartTime: new Date(contest.start).toLocaleTimeString('en-US', options),
                EndTime: new Date(contest.end).toLocaleTimeString('en-US', options),
                href: contest.href
            }
        });
        return ConvertedContestsData;
    }

    useEffect(() => {
        fetchUpcommingContests().then(data => {
            console.log(data);
            setUpcoming(data);
        });
    }, [])

    // useEffect(() => {
    //     console.log(upcoming);
    // }, [upcoming])

    useEffect(() => {
        console.log(upcoming);
    }, [upcoming]);






    return (
        <div className='ms-10 scroll-section pt-12'>
            <h1 className='text-5xl font-afacad font-medium mb-12'>Upcoming Contests</h1>
            <div className="flex gap-4 overflow-x-auto py-4 rounded-xl">
                <div className='flex gap-4 me-2'>
                    {
                        upcoming===null ?
                        <Loading></Loading>
                        :
                        upcoming.map((contest, index) => {
                            return (
                                <div key={index} className=" flex flex-col  w-80 p-6 pb-4 pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                    <img src={contest.Image} alt="icon" className="w-8 mb-2" />
                                    <h2 className='text-2xl font-semibold mb-2'>{contest.platofrm}</h2>
                                    <p className="text-md">
                                        {/* <span className='font-semibold'>Contest Name: </span> */}
                                        {contest.name}</p>
                                    <p className="text-md"><span className='font-semibold'>Date:</span> {contest.Date}</p>
                                    <p className="text-md"><span className='font-semibold'>Time:</span> {contest.StartTime} - {contest.EndTime}</p>
                                    <div className='flex justify-end mt-4'>
                                        <a href={contest.href} target="_blank" rel="noreferrer">
                                            <div className='bg-black p-1.5 rounded-full'>
                                                <img src={OpenInNewTab} alt="open in new tab" className="w-6 rotate-[-45deg]" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UpcomingContests