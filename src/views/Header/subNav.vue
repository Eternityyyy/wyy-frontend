<template>
	<div class="subnav" :class="($route.path).includes('/discover') ? 'subnav-y':'subnav-n'">
		<div class="subnav-wrap" v-show="($route.path).includes('/discover')">
			<ul class="f-left sub-nav">
				<li class="" v-for="(subitem,index) in subList" :key="index">
					<router-link :to="subitem.suburl">
						<em>{{subitem.subtitle}}</em>
					</router-link>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	export default {
		name:'subNav',
		// props:['sublist'],
		data(){
			return {
				subList:[
					{
						subtitle:'推荐',
						suburl:'/discover/recommend'
					},
					{
						subtitle:'排行榜',
						suburl:'/discover/rank'
					},
					{
						subtitle:'歌单',
						suburl:'/discover/songlist'
					},
					{
						subtitle:'主播电台',
						suburl:'/discover/djradio'
					},
					{
						subtitle:'歌手',
						suburl:'/discover/artist'
					},
					{
						subtitle:'新碟上架',
						suburl:'/discover/album'
					},
				]
			}
		},
		mounted(){
		}
	}
</script>

<style>
	.subnav{
		/* height: 35px; */
		box-sizing: border-box;
		background-color: #C20C0C;
		border-bottom: 1px solid #a40011;
	}
	.subnav-y{
		height: 35px;
	}
	.subnav-n{
		height: 5px;
	}
	.subnav-wrap{
		width: 1100px;
		height: 35px;
		margin: 0 auto;
	}
	.sub-nav{
		padding-left: 180px;
	}
	.sub-nav li{
		float: left;
		height: 34px;
		text-align: center;
	}
	.sub-nav li a{
		color: #fff;
	}
	.sub-nav li a em{
		display: inline-block;
		height: 20px;
		padding: 0 13px;
		margin: 7px 17px 0;
		border-radius: 20px;
		line-height: 21px;
	}
	.subnav .router-link-exact-active em{
		background: #9B0909;
	}
</style>
