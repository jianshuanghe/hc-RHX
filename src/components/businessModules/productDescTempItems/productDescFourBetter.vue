<template>
  <div v-if="renderThis" class="itemRoot">
    <div class="itemTitleCon">
      <div class="P_LeftLable itemTitleConTitleWrap">
        <h2 class="itemTitleConTitleRightCon nowrap needsclick"
            v-html="moduleNamePath.title"
            :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'title')"
        ></h2>
      </div>
    </div>
    <transition-group name="list-complete" tag="div" mode='in-out' class="thisRoot">
      <section class="MITEMS-WRAP list-complete-item thisFoubetterItem"
               v-for="(item,index) in path"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <div v-if="item.item_num"
             v-html="item.item_num"
             class="item_num"
             :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
             @blur="changThisClickData(path[index],$event.target.innerHTML,'item_num')"
        ></div>
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
    name: "product-desc-four-better",
    data() {
      return {
        // 模块的路径
        moduleNamePath: '',
        //模块路径
        path: '',
        choseimgfile: gethashcode()

      }
    },
    created() {
      this.path = this.thisTempData.this_temp_all_module_data.mi_module_product_info.product_desc_four_better.content
      this.moduleNamePath = this.thisTempData.this_temp_all_module_data.mi_module_product_info.product_desc_four_better
    },
    computed: {
      // ...mapGetters([
      //     'GET_UINFO'
      //   ]
      // ),
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
    .thisFoubetterItem
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
        padding 4px
      .item_con
        font-size $font-size-14
        color $color-5d
        max-width 142px
        display inline-block
        text-align left
        line-height 20px
        padding 4px

</style>
