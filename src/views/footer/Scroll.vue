<template>
	<div :class="c_class" :ref="refName" @wheel="scroll">
		<slot></slot>
	</div>
	<div :class="bar_class" @click="moveByClick">
		<span class="scrol" :class="sb_class" :style="{height:barH+'px',top:barT+'px',display:barD}" @click.stop="" @mousedown="barDown"></span>
	</div>

</template>

<script>
	export default {
		name:"Scroll",
		props:{
			c_class:{
				type:String,
				default:'scroll-container'
			},
			bar_class:{
				type:String,
				default:'scroll-bar'
			},
			heigth:{
				type:Number,
				default:260
			},
			c_heigth:{
				type:Number,
				default:260
			},
			refName:{
				type:String,
				default:'list'
			},
			c_length:{
				type:Number,
				require:true
			},
			step:{
				type:Number,
				default:5
			},
			barTO:{
				type:Number,
				default:0
			},
			sb_class:{
				type:String
			}
		},
		data(){
			return {
				// listT:0,
				barT:this.barTO,
				isMove:false,
				startY:0,
				firstT:0
			}
		},
		computed:{
			barH(){
				return this.heigth*this.c_heigth/this.c_length
			},
			barD(){
				return this.c_length > this.c_heigth ? 'block':'none'
			}
		},
		watch:{
			barT(val){
				// console.log(val)
				this.$nextTick(()=>{
					// console.log('改变scrollTop')
					this.$refs[this.refName].scrollTop = val/this.heigth*this.c_length
				})
			},
			barTO(val){
				this.barT = val
			}
		},
		methods:{
			stopScroll(e){
				e.preventDefault();
			},
			scroll(e){
				document.addEventListener('wheel',this.stopScroll(e));
				if (e.wheelDeltaY>0) {
					this.barT = this.barT - this.step>0 ? this.barT - this.step : 0;
				}
				if(e.wheelDeltaY<0){
					// 滚动条向下
					this.barT = this.barT + this.step < this.heigth - this.barH ? this.barT + this.step : this.heigth - this.barH;
				}
			},
			moveByClick(e){
				this.barT = e.offsetY - this.barH / 2
			},
			barDown(e){
				// console.log('鼠标放下')
				this.startY = e.clientY;
				this.firstT = this.barT;
				window.addEventListener('mousemove',this.onMoving)
				window.addEventListener('mouseup',this.moveEnd)
			},
			moveEnd(){
				// console.log('鼠标抬起')
				window.removeEventListener('mouseup',this.moveEnd)
				window.removeEventListener('mousemove',this.onMoving)
			},
			onMoving(e){
				let tmpT = this.firstT + e.clientY - this.startY
				this.barT = tmpT > 0 ? (tmpT < this.heigth - this.barH ? tmpT : this.heigth - this.barH) : 0
				e.preventDefault()
			},
			created(){
				// console.log(this.barTO/this.heigth*this.c_length)
				this.$nextTick(()=>{
					// console.log('改变scrollTop')
					this.$refs[this.refName].scrollTop = this.barTO/this.heigth*this.c_length
				})
			}
		}
	}

</script>

<style>
	.scroll-container{
		height: 260px;
		width: 553px;
	}

</style>