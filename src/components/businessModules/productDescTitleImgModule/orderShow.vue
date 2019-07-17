<template>
  <div class="PDTIV1" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea :class="{'module_name needsclick order-product-title':true, 'text': editable}" maxlength="5" :disabled="!editable" v-model="mi_title_stitle_img.title"></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in mi_title_stitle_img.dataList"
        :key="index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index)"
          @up-this-items="UpThisItems(index)"
          @down-this-items="DownThisItems(index)">
        </manage-module-items-tips>
        <!-- <div class="mi_itemTitleCon">
          <div class="mi_itemTitleConTitleWrap P_LeftLable">
            <h2 class="mi_itemTitleConTitleRightCon nowrap needsclick"
                :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            >{{item.item_title}}</h2>
            <p :contenteditable="editable" class="needsclick" @click="selectText($event)" :style="editTextOutLine">
              {{item.item_s_title}}</p>
          </div>
        </div> -->
        <div class="mi_itemConWrap MITEMS" v-show="item.imgUrl">
          <div class="mi_itemConWrap_imgWrap">
            <changeImgTips @change-img="changeImg(item,'imgUrl')"
                           @remove-img="removeImg(item,'imgUrl',index)" :choseimgfile="choseimgfile"  v-if="showItem === index">
            </changeImgTips>
            <img :src="item.imgUrl || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="needsclick" @click.prevent="showChoseImgBtns(item,index)">
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
  import {gethashcode} from 'common/js/hash'
  import {mapMutations, mapGetters} from 'vuex'
  import manageModuleItemsTips from 'components/businessModules/businessPublicModule/manageModuleItemsTips'
  import moduleManageBtns from 'components/businessModules/businessPublicModule/moduleManageBtns'
  import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
  import lrz from 'lrz'
  import * as API from 'config/api'
import { setTimeout } from 'timers';

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
        choseimgfile: gethashcode(),
        show: {
          // 是否显示每一项的管理层
          isShowItemstips: false,
          isShowManageBtn: true,
          isChoseImg:false
        },
        showItem: '', // 点击的图片显示操作按钮
        // 小米空气净化器 标题小标题图片模块数据
        mi_title_stitle_img: {
          type: 'IMG_A',
          title: '产品展示',
          dataList: [
            {
              index: 0,
              // item_title: '第一项',
              // item_s_title: '说的开了房间开了',
              imgUrl: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
            },
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
        this.show.isChoseImg = false
        console.log(this.mi_title_stitle_img)
      },
      // 删除某一项
      DelateThisItems(i) {
        if (this.mi_title_stitle_img.dataList.length === 1) {
          // alert('删除后该模块不可恢复，确定删除么？')
          this.renderThis = true;
          this.mi_title_stitle_img =  {
            type: 'IMG_A',
            title: '产品展示',
            dataList: [
              {
                index: 0,
                // item_title: '第一项',
                // item_s_title: '说的开了房间开了',
                imgUrl: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
              },
            ]
          }
        } else {
          this.mi_title_stitle_img.dataList.splice(i, 1)
        }

      },
      // 上移此项
      UpThisItems(i) {
        let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.dataList.slice(i - 1, i)
        this.$set(this.mi_title_stitle_img.dataList, i, goItems[0])
        this.$set(this.mi_title_stitle_img.dataList, i - 1, startItems[0])
      },
      // 下移此项
      DownThisItems(i) {
        let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.dataList.slice(i + 1, i + 2)
        this.$set(this.mi_title_stitle_img.dataList, i + 1, startItems[0])
        this.$set(this.mi_title_stitle_img.dataList, i, goItems[0])
      },
      // 复加此项
      addThisItem() {
        let lastItems = JSON.parse(JSON.stringify((this.mi_title_stitle_img.dataList[this.mi_title_stitle_img.dataList.length - 1])))
        lastItems.index += 1
        this.mi_title_stitle_img.dataList.push(lastItems)
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
      showChoseImgBtns(item,key){
        console.log(item, key, '-------------------itemAndkye XJ-------------')
        if(this.editable){
          this.showItem = key
        }
        return
      },
      // 点击替换图片按钮
      changeImg(imgPath, key) {
        this.choseImgPath = imgPath
        this.choseImgKey = key
        this.showItem = '' // 将标记置空
      },
      // 点击删除图片
      removeImg(imgPath, key, i) {
        if (this.mi_title_stitle_img.dataList.length === 1) {
          alert('删除后该模块不可恢复，确定删除么？')
          this.renderThis = true;
          this.mi_title_stitle_img =  {
            type: 'IMG_A',
            title: '产品展示',
            dataList: [
              {
                index: 0,
                // item_title: '第一项',
                // item_s_title: '说的开了房间开了',
                imgUrl: 'https://c1.mifile.cn/f/i/15/air2/images/spec-size.png'
              },
            ]
          }
          this.showItem = '' // 将标记置空
        } else {
          this.mi_title_stitle_img.dataList.splice(i, 1)
          this.showItem = '' // 将标记置空
        }
        // imgPath[key] = '';
        // this.mi_title_stitle_img.dataList.splice(index,1)
        // $(e.target).parent().parent().remove();
      },
      // 选择后的文件对象并上传
      getThisFile(e) {
        this.thisImgFile = e.target.files[0]
        console.log(this.thisImgFile)
        lrz(this.thisImgFile).then((afterImg) => {
          const that = this
          let formData = new FormData()
          formData.append('file', afterImg.file)
          formData.append('systemName', 'ruhexiu')
          API._UploadImg(formData).then((res) => {
            if (res.ret === API.ERROK) {
              let fD = new FormData()
              fD.append('fileName', res.name)
              API._uploadSuccess(fD).then((rs) => {
                if (rs.ret === API.ERROK) {
                  that.$set(that.choseImgPath, that.choseImgKey, rs.httpUrl)
                  that.show.isChoseImg = false
                }
              })
            }
          })
          console.log(afterImg)
        })
        e.target.value = ''
      },
    },
    computed: {
      editTextOutLine() {
        if (this.editable) {
          return `outline:.02rem dashed rgba(172,172,172,1)`
        }
      },
      ...mapGetters([
          'GET_TEMP_DATA',
          'GET_EDITABLE',
          'GET_UINFO',
          'GET_IS_PREVIEW',
          'GET_BANNER_HEIGHT',
          'GET_MODULE_ICON'
        ]
      ),
    },
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
    padding 0 12px
    height auto;
    background $color-fff;
    overflow: hidden;
  }

  .PDTIV1 h1 {
    width: 100%;
  height: 16px;
  margin: 40px 0 20px 0;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
    // text-align: center;
    // font-size: 20px;
    // color: $color-cyd;
    // /*line-height: 80px*/
    // margin: 40px auto;
    // display: block
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

    // new
  .order-product-title {
  width: 100%;
  height: 16px;
  margin: 40px 0 20px 0;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
}
.text {
  border: 1px dashed rgb(172, 172, 172);
}
  // new
</style>
