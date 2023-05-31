import axios from "axios"
const baseUrl = "http://localhost:3000";

// 封装获取轮播图的api 调用例子
//封装获取轮播图的api调用例子:/banner，/banner?type=2 type=0,1,2,3

export function getBanner(type=0){
	return axios.get(`${baseUrl}/banner?type=${type}`);
	
}
export function getLimit(limit=10){
return axios.get(`${baseUrl}/personalized/?limit=${limit}`);
}
export function getMusicList(id){
return axios.get(`${baseUrl}/playlist/detail?id=${id}`);

}
export function getLyirc(id){
return axios.get(`${baseUrl}/lyric/?id=${id}`);

}
export function searchMusic(keywords){
return axios.get(`${baseUrl}/search?keywords=${keywords}`);

}
// import aaa from "index.js"
// import {aaa} from "index.js"
//对外抛出

export default {
	getBanner,
	getLimit,
	getMusicList,
	getLyirc,
	searchMusic
	
};