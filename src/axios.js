import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;
// there might be only one default export in one file.
// instance.get('/foo-bar) 
// ==> https://api.themoviedb.org/3/foo-bar
