// Required for Jest tests.

require("dotenv").config();
import axios from "axios";
import data from "./genres.js";


module.exports = {
    appRenders: () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    },
    returnTrue: () => true,
    getRequest: () => {
        // Requesting data from API.
        let axiosPromise = axios.get(`${process.env.API_URL}?api_key=${process.env.API_KEY}`).then(response => res.status(200).json(response.data.results))
     
        // Returning response to check if data type is an Object.
        return(typeof axiosPromise);
    },
    getNowPlaying: () => {
        // Requesting data from API.
        let axiosPromise= axios.get(`${process.env.API_URL}?api_key=${process.env.API_KEY}`).then(response => res.status(200).json(response.data.results))
     
        // Checks response to see if data is actually returned by checking length of results array.
        return(axiosPromise.length);
    },
    getGenres: () => {
        return data.genres.length;
    }
}