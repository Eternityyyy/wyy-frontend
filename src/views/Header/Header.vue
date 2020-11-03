 <template>
		<div class="header">
			<div class="header-wrap">
				<h1 class="logo f-left"></h1>
				<ul class="nav f-left">
					<li v-for="(navitem,index) in navlist" :key="index" @click="showSubnav(index)">
							<router-link :to="navitem.url">
							<em>{{navitem.str}}</em>
							<sup v-if="navitem.class_name" :class="navitem.class_name"></sup>
							<sub v-if="$route.path == navitem.url" :class="$route.path == navitem.url ? 'cor':'' "></sub>
							</router-link>
						</li>
				</ul>
				<div class="header-right">
					<div class="search f-left">
						<span class="search-container">
							<input type="text" class="search-input" id="search" v-model="keywords" @focus="focusShow" @blur="blurShow" @keyup.enter="skipUrl">
							<label for="search" v-show="isText && !keywords.length">音乐/视频/电台/用户</label>
						</span>
						<search-sug :keyword="searchword" :isShow="isSearch"></search-sug>
					</div>
					<a class="top-creator f-left">创作者中心</a>
					<div class="m-tophead f-pr j-tflag" v-if="!user_id">
						<a class="link s-fc3" @click="login">登录</a>
					</div>
					<div class="user-block f-left" v-else>
						<div class="user-avatar">
							<img :src="userProfile?.profile?.avatarUrl +'?param=30y30'" alt="">
						</div>
						<div class="user-customer">
							<ul class="f-cb lb mg f-left">
								<li v-for="(useritem,index) in userlist" :key="index">
									<router-link :to="useritem.url">
										<i class="icn" :class="`icn-${useritem.class_name}`"></i>
										<em>{{useritem.str}}</em>
										<span v-if="useritem.span_class" :class="span_class"></span>
									</router-link>
								</li>
							</ul>
							<ul class="f-cb ltb mg f-left">
								<li>
									<span>
										<i class="icn icn-st"></i>
										<em>个人设置</em>
									</span>
								</li>
								<li>
									<span>
										<i class="icn icn-verify"></i>
										<em>实名认证</em>
									</span>
								</li>
							</ul>
							<ul class="f-cb lt f-left">
								<li @click="logout">
									<span>
										<i class="icn icn-ex"></i>
										<em>退出</em>
									</span>
								</li>
							</ul>
							<i class="arr"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	// import md5 from 'js-md5'
	import searchSug from 'views/search/searchSug.vue'
	import { mapState } from 'vuex'
	// import cookie from 'vue-cookies'
	import { getUserDetail,logout } from 'network/api.js'
	export default {
		name:'Header',
		components:{
			searchSug
		},
		data(){
			return {
				navIndex:0,
				keywords:'',
				searchword:'',
				isText:true,
				isSearch:false,
				timer:null,
				navlist:[
				{
					str:'发现音乐',
					class_name:'',
					url:'/discover',
					sublist:['榜单','排行榜','歌单','主播电台','歌手','新碟上架']
				},
				{
					str:'我的音乐',
					class_name:'',
					url:'/my',
					sublist:[]
				},
				{
					str:'朋友',
					class_name:'',
					url:'/friend',
					sublist:[]
				},
				{
					str:'商城',
					class_name:'',
					url:'/store',
					sublist:[]
				},
				{
					str:'音乐人',
					class_name:'',
					url:'/nmusician',
					sublist:[]
				},
				{
					str:'下载客户端',
					class_name:'hot',
					url:'/download',
					sublist:[]
				}],
				userlist:[{
					str: '我的主页',
					class_name:'hm',
					span_class: '',
					url:'#'
				},
				{
					str: '我的消息',
					class_name:'msg',
					span_class: '',
					url:'/msg/private'
				},
				{
					str: '我的等级',
					class_name:'lv',
					span_class: '',
					url:'/user/level'
				},
				{
					str: 'VIP会员',
					class_name:'mbr',
					span_class: '',
					url:'#'
				}]
			}
		},
		computed:{
			...mapState(['user_id','userProfile'])
		},
		watch:{
			user_id(){
				this.getUser()
			},
			keywords(){
				// if(this.timer != null){
				// 	clearTimeout(this.timer)
				// }
				// setTimeout(()=>{
					this.searchword = this.keywords
				// },500)
			}
		},
		methods:{
			showSubnav:function(num){
				this.navIndex = num
			},
			getUser(){
				this.userlist[0].url = `/user/home?id=` + this.user_id
				getUserDetail({uid:this.user_id}).then(()=>{
					this.$store.commit('setUser');
				})
			},
			login(){
				this.$root.isLogin = true
			},
			logout(){
				logout().then(()=>{
					this.$store.commit('clearUserId')
				})
			},
			focusShow(){
				this.isText = false;
				this.isSearch = true
			},
			blurShow(){
				this.isText = true;
				this.isSearch = false
			},
			skipUrl(){
				this.$router.push({path:'/search/m',query:{s:this.keywords}})
			}
		},
		created(){
			if(this.user_id){
				this.getUser()
			}
			// console.log(this.user_id)
			// console.log(this.userProfile)
		}
	}
</script>

<style>
	.logo,.search,.hot,.cor{
		background-image: url(~assets/img/topbar.png);
	}
	/* 	.icn,.arr{
		background: url(~assets/img/toplist.png) no-repeat 0 9999px ;
	} */
	.header{
		box-sizing: border-box;
		height: 70px;
		background-color: #242424;
		border-bottom: 1px solid #000000;
	}
	.header-wrap{
		width: 1100px;
		margin: 0 auto;
	}
	.header-wrap::after{
		content: ' ';
		display: block;
		clear: both;
	}
	.logo{
		width: 176px;
		height: 69px;
		background-position: 0 0;
	}
	.nav li{
		float: left;
		height: 70px;
		position: relative;
	}
	.nav li a:hover,.nav .router-link-active{
		background-color: #000000;
		color: #ffffff;
	}
	.nav li a{
		padding: 0 19px;
		display: inline-block;
		height: 70px;
		line-height: 70px;
		font-size: 14px;
		color: #ccc;
	}
	.nav .hot{
		display: block;
		position: absolute;
		top: 21px;
		left: 100px;
		width: 28px;
		height: 19px;
		background-position: -190px 0;
	}
	.nav .cor{
		display: block;
		position: absolute;
		left: 50%;
		top: 64px;
		width: 12px;
		height: 7px;
		margin-left: -6px;
		overflow: hidden;
		background-position: -226px 0;
	}
	.header-right{
		float: right;
	}
	.search{
		margin-top: 19px;
		background-position: 0 -99px;
		background-color: #fff;
		border-radius: 32px;
		width: 158px;
		height: 32px;
		position: relative;
	}
	.search-container{
		display: block;
		position: relative;
		margin: 8px 0 0 30px;
	}
	.search-container input{
		color: #333;
		line-height: 16px;
		width: 95%;
		background: transparent;
		border: 0;
	}
	.search-container label{
		font-size: 12px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 90%;
		color: #9b9b9b;
		cursor: text;
	}
	.top-creator{
		width: 90px;
		height: 32px;
		margin: 19px 0 0 12px;
		box-sizing: border-box;
		padding-left: 16px;
		border: 1px solid #4f4f4f;
		background-position: 0 -140px;
		line-height: 33px;
		color: #ccc;
		border-radius: 20px;
		font-size: 12px;
	}
	.user-block,.m-tophead{
		height: 45px;
		margin: 19px 0 0 20px;
		padding: 0 22px 0 0;
		background-position: right -47px;
		position: relative;
	}
	.m-tophead{
		background-image: none;
		float: right;
	}
	.m-tophead .link,.m-tophead .link:hover{
		display: block;
		width: 28px;
		margin-top: 7px;
		color: #787878;
	}
	.user-block:hover .user-customer{
		display: block;
	}
	.user-avatar{
		height: 30px;
		width: 30px;
	}
	.user-avatar img{
		height: 30px;
		width: 30px;
		border-radius: 30px;
	}
	.user-customer{
		display: none;
		position: absolute;
		top: 38px;
		right: -43px;
		width: 158px;
		background-color: #2b2b2b;
		border: 1px solid #202020;
		box-shadow: 0 8px 24px 0 rgba(0,0,0,0.5);
		border-radius: 4px;
		z-index: 100;
	}
	.user-customer li,.user-customer li a,.user-customer li span{
		box-sizing: border-box;
		width: 100%;
		float: left;
	}
	.user-customer li a,.user-customer li span{
		float: left;
		height: 34px;
		line-height: 34px;
		position: relative;
		padding-left: 24px;
		color: #ccc;
	}
	.user-customer .icn{
		float: left;
		width: 18px;
		height: 18px;
		margin: 7px 10px 0 0;
	}
	.user-customer .ltb{
		border: 1px solid #232323;
	}
	.icn-hm{
		background-position: 0 -80px;
	}
	.icn-msg{
		background-position: -20px -120px;
	}
	.icn-lv{
		background-position: 0 -100px;
	}
	.icn-mbr{
		background-position: 0 -221px;
	}
	.icn-st{
		background-position: 0 -140px;
	}
	.icn-verify{
		background-position: -20px -142px;
	}
	.icn-ex{
		background-position: 0 -200px;
	}
	.user-customer .arr{
		margin-left: -8px;
		position: absolute;
		top: -8px;
		left: 50%;
		width: 14px;
		height: 8px;
		background-position: -20px 0;
	}
	
</style>
