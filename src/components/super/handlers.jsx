export async function getBatches(token) {
    try {
        // const response = await fetch('http://localhost:4000/v2/admin/batches', {
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/batches', {
        const response = await fetch('https://contestinfov2.vercel.app/v2/admin/batches', {
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

export async function getStudents(year, branch, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        // const response = await fetch('http://localhost:4000/v2/admin/students',{
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/students', {
        const response = await fetch('https://contestinfov2.vercel.app/v2/admin/students', {
            method: 'POST',
            headers,
            body: JSON.stringify({ year, branch })
        });
        const res = await response.json();
        if (res.error) {
            return {
                error: true,
                message: "Something went wrong"
            };
        }

        return res;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Something went wrong"
        };
    }
}

export async function refreshStudent(rollNo, year, branch, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        // const response = await fetch('http://localhost:4000/v2/admin/refreshStudent',{
        const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/refreshStudent', {
            method: 'PUT',
            headers,
            body: JSON.stringify({ rollNo, year, branch })
        });
        const res = await response.json();
        if (res.error) {
            return {
                error: true,
                message: "Something went wrong"
            };
        }

        return {
            error: false,
            message: `Student ${rollNo} Refreshed Successfully`
        };
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Something went wrong"
        };
    }
}