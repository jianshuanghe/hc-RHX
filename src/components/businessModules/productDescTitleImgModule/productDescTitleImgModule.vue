<template>
  <div class="PDTIV1" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" id="choseImgFile" class="hide" @change="getThisFile" ref="choseImgFile" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick" :contenteditable="editable">{{mi_title_stitle_img.module_name}}</h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in mi_title_stitle_img.content"
        :key="item.index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index)"
          @up-this-items="UpThisItems(index)"
          @down-this-items="DownThisItems(index)">
        </manage-module-items-tips>
        <div class="mi_itemTitleCon">
          <div class="mi_itemTitleConTitleWrap P_LeftLable">
            <h2 class="mi_itemTitleConTitleRightCon nowrap needsclick"
                :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            >{{item.item_title}}</h2>
            <p :contenteditable="editable" class="needsclick" @click="selectText($event)" :style="editTextOutLine">
              {{item.item_s_title}}</p>
          </div>
        </div>
        <div class="mi_itemConWrap MITEMS">
          <div class="mi_itemConWrap_imgWrap">
            <changeImgTips @change-img="changeImg(index)" v-if="show.isChoseImg">
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
  import manageModuleItemsTips from 'components/businessModules/businessPublicModule/manageModuleItemsTips'
  import moduleManageBtns from 'components/businessModules/businessPublicModule/moduleManageBtns'
  import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
  import lrz from 'lrz'
  import * as API from 'config/api'

  export default {
    name: "product-desc-title-img-module",
    // props: {
    //   mi_title_stitle_img: {
    //     type: Object
    //   }
    // },
    components: {
      moduleManageBtns,
      manageModuleItemsTips,
      changeImgTips
    },
    data() {
      return {
        renderThis: true,
        editable: true,
        choseImg: '',
        show: {
          // 是否显示每一项的管理层
          isShowItemstips: false,
          isShowManageBtn: true,
          isChoseImg:false
        },
        // 小米空气净化器 标题小标题图片模块数据
        mi_title_stitle_img: {
          module_name: '产品简介',
          content: [
            {
              index: 0,
              item_title: '第一项',
              item_s_title: '说的开了房间开了',
              item_img: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
            },
            {
              index: 1,
              item_title: '第二项',
              item_s_title: '巴拉罢罢罢觉得健康是否还记得巴拉罢罢罢觉得健康是',
              item_img: 'https://i1.mifile.cn/f/i/2018/mi8/specs/phone1-1.png'
            },
            {
              index: 2,
              item_title: '第三项',
              item_s_title: '巴拉罢罢罢觉得健康是否还记得巴拉罢罢罢觉得健康是',
              item_img: 'https://i1.mifile.cn/f/i/2018/mi8/summary/infrared.jpg'
            }
          ]
        }
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
        if (this.mi_title_stitle_img.content.length === 1) {
          alert('删除后该模块也会被删除哦，您可以点击添加模块按钮再次添加该模块')
          this.renderThis = false
        } else {
          this.mi_title_stitle_img.content.splice(i, 1)
        }

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
        let lastItems = JSON.parse(JSON.stringify((this.mi_title_stitle_img.content[this.mi_title_stitle_img.content.length - 1])))
        lastItems.index += 1
        this.mi_title_stitle_img.content.push(lastItems)
      },
      // 可编辑文字区域点击全选
      selectText(containerid) {
        if (document.selection && this.editable) {
          var range = document.body.createTextRange();
          range.moveToElementText(containerid.target);
          range.select();
        } else if (window.getSelection && this.editable) {
          var range = document.createRange();
          // range.collapse(false) // 光标追加到最后
          range.selectNodeContents(containerid.target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);

        }
      },
      // 点击图片弹出选择图片按钮
      showChoseImgBtns(){
        if(this.editable){
          this.show.isChoseImg = !this.show.isChoseImg
        }
        return
      },
      // 点击替换图片按钮
      changeImg(i) {
        console.log(i)
        this.choseImgIndex = i
      },
      // 选择后的文件对象并上传
      getThisFile(e) {
        this.show.isChoseImg = false
        this.thisImgFile = e.target.files[0]
        console.log(this.thisImgFile)
        lrz(this.thisImgFile).then((afterImg) => {
          let formData = new FormData()
          formData.append('file', this.thisImgFile)
          formData.append('systemName', 'ruhexiu')
          API._UploadImg(formData).then( (res) => {
            if(res.ret === API.ERROK){
              console.log(res)
              // 当前选择此模块的图片index
              console.log(this.choseImgIndex)
              this.mi_title_stitle_img.content[this.choseImgIndex].item_img = res.httpUrl
            }
          })
          console.log(afterImg)
        })
      }
    },
    computed: {
      editTextOutLine() {
        if (this.editable) {
          return `outline:.02rem dashed rgba(172,172,172,1)`
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .list-complete-item, .list-complete-item-move {
    transition: all .5s;
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
    background $color-fff;
    overflow: hidden;
  }

  .PDTIV1 h1 {
    text-align: center;
    font-size: 20px;
    color: $color-cyd;
    /*line-height: 80px*/
    margin: 40px auto;
    display: block
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
    /*display: inline-block;*/
    /*height: 16px;*/
    /*max-width: 300px;*/
    line-height 16px;
    vertical-align: baseline;
    margin-left: 5px;
    padding: 5px
  }

  .mi_itemConWrap_imgWrap {
    width: 100%;
    position: relative
  }

  .mi_itemConWrap_imgWrap img {
    width: 100%;
  }
</style>
