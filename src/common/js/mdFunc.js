import {addClass, autoTextarea} from 'common/js/dom'
import manageModuleItemsTips from 'components/businessModules/businessPublicModule/manageModuleItemsTips'
import moduleManageBtns from 'components/businessModules/businessPublicModule/moduleManageBtns'
import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
import {mapMutations, mapGetters} from 'vuex'
import {gethashcode} from 'common/js/hash'
import lrz from "lrz";
import * as API from 'config/api'

export const itemsFuncMixin = {
  data() {
    return {
      // 是否渲染此项
      renderThis: true,
      // 是否可编辑
      editable: false,
      // 当前选择的图片在当前项中的path
      choseImgPath: '',
      show: {
        // 是否显示每一项的管理层
        isShowItemstips: false,
        // 是否显示管理按钮
        isShowManageBtn: true,
        // 是否点击选择图片
        isChoseImg: false
      },
      pushMsg: {
        name: '',
        mobile: '',
        cont: ''
      }
    }
  },
  components: {
    moduleManageBtns,
    manageModuleItemsTips,
    changeImgTips
  },
  methods: {
    //提交留言
    pushMsgFunc() {
      this.$refs.pushMsgBtn.disabled = true
      if (!this.editable && this.$route.query.instrucId) {
        API._pushMsgFun(this.$route.query.instrucId, this.pushMsg.mobile, this.pushMsg.name, this.pushMsg.cont).then((res) => {
          this.pushMsg.mobile = ''
          this.pushMsg.name = ''
          this.pushMsg.cont = ''
          if (res.data === 'success') {
            this.$vux.toast.show({
              width: "60%",
              text: "收到您的留言啦！",
              type: "text",
              position: "middle"
            });
            this.setFangWen();
          } else {

          }
        })
      }
    },
    setFangWen () {
      if (this.$route.query.source) {
        console.log('从商机进来');
        if (localStorage.getItem('query')) {
          if (this.$route.query.source === 'FB') {
            console.log('从商机的发现商机进来');
          } else if (this.$route.query.source === 'FI') {
            console.log('从商机的流量页进来');
            let params = { // 记录用户停留时间
              "type":"3",
              "sessionId":this.$route.query.sessionId,
              "instId":Number(this.$route.query.instrucId)
            }
            API._setAdveData(params).then(res => {
              console.log(res);
            });
          }
        }
      }
    },
    kk(k){
      console.log(k, '-----------haha-----------')
    },
    // 点击图片弹出选择图片按钮
    showChoseImgBtns() {
      if (this.editable) {
        this.show.isChoseImg = !this.show.isChoseImg
      }
      return
    },
    // 点击替换图片按钮
    changeImg(i, imgPath) {
      // console.log(i)
      // 当前选择此模块的图片index
      this.show.isChoseImg = false
      this.choseImgPath = imgPath
      console.log(this.choseImgPath)
    },
    // 点击删除图片
    removeImg(index, dataPath) {
      console.log(index)
      console.log(dataPath)
      this.show.isChoseImg = false
      // let thisMain = eval(this.path)
      // thisMain[index][key] = ''
      dataPath.item_img = ''
    },
    // 选择后的文件对象并上传
    getThisFile(e) {
      console.log(e)
      // const that = this
      this.show.isChoseImg = false
      this.thisImgFile = e.target.files[0]
      console.log(this.thisImgFile)
      lrz(this.thisImgFile).then((afterImg) => {
        const that = this
        let formData = new FormData()
        formData.append('file', afterImg.file)
        formData.append('systemName', 'ruhexiu')
        API._UploadImg(formData).then((res) => {
          if (res.ret === API.ERROK) {
            // console.log(res)
            // // that.isThisImg()
            // console.log(that.choseImgPath)
            // //改变选中图片的img
            // that.choseImgPath.item_img = res.httpUrl
            // //push图片名称到图片维护数组以便调用批量上传成功
            // that.TEMP_ROOT_DATA.tempCon.succImgList.push(res.name)
            let fD = new FormData()
            fD.append('fileName', res.name)
            API._uploadSuccess(fD).then((rs) => {
              console.log(fD)
              console.log(rs)
              if (rs.ret === API.ERROK) {
                that.choseImgPath.item_img = rs.httpUrl
                // //改变选中图片的img
                // that.choseImgPath[this.choseImgKey] = res.httpUrl
              }
            })

          }
        })
        console.log(afterImg)
      })
      e.target.value = ''
    },
    // 改变图片并赋值
    isThisImg() {
      console.log('改变图片并赋值')
      console.log(this.path)
      this.thisMainPath = eval(this.path)
    },
    // 管理此项
    manageThisItem() {
      this.show.isShowItemstips = true
    },
    // 完成管理此项
    finshManageThisItem() {
      this.show.isShowItemstips = false
    },
    // 复加此项
    addThisItem() {
      let lastItems = JSON.parse(JSON.stringify((this.sortPath[this.sortPath.length - 1])))
      // lastItems.index += 1
      lastItems.index += Math.random()
      this.sortPath.push(lastItems)
    },
    // 删除某一项
    DelateThisItems(i) {
      if (this.sortPath.length === 1) {
        // alert('删除后该模块也会被删除哦，您可以点击添加模块按钮再次添加该模块')
        this.$createDialog({
          type: 'confirm',
          // icon: 'cubeic-alert',
          title: '温馨提醒',
          content: '删除后该模块也会被删除哦<br><br>点击添加模块可再次添加',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            console.log(this.mdKey)
            this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, this.mdKey)
            for (let i = 0; i < this.TEMP_ROOT_DATA.tempCon.modulesSort.length; i++) {
              if (this.TEMP_ROOT_DATA.tempCon.modulesSort[i] == this.mdKey) {
                this.TEMP_ROOT_DATA.tempCon.modulesSort.splice(i, 1)
              }
            }
            this.renderThis = false
          },
          onCancel: () => {

          }
        }).show()

      } else {
        this.sortPath.splice(i, 1)
      }

    },
    /**上移此项
     * i:此项的index
     * main:待修改的数据指向
     * */
    UpThisItems(i, dataPath) {
      console.log(i)
      console.log(dataPath)
      // let thisMain = eval(this.path)
      let startItems = dataPath.slice(i, i + 1)
      let goItems = dataPath.slice(i - 1, i)
      this.$set(dataPath, i, goItems[0])
      this.$set(dataPath, i - 1, startItems[0])
    },
    // 下移此项
    DownThisItems(i, dataPath) {
      let startItems = dataPath.slice(i, i + 1)
      let goItems = dataPath.slice(i + 1, i + 2)
      this.$set(dataPath, i + 1, startItems[0])
      this.$set(dataPath, i, goItems[0])
    },
  },
  mounted() {
    this.$nextTick(() => {
      //获取到所有textarea并处理自适应高度的问题
      setTimeout(() => {
        let test = document.querySelectorAll('textarea')
        for (let i = 0; i < test.length; i++) {
          autoTextarea(test[i])
        }
      }, 500)
    })
  },
  updated() {
    this.$nextTick(() => {
      //获取到所有textarea并处理自适应高度的问题
      let nowscrollTop = document.body.scrollTop || document.documentElement.scrollTop
      setTimeout(() => {
        let test = document.querySelectorAll('textarea')
        for (let i = 0; i < test.length; i++) {
          autoTextarea(test[i])
        }
        document.documentElement.scrollTop = nowscrollTop
        document.body.scrollTop = nowscrollTop
      }, 1000)
    })
  },
  computed: {
    //编辑状态线
    editTextOutLine() {
      if (this.editable) {
        return `border:.02rem dashed rgba(172,172,172,1);border-radius:6px`
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
  watch: {
    GET_EDITABLE(v) {
      if (v === true) {
        this.editable = true
      } else {
        this.editable = false
        this.show.isShowItemstips = false
      }
    }
  }
}
