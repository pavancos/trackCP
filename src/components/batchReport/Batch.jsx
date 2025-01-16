import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading';
import { useState } from 'react';
import { filterBatch } from './BatchUtil';
import BatchTable from './BatchTable';
import { set } from 'react-ga';

function Batch() {
    const { year, branch } = useParams();
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState(null);
    const [batchData, setBatchData] = useState(null);
    const [title, setTitle] = useState('');
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let query = '';
                if(year === 'all' || year===undefined){
                    if(branch === 'all'|| branch===undefined){
                        query = '';
                        setTitle('PVPSIT');
                    }else if(branch){
                        query = `/branch?branch=${branch}`;
                        setTitle(branch);
                    }
                }else{
                    if(branch === 'all' || branch===undefined){
                        query = `/year?year=${year}`;
                        setTitle(year);
                    }else if(branch){
                        setTitle(`${year} - ${branch}`);
                        query = `/yearBranch?year=${year}&branch=${branch}`;
                    }
                }
                // const response = await fetch(`http://localhost:4000/v2/batch${query}`,{
                const response = await fetch(`https://v2contestinfo.onrender.com/v2/batch${query}`,{
                    method: 'GET'
                });
                if(!response.ok){
                    throw new Error("Batch Not Found");
                }
                const data = await response.json();
                setBatchData(filterBatch(data));
                console.log(data);
            }catch(err){
                console.log(err);
            }finally{
                console.log("Batch Fetched");
                setIsFetched(true);
            }
        }
        fetchData();
    },[])
    if(!isFetched){
        return (
            <div className="w-full flex flex-row justify-center">
                <Loading />
            </div>
        );
    }
    return (
        <div>
            <h1 className='text-2xl font-bold text-center my-4'>{title}</h1>
            { batchData &&  <BatchTable data={batchData}></BatchTable>}
        </div>
    )
}

export default Batch