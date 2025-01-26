export async function addAdminHandler( username, password, role, token ) {    
    // console.log('token: ', token);
    try {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // const response = await fetch('http://localhost:4000/v2/dev/newAdmin',{
        const response = await fetch('https://v2contestinfo.onrender.com/v2/dev/newAdmin', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                username,
                password,
                role
            })
        });
        let data = await response.json();
        if(data.error){
            return {
                error: true,
                message: data.message
            }
        }else{
            return {
                error: false,
                message: `${role} Added Successfully`
            }
        }
    } catch (err) {
        console.error(err);
        return {
            error: true,
            message: err.message
        }
    }
}

export async function addStudent(student, year, branch, token){
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // const response = await fetch('http://localhost:4000/v2/admin/newStudent',{
        const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/newStudent',{
            method: 'POST',
            headers,
            body: JSON.stringify({
                student,
                year,
                branch
            })
        });
        let data = await response.json();
        if(data.error){
            return {
                error: true,
                message: data.message
            }
        }
        return {
            error: false,
            message: "Student Added Successfully",
            student: data.student
        }
    }catch(err){
        console.error(err);
        return {
            error: true,
            message: err.message
        }
    }
}

export async function updateStudent(student, year, branch, token){
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // const response = await fetch('http://localhost:4000/v2/admin/updateStudent',{
        const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/updateStudent',{
            method: 'POST',
            headers,
            body: JSON.stringify({
                student,
                year,
                branch
            })
        });
        let data = await response.json();
        if(data.error){
            return {
                error: true,
                message: data.message
            }
        }
        return {
            error: false,
            message: "Student Updated Successfully",
            student: data.student
        }
    }catch(err){
        console.error(err);
        return {
            error: true,
            message: err.message
        }
    }
}

export async function deleteStudent(rollNo,year,branch,token){
    try{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // const response = await fetch('http://localhost:4000/v2/admin/deleteStudent',{
        const response = await fetch('https://v2contestinfo.onrender.com/v2/admin/deleteStudent',{
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                rollNo,
                year,
                branch
            })
        });
        let data = await response.json();
        if(data.error){
            return {
                error: true,
                message: data.message
            }
        }
        return {
            error: false,
            message: "Student Deleted Successfully",
            student: data.student
        }
    }
    catch(err){
        console.error(err);
        return {
            error: true,
            message: err.message
        }
    }

}

