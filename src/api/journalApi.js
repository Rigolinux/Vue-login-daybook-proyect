
import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://backe-vuefirebase-default-rtdb.firebaseio.com",
});

journalApi.interceptors.request.use((config) => {
    const auth = localStorage.getItem("idToken");
    config.params = {
        auth
    }
    return config;
});

export default journalApi;