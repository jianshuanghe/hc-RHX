<template>
  <div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled='!editable'
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section class="MITEMS-WRAP list-complete-item"
               v-for="(item,index) in dataPath.careCon" :key="item.index">
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.careCon)"
          @up-this-items="UpThisItems(index,dataPath.careCon)"
          @down-this-items="DownThisItems(index,dataPath.careCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      v-model="item.title"
                      :style="editTextOutLine"
                      :disabled="!editable"
            ></textarea>
            <textarea
              v-model="item.s_title"
              class="itemTitleConStitle"
              :style="editTextOutLine"
              :disabled="!editable"
            ></textarea>
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
    name: "mi-care",
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
      this.mdKey = "mi_care"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].careCon
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
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].careCon = newValue
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
