<template>
	<div class="footer">
		<ul class="indexFooter">
			<router-link class="footerItem" to="/index">
				<i class="iconfont icon-icon-test4 footerItemsIcon"></i>
				<div>创建</div>
			</router-link>
			<router-link class="footerItem" to="/myInstructions">
				<i class="iconfont icon-icon-test1 footerItemsIcon"></i>
				<div>我的说明书</div>
			</router-link>
			<router-link class="footerItem" to="/myMessage">
				<i class="iconfont icon-icon-test2 footerItemsIcon"></i>
				<div>我的留言</div>
			</router-link>
			<router-link class="footerItem" to="/myPersonal">
				<i class="iconfont icon-icon-test5 footerItemsIcon"></i>
				<div>我的</div>
			</router-link>
			<!-- <li class="footerItem on" @click="goIndex">
				<i class="iconfont icon-icon-test4 footerItemsIcon"></i>
				<div>创建</div>
			</li>
			<li class="footerItem" @click="goShows">
				<i class="iconfont icon-shezhi footerItemsIcon"></i>
				<div>我的说明书</div>
			</li>
			<li class="footerItem" @click="goMessages">
				<i class="iconfont icon-shezhi footerItemsIcon"></i>
				<div>留言</div>
			</li>
			<li class="footerItem" @click="goPersonal">
				<i class="iconfont icon-shiyong01 footerItemsIcon"></i>
				<div>我的</div>
			</li> -->
		</ul>
	</div>
</template>

<script>
export default {
  name: "indexFooter",
  methods: {
    // goIndex() {
    //   this.$router.push("/");
    // },
    // goShows() {
    //   this.$router.push("/myInstructions");
    // },
    // goMessages() {
    //   this.$router.push("/myMessage");
    // },
    // goPersonal() {
    //   this.$router.push("/myPersonal");
    // }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.footerItem.on, .footerItem.on i {
	color: #02C2A2;
}

.footer {
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 0;
	z-index: 999;
}

.indexFooter {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	background: #FFFFFF;
	box-shadow: 0 -1px 0 0 #F5F5F5;
	color: $color-2e;
	font-size: $font-size-small;
}

.footerItem {
	flex-grow: 1;
	float: left;
	font-family: PingFangSC-Regular;
	color: $color-2e;
}

.footerItemsIcon {
	color: $color-2e;
	font-size: $font-size-16;
	line-height: 24px;
}
</style>
