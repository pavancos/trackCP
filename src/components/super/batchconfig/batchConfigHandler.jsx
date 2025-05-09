import { BE_VM } from "../../../config";
export async function deleteBatch(year, branch, token){
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // let res = await fetch("http://localhost:4000/v2/admin/deleteBatch",{
        let res = await fetch(`${BE_VM}/v2/admin/deleteBatch`,{
            method:'DELETE',
            headers,
            body: JSON.stringify({
                year,
                branch
            })
        });
        let data = await res.json();
        return {
            error:false,
            message:`${year}-${branch} batch deleted successfully`
        }
    }
    catch(err){
        return {
            error:true,
            message:err.message
        }
    }
}

export async function refreshBatch(year, branch, token){
    console.log('branch: ', branch);
    console.log('year: ', year);
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        let res = await fetch(`${BE_VM}/v2/admin/batchRefreshByBatch`,{
            method:'POST',
            headers,
            body: JSON.stringify({
                year,
                branch
            })
        });
        let data = await res.json();
        console.log('data: ', data);
        return {
            error:false,
            message:`${year}-${branch} batch refresh Started`
        }
    }
    catch(err){
        return {
            error:true,
            message:err.message
        }
    }
}