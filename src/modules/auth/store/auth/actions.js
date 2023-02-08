// export const myactions = async()=>{}

import authapi from '@/api/authApi';

// export default myactions

export const createUser = async( _,user )=>{

    const {email, password} = user;

    try {
        const {data} = await authapi.post(':signUp', {
            email,
            password,
            returnSecureToken: true
        });
        console.log(data);
        return {ok: true, message: 'User created successfully'}


    } catch (error) {
       
        return {ok: false, message: error.response.data.error.message}
    }
    
}

