export async function addAdminHandler( username, password, role, token ) {    
    console.log('token: ', token);
    try {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await fetch('http://localhost:4000/v2/dev/newAdmin',{
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/dev/newAdmin', {
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