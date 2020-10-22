<!--
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-07 14:34:37
 * @LastEditors: lax
 * @LastEditTime: 2020-10-10 13:51:03
 -->
<template>
	<tao-container>
		<tao-h5>
			<tao-music v-show="display"></tao-music>
			<tao-loading name="loading" :color="'pink'"></tao-loading>
		</tao-h5>
	</tao-container>
</template>

<script>
export default {
	name: "Index",
	data: function() {
		return {
			display: false
		};
	},
	created: function() {
		const self = this;
		this.$wx
			.share({
				title: "",
				desc: "",
				imgUrl: require("@/assets/img/wx/fm93_white.png"),
				over: function() {
					this.h5.next();
					self.display = true;
				}
			})
			.auth();
	}
};
</script>
