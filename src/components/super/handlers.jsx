export async function getBatches(token) {
    try {
        const response = await fetch('http://localhost:4000/v2/admin/batches', {
            // const response = await fetch('https://v2contestinfo.onrender.com/v2/batches',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Batch Not Found");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}