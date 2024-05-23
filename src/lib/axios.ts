import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:5000/api/" });

// export const staticFilesServer = axios.create({
//     baseURL: "http://localhost:5000/static/",
// });

export const staticFilesServer = "http://localhost:5000/static/";
