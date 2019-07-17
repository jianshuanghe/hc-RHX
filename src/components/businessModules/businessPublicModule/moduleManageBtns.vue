<template>
  <div>
    <div class="moduleMangBtnGroup">
      <a class="mangBtn" @click="manageThisItem" v-show="show.isShowManageBtn"><i class="iconfont icon-c"></i>&nbsp;管理项目</a>
      <a class="mangBtn" @click="finshManageThisItem" v-show="show.isShowFinshBtn"><i class="iconfont icon-L"></i>&nbsp;完成</a>
      <a class="addThisItem" @click="addThisItem"><i class="iconfont icon-d"></i>&nbsp;添加此项</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "module-manage-btns",
    data() {
      return {
        show: {
          isShowManageBtn: true,
          isShowFinshBtn: false
        }
      }
    },
    methods: {
      // 管理此项
      manageThisItem() {
        this.show.isShowManageBtn = false
        this.show.isShowFinshBtn = true
        this.$emit('manage-this-item')
      },
      // 完成管理此项
      finshManageThisItem() {
        this.show.isShowManageBtn = true
        this.show.isShowFinshBtn = false
        this.$emit('finsh-manage-this-item')
      },
      // 追加此项
      addThisItem(){
        this.$emit('add-this-item')
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .moduleMangBtnGroup {
    width: 100%;
    height: 40px;
    text-align: center;
    transition:all .5s
  }

  .moduleMangBtnGroup a {
    display: inline-block;
    width: 95px;
    height: 33px;
    line-height: 33px;
    margin-right: 14px;
    background: $color-2e;
    color: $color-fff;
    font-size: 13px;
    border-radius: 3px;
    font-weight: 300;
    cursor:pointer;
  }

  .moduleMangBtnGroup a i {
    font-size: 13px;
  }
</style>
