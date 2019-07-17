<template>
  <div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->

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
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns">
            <div v-html="item.item_con"
                 class="mi_health_item_con"
                 :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
                 @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
            >

            </div>
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
    name: "product-desc-scenes",
    data() {
      return {
        // 选择图片文件的id
        choseimgfile: gethashcode(),
        path: ''
      }
    },
    created() {
      this.path = this.thisTempData.this_temp_all_module_data.mi_module_product_info.product_desc_scenes.content
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .mi_health_item_con
    font-size $font-size-small
    background rgba(2, 194, 162, 1)
    min-height 88px
    margin-top -88px
    position relative
    color $color-fff
    font-weight 300
    box-sizing border-box
    padding 30px 16px
    line-height 16px
</style>

