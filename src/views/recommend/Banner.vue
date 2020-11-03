<template>
	<div class="banner-container" :style="bgStyle">
		<div class="banner" :style="{width: width,height:height}">
			<div class="banner-img">
				<div class="banner-item" :style="{opacity: Number(showIndex == index),'transition-duration':transition}" v-for="(banner,index) in imglist" :key="index">
					<a href="#">
						<img :src="banner.imageUrl">
					</a>
				</div>
			</div>
			<div class="banner-points">
				<span class="point-item" v-for="n in imglist.length" :key="n" @click="clickTrun(n)">
					<i class="point-item-btn" :class="{'point-item-active':showIndex == n-1}"></i>
				</span>
			</div>
			<span class="banner-btn bg-banner btn-left" @click="trunLeft"></span>
			<span class="banner-btn bg-banner btn-right" @click="trunRight"></span>
			<slot></slot>
		</div>
	</div>

</template>

<script>
	export default {
		name:'Banner',
		props:{
			imglist:{
				type: Array,
				required:true
			},
			width:{
				type:String,
				default:'100%'
			},
			isSide:{
				type: Boolean,
				default: false
			},
			interval:{
				type:Number,
				default: 3000
			},
			height:{
				type:String,
				required:true
			},
			transition:{
				type:String,
				default: '2s'
			}
		},
		data(){
			return {
				showIndex:0,
				timer:0
			}
		},
		computed:{
			bgStyle(){
				return	{
					// 在还没有将imglist数据获取过来时，初始化一个空值。
					'background-image':this.imglist.length>0 ? `url(${this.imglist[this.showIndex].imageUrl}?imageView&blur=40x20)`:'',
					'transition-duration':this.transition
				}
			}
		},
		methods:{
			setTimer(){
				return setInterval(()=>{
					this.showIndex ++ ;
					if(this.showIndex >= this.imglist.length){
						this.showIndex =0
					}
				},this.interval)
			},
			controlTimer(){
				if(this.timer){
					// console.log('取消')
					// console.log(this.timer)
					clearInterval(this.timer)
				}
				this.timer = this.setTimer()
			},
			clickTrun(n){
				this.showIndex = n -1
				this.controlTimer()
			},
			trunLeft(){
				this.showIndex --
				if(this.showIndex < 0){
					this.showIndex = this.imglist.length -1
				}
				this.controlTimer()
			},
			trunRight(){
				this.showIndex ++
				if(this.showIndex >= this.imglist.length){
					this.showIndex = 0
				}
				this.controlTimer()
			}
		},
		created(){
			this.timer = this.setTimer()
		}
	}
</script>

<style>
	.banner-container{
		width: 100%;
		background-position: center center;
		background-size: 6000px;
		transition-property: all;
	}
	.banner{
		margin: 0 auto;
		position: relative;
	}
	.banner-img{
		height: 100%;
		position: relative;
	}
	.banner-item{
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		transition-property: all;
	}
	.banner-item img{
		width: 730px;
		height: 100%;
	}
	.banner-points{
		width: 730px;
		position: absolute;
		bottom: 6px;
		left: 0;
		height: 20px;
		text-align: center;
	}
	.point-item{
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
		text-align: center;
		line-height: 20px;
	}
	.point-item:hover .point-item-btn{
		background-color: #ae0a0a;
	}
	.point-item .point-item-active{
		background-color: #ae0a0a;
	}
	.point-item-btn{
		display: inline-block;
		background-color: #aaaaab;
		height: 6px;
		width: 6px;
		border-radius: 50%;
	}
	.banner-btn{
		display: block;
		position: absolute;
		top: 50%;
		margin-top: -31px;
		width: 37px;
		height: 63px;
		text-indent: -9999px;
		/* background: url(~assets/img/banner.png) 0 9999px no-repeat; */
	}
	.btn-left{
		left: -68px;
		background-position: 0 -360px;
	}
	.btn-right{
		right: -68px;
		background-position: 0 -508px;
	}
	
</style>
