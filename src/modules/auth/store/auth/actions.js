// export const myactions = async()=>{}

import authapi from '@/api/authApi';

// export default myactions

export const createUser = async( {commit},user )=>{

    const {email, password, name} = user;

    try {
        const {data} = await authapi.post(':signUp', {
            email,
            password,
            returnSecureToken: true
        });
        console.log(data);
        const {idToken, refreshToken } = data;
        const resp = await authapi.post(':update', {
            displayName: name,
            idToken
        });
        console.log(resp);
        delete user.password;
        commit('loginUser', {user, idToken, refreshToken});

        return {ok: true, message: 'User created successfully'}


    } catch (error) {
       
        return {ok: false, message: error.response.data.error.message}
    }
    
}
export const SignInUser = async( {commit},user )=>{

    const {email, password} = user;

    try {
        const {data} = await authapi.post(':signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        });
        console.log(data);
        const {idToken, refreshToken,displayName } = data;
        user.name = displayName;
        commit('loginUser', {user, idToken, refreshToken});

        return {ok: true, message: 'User Login successfully'}


    } catch (error) {
       
        return {ok: false, message: error.response.data.error.message}
    }
    
}

export const checkAuth = async({commit})=>{
    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');
    //const user = JSON.parse(localStorage.getItem('user'));

    if(!idToken){
        commit('logoutUser');
        return {ok: false, message: 'No token found'}
    }
    try {
        const {data} = await authapi.post(':lookup', {
            idToken
        });
        //console.log(data);
        const {displayName, email} = data.users[0];
        const user = {name: displayName, email};
        commit('loginUser', {user, idToken, refreshToken});

        return {ok: true, message: 'User Login successfully'}
    } catch (error) {
        commit('logoutUser');
        return {ok: false, message: error.response.data.error.message}
    }
}

