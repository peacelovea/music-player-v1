import { getAudioInfo, getAudioLyric } from '@/service/api'

export default {
    actions: {
        async getPlayerMusicData(context, musicId) {
            const musicData = {
                musicId,
                musicSrc: `https://music.163.com/song/media/outer/url?id=${musicId}`,
                isPlay: true
            }
            await context.dispatch('getMusicSrc', musicId)
            await context.dispatch('getlyric', musicId)
            context.commit('GET_PLAYER_MUSIC_DATA', musicData)
        },
        // 获取播放地址
        async getMusicSrc(context, values) {
            let songsData = {}
            await getAudioInfo(values).then(
                (res) => songsData = res.songs[0]
            )
            context.commit('GET_SONG_DATA', songsData)
        },
        // 获取歌词
        async getlyric(context, values) {
            let musicLyric = {}
            await getAudioLyric(values).then(
                (res) => musicLyric = res.lrc.lyric
            )
            context.commit('GET_SONG_LYRIC', musicLyric)
        },
        // 更新播放列表
        changePlayList(context, values) {
            context.commit('CHANGE_PLAY_LIST', values)
        }
    },
    mutations: {
        GET_PLAYER_MUSIC_DATA(state, values) {
            // state.playerMusicData = values
            state.playerMusicData.musicId = values.musicId
            state.playerMusicData.musicSrc = values.musicSrc
            state.playerMusicData.isPlay = values.isPlay
            console.log(JSON.parse(JSON.stringify(state.playerMusicData)));
            localStorage.setItem('playerMusicData', JSON.stringify(state.playerMusicData))
        },
        GET_SONG_DATA(state, values) {
            state.playerMusicData.songsData = values
            localStorage.setItem('playerMusicData', JSON.stringify(state.playerMusicData))
        },
        GET_SONG_LYRIC(state, values) {
            state.playerMusicData.musicLyric = values
            localStorage.setItem('playerMusicData', JSON.stringify(state.playerMusicData))
        },
        CHANGE_ISPlAY(state, values) {
            console.log(values);
            state.playerMusicData.isPlay = values
            console.log(state.playerMusicData.isPlay);
            localStorage.setItem('playerMusicData', JSON.stringify(state.playerMusicData))
        },
        CHANGE_LAST_RECOMMENDLIST_ID(state, values) {
            state.playerMusicData.lastRecommendListId = values
            localStorage.setItem('lastRecommendListId', JSON.stringify(state.playerMusicData.lastRecommendListId))
        },
        CHANGE_PLAY_LIST(state, values) {
            console.log(values);
            state.playList = values
            console.log(state.playList);
            localStorage.setItem(
                "playList",
                JSON.stringify(values)
            );
        },
        // CHANGE_MUSIC_ID(state,value){
        //     console.log('changemid',value);


        // }
    },
    state: {
        playerMusicData: {
            musicId: JSON.parse(localStorage.getItem('playerMusicData')).musicId,
            musicSrc: JSON.parse(localStorage.getItem('playerMusicData')).musicSrc,
            isPlay: JSON.parse(localStorage.getItem('playerMusicData')).isPlay,
            lastRecommendListId: JSON.parse(localStorage.getItem('playerMusicData')).lastRecommendListId,
            songsData: JSON.parse(localStorage.getItem('playerMusicData')).songsData,
            musicLyric: JSON.parse(localStorage.getItem('playerMusicData')).songsData.musicLyric
        },
        playList: JSON.parse(localStorage.getItem('playList'))
    },
}