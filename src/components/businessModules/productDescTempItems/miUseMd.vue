<template>
  <div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              :style="editTextOutLine"
              :disabled="!editable"
              v-model="dataPath.icon.moduleTitle"
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out' class="">
    <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
             v-for="(item,index) in dataPath.useCon" :key="item.index">
      <manage-module-items-tips
        v-show="show.isShowItemstips" :tIndex="index"
        @delate-this-items="DelateThisItems(index,dataPath.useCon)"
        @up-this-items="UpThisItems(index,dataPath.useCon)"
        @down-this-items="DownThisItems(index,dataPath.useCon)">
      </manage-module-items-tips>
      <div class="itemTitleConTitleWrap">
        <textarea
          class="itemTitleConTitleRightCon"
          :style="editTextOutLine"
          :disabled="!editable"
          v-model="item.title"
        >
        </textarea>
        <textarea
          class="itemTitleConStitle"
          :style="editTextOutLine"
          :disabled="!editable"
          v-model="item.s_title"
        ></textarea>
      </div>
      <div class="itemConWrap MITEMS">
        <div class="itemConWrap_imgWrap">
          <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.useCon[index])"
                         @remove-img="removeImg(index,dataPath.useCon[index])" :choseimgfile="choseimgfile">
          </changeImgTips>
          <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns" v-if="item.item_img">
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
    mixins: [itemsFuncMixin],
    name: "mi-use-md",
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
      this.mdKey = "mi_use"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].useCon
    },
    watch: {
      dataPath:{
        handler(newValue,oldValue){
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey] = newValue
          this.$store.commit('SET_TEMP_DATA', JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
          // this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        },
        deep:true
      },
      sortPath:{
        handler(newValue,oldValue){
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].useCon = newValue
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
  .how_use_item_title
    font-size 16px
    color #393939
    max-width 360px
    margin 17px auto 10px auto
    padding 10px

  .how_use_item_con
    max-width 360px
    margin 0 auto 20px auto
    padding 10px
    font-size 12px
    line-height 18px
</style>
