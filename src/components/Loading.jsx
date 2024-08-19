import React from 'react';
import './Loading.css';

export default function Loading() {
    return (
        <>
            <div className='bg-blue-400 rounded-full p-2 m-4 blink'></div>
            <div className='bg-blue-400 rounded-full p-2 m-4 blink'></div>
            <div className='bg-blue-400 rounded-full p-2 m-4 blink'></div>
        </>
    );
}