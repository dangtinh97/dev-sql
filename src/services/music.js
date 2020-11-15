import API from "../configs/API";


let getSong=async ()=>{
    let response=null;
    const axios = require('axios');
   await axios.get(API.RANDOM_SONG+'?limit=35').then((data)=>{
        response = data.data;
    }).catch(function (error) {
        console.log(error);
    });
   return response;
}

let searchLink=async (key)=>{
    let response=null;
    const axios = require('axios');
    await axios.get(API.SEARCH_KEY+'?key='+key).then((data)=>{
        response = data.data;
    }).catch(function (error) {
        console.log(error);
    });
    return response;
}

export const MusicService= {
    getSong,
    searchLink
}
