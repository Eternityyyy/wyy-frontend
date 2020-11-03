<template>
	<div class="commets">
		<h3 class="u-hd4">{{Title}}</h3>
		<div class="item" v-for="(citem,index) in Comments" :key="index">
			<div class="head">
				<a href="">
					<img :src="citem.user.avatarUrl +'?param=50y50'" alt="">
				</a>
			</div>
			<div class="cntwrap">
				<div>
					<div class="cnt f-brk">
						<a href="" class="s-fc7" v-if="citem.user">{{citem?.user?.nickname}}</a>
						<sup class="u-icn u-icn-84"></sup>
						：{{citem?.content}}
						<img src="" alt="">
					</div>
				</div>
				<div v-if="citem?.beReplied?.length>0" class="que f-brk f-pr s-fc3">
					<span class="darr">
						<i class="bd">◆</i>
						<i class="bg">◆</i>
					</span>
					<a href="#" class="s-fc7" v-if="citem?.beReplied[0]">{{citem?.beReplied[0]?.user?.nickname}}</a>
					<a href="" class="s-fc7"></a>
					：{{citem?.beReplied[0]?.content}}
				</div>
				<div class="rp">
					<div class="time s-fc4">{{trunTime(citem.time,'year')}}</div>
					<span class="dlt" v-if="citem?.user?.userId == userProfile?.userPoint?.userId">
						<span class="s-fc3" @click="delComment(citem.commentId,index)">删除</span>
						<span class="sep">|</span>
					</span>
					<span class="zan-oper">
						<i v-if="citem.liked" class="zan u-icn2 u-icn2-13" @click="cancleLike(citem.commentId,index)"></i>
						<i v-else class="zan u-icn2 u-icn2-12" @click="cLike(citem.commentId,index)"></i>
						<template v-if="citem?.likedCount > 0">
							({{citem?.likedCount}})
						</template>
					</span>
					<span class="sep">|</span>
					<a href="" class="s-fc3">回复</a>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	import { commentLike,Comment } from 'network/api.js'
	export default {
		name:'commetList',
		props:{
			Title:{
				type:String
			},
			comments:{
				type:Array,
			},
			Id:{},
			type:{
				type:Number
			}
		},
		computed:{
			...mapState(['userProfile']),
			Comments(){
				return this.comments || []
			}
		},
		methods:{
			cLike(cid,index){
				this.verify()
				commentLike({id:this.Id,t:1,cid:cid,type:this.type}).then(()=>{
					// this.$emit('like')
					this.Comments[index].liked = true;
					this.Comments[index].likedCount += 1;
					console.log(this.Comments[index])
				})
			},
			cancleLike(cid,index){
				commentLike({id:this.Id,t:0,cid:cid,type:this.type}).then(()=>{
					// this.$emit('like')  
					this.Comments[index].liked = false;
					this.Comments[index].likedCount -= 1;
					console.log(this.Comments[index])
				})
			},
			delComment(cid,index){
				Comment({t:0,type:this.type,id:this.Id,commentId:cid}).then(res=>{
					console.log(res.data)
					console.log(res.data)
					this.content = '';
					this.$emit('delcomment',index)
				})
			},
			verify(){
				if(!this.userProfile){
					this.$root.isLogin = true;
					return
				}
			}
		}

	}
</script>

<style>
	.commets .u-hd4{
		position: relative;
		top: 1px;
		height: 20px;
		border-bottom: 1px solid #cfcfcf;
	}
	.commets .que{
		padding: 8px 19px;
		margin-top: 10px;
		line-height: 20px;
		background: #f4f4f4;
		border: 1px solid #dedede;
	}
	.commets .que .darr{
		position: absolute;
		top: -7px;
		left: 20px;
		font-size: 12px;
		line-height: 14px;
	}
	.commets .que .darr i{
		position: absolute;
		top: 0;
		left: 0;
	}
	.commets .que .darr .bd{
		color: #dedede;
	}
	.commets .que .darr .bg{
		top: 1px;
		color: #f4f4f4;
	}
	.commets .item{
		padding: 15px 0;
		border-top: 1px dotted #ccc;
	}
	.commets .cntwrap{
		margin-left: 60px;
	}
	.commets .cnt{
		width: 100%;
		overflow: hidden;
		line-height: 20px;
	}
	.commets .cntwrap .s-fc7{
		margin-right: 5px;
	}
	.commets .cnt .u-icn, .commets .que .u-icn, .commets .cnt2 .u-icn{
		margin-top: -3px;
	}
	.commets .cntwrap .u-icn{
		margin-right: 5px;
		vertical-align: -1px;
	}
	.commets div.rp{
		margin-top: 15px;
		text-align: right;
	}
	.commets .time{
		float: left;
		margin: 0 !important;
	}
	.u-icn2-13{
		background-position: -170px 0;
	}
	.commets .cntwrap .u-icn2{
		margin-right: 5px;
		vertical-align: -2px;
	}
	.commets .zan{
		margin-top: -4px;
	}
	.commets .sep{
		margin: 0 8px;
		color: #ccc;
	}
</style>
