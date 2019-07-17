<template>
  <div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled="!editable"></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out' class="installRoot">
      <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
               v-for="(item,index) in dataPath.installCon" :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.installCon)"
          @up-this-items="UpThisItems(index,dataPath.installCon)"
          @down-this-items="DownThisItems(index,dataPath.installCon)">
        </manage-module-items-tips>
        <textarea
          v-model="item.title"
          placeholder="请输入..."
          class="item_title"
          :style="editTextOutLine"
          :disabled="!editable"></textarea>
        <textarea
          class="item_con"
          v-model="item.item_con"
          placeholder="请输入..."
          :style="editTextOutLine"
          :disabled="!editable"></textarea>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap item_img">
            <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.installCon[index])"
                           @remove-img="removeImg(index,dataPath.installCon[index])" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" class="needsclick" @click.prevent="showChoseImgBtns" v-if="item.item_img">
          </div>
        </div>
      </section>
    </transition-group>
    <module-manage-btns
      v-if="editable"
      @manage-this-item="manageThisItem"
      @finsh-manage-this-item="finshManageThisItem"
      @add-this-item="addThisItem">
    </module-manage-btns>
  </div>
</template>

<script>
  import {itemsFuncMixin} from 'common/js/mdFunc'
  import {gethashcode} from 'common/js/hash'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name: "mi-install-md",
    mixins:[itemsFuncMixin],
    props: ['TEMP_ROOT_DATA'],
    data() {
      return {
        // 选择图片文件的id
        choseimgfile: gethashcode(),
        //根数据路径
        dataPath: '',
        //排序追加项目专用数据指向
        sortPath: '',
        //模块的key
        mdKey: ''
      }
    },
    created() {
      this.mdKey = "mi_install"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
    },
    watch: {
      dataPath:{
        handler(newValue,oldValue){
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey] = newValue
          this.$store.commit('SET_TEMP_DATA', JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
        },
        deep:true
      },
      sortPath:{
        handler(newValue,oldValue){
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon = newValue
          this.$store.commit('SET_TEMP_DATA', JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
        },
        deep:true
      }
    },
    ...mapMutations({
      setTempData: 'SET_TEMP_DATA'
    })
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .installRoot
    display flex
    flex-wrap wrap
    justify-content center
    align-items flex-start
    align-content flex-start
    .mi_install_thisItem
      flex 1 1 50%
      text-align center
      .item_num
        min-width 50px
        max-width 375px
        min-height 50px
        line-height 50px
        font-size 30px
        border-radius 25px
        color $color-fff
        display inline-block
        background $color-cyd
        margin-top 50px
      .item_title
        font-size $font-size-18
        color $color-34
        width 170px
        margin 25px auto 16px auto
        padding 3px
        text-align center
        height 24px
        line-height 24px
        display block
      .item_con
        font-size $font-size-14
        color $color-5d
        max-width 144px
        display inline-block
        text-align left
        line-height 20px
        padding 10px
      .itemConWrap_imgWrap
        margin 0 auto
      .item_img
        width 178px
        height 210px
        margin-top 25px
        img
          width 100%
          height 100%

</style>
