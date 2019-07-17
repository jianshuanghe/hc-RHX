<template>
  <div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleName.module_name"
        :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
        @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in path"
        :key="item.index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <!-- @blur 传递的数据依次是 1：待更改数据的指向.2:新值.3:属性值-->
            <h2 class="itemTitleConTitleRightCon nowrap needsclick" v-html="item.item_title"
                :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
                @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')"
            ></h2>
            <!-- @input = "item.item_title = $event.target.innerHTML"-->
            <p :contenteditable="editable"
               class="needsclick"
               @click="selectText($event)"
               :style="editTextOutLine"
               v-if="item.item_s_title"
               v-html="item.item_s_title"
               @blur="changThisClickData(path[index],$event.target.innerHTML,'item_s_title')"
            ></p>
          </div>
        </div>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns">
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

  import {itemsFuncMixin} from 'common/js/itemsFuncMixin'
  import {gethashcode} from 'common/js/hash'

  export default {
    mixins: [itemsFuncMixin],
    name: "product-desc-title-img-items",
    computed: {
      // ...mapGetters([
      //     'GET_TEMP_DATA'
      //   ]
      // ),
    },
    data() {
      return {
        // 选择图片文件的id
        choseimgfile: gethashcode(),
        // 模块的名字
        moduleName: '',
        // 模块的路径
        moduleNamePath: '',
        //模块路径
        path: ''
      }
    },
    created() {
      this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_info
      this.moduleNamePath = this.thisTempData.this_temp_all_module_data.mi_module_product_info.top_title_middle_stitle_btm_img
      this.path = this.thisTempData.this_temp_all_module_data.mi_module_product_info.top_title_middle_stitle_btm_img.content
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import '~common/stylus/variable'*/


</style>
