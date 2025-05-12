import { BE_VM } from "../../config";
export async function getBatches(token) {
    try {
        // const response = await fetch('http://localhost:4000/v2/admin/batches', {
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/batches', {
        const response = await fetch(`${BE_VM}/v2/admin/batches`, {
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
        throw new Error("Batch Not Found");
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
        const response = await fetch(`${BE_VM}/v2/admin/students`, {
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
            const response = await fetch(`${BE_VM}/v2/admin/refreshStudent`, {
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
export async function getViews() {
    try {
        const response = await fetch(`${BE_VM}/v2/batch/views`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok && response.status !== 404) {
            throw new Error("Views Not Found");
        }
        if (response.status === 404) {
            return {
                error: false,
                message: "No Views Found",
                views: []
            };
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function addView(name,rollNumbers,token){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    // const res = await fetch('https://v2contestinfo.onrender.com/v2/admin/newView',{
    const res = await fetch(`${BE_VM}/v2/admin/newView`,{
        method: 'POST',
        headers,
        body: JSON.stringify({ name, rollNumbers })
    })
    const data = await res.json();
    if(data.error){
        return {
            error: true,
            message: "Something went wrong"
        };
    }
    return {
        error: false,
        message: "View Added Successfully"
    };
}
export async function removeStudentsFromView(name,rollNumbers,token){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const res = await fetch(`${BE_VM}/v2/admin/removeStudentsFromView`,{
        method: 'POST',
        headers,
        body: JSON.stringify({ name, rollNumbers })
    })
    const data = await res.json();
    if(data.error){
        return {
            error: true,
            message: "Something went wrong"
        };
    }
    return {
        error: false,
        message: "Students removed from View"
    };
}
export async function addStudentsToView(name,rollNumbers,token){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const res = await fetch(`${BE_VM}/v2/admin/addStudentsToView`,{
        method: 'POST',
        headers,
        body: JSON.stringify({ name, rollNumbers })
    })
    const data = await res.json();
    if(data.error){
        return {
            error: true,
            message: "Something went wrong"
        };
    }
    return {
        error: false,
        message: "Students added to View"
    };
}


export async function getViewStudents(name, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        // const response = await fetch('http://localhost:8000/v2/admin/viewStudents', {
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/viewStudents', {
        const response = await fetch(`${BE_VM}/v2/admin/viewStudents`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name })
        });
        if (!response.ok) {
            throw new Error("View Not Found");
        }
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

export async function fullRefresh(token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        const response = await fetch(`${BE_VM}/v2/admin/fullRefresh`, {
            method: 'POST',
            headers
        });
        if (!response.ok) {
            throw new Error("Full Refresh Failed");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Full Refresh Failed"
        };
    }
}


export async function refreshView(viewName,token){
    // console.log('viewName: ', viewName);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        const response = await fetch(`${BE_VM}/v2/admin/refreshView`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name:viewName })
        });
        if (!response.ok) {
            throw new Error("Refresh for the view Failed");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Refresh View Failed"
        };
    }
    
}

export async function addStudentsJson(year,branch,studentsList,token){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    // console.log("Hello");
    try {
        const response = await fetch(`${BE_VM}/v2/admin/newStudents`, {
        // const response = await fetch(`https://8z236w0s-8000.inc1.devtunnels.ms/v2/admin/newStudents`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ year:year,branch:branch,students:studentsList })
        });
        if (!response.ok) {
            throw new Error("Adding Students failed");
        }
        const data = await response.json();
        console.log('data: ', data);
        return data;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Adding Students failed"
        };
    }
    
}