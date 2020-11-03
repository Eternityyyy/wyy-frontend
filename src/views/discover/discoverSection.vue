<template>
	<div :class="s_class">
		<div class="section-title bg-index">
			<!-- <router-link :to="titleUrl"> -->
				<span class="s-title f-left">
					<slot name="title"></slot>
					<!-- 热门推荐 -->
				</span>
			<!-- </router-link> -->
			<div class="titleLi f-left">
				<slot name="titleLi"></slot>
			</div>
			<span class="title-more">
				<slot name="titleR"></slot>
			</span>
		</div>
		<slot name="container"></slot>
	</div>

</template>

<script>
	export default {
		name:'discoverSection',
		props:{
			titleUrl:{
				type:String
			},
			s_class:{
				type:String
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.section-title{
		height: 40px;
		padding: 0 10px 0 34px;
		background-position: -225px -156px;
		border-bottom: 2px solid #C10D0C;
	}
	.s-title{
		font-size: 20px;
		line-height: 28px;
	}
	.titleLi{
		margin: 7px 0 0 20px;
	}
	.title-more{
		float: right;
		margin-top: 9px;
	}
	.title-more .more-text{
		color: #666;
	}
	.title-more .more-arr{
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-left: 4px;
		vertical-align: middle;
		background-position: 0 -240px;
	}
</style>
