import api from './request.js'

// 获取轮播图,
var getBanner = () => api.get('/banner')

// 获取热门推荐分类
var getPlayList = () => api.get('/playlist/hot')

// 获取热门歌单
var getHotRecommed = ()=> api.get('/personalized?limit=8')

// 获取新碟上架，最新专辑，用在首页新碟上架和新碟上架页面的热门
var getAlbum = ()=> api.get('/album/newest')

// 获取所有榜单
var getToplist = ()=> api.get('/toplist')

// 获取榜单或歌单详情
var getListDetail = (params) => api.get('/playlist/detail',{
	params:params
})

// 获取热门歌手代替入驻歌手，暂时没找到入驻歌手api
var getHotArtists = params => api.get('/top/artists',{
	params:params
})

// 获取最热电台主播代替热门主播
var getDjPopular = () => api.get('/dj/toplist/popular?limit=5')

// 获取音乐url
var getSongUrl = (params) => api.get('/song/url/',{
	params:params
})

// 获取各类评论
var getPlaylistCom = (url,params) => api.get(`/comment${url}`,{
		params:params
	})

// 获取歌单
var getSongList = params => api.get('/top/playlist',{
	params:params
})

// 获取歌单分类
var getCatList = () => api.get('/playlist/catlist')

// 获取电台分类
var getDjCatelist = () =>api.get('/dj/catelist')

// 获取电台推荐节目
var getProgramRe = () => api.get('/program/recommend')

// 获取电台节目排行榜
var getProgramTop = params => api.get('/dj/program/toplist',{
	params:params
})

// 获取电台分类推荐
var getDjCateRe = () => api.get('/dj/category/recommend')

// 获取全部新碟
var getAllAlbum = params => api.get('/album/new',{
	params:params
})

// 获取专辑详情，非数字专辑
var getAlbumById = params => api.get('/album',{
	params:params
})

// 获取歌曲详情
var getSongDetail = params => api.get('/song/detail',{
	params:params
})

// 获取歌词
var getSongLyric = params => api.get('/lyric',{
	params:params
})

// 手机号登录
var loginByphone = data => api.post('/login/cellphone',data)

// 退出
var logout = () => api.get('/logout')

// 获取用户信息
var getUserDetail = params =>api.get('/user/detail',{
	params:params
})

// 获取用户信息，歌单，收藏，mv,dj数量
var getUserCount = () => api.get('/user/subcount')

// 获取每日推荐歌单
var getRecommendRe = () => api.get('/recommend/resource')

// 获取每日推荐歌曲
var getRecommendSong = () => api.get('/recommend/songs')

// 签到
var signDay = () => api.get('/daily_signin?type=1')

// 获取优秀新电台，即电台分类推荐
var getDjRebytype = params => api.get('/dj/recommend/type',{
	params:params
})

// 获取类别热门电台来充当电台排行
var getDjHotBycate = params => api.get('/dj/radio/hot',{
	params:params
})

// 获取电台详情
var getDjDetail = params => api.get('/dj/detail',{
	params:params
})

// 获取电台节目
var getDjPrograms = params => api.get('/dj/program',{
	params:params
})

// 获取电台节目详情
var getDjProgramDetail = params => api.get('/dj/program/detail',{
	params:params
})

// 获取个性化推荐
var getPersonRe = () => api.get('/recommend/resource')

// 获取私信通知
var getMsgPrivate = params => api.get('/msg/private',{
	params
})

// 获取@我的消息
 var getMsgForwords = params => api.get('/msg/forwards',{
	params
 })
 
 // 获取评论
 var getMsgComments = params => api.get('/msg/comments',{
	params
 })

// 获取通知信息
var getMsgNotices = params => api.get('/msg/notices',{
	params
})

// 登录后批量发送请求
var getBatch = data => api.post('/batch',data)

// 搜索接口
var getSearchList = params => api.get('/cloudsearch',{
	params
})

// 默认搜索关键字
var getSearchDefalut = () => api.get('/search/defalut')

// 获取搜索建议
var getSearchSug = params => api.get('/search/suggest',{
	params
})

// 获取用户播放记录,uid
var getUserRecord = params => api.get('/user/record',{
	params
})

// 获取用户歌单,uid,limit:30,offset:0
var getUserPlaylist = params => api.get('/user/playlist',{
	params
})

// 评论
var Comment = params => api.get('/comment',{
	params
})

// 点赞
var commentLike = params => api.get('/comment/like',{
	params
})

// 用户等级
var getUserLevel = () => api.get('/user/level')

// 相关歌单推荐
var getRePlaylist = params => api.get('/related/playlist',{
	params
})

// 获取收藏歌单的用户
var getSubPlaylist = params => api.get('/playlist/subscribers',{
	params
})

// 获取每日推荐歌曲
var getDayRe = () => api.get('/recommend/songs')

// 分类获取歌手列表,limit:30,offset,type,area,initial
var getArtistList = params => api.get('/artist/list',{
	params
})

// 获取热门歌手
var getHotArtist = params => api.get('/top/artists',{
	params
})

// 获取歌手部分信息和热门歌曲
var getArtist = params => api.get('/artists',{
	params
})

// 歌手热门50首歌曲
var getHotSongs = params => api.get('/artist/top/song',{
	params
})

// 获取歌手专辑
var getArtistAlbum = params => api.get('/artist/album',{
	params
})

// 获取歌手MV
var getArtistMv = params => api.get('/artist/mv',{
	params
})

// 获取歌手描述
var getArtistDec = params => api.get('/artist/desc',{
	params
})

// 获取相似歌手
var getSimiArtist = params => api.get('/simi/artist',{
	params
})

// 获取用户关注列表，好友列表
var getFollows = params => api.get('/user/follows',params)

// 各种收藏
var sub = (url,params) => api.get(url,params)

export {
	getBanner,getPlayList,getHotRecommed,getAlbum,getToplist,getListDetail,getHotArtists,getDjPopular,getSongUrl,getPlaylistCom,getSongList,getCatList,getDjCatelist,
	getProgramRe,getProgramTop,getDjCateRe,getAllAlbum,getAlbumById,getSongDetail,getSongLyric,loginByphone,getUserCount,getRecommendRe,getRecommendSong,signDay,
	getUserDetail,getDjRebytype,getDjHotBycate,getDjDetail,getDjPrograms,getDjProgramDetail,getPersonRe,getMsgPrivate,getBatch,getSearchList,getSearchDefalut,
	getSearchSug,getUserRecord,getUserPlaylist,Comment,commentLike,getUserLevel,getMsgForwords,getMsgComments,getMsgNotices,getRePlaylist,getSubPlaylist,getDayRe,
	getArtistList,getHotArtist,getArtist,getHotSongs,getArtistAlbum,getArtistMv,getArtistDec,getSimiArtist,getFollows,sub,logout
}