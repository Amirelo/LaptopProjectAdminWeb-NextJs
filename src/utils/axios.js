import axios from "axios";

const url = "http://localhost/thuctaptn/views";

export const axiosInstance = axios.create({
    baseURL:url
})