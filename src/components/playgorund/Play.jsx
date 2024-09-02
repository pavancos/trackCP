import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import CodechefChart from '../Charts/CodechefChart';
import LeetcodeChart from '../Charts/LeetcodeChart';
import CodeforcesChart from '../Charts/CodeforcesChart';
import AtcoderChart from '../Charts/AtcoderChart';
import Loading from '../Loading';
import toast from 'react-hot-toast';

const Play = () => {
    const { register, handleSubmit } = useForm();
    const [nameOfUser, setNameOfUser] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState({
        Codechef: true,
        Leetcode: true,
        Codeforces: true,
        Atcoder: true,
    });
    const [platformData, setPlatformData] = useState({
        codechef: null,
        leetcode: null,
        codeforces: null,
        atcoder: null,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFetchedFromApi, setIsFetchedFromApi] = useState(true);
    const [isAnyChange, setIsAnyChange] = useState(false);

    const platforms = [
        { id: 'Codechef', component: CodechefChart, dataState: 'codechefData' },
        { id: 'Leetcode', component: LeetcodeChart, dataState: 'leetcodeData' },
        { id: 'Codeforces', component: CodeforcesChart, dataState: 'codeforcesData' },
        { id: 'Atcoder', component: AtcoderChart, dataState: 'atcoderData' },
    ];

    const putToast = (platform) => {
        toast.error(`Enter your ${platform} username`, {
            style: {
                marginTop: '-10px',
                marginBottom: '10px',
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
            iconTheme: {
                primary: '#333',
                secondary: '#fff',
            },
            icon: '🧐',
        });
    };
    const putNothingToast = () => {
        toast.error(`Select atleast one!`, {
            style: {
                marginTop: '-10px',
                marginBottom: '10px',
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
            iconTheme: {
                primary: '#333',
                secondary: '#fff',
            },
            icon: '🧐',
        });
    };

    const togglePlatform = (platform) => {
        setSelectedPlatforms((prev) => ({
            ...prev,
            [platform]: !prev[platform],
        }));
        setIsAnyChange(true);
    };

    const playGroundInput = async (usernamesData) => {
        setIsFetchedFromApi(false);
        setNameOfUser(usernamesData.nameOfUser);
        
        

        const filteredUsernames = { ...usernamesData };
        delete filteredUsernames.nameOfUser;

        // Filter out unselected platforms
        // Filter out unselected platforms
        Object.keys(selectedPlatforms).forEach((platform) => {
            if (!selectedPlatforms[platform]) {
                delete filteredUsernames[platform];
            } else if (!filteredUsernames[platform]) {
                // If the username is empty, skip this platform and show a toast
                setPlatformData((prev) => ({ ...prev, [platform.toLowerCase()]: null }));
                putToast(platform);
            }
        });
        console.log(selectedPlatforms);
        

        let params = new URLSearchParams(filteredUsernames).toString().toLowerCase();
        console.log(typeof(params))
        if(params.length === 0){
            putNothingToast();
            setIsFetchedFromApi(true);
            return;
        }
        
        try {
            let res = await fetch(`https://cpplayground.vercel.app/all?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('No Respone From server');
            let data = await res.json();
            console.log('data: ', data);

            // Set platform data
            setPlatformData({
                codechef: data.codechef || null,
                leetcode: data.leetcode || null,
                codeforces: data.codeforces || null,
                atcoder: data.atcoder || null,
            });
            setIsSubmitted(true);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setIsFetchedFromApi(true);
        }
    };

    const onCheckChange = (e) => {
        // setIsAnyChange(true);
        togglePlatform(e.target.value);
        setIsSubmitted(false);
    };

    return (
        <div className="m-3">
            <form
                onSubmit={handleSubmit(playGroundInput)}
                className="max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md"
            >
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
                    Competitive Programming Report
                </h1>
                <div className="mb-2 pr-2">
                    <label htmlFor="nameOfUser" className="labelText">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="nameOfUser"
                        placeholder="Name"
                        className="textInputBox"
                        {...register('nameOfUser')}
                    />
                </div>

                {/* Select platforms */}
                <div className="flex gap-1 flex-col mb-2">
                    <label className="labelText">Select Platforms</label>
                    <div className="flex gap-1 flex-row mb-2 flex-wrap sm:flex-nowrap rounded-lg border border-1 shadow-sm p-1">
                        {
                            platforms.map((plat) => {
                                return (
                                    <div key={plat.id} className="flex w-1/2 flex-row gap-2 items-center px-2">
                                        <input
                                            type="checkbox"
                                            id={plat.id}
                                            value={plat.id}
                                            onChange={onCheckChange}
                                            checked={selectedPlatforms[plat.id]}
                                        />
                                        <label htmlFor={plat.id}>{plat.id}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="mb-2 flex flex-wrap">
                    {
                        platforms.map((plat) => {
                            return (
                                selectedPlatforms[plat.id] &&
                                <div key={plat.id} className="mb-1 w-full md:w-1/2 px-1">
                                    <label htmlFor={`input${plat.id}`} className="labelText">{plat.id} Username</label>
                                    <input
                                        type="text"
                                        id={`input${plat.id}`}
                                        placeholder={`${plat.id} Username`}
                                        className="textInputBox"
                                        {...register(plat.id)}
                                        onChange={() => setIsAnyChange(true)}
                                        required={selectedPlatforms[plat.id]}
                                    />
                                </div>
                            )
                        })

                    }
                </div>

                <button
                    type="submit"
                    disabled={!isFetchedFromApi}
                    className={`w-full font-semibold py-2 px-4 rounded-md
                        transition duration-700 ease-in-out text-white
                        focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-blue-500
                        ${!isFetchedFromApi ? 'cursor-not-allowed bg-blue-300' : 'cursor-pointer bg-blue-500 hover:bg-blue-600'}`}
                >
                    Submit
                </button>
            </form>

            {/* Show loading spinner while data is being fetched */}
            {!isFetchedFromApi && <div className="flex flex-row justify-center"><Loading /></div>}
            {
                isSubmitted && isFetchedFromApi &&
                <h1 className='text-4xl font-semibold text-blue-500 text-center'>Hello {nameOfUser}!</h1>
    }

            {/* Render charts for platforms */}
            {isSubmitted && isFetchedFromApi && (
                <>
                    {platforms.map((plat) => (
                        selectedPlatforms[plat.id] &&
                        platformData[plat.id.toLowerCase()] &&
                        Object.keys(platformData[plat.id.toLowerCase()]).length > 0 && (
                            <plat.component
                                key={plat.id}
                                {...{ [plat.dataState]: platformData[plat.id.toLowerCase()] }}
                            />
                        )
                    ))}

                </>
            )}
        </div>
    );
};

export default Play;

