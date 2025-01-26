export async function verifyUser(token){
    if (!token) {
        console.log("Token not provided");
        return {
            isAuthenticated: false,
            token: null,
            username: null,
            role: null,
        };
    }
    try {
        const response = await fetch('http://localhost:4000/v2/auth/verify', {
        // const response = await fetch('https://v2contestinfo.onrender.com/v2/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            return {
                isAuthenticated: false,
                token: null,
                username: null,
                role: null,
            };
        }
        const data = await response.json();
        if(data.error){
            return {
                isAuthenticated: false,
                token: null,
                username: null,
                role: null,
            };
        }
        return {
            isAuthenticated: true,
            token: token,
            username: data.username,
            role: data.role,
        }
    } catch (err) {
        
        console.log(err.message || "Error verifying token");
        return {
            isAuthenticated: false,
            token: null,
            username: null,
            role: null,
        };
    }
}