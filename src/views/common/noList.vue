<template>
	<div class="n-nmusic">
		<h3 class="f-ff2">
			<i class="u-icn u-icn-21"></i>
			<slot></slot>
		</h3>
	</div>

</template>

<script>
	export default {
		name:'noList'
	}
</script>

<style>
	.n-nmusic{
		padding: 105px 0 105px 0;
		text-align: center;
	}
	.n-nmusic h3{
		padding-bottom: 38px;
		font-size: 18px;
	}
	.n-nmusic .u-icn-21{
		margin-right: 17px;
	}
</style>
