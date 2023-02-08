
import axios from "axios";

const authapi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params:{
        key: 'your key is here :)'
    }
});

export default authapi;