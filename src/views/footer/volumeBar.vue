<template>
	<div class="ctrl-vol" :style="{'visibility':isShow ? 'visible' : 'hidden'}">
		<div class="barbg bg-playbar"></div>
		<div class="vbg j-t" @click="volumeClick">
			<div class="curr j-t bg-playbar" :style="{height:currH.toFixed(3) + 'px'}"></div>
			<span class="btn f-alpha j-t bg-iconall" :style="{top:currT + 'px'}" @click.stop @mousedown="dragDown"></span>
		</div>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:'volumeBar',
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			...mapState(['player_setting']),
			currH(){
				return this.player_setting.volume * 93
			},
			currT(){
				return 81 - Math.ceil(this.currH / 93 * 81)
			}
		},
		data(){
			return {
				positionT:0,
				firstH:0,
				firstY:0
			}
		},
		methods:{
			volumeClick(e){
				this.player_setting.volume = (e.target.offsetHeight - e.offsetY) / 93
				this.$store.commit('update_PS',this.player_setting);
			},
			dragDown(e){
				this.firstY = e.clientY;
				this.firstH = this.currH;
				document.addEventListener('mousemove',this.dragMove);
				document.addEventListener('mouseup',this.dragEnd);
			},
			dragMove(e){
				let tmpH = (this.firstH  - e.clientY + this.firstY) / 93
				this.player_setting.volume = tmpH > 0 ? (tmpH > 1 ?  1 : tmpH) : 0
				this.$store.commit('update_PS',this.player_setting);
				e.preventDefault();
			},
			dragEnd(){
				document.removeEventListener('mousemove',this.dragMove);
				document.removeEventListener('mouseup',this.dragEnd);
			}
		}
	}
</script>

<style>
	.ctrl-vol {
		position: absolute;
		top: -113px;
		left: 9px;
		clear: both;
		width: 32px;
		hyphenate-limit-chars: 113px;
	}
	.ctrl-vol .barbg{
		position: absolute;
		top: 0;
		left: 0;
		width: 32px;
		height: 113px;
		background-position: 0 -503px;
	}
	.ctrl-vol .vbg{
		padding: 4px 0;
		top: 7px;
	}
	.ctrl-vol .vbg, .ctrl-vol .curr{
		position: absolute;
		top: 14px;
		left: 14px;
		width: 4px;
		height: 93px;
	}
	.ctrl-vol .curr{
		top: auto;
		bottom: 4px;
		left: 0;
		background-position: -40px bottom;
		overflow: hidden;
	}
	.ctrl-vol .btn {
		position: absolute;
		top: 0;
		left: -7px;
		display: block;
		width: 18px;
		height: 20px;
		background-position: -40px -250px;
	}
</style>
