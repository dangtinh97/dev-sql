import API from "../configs/API";


const getSong=async ()=>{
    let response=null;
    const axios = require('axios');
   await axios.get(API.RANDOM_SONG+'?limit=35').then((data)=>{
        response = data.data;
    }).catch(function (error) {
        console.log(error);
    });
   return response;
}

const searchLink=async (key)=>{
    let response=null;
    const axios = require('axios');
    await axios.get(API.SEARCH_KEY+'?key='+key).then((data)=>{
        response = data.data;
    }).catch(function (error) {
        response = {
            success:false,
            content:'Không thể kết nối server',
            data:{}
        }
        console.log(error);
    });
    return response;
}

const search=async (key)=>{
    let response=null;
    const axios = require('axios');
    await axios.get(API.SEARCH_SONG+'?q='+key).then((data)=>{
        response = data.data;
    }).catch(function (error) {
        response = {
            success:false,
            content:'Không thể kết nối server',
            data:{}
        }
        console.log(error);
    });
    return response;
}

const getLyric=async (key)=>{
    let response=null;
    const axios = require('axios');
    await axios.get('https://m.zingmp3.vn/xhr/lyrics/get-lyrics?media_id='+key).then((data)=>{
        response = data.data;
    }).catch(function (error) {
        response = {
            success:false,
            content:'Không thể kết nối server',
            data:{}
        }
        console.log(error);
    });
    return response;
}

export const MusicService= {
    getSong,
    searchLink,
    search,
    getLyric,
}
