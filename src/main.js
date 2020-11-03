import { createApp } from 'vue'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

const app = createApp(App)

app.config.globalProperties.trunTime = function(time,str){
	let date = new Date(time);
	let arr = [date.getFullYear(),(date.getMonth()+1>10?'':'0')+(date.getMonth()+1),(date.getDate()+1>10?'':'0')+date.getDate()];
	if(str == 'year'){
		return `${arr[0]}年${arr[1]}月${arr[2]}日`
	}
	return arr.join(str)
}

app.config.globalProperties.msgTime = function(time){
	let date = new Date();
	let oldtime = new Date(time);
	let diff = (date - oldtime);
	if(diff <= 60 * 1000){
		return '刚刚'
	}else if(diff < 3600 * 1000){
		return Math.floor(diff / 1000 / 60) + '分钟前'
	}else if(diff < 3600 * 1000 * 24){
		return `${oldtime.getHours()}：${oldtime.getMinutes()}`
	}else if(date.getFullYear() == oldtime.getFullYear()){
		return `${oldtime.getMonth()}月${oldtime.getDate()}日 ${oldtime.getHours()}:${oldtime.getSeconds()}`
	}else{
		return `${oldtime.getFullYear()}年${oldtime.getMonth()}月${oldtime.getDate()}日 ${oldtime.getHours()}:${oldtime.getSeconds()}`
	}
}

app.config.globalProperties.showCount = function(count,more){
	return count > more ? `${Math.floor(count/more)}万` : count
}

app.directive('trunHtml',{
	mounted(el,bind){
		// console.log(bind.value)
		// console.log( bind.value.str.replace(bind.value.keyword,`<span class="s-fc7 f-tdn">${bind.value.keyword}</span>`))
		el.innerHTML = bind.value.str.replace(bind.value.keyword,`<span class="s-fc7 f-tdn">${bind.value.keyword}</span>`)
	}
})
app.directive('title',{
	mounted(el,bind){
		let title = '';
		// console.log(bind.value)
		bind.value.forEach((item,index)=>{
			let line = bind.value[index+1] ? '/' : '';
			// console.log(bind.value)
			title  += item.name + line
		});
		el.title = title;
	}
})

app.use(router).use(store).mount('#app')
