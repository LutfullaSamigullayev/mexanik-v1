import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://0e84bcd063294f11.mokky.dev",
    cache: false,
})