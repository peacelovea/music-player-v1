import requests from "./requests";

// 获取轮播图数据
export const getBannerList = () => requests.get('/api/homepage/block/page')

// 获取歌单列表
export const getRecommendList = (recommendId) => requests.get(`/api/playlist/detail?id=${recommendId}`)

// 获取歌曲播放地址
// https://music.163.com/song/media/outer/url?id=${musicId}
// export const getAudioSrc = (musicId) => requests.get(`/163/song/media/outer/url?id=${musicId}`)

// 获得歌曲信息
export const getAudioInfo = (musicId) => requests.get(`/api/song/detail?ids=${musicId}`)

// /**
//  * @description: 获得歌词
//  * @param {*} musicId
//  * @return {*}
//  */
// export async function getAudioLyric(musicId) {
//     const result = Ajax(
//         { url: `/lyric?id=${musicId}`, }
//     );
//     return result;
// }
export const getAudioLyric = (musicId) => requests.get(`/api/lyric?id=${musicId}`)

