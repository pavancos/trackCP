import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CodechefChart from '../Charts/CodechefChart';
import LeetcodeChart from '../Charts/LeetcodeChart';
import Loading from '../Loading'

const PlayGround = () => {
    const { register, handleSubmit } = useForm();
    const [isCodeChefSelected, setIsCodeChefSelected] = useState(true);
    const [isCodeforcesSelected, setIsCodeforcesSelected] = useState(true);
    const [isLeetcodeSelected, setIsLeetcodeSelected] = useState(true);
    const [isSpojSelected, setIsSpojSelected] = useState(true);
    const [isAtCoderSelected, setIsAtCoderSelected] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFetchedFromApi, setIsFetchedFromApi] = useState(true);

    const [codechefData, setCodechefData] = useState([]);
    const [codeforcesData, setCodeforcesData] = useState([]);
    const [leetcodeData, setLeetcodeData] = useState([]);


    async function playGroundInput(usernamesData) {
        setIsFetchedFromApi(false);
        console.log('usernamesData: ', usernamesData);
        let onlyUsernames = usernamesData;
        delete onlyUsernames.nameOfUser;
        if (!isCodeChefSelected)
            delete onlyUsernames.Codechef;
        if (!isCodeforcesSelected)
            delete onlyUsernames.Codeforces;
        if (!isLeetcodeSelected)
            delete onlyUsernames.Leetcode;
        if (!isSpojSelected)
            delete onlyUsernames.Spoj;
        if (!isAtCoderSelected)
            delete onlyUsernames.Atcoder;
        console.log('onlyUsernames: ', onlyUsernames);
        let params = new URLSearchParams(onlyUsernames).toString().toLowerCase();
        console.log('params: ', params);
        let res = await fetch(`https://cpplayground.vercel.app/all?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        console.log('data: ', data);
        setCodechefData(data.codechef);
        setLeetcodeData(data.leetcode);
        setIsSubmitted(true);
        setIsFetchedFromApi(true);
    }

    async function onCheckChange(e) {
        console.log(e.target.value);
        if (e.target.value === 'Codechef') {
            setIsCodeChefSelected(!isCodeChefSelected);
        }
        if (e.target.value === 'Codeforces') {
            setIsCodeforcesSelected(!isCodeforcesSelected);
        }
        if (e.target.value === 'Leetcode') {
            setIsLeetcodeSelected(!isLeetcodeSelected);
        }
        if (e.target.value === 'Spoj') {
            setIsSpojSelected(!isSpojSelected);
        }
        if (e.target.value === 'Atcoder') {
            setIsAtCoderSelected(!isAtCoderSelected);
        }
    }


    return (
        <div className='m-3'>
            <form onSubmit={handleSubmit(playGroundInput)} className="max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md">
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Competitive Programming Report</h1>
                <div className="mb-2 pr-2">
                    <label htmlFor="nameOfUser" className="labelText">Your Name</label>
                    <input type="text" id="nameOfUser" placeholder='Name' className='textInputBox' {...register('nameOfUser')} />
                </div>
                {/* Select which platform to display */}
                <div className='flex gap-1 flex-col mb-2'>
                    <label className="labelText">Select Platforms</label>
                    <div className='flex gap-1 flex-col mb-2 rounded-lg border border-1 shadow-sm p-1'>

                        <div
                            className={
                                `flex flex-row gap-2 items-center rounded-sm  px-2 `
                            }
                        >
                            <input
                                type="checkbox"
                                id="Codechef"
                                value="Codechef"
                                onChange={onCheckChange}
                                checked={isCodeChefSelected}
                            />
                            <label htmlFor="Codechef">Codechef</label>
                        </div>
                        <div
                            className={
                                `flex flex-row gap-2 items-center px-2 `
                            }
                        >
                            <input
                                type="checkbox"
                                id="Codeforces"
                                value="Codeforces"
                                onChange={onCheckChange}
                                checked={isCodeforcesSelected}

                            />
                            <label htmlFor="Codeforces">Codeforces</label>
                        </div>
                        <div
                            className={
                                `flex flex-row gap-2 items-center px-2 `
                            }
                        >
                            <input
                                type="checkbox"
                                id="Leetcode"
                                value="Leetcode"
                                onChange={onCheckChange}
                                checked={isLeetcodeSelected}

                            />
                            <label htmlFor="Leetcode">Leetcode</label>
                        </div>
                        <div
                            className={
                                `flex flex-row gap-2 items-center px-2 `
                            }
                        >
                            <input
                                type="checkbox"
                                id="Spoj"
                                value="Spoj"
                                onChange={onCheckChange}
                                checked={isSpojSelected}

                            />
                            <label htmlFor="Spoj">Spoj</label>
                        </div>
                        <div
                            className={
                                `flex flex-row gap-2 items-center px-2 `
                            }
                        >
                            <input
                                type="checkbox"
                                id="Atcoder"
                                value="Atcoder"
                                onChange={onCheckChange}
                                checked={isAtCoderSelected}
                            />
                            <label htmlFor="Atcoder">Atcoder</label>
                        </div>

                    </div>
                </div>
                {/* Inputs for the platform usernames */}
                <div className='mb-2 flex flex-wrap'>
                    {
                        isCodeChefSelected && (
                            <div className="mb-1 w-full md:w-1/2 px-1">
                                <label htmlFor="inputCodechef" className="labelText">Codechef Username</label>
                                <input
                                    type="text"
                                    id="inputCodechef"
                                    placeholder='Codechef Username'
                                    className='textInputBox' {...register('Codechef')}
                                />
                            </div>
                        )
                    }
                    {
                        isCodeforcesSelected && (
                            <div className="mb-1 w-full md:w-1/2 px-1">
                                <label htmlFor="inputCodeforces" className="labelText">Codeforces Username</label>
                                <input
                                    type="text"
                                    id="inputCodeforces"
                                    placeholder='Codeforces Username'
                                    className='textInputBox' {...register('Codeforces')}
                                />
                            </div>
                        )
                    }
                    {
                        isLeetcodeSelected && (
                            <div className="mb-1 w-full md:w-1/2 px-1">
                                <label htmlFor="inputLeetcode" className="labelText">Leetcode Username</label>
                                <input
                                    type="text"
                                    id="inputLeetcode"
                                    placeholder='Leetcode Username'
                                    className='textInputBox' {...register('Leetcode')}
                                />
                            </div>
                        )
                    }
                    {
                        isSpojSelected && (
                            <div className="mb-1 w-full md:w-1/2 px-1">
                                <label htmlFor="inputSpoj" className="labelText">Spoj Username</label>
                                <input
                                    type="text"
                                    id="inputSpoj"
                                    placeholder='Spoj Username'
                                    className='textInputBox' {...register('Spoj')}
                                />
                            </div>
                        )
                    }
                    {
                        isAtCoderSelected && (
                            <div className="mb-1 w-full md:w-1/2 px-1">
                                <label htmlFor="inputAtcoder" className="labelText">Atcoder Username</label>
                                <input
                                    type="text"
                                    id="inputAtcoder"
                                    placeholder='Atcoder Username'
                                    className='textInputBox' {...register('Atcoder')}
                                />
                            </div>
                        )
                    }
                </div>

                <button
                    type="submit"
                    className={
                        `w-full  font-semibold py-2 px-4 rounded-md
                        transition duration-700 ease-in-out text-white 
                        hover:bg-blue-600 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 
                        ${!isFetchedFromApi ? 'cursor-not-allowed bg-blue-300' : 'cursor-pointer bg-blue-500'}`
                    }

                >
                    Submit
                </button>
            </form>

            {
                !isFetchedFromApi && <div className='flex flex-row justify-center'><Loading></Loading></div>
            }
            {
                (isSubmitted && isFetchedFromApi) && 
                isCodeChefSelected &&
                <CodechefChart codechefData={codechefData} />
            }
            {
                (isSubmitted && isFetchedFromApi) && 
                isLeetcodeSelected &&
                <LeetcodeChart leetcodeData={leetcodeData} />
            }
        </div>
    );
};

export default PlayGround;