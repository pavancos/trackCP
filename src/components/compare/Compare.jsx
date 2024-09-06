// import React from 'react'
// import Play from '../playground/Play'
// import { useForm } from 'react-hook-form'
// import { useState, useEffect } from 'react'

// const Compare = () => {
//     const { register, handleSubmit } = useForm();
//     const [noOfUser, setNoOfUser] = useState(2);
//     function CompareInput({ noOfUser }) {
//         console.log('noOfUsers: ', noOfUser);
//         setNoOfUser(Number(noOfUser));
//     }
//     return (
//         <>
//             <div className='max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md '>
//                 <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
//                     Compare
//                 </h1>
//                 <div className="mb-2 pr-2">
//                     <form onSubmit={handleSubmit(CompareInput)}  >
//                         <label className='labelText' htmlFor="noOfUsers">
//                             Number of Users
//                         </label>
//                         <input className='textInputBox' type="number" id="noOfUsers" {...register("noOfUser")} defaultValue={2} />
//                         <button className='btnSubmit' type="submit">Compare</button>
//                     </form>
//                 </div>
//             </div>
//             <div className=" overflow-x-auto">
//                 <div className='whitespace-nowrap'>
//                     <div className='flex flex-row'>
//                         {
//                             Array.from({ length: noOfUser }).map((_,index) => {
//                                return <Play key={index} />
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>

//     )
// }

// export default Compare
import React, { useState } from 'react';
import Play from '../playground/Play';
import { useForm } from 'react-hook-form';

const Compare = () => {
    const { register, handleSubmit } = useForm();
    const [playComponents, setPlayComponents] = useState([<Play key={0} sno={0}/>, <Play key={1} sno={1} />]); // start with one Play component

    function CompareInput(data) {
        const { noOfUser } = data;
        const newNoOfUsers = Number(noOfUser);

        if (newNoOfUsers > playComponents.length) {
            const newComponents = [...playComponents];
            for (let i = playComponents.length; i < newNoOfUsers; i++) {
                newComponents.push(<Play key={i} sno={i} />);
            }
            setPlayComponents(newComponents);
        } else if (newNoOfUsers < playComponents.length) {
            setPlayComponents(playComponents.slice(0, newNoOfUsers));
        }
    }

    return (
        <>
            <div className='max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md '>
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
                    Compare
                </h1>
                <div className="mb-2 pr-2">
                    <form onSubmit={handleSubmit(CompareInput)}  >
                        <label className='labelText' htmlFor="noOfUsers">
                            Number of Users
                        </label>
                        <input
                            className='textInputBox'
                            type="number"
                            id="noOfUsers"
                            {...register("noOfUser")}
                            min={2}
                            max={10}
                            defaultValue={playComponents.length}
                        />
                        <button className='btnSubmit' type="submit">Compare</button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className='whitespace-nowrap'>
                    <div className='flex flex-row sm:justify-evenly'>
                        {playComponents}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Compare;
