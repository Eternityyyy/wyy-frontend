/// import {createApp} from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
// import VueRouter from 'vue-router'
import {discover,Recommend} from 'views/discover/index.js'
// import myMusic from 'views/myMusic/myMusic.vue'
import Rank from 'views/rank/Rank.vue'
import playListDetial from 'views/songlist/playListDetial.vue'
import songList from 'views/songlist/songList.vue'
import newAlbum from 'views/album/newAlbum.vue'
import albumDetail from 'views/album/albumDetail.vue'
import musicDetail from 'views/songlist/musicDetail.vue'
import djRadio from 'views/dj/djRadio.vue'
import djHome from 'views/dj/djHome.vue'
import djCategory from 'views/dj/djCategory.vue'
import djDetail from 'views/dj/djDetail.vue'
import djProgram from 'views/dj/djProgram.vue'
import Search from 'views/search/Search.vue'
import searchContainer from 'views/search/searchContainer.vue'
import userHome from 'views/user/userHome.vue'
import User from 'views/user/User.vue'
import userLevel from 'views/user/userLevel.vue'
import { Message,msgAt,msgComments,msgNotices,msgPrivate } from 'views/msg/index.js'
import dayRecommend from 'views/recommend/dayRecommend.vue'
import artist from 'views/artist/artist.vue'
import artistDetail from 'views/artist/artistDetail.vue'
import noFunction from 'views/common/noFunction.vue'

// Vue.use(VueRouter)
const routerHistory = createWebHistory()

const routes = [
	{
		path:'/',
		redirect:'/discover/recommend'
	},
	{
		path:'/discover',
		component: discover,
		children:[
			{
				path:'',
				redirect:'/discover/recommend'
			},
			{
				path:'recommend',
				component:Recommend
			},
			{
				path:'rank',
				component:Rank
			},
			{
				path:'playlist',
				component:playListDetial
			},
			{
				path:'rank',
				component:Rank
			},
			{
				path:'songlist',
				component:songList
			},
			{
				path:'recommend/taste',
				component:dayRecommend
			},
			{
				path:'artist',
				component:artist
			},
			{
				path:'artist/detail',
				component:artistDetail
			},
			{
				path:'djradio',
				component:djRadio,
				children:[
					{
						path:'',
						component:djHome,
					},
					{
						path:'category',
						component:djCategory
					}
				]
			},
			{
				path:'album',
				component:newAlbum
			},
			{
				path:'album/detail',
				component:albumDetail
			},
			{
				path:'song',
				component:musicDetail
			},
			{
				path:'djradio/detail',
				component:djDetail
			},
			{
				path:'program',
				component:djProgram
			}
			
		] 
	},
	{
		path:'/user',
		component:User,
		children:[
			{
				path:'',
				redirect:'/user/home'
			},
			{
				path:'home',
				component:userHome
			},
			{
				path:'level',
				component:userLevel
			}
		]
	},
	{
		path:'/msg',
		component:Message,
		children:[
			{
				path:'at',
				component:msgAt
			},
			{
				path:'comments',
				component:msgComments
			},
			{
				path:'notices',
				component:msgNotices
			},
			{
				path:'private',
				component:msgPrivate
			}
		]
	},
	{
		path:'/my',
		component:noFunction
	},
	{
		path:'/friend',
		component:noFunction
	},
	{
		path:'/store',
		component:noFunction
	},
	{
		path:'/nmusician',
		component:noFunction
	},
	{
		path:'/download',
		component:noFunction
	},
	{
		path:'/search',
		component:Search,
		children:[
			{
				path:'m',
				component:searchContainer
			}
		]
	}
	
]

// const router = new VueRouter({
// 	routes,
// 	mode:'history'
// })
const router = createRouter({
	history:routerHistory,
	routes:routes
})

export default router