<template>
  <!-- <div id="app"> -->
		<Header></Header>
		<!-- 主导航的链接路由的视图出口 -->
		<router-view></router-view>
		<Footer></Footer>
		<login v-if="isLogin"></login>
		<div v-if="isLogin" class="m-mask" ></div>
		<foot-play></foot-play>
  <!-- </div> -->
</template>

<script>
	import Header from 'views/Header/Header.vue'
	import FootPlay from 'views/footer/FootPlay.vue'
	import Footer from 'views/footer/Footer.vue'
	import login from'views/user/login.vue'

export default {
  name: 'App',
  components: {
		Header,
		FootPlay,
		login,
		Footer
  },
	data(){
		return {
			isLogin:false
		}
	},
	created(){
		this.$store.commit('set_PS');
	}
}
</script>

<style>
	@import "assets/css/base.css";
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
	div.m-mask{
		z-index: 1001;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
