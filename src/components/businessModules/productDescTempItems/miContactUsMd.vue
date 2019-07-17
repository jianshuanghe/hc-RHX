<template>
  <div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled="!editable"
    ></textarea>
    <!--联系信息-->
    <div class="callUs">
      <div class="itemTitleCon">
        <div class="itemTitleConTitleWrap P_LeftLable">
      <textarea class="itemTitleConTitleRightCon"
                ref="test"
                :style="editTextOutLine"
                :disabled="!editable"
                v-model="sortPath[0].item_title"
      >联系方式</textarea>
          <!-- @input = "item.item_title = $event.target.innerHTML"-->
          <!--<p class="needsclick" v-html="item.s_title"></p>-->
        </div>
      </div>
      <div class="itemConWrap MITEMS">
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-dianhua1"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>电话</h3>
            <textarea
              v-model="sortPath[0].companyPhone"
              :disabled="!editable"
              :style="editTextOutLine"
            >400-8899-202</textarea>
          </div>
        </div>
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-youxiang1"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>邮箱</h3>
            <textarea
              v-model="sortPath[0].companyEmail"
              :disabled="!editable"
              :style="editTextOutLine"
            ></textarea>
          </div>
        </div>
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-tubiao201"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>地址</h3>
            <textarea
              v-model="sortPath[0].companyAddress"
              :disabled="!editable"
              :style="editTextOutLine"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!--留言模块-->
    <div class="pushMsg">
      <div class="itemTitleCon">
        <div class="itemTitleConTitleWrap P_LeftLable">
      <textarea class="itemTitleConTitleRightCon"
                :style="editTextOutLine"
                v-model="sortPath[1].item_title"
                :disabled="!editable"
      ></textarea>
          <!--ref="test"-->
        </div>
      </div>
      <div class="pushMsgCon">
        <br>
        <input type="text" placeholder="如何称呼您" v-model="pushMsg.name">
        <input type="tel"
               placeholder="在这里输入联系电话哦"
               maxlength="11"
               v-model="pushMsg.mobile"
        ><textarea name="" id="" cols="30" rows="10" placeholder="说点什么吧，我可是非常期待呢"
                   v-model="pushMsg.cont"
                   maxlength="300"
      ></textarea>
      </div>
      <button class="pushMsgBtn"
              ref="pushMsgBtn"
              :disabled="!pushMsg.mobile||!pushMsg.name||!pushMsg.cont"
              @click="pushMsgFunc"

      >提 交 信 息</button>
    </div>
  </div>
</template>

<script>
  import {itemsFuncMixin} from 'common/js/mdFunc'
  import {gethashcode} from 'common/js/hash'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name: "mi-contact-us-md",
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
      this.mdKey = "mi_contact"
      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].contactCon
      console.log(this.TEMP_ROOT_DATA, '-------------父组件传到联系我们的数据-----------------------' )
      let uinfo = JSON.parse(localStorage.getItem('uinfo')); // 读取缓存的用户信息
      console.log(uinfo, '缓存中的用户信息');
      this.pushMsg.mobile = uinfo.userPhone; // 获取缓存中用户信息手机号
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
          this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].contactCon = newValue
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
  .callUs
    .callUsItems
      padding 0 16px;
      min-height 44px
      font-size 0
      margin 12px auto
      .callUsIcons
        width 44px
        height 44px
        line-height 44px
        text-align center
        background $color-cyd
        border-radius 22px
        display inline-block
        vertical-align middle
        margin 10px auto
        i
          color $color-fff
          font-size 24px
      .callUsIconsRight
        /*height 44px*/
        width 280px
        display inline-block
        vertical-align middle
        padding-left 20px
        h3
          font-size 14px
          font-weight 300
          color $color-34
        textarea
          font-size 15px
          color $color-cyd
          display block
          width 100%
          height 20px
          line-height 20px
          margin-top 4px

  .pushMsg
    margin-top 36px
    .pushMsgCon
      text-align center
      input, textarea
        width 310px
        height 44px
        line-height 44px
        margin 10px auto
        border 1px solid #DDDBD5
        text-indent 1em
        font-size 14px
        color $color-5d
        &::-webkit-input-placeholder
          color $color-cyd
          font-weight 300
      textarea
        height auto
        box-sizing border-box !important
        line-height 22px !important
        padding 1em
        overflow-y scroll !important
        text-indent 0
        &:focus
          border 1px solid #DDDBD5 !important
          box-shadow none !important

    .pushMsgBtn
      width 308px
      height 44px
      background $color-cyd
      font-size 16px
      color $color-fff
      font-weight 300
      border-radius 3px
      margin 18px auto
      display block
      &:disabled
        opacity .7
</style>
