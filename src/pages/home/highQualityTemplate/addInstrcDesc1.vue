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
    <input type="button" value="提交" class="toline" @click="toOnline" :disabled="!instrcName||!instrcDesc"
          >
    <input type="button" value="更新" class="toline" @click="toOnline" :disabled="!instrcName||!instrcDesc"
           v-if="updateTing == 200 || wanshan == 200">
    <input type="button" value="保存草稿" class="toline" @click="saveDraft" :disabled="!instrcName||!instrcDesc"
           v-if="draft == 200">
    <p class="SkipAddDesc"><a @click="SkipAddDesc" v-if="!wanshan">跳过此项</a></p>
  </div>
</template>

<script>
  import {XTextarea, Group} from 'vux'
  // import {itemsFuncMixin} from 'common/js/mdFunc'
  import {_pubInstrc, _updateInstrc, _uploadSuccessBatch, ERROK} from 'config/api'
  import {mapGetters} from 'vuex'

  export default {
    // 创建说明书第三步
    // mixins: [itemsFuncMixin],
    name: "add-instrc-desc",
    data() {
      return {
        instrcName: '' || this.LS.getItem('instrcName'),
        instrcDesc: '' || this.LS.getItem('instrcDesc'),
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
      Group
    },
    methods: {
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
        if (this.LS.getItem("userId")) {
          console.log("AAA")
          //直接发布上线
          if (this.updateTing != '200' && this.wanshan != '200') {
            // _uploadSuccessBatch(this.LS.getItem('_IN_DATA').tempCon.succImgList).then((res) => {
            //   console.log(res)
            //   if (res.ret === ERROK) {
                _pubInstrc(
                  this.instrcName,
                  this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
                  this.LS.getItem('_IN_DATA').tempId,
                  this.instrcDesc,
                  '1',
                  JSON.stringify(this.LS.getItem('_IN_DATA')),
                  this.LS.getItem('_IN_DATA').path
                ).then((r) => {
                  console.log(r)
                  console.log('直接发布上线')
                  // alert('贾柳ERROK' + ERROK)
                  // alert('贾柳res.ret' + r.ret)
                  if (r.ret == ERROK) {
                    this.delNameDesc()
                    this.$router.push({path: "/pubsucc", query: {qrUrl: r.content.qrUrl}})
                  } else {
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
                  console.log('更新一波')
                  if (res.ret === ERROK) {
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
                    alert(res.msg)
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
                this.LS.getItem('_IN_DATA').path
              ).then((res) => {
                console.log(res)
                if (res.ret === ERROK) {
                  this.delNameDesc()
                  this.$router.push({path: "/myInstructions"})
                } else {
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
              "如何定制",
              this.LS.getItem('_IN_DATA').tempCon.banner[0].picUrl,
              this.LS.getItem('_IN_DATA').tempId,
              "如何定制",
              this.inStatus,
              JSON.stringify(this.LS.getItem('_IN_DATA')),
              this.LS.getItem('_IN_DATA').path
            ).then((res) => {
              console.log('请求了跳过链接')
              if (res.ret == ERROK) {
                this.delNameDesc()
                console.log('删除本地存储的名字和简介')
                if (this.inStatus == 0) {
                  console.log('跳转我的说明书')
                  this.$router.push("/myInstructions")
                } else {
                  console.log('跳转发布成功')
                  this.$router.push({path: "/pubsucc", query: {qrUrl: res.content.qrUrl}})
                }

              } else {
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
              if (res.ret === ERROK) {
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
          // const d = [{uuid:}]
      }
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
    width 345px;
    height 45px;
    font-size 16px;
    color #fff
    background #02C2A2
    border-radius 3px
    font-weight 300x
    margin 40px auto 30px auto
    transition all 0.3s
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
