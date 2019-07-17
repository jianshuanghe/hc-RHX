<template>
  <div v-if="renderThis" class="itemRoot">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleName.module_name"
        :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
        @blur="changThisClickData(moduleName,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out' class="thisRoot">
      <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
               v-for="(item,index) in path"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <h2 v-html="item.item_title"
            class="item_title"
            :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')">
        </h2>
        <p v-html="item.item_con"
           :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
           @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
           class="item_con"
        >
        </p>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap item_img">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" class="needsclick" @click.prevent="showChoseImgBtns">
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
    name: "product-desc-how-install",
    data() {
      return {
        choseimgfile: gethashcode(),
        moduleName: '',
        path: ''
      }
    },
    created(){
      this.path = this.thisTempData.this_temp_all_module_data.mi_module_product_install.how_install.content
      this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_install
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .thisRoot
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
        max-width 170px
        margin 25px auto 16px auto
        padding 6px
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

name: "product-desc-how-install"
