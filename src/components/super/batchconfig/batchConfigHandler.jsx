export async function deleteBatch(year, branch, token){
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        let res = await fetch("http://localhost:4000/v2/admin/deleteBatch",{
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