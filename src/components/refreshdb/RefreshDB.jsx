import React, { useState } from 'react';
import Loading from '../Loading';

function RefreshDB() {
    const [isRefreshed, setIsRefreshed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function refreshDB() {
        setIsLoading(true);
        try {
            const response = await fetch(`https://contestinfo-m59t.onrender.com/data`);
            const data = await response.json();
            // console.log('data: ', data);
            setIsRefreshed(true);
        } catch (error) {
            console.error('Error refreshing database:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`flex flex-col items-center`}>
            <button
                onClick={refreshDB}
                className={`bg-blue-500 mt-5 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}
            >
                Scrape New Data
            </button>
            {isLoading ? (
                <div className='w-full flex flex-row justify-center'>
                    <Loading />
                </div>
            ) : (
                isRefreshed && (
                    <div className={`m-3`}>
                        <h1 className='text-green-600 font-semibold text-xl'>Scrapping has done Successfully</h1>
                    </div>
                )
            )}
        </div>
    );
}

export default RefreshDB;
