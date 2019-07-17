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
               v-for="(item,index) in dataPath.descCon" :key="item.index">
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.descCon)"
          @up-this-items="UpThisItems(index,dataPath.descCon)"
          @down-this-items="DownThisItems(index,dataPath.descCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <!-- @blur 传递的数据依次是 1：待更改数据的指向.2:新值.3:属性值-->
            <!--<h2 class="itemTitleConTitleRightCon nowrap needsclick" v-html="item.title"></h2>-->
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      id="test"
                      v-model="item.title"
                      :style="editTextOutLine"
                      :disabled="!editable"
            ></textarea>
            <!-- @input = "item.item_title = $event.target.innerHTML"-->
            <!--<p class="needsclick" v-html="item.s_title"></p>-->
            <textarea
              v-model="item.s_title"
              class="itemTitleConStitle"
              :style="editTextOutLine"
              :disabled="!editable"
            ></textarea>

          </div>
        </div>
        <div class="itemConWrap MITEMS">
          <div class="itemConWrap_imgWrap">
            <!--<changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.descCon[index])"-->
                           <!--@remove-img="removeImg(index,dataPath.descCon[index])" :choseimgfile="choseimgfile">-->
            <!--</changeImgTips>-->
            <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.descCon[index])"
                           @remove-img="removeImg(index,dataPath.descCon[index])" :choseimgfile="choseimgfile">
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
    name: "mi-desc-md",
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
      this.mdKey = "mi_desc"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
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
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon = newValue
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
  // 切换顺序动效
  .list-complete-item, .list-complete-item-move {
    transition: all .5s;
    margin-top 20px
    /*display: inline-block;*/
  }

  //*{
  //  transition all 0.5s
  //}
  .list-complete-enter, .list-complete-leave-to {
    /* .list-complete-leave-active for below version 2.1.8 */
    opacity: 0;
    height: 10px;
    //transform: translate(100%,100%);
    transform: scale(.3);
  }

  .list-complete-leave-active {
    position: absolute;
  }
</style>
