<template>
  <div class="PDTIV1">
    <h1 class="module_name">{{mi_title_stitle_img.module_name}}</h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in mi_title_stitle_img.content"
        :key="index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index)"
          @up-this-items="UpThisItems(index)"
          @down-this-items="DownThisItems(index)">
        </manage-module-items-tips>
        <div class="mi_itemTitleCon">
          <div class="mi_itemTitleConTitleWrap P_LeftLable">
            <div class="mi_itemTitleConTitleRightCon nowrap">{{item.item_title}}</div>
            <p>{{item.item_s_title}}</p>
          </div>
        </div>
        <div class="mi_itemConWrap MITEMS">
          <div class="mi_choseImgTop">
          </div>
          <div class="mi_itemConWrap_imgWrap">
            <img :src="item.item_img" alt="">
          </div>
        </div>
      </section>
    </transition-group>
    <module-manage-btns
      v-if="show.isShowManageBtn"
      @manage-this-item="manageThisItem"
      @finsh-manage-this-item="finshManageThisItem"
      @add-this-item="addThisItem">
    </module-manage-btns>

  </div>
</template>
<script>
  import manageModuleItemsTips from 'components/businessModules/businessPublicModule/manageModuleItemsTips'
  import moduleManageBtns from 'components/businessModules/businessPublicModule/moduleManageBtns'

  export default {
    name: "product-desc-title-img-module",
    // props: {
    //   mi_title_stitle_img: {
    //     type: Object
    //   }
    // },
    components: {
      moduleManageBtns,
      manageModuleItemsTips
    },
    data() {
      return {
        show: {
          // 是否显示每一项的管理层
          isShowItemstips: false,
          isShowManageBtn: true
        },
        // 小米空气净化器 标题小标题图片模块数据
        mi_title_stitle_img: {
          module_name: '产品简介',
          content: [
            {
              // index: 0,
              item_title: '第一项',
              item_s_title: '说的开了房间开了',
              item_img: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
            },
            {
              // index: 1,
              item_title: '第二项',
              item_s_title: '巴拉罢罢罢觉得健康是否还记得巴拉罢罢罢觉得健康是',
              item_img: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
            },
            {
              // index: 2,
              item_title: '第三项',
              item_s_title: '巴拉罢罢罢觉得健康是否还记得巴拉罢罢罢觉得健康是',
              item_img: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
            }
          ]
        },
      }
    },
    methods: {
      // 管理此项
      manageThisItem() {
        this.show.isShowItemstips = true
      },
      // 完成管理此项
      finshManageThisItem() {
        this.show.isShowItemstips = false
      },
      // 删除某一项
      DelateThisItems(i) {
        this.mi_title_stitle_img.content.splice(i, 1)
      },
      // 上移此项
      UpThisItems(i) {
        let startItems = this.mi_title_stitle_img.content.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.content.slice(i - 1, i)
        this.$set(this.mi_title_stitle_img.content, i, goItems[0])
        this.$set(this.mi_title_stitle_img.content, i - 1, startItems[0])
      },
      // 下移此项
      DownThisItems(i) {
        let startItems = this.mi_title_stitle_img.content.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.content.slice(i + 1, i + 2)
        this.$set(this.mi_title_stitle_img.content, i + 1, startItems[0])
        this.$set(this.mi_title_stitle_img.content, i, goItems[0])
      },
      // 复加此项
      addThisItem() {
        let lastItems = this.mi_title_stitle_img.content[this.mi_title_stitle_img.content.length - 1]
        lastItems.index = (lastItems.index) + 1
        console.log(lastItems)
        this.mi_title_stitle_img.content.push({index:lastItems.index})

        // this.$set(this.mi_title_stitle_img.content, this.mi_title_stitle_img.content.length, lastItems)
        // this.$set(this.mi_title_stitle_img.content[this.mi_title_stitle_img.content.length - 1].index, this.mi_title_stitle_img.content.length, this.mi_title_stitle_img.content[this.mi_title_stitle_img.content.length - 1].index + 1)
        // console.log(this.mi_title_stitle_img.content[this.mi_title_stitle_img.content.length - 1].index)
        // let newItems = this.mi_title_stitle_img.content
        // this.mi_title_stitle_img.content = newItems

        // console.log(thatData[0][thatData.length-1][index])
        // console.log(this.mi_title_stitle_img.content.slice(this.mi_title_stitle_img.content.length - 1,1))
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .list-complete-item,.list-complete-item-move{
    transition: all .3s;
    /*display: inline-block;*/
  }

  .list-complete-enter, .list-complete-leave-to {
    /* .list-complete-leave-active for below version 2.1.8 */
    opacity: 0;
    transform: translateX(100%);
  }
  .list-complete-leave-active {
    position: absolute;
  }

  section {
    position: relative;
    margin-bottom 10px;
  }

  .PDTIV1 {
    width: 100%;
    height auto;
    background $color-fff
  }

  .PDTIV1 h1 {
    text-align: center;
    font-size: 20px;
    color: $color-cyd;
    line-height: 80px
  }

  .mi_itemTitleCon, .mi_itemTitleConTitleWrap {
    width: 100%
  }

  .mi_itemTitleConTitleWrap p {
    padding-left: 9px;
    margin 17px 0;
    line-height: 20px;
    color: $color-5d;
    font-size $font-size-small
  }

  .mi_itemTitleCon {
    padding: 0 16px;
  }

  .mi_itemTitleConTitleRightCon {
    font-size: $font-size-16;
    color: $color-39;
    display: inline-block;
    height: 16px;
    max-width: 300px;
    line-height 16px;
    vertical-align: baseline;
    padding-left: 5px;
  }

  .mi_itemConWrap_imgWrap {
    width: 100%;
  }

  .mi_itemConWrap_imgWrap img {
    width: 100%;
  }
</style>
