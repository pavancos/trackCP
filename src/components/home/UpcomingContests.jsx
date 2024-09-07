import React from 'react'
import CodechefIcon from '../../assets/codechef.svg'
import CodeforcesIcon from '../../assets/codeforces.svg'
import LeetcodeIcon from '../../assets/leetcode.svg'
import OpenInNewTab from '../../assets/arrow.svg'


function UpcomingContests() {

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

    let ConvertedContestsData = ComingContestsData.map(contest => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return {
            name: contest.event,
            Image: contest.host === 'codechef.com' ? CodechefIcon : contest.host === 'codeforces.com' ? CodeforcesIcon : LeetcodeIcon,
            platofrm: contest.host.split('.')[0],
            Date: new Date(contest.start).toLocaleDateString(),
            StartTime: new Date(contest.start).toLocaleTimeString('en-US', options),
            EndTime: new Date(contest.end).toLocaleTimeString('en-US', options),
            href: contest.href
        }
    });


    return (
        <div className='ms-10'>
            <h1 className='text-5xl font-afacad font-medium mb-12'>Upcoming Contests</h1>
            <div className="flex gap-4 overflow-x-auto py-4">
                <div className='flex gap-4 me-2'>
                    {
                        ConvertedContestsData.map((contest, index) => {
                            return (
                                <div key={index} className="flex flex-col w-80 p-6 pb-4 pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
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