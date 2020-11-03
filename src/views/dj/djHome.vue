<template>
	<div class="rditop f-cb">
		<discover-section s_class="blk f-fl">
			<template v-slot:title>
				推荐节目
			</template>
			<template v-slot:titleR>
				<a href="" class="more s-fc3">更多></a>
			</template>
			<template v-slot:container>
				<ul class="m-plylist toplist">
					<li class="item" v-for="(prItem,index) in programRe" :key="index">
						<a href="" class="cvr u-cover u-cover-tiny f-left">
							<img :src="prItem.coverUrl + '?param=40y40'" alt="">
							<i class="ply f-pa f-dn f-alpha bg-iconall"></i>
						</a>
						<div class="cnt f-left">
							<h3 class="f-thide">
								<router-link :to="`/discover/program?id=${prItem.id}`">
									<span class="s-fc1 f-fw0">{{prItem.name}}</span>
								</router-link>
							</h3>
							<p class="f-thide">
								<router-link :to="`/discover/djradio/detail?id=${prItem.id}`">
									<span class="s-fc4">{{prItem.dj.brand}}</span>
								</router-link>
							</p>
						</div>
						<router-link :to="`/discover/djradio/category?id=${prItem?.radio?.categoryId}`">
							<span class="tag u-type">{{prItem.radio.category}}</span>
						</router-link>
					</li>
				</ul>
			</template>
		</discover-section>
		<discover-section s_class="blk f-fr">
			<template v-slot:title>
				节目排行榜
			</template>
			<template v-slot:titleR>
				<a href="" class="more s-fc3">更多></a>
			</template>
			<template v-slot:container>
				<ul class="m-plylist toplist toplist-r">
					<li class="item" v-for="(tpItem,index) in programToplist" :key="index">
						<div class="dj-rank f-left s-fc4">
							<em class="red f-fs1">{{index>9 ? index+1:'0'+(index+1)}}</em>
							<span class="u-rnk u-rnk-up f-ff0">
								<i class="u-icn u-icn-75" v-if="tpItem.lastRank < 0"></i>
								<i class="u-icn u-icn-73" v-else-if="tpItem.lastRank - tpItem.rank > 0"></i>
								<i class="u-icn u-icn-74" v-else></i>
								<template v-if="tpItem.lastRank >0">
									{{Math.abs(tpItem.lastRank - tpItem.rank)}}
								</template>
							</span>
						</div>
						<a href="" class="cvr u-cover u-cover-tiny f-left">
							<img :src="tpItem.program.coverUrl + '?param=40y40'" alt="">
							<i class="ply f-pa f-dn f-alpha"></i>
						</a>
						<div class="cnt f-left">
							<h3 class="f-thide">
								<router-link :to="`/discover/program?id=${tpItem?.program?.id}`">
									<span class="s-fc1 f-fw0">{{tpItem.program.name}}</span>
								</router-link>
							</h3>
							<p class="f-thide">
								<router-link :to="`/discover/djradio/detail?id=${tpItem?.program?.id}`">
									<span class="s-fc4">{{tpItem.program.radio.name}}</span>
								</router-link>
							</p>
						</div>
						<span class="hot u-hot f-left">
							<i :style="{width:tpItem.score/1000 + '%'}">
								<i></i>
							</i>
						</span>
					</li>
				</ul>
			</template>
		</discover-section>
	</div>
	<discover-section s_class="rdimore" v-for="(rditem,index) in reDjBycate" :key="index">
		<template v-slot:title>
			{{rditem.categoryName}}
			<span class="f-ff1">·</span>
			电台
		</template>
		<template v-slot:titleR>
			<router-link :to="`/discover/djradio/category?id=${rditem.categoryId}`">
				<span class="more s-fc3">更多 ></span>
			</router-link>
		</template>
		<template v-slot:container>
			<ul class="rdilist f-cb">
				<li v-for="(ritem,rindex) in rditem.radios" :key="rindex" :style="{'border-bottm-color':index>1?'#fff':''}">
					<router-link :to="`/discover/djradio/detail?id=${ritem.id}`">
						<span class="cvr u-cover u-cover-rdi f-left">
							<img :src="ritem.picUrl + '?param=200y200'" alt="">
						</span>
					</router-link>
					<div class="cnt">
						<router-link :to="`/discover/djradio/detail?id=${ritem.id}`">
							<span class="s-fc1">{{ritem.name}}</span>
						</router-link>
						<p class="note s-fc4">{{ritem.rcmdText}}</p>
					</div>
				</li>
			</ul>
		</template>
	</discover-section>

</template>

<script>
	import discoverSection from 'views/discover/discoverSection.vue'
	
	import {getProgramRe,getProgramTop,getDjCateRe} from 'network/api.js'
	export default {
		name:'djHome',
		components:{
			discoverSection
		},
		data(){
			return {
				reDjBycate:[],
				programRe:[],
				programToplist:[],
			}
		},
		created(){
			getProgramRe().then(res=>{
				// console.log(res.data.programs)
				this.programRe = res.data.programs
			});
			getProgramTop({limit:10}).then(res=>{
				// console.log(res.data.toplist)
				this.programToplist = res.data.toplist
			});
			getDjCateRe().then(res=>{
				// console.log(res.data.data)
				this.reDjBycate = res.data.data.slice(0,6)
			});
		}
	}
</script>

<style>
</style>
