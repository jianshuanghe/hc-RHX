<template>
  <div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled='!editable'
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section class="MITEMS-WRAP list-complete-item"
        v-for="(item,index) in dataPath.canshuCon"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.canshuCon)"
          @up-this-items="UpThisItems(index,dataPath.canshuCon)"
          @down-this-items="DownThisItems(index,dataPath.canshuCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      :style="editTextOutLine"
                      :disabled="!editable"
                      v-model="item.title"
            ></textarea>
          </div>
        </div>
        <div class="itemConWrap MITEMS">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.canshuCon[index])"
                           @remove-img="removeImg(index,dataPath.canshuCon[index])" :choseimgfile="choseimgfile">
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
    name: "mi-canshu-md",
    mixins: [itemsFuncMixin],
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
      this.mdKey = "mi_canshu"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].canshuCon
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
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].canshuCon = newValue
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

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
