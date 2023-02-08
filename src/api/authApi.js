
import axios from "axios";

const authapi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params:{
        key: 'AIzaSyBX_nxXUJ0W8WjuBiXIWbFbJCBdMSweeaM'
    }
});

export default authapi;