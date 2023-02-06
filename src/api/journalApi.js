
import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://backe-vuefirebase-default-rtdb.firebaseio.com",
});

export default journalApi;