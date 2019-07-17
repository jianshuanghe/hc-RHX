<template>
  <div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleNamePath.module_name"
        :contenteditable="editable"
        :style="editTextOutLine"
        @click="selectText($event)"
        @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in path"
        :key="item.index"
        class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <h2 v-html="item.item_title"
            class="how_use_item_title"
            :contenteditable="editable"
            :style="editTextOutLine"
            @click="selectText($event)"
            @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')"

        >
          <!--@blur="changThisClickData(`${path}[${index}]`,$event.target.innerHTML,'item_title')"-->
        </h2>
        <p v-html="item.item_con"
           class="how_use_item_con"
           :contenteditable="editable"
           :style="editTextOutLine"
           @click="selectText($event)"
           @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
        >

        </p>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips
              v-if="show.isChoseImg"
              @change-img="changeImg(index)"
              @remove-img="removeImg(index,'item_img')"
              :choseimgfile="choseimgfile">
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
    name: "product-desc-how-use",
    data() {
      return {
        // 选择图片文件的id
        choseimgfile: gethashcode(),
        moduleNamePath: '',
        //模块路径
        path: ''
      }
    },
    created() {
      this.moduleNamePath = this.thisTempData.this_temp_all_module_data.mi_module_product_use
      this.path = this.thisTempData.this_temp_all_module_data.mi_module_product_use.how_use.content
    }
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
