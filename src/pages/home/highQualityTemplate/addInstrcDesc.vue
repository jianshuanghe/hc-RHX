<template>
  <div class="desc">
    <h2>说明书名称</h2>
    <group>
      <x-textarea
        v-model="instrcName"
        :max="20"
        placeholder="为您的说明书起个名字吧。如：小米空气净化器"
        :rows="1"
        class="addinstrcTitle"
      >
      </x-textarea>
    </group>
    <h2>简短介绍</h2>
    <group>
      <x-textarea
        v-model="instrcDesc"
        :max="50"
        placeholder="快用一句话介绍一下您的说明书吧…"
        :rows="3"
        class="addinstrcTitle"
      >
      </x-textarea>
    </group>
      <div class="loadingBox">
        <loading :show="show1" :text="text1"></loading>
      </div>

    <div type="button" value="提交" class="toline" @click="toOnline" :class='{"disabled":disabled}'
           v-if="formal == 200">提交</div>
    <div type="button" value="更新" class="toline" @click="toOnline"  :class='{"disabled":disabled}'
         v-if="updateTing == 200 || wanshan == 200">更新</div>
    <div type="button" value="保存草稿" class="toline" @click="saveDraft" :class='{"disabled":disabled}'
         v-if="draft == 200">保存草稿</div>
    <p class="SkipAddDesc"><a @click="SkipAddDesc" v-if="!wanshan">跳过此项</a></p>
  </div>
</template>

<script>
  import {XTextarea, Group,Loading,Actionsheet} from 'vux'
  // import {itemsFuncMixin} from 'common/js/mdFunc'
  import {_pubInstrc, _updateInstrc, _uploadSuccessBatch, ERROK} from 'config/api'
  import {mapGetters} from 'vuex'
  import LS from 'config/localstorage'

  export default {
    // 创建说明书第三步
    // mixins: [itemsFuncMixin],
    name: "add-instrc-desc",
    data() {
      return {
        disabled: false,
        show1:false,
        text1:'请稍后!',
        // 控制添加的项
        addModules:{},
        instrcName: '' || this.$store.state.instrucTitle,
        instrcDesc: '' || this.$store.state.instrucIntro,
        // instrcName: '',
        // instrcDesc: '',
        title: '测试',
        //更新状态吗
        updateTing: this.$route.query.update,
        //完善信息
        wanshan: this.$route.query.wanshan,
        //存草稿状态码
        draft: this.$route.query.draft,
        // 正式提交发布
        formal: this.$route.query.formal,
        // succImgListLength: this.LS.getItem('_IN_DATA').tempCon.succImgList.length,
        factoryCode:''
      }
    },
    components: {
      XTextarea,
      Group,
      Loading,
      Actionsheet
    },
    watch: {
      instrcName: {
        handler(newName, oldName) {
          console.log(newName);
          (newName !== '' && this.instrcDesc !=='') ? this.disabled = false : this.disabled = true;
        },
        deep: true
      },
      instrcDesc: {
        handler(newName, oldName) {
          (newName !== '' && this.instrcName !=='') ? this.disabled = false : this.disabled = true;
        },
        deep: true
      }
    },
    methods: {
      // 模块
      addMod(i){
          if(i.content==null){
            console.log("000")
            // LS.setItem("addId",i.content.id)
            this.addModules.id = LS.getItem("addId");
          } else {
            console.log("111")
            LS.setItem("addId",i.content.id)
            this.addModules.id = i.content.id;
          }
          this.addModules.base = LS.getItem("base") || 0;
          this.addModules.imgC1 = LS.getItem("imgC1") || 0;
          this.addModules.imgC2 = LS.getItem("imgC2") || 0;
          this.addModules.imgC3 = LS.getItem("imgC3") || 0;
          if(!this.$route.query.update){
            this.addModules.addM1 = LS.getItem("addM1") || false;
            this.addModules.addM2 = LS.getItem("addM2") || false;
            this.addModules.addM3 = LS.getItem("addM3") || false;
            this.addModules.addM4 = LS.getItem("addM4") || false;
            this.addModules.addM5 = LS.getItem("addM5") || false;
          }
          LS.setItem("addModules",this.addModules)
      },
      //存储名字和简介到本地以便跳转绑定手机号页面回来后取到
      saveNameDesc() {
        this.LS.setItem('instrcName', this.instrcName)
        this.LS.setItem('instrcDesc', this.instrcDesc)
      },
      //删除本地存储的名字和简介
      delNameDesc() {
        this.LS.removeItem('instrcName')
        this.LS.removeItem('instrcDesc')
      },
      // 发布上线
      toOnline() {
        if ((this.$route.query.wanshan == 200 || this.$route.query.update == 200 ) && this.disabled === true) {
          this.$vux.toast.show({
            type: 'text',
            width: "7.6rem",
            // position: "bottom",
            text: "请填写新的说明书名称和简短介绍！",
            time: 1500,
          });
          return
        }
        if (this.disabled === true){
          this.$vux.toast.show({
            type: 'text',
            width: "7.6rem",
            // position: "bottom",
            text: "说明书名称和简短介绍不能为空！",
            time: 1500,
          });
          return
        }
        this.show1 = true; // 显示loading
        if (this.LS.getItem("userId")) {
          //直接发布上线
          if (this.updateTing != '200' && this.wanshan != '200') {
            // _uploadSuccessBatch(this.LS.getItem('_IN_DATA').tempCon.succImgList).then((res) => {
            //   console.log(res)
            //   if (res.ret === ERROK) {
              let params = [
                this.instrcName,
                this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
                this.LS.getItem('_IN_DATA').tempId,
                this.instrcDesc,
                '1',
                JSON.stringify(this.LS.getItem('_IN_DATA')),
                this.LS.getItem('_IN_DATA').path,
                this.$route.query.instrucCustType
              ]
            console.log(params);
                _pubInstrc(
                  this.instrcName,
                  this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
                  this.LS.getItem('_IN_DATA').tempId,
                  this.instrcDesc,
                  '1',
                  JSON.stringify(this.LS.getItem('_IN_DATA')),
                  this.LS.getItem('_IN_DATA').path,
                  this.$route.query.instrucCustType
                ).then((r) => {
                  console.log(r)
                  this.addMod(r);
                  console.log('直接发布上线')
                  // alert('贾柳ERROK' + ERROK)
                  // alert('贾柳res.ret' + r.ret)
                  if (r.ret == ERROK) {
                    this.show1 = false; // 隐藏loading
                    this.delNameDesc()
                    this.$router.push({path: "/pubsucc", query: {qrUrl: r.content.qrUrl}})
                    // 清空getInstrucTitle和getInstrucIntro
                    this.$store.commit('getInstrucTitle','')
                    this.$store.commit('getInstrucIntro','')
                  } else {
                    this.show1 = false; // 隐藏loading
                    // alert(r.msg)
                    // alert('是贾柳吗？')
                  }
                })
              // }
              // else {
              //   this.$vux.toast.show({
              //     text: res.msg,
              //     type: "text",
              //     position: "middle",
              //   });
              // }
            // })

          } else {
            if (this.disabled === true){
              return
            }
            this.show1 = true; // 显示loading
            // 更新一波
            // _uploadSuccessBatch(this.LS.getItem('_IN_DATA').tempCon.succImgList).then((res) => {
            //   if (res.ret == ERROK) {
                _updateInstrc(
                  this.$route.query.instrucId,
                  this.instrcName,
                  this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
                  this.instrcDesc,
                  JSON.stringify(this.LS.getItem('_IN_DATA'))
                ).then((res) => {
                  console.log(res)
                  this.addMod(res);
                  console.log('更新一波')
                  if (res.ret === ERROK) {
                    this.show1 = false; // 隐藏loading
                    this.$vux.toast.show({
                      text: "更新成功",
                      type: "text",
                      position: "middle",
                      onHide: () => {
                        this.delNameDesc()
                        this.$router.push("/myInstructions")
                      }
                    });
                    // 清空getInstrucTitle和getInstrucIntro
                    this.$store.commit('getInstrucTitle','')
                    this.$store.commit('getInstrucIntro','')
                  } else {
                    this.show1 = false; // 隐藏loading
                    console.log(res.msg)
                  }
                })
              // }
              // else {
              //   this.$vux.toast.show({
              //     text: res.msg,
              //     type: "text",
              //     position: "middle"
              //   });
              // }
            // })

          }
        } else {
          this.saveNameDesc()
          this.$router.push({path: "/tel"})
        }


      },
      //保存草稿
      saveDraft() {
        if (this.$route.query.draft == 200 && this.disabled === true) {
          this.$vux.toast.show({
            type: 'text',
            width: "7.6rem",
            // position: "bottom",
            text: "请填写新的说明书名称和简短介绍！",
            time: 1500,
          });
          return
        }
        if (this.disabled === true){
          return
        }
        this.show1 = true; // 显示loading
        if (this.LS.getItem("userId")) {
          // _uploadSuccessBatch(this.LS.getItem('_IN_DATA').tempCon.succImgList).then((res) => {
          //   if (res.ret == ERROK) {
              _pubInstrc(
                this.instrcName,
                this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
                this.LS.getItem('_IN_DATA').tempId,
                this.instrcDesc,
                '0',
                JSON.stringify(this.LS.getItem('_IN_DATA')),
                this.LS.getItem('_IN_DATA').path,
                this.$route.query.instrucCustType
              ).then((res) => {
                console.log(res)
                this.addMod(res);
                if (res.ret === ERROK) {
                  this.show1 = false; // 隐藏loading
                  this.delNameDesc()
                  this.$router.push({path: "/myInstructions"})
                } else {
                  this.show1 = false; // 隐藏loading
                  alert(res.msg)
                }
              })
            // }
            // else {
            //
            // }
          // })
        }
        // else {
        //   this.saveNameDesc()
        //   this.$router.push({path: "/tel"})
        // }

      },
      // 跳过此项直接发布上线
      SkipAddDesc() {
        this.show1 = true; // 显示loading
        if (this.LS.getItem("userId")) {
          if (this.formal == '200') {
            this.inStatus = 1
          } else if (this.draft == '200') {
            this.inStatus = 0
          }else if(this.updateTing == '200'){
            this.inStatus = 2
          }
          let inData = this.LS.getItem('_IN_DATA');
          delete inData._id;
          this.LS.setItem("_IN_DATA", JSON.parse(JSON.stringify(inData)));
          if(this.inStatus == 1 || this.inStatus == 0 ){
            _pubInstrc(
              this.LS.getItem('instrcName'),
              this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
              this.LS.getItem('_IN_DATA').tempId,
              this.LS.getItem('instrcDesc'),
              this.inStatus,
              JSON.stringify(this.LS.getItem('_IN_DATA')),
              this.LS.getItem('_IN_DATA').path,
              this.$route.query.instrucCustType
            ).then((res) => {
              console.log('请求了跳过链接')
              console.log(res)
              if (res.ret == ERROK) {
                this.show1 = false; // 隐藏loading
                this.delNameDesc()
                this.addMod(res);
                console.log('删除本地存储的名字和简介')
                if (this.inStatus == 0) {
                  console.log('跳转我的说明书')
                  this.$router.push("/myInstructions")
                } else {
                  console.log('跳转发布成功')
                  this.$router.push({path: "/pubsucc", query: {qrUrl: res.content.qrUrl}})
                }

              } else {
                this.show1 = false; // 隐藏loading
                alert(res.msg)
              }
            })
          }else if(this.inStatus == 2){
            _updateInstrc(
              this.$route.query.instrucId,
              this.instrcName,
              this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
              this.instrcDesc,
              JSON.stringify(this.LS.getItem('_IN_DATA'))
            ).then((res) => {
              console.log(res)
              console.log('跳过此项更新一波')
              this.addMod(res);
              if (res.ret === ERROK) {
                this.show1 = false; // 隐藏loading
                this.$vux.toast.show({
                  text: "更新成功",
                  type: "text",
                  position: "middle",
                  onHide: () => {
                    this.delNameDesc()
                    this.$router.push("/myInstructions")
                  }
                });
              } else {
                this.show1 = false; // 隐藏loading
                alert(res.msg)
              }
            })
          }

        } else {
          this.saveNameDesc()
          this.$router.push({path: "/tel"})
        }

      }

    },
    computed: {
      ...mapGetters([
          'GET_TEMP_DATA',
          'GET_EDITABLE',
          'GET_UINFO',
          'GET_IS_PREVIEW',
          'GET_BANNER_HEIGHT',
          'GET_MODULE_ICON'
        ]
      )
    },
    mounted() {
      this.instrcData = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
      if (this.$route.query.wanshan == 200) {
        this.instrcName = this.$route.query.instrucTitle
        this.instrcDesc = this.$route.query.instrucIntro
      } else if (this.$route.query.update == 200) {
        this.instrcName = this.LS.getItem('instrcName')
        this.instrcDesc = this.LS.getItem('instrcDesc')
      }
      if ( this.instrcName === '' ||  this.instrcDesc === '') {
        this.disabled = true;
      }
      console.log( this.instrcName, this.instrcDesc, '------------------this.instrcDesc, this.instrcName-----------------')
    },
    updated() {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addinstrcTitle {
    font-size 14px !important
    padding 0 !important
    background #f9f9f9
  }

  .addinstrcTitle > .weui-cell__bd > textarea {
    background #f9f9f9
  }

  .addinstrcTitle > .weui-cell__bd > textarea:focus {
    border none !important
    box-shadow none
  }

  .addinstrcTitle > .weui-cell__bd > textarea::-webkit-input-placeholder {
    color: #BDBDBD
  }

  .toline {
    width: 92vw;
    height: 14vw;
    font-size: 4.2vw;
    color: #fff;
    background: #02c2a2;
    border-radius: 1vw;
    font-weight: 90vw;
    margin: 11vw auto 11vw auto;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    text-align: center;
    line-height: 14vw;
  }
    .disabled{
      background:#98e4d8 !important
    }

  .toline:disabled {
    opacity 0.5
  }

  .SkipAddDesc {
    text-align center
    font-size 16px
    color #02C2A2
    cursor pointer
  }

  .desc
    width 345px
    left 0
    right 0
    margin 40px auto
    h2
      margin-top 10px
      font-size 14px
      color #2E2E30

</style>
