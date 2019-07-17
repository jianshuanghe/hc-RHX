<template>
  <div class="ITC-ROOT">
    <!--思路1 遍历data中的-->
    <!--<draggable  :move="getdata" @update="datadragEnd" :options="{animation:500}">-->
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <div v-for="(m,index) in mixArray" :key="index" class="list-complete-item">
        <!--index控制模块的顺序-->
        <component
          v-bind:is="m"
          :key="index"
          @add-module="showAddModule"
          @sort-module="sortModule"
          @temp-preview="tempPreview"
          @add-desc="addDesc">
        </component>
      </div>
    </transition-group>
    <!--</draggable>-->
    <!--立即使用按钮-->
    <div class="confirm" ref="confirm" id="confirm" @click="goEdit">去编辑</div>
    <!--选择模块模框-->
    <div class="selModule" :style="selModuleHeight" id="selModule" ref="selModule">
      <div class="selModuleWrap">
        <h2 class="selModuleTitle">添加模块<i class="iconfont icon-L1" @click="hideAddModule"></i></h2>
        <div class="modulesCon" v-if="GET_TEMP_DATA.module_icon">
          <div class="modulesConItems"
               v-for="(item,index) in MDimgs"
               :key="index"
          >
            <img :src="item.module_img" alt=""
                 @click.prevent="selThiMd(item,$event.target,index)"
                 :class="{'light':selMdTips === index}">
          </div>
        </div>
        <input type="button" value="添加" ref="addTisMd" class="addTisMd"
               @click="pushMd(selMdTips)">
      </div>
    </div>
    <!--排序模框-->
    <div class="sortModule" ref="sortModule">
      <div class="sortModuleWrap">
        <h2 class="sortModuleWrapTitle">拖动排序哟<i class="iconfont icon-L1" @click="hideSortModule"></i></h2>
        <draggable
          class="sortStart"
          v-model="MIcon"
          :move="getdata"
          @update="datadragEnd"
          :options="{animation:500}">
          <div v-for="(item,index) in MIcon" :key="index" class="sortItem">
            <h2><i class="iconfont icon-L4"></i>{{item.module_name}}</h2>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {itemsFuncMixin} from 'common/js/itemsFuncMixin'
  import {gethashcode} from 'common/js/hash'
  import * as itemTempString from './moduleTempString'
  import draggable from 'vuedraggable'
  import * as API from 'config/api'
  import {mapMutations, mapGetters} from 'vuex'
  // import {TweenMax} from 'gsap/src/minified/TweenMax.min'
  //模块宏
  import {itemsMixin} from 'common/js/itemsMixin'

  /**
   * 思路：
   * 加载模块的顺序从vuex中获取
   * 切换模块图标顺序的时候改变vuex中记录的加载模块顺序
   * **/
  export default {
    mixins: [itemsMixin, itemsFuncMixin],
    // mixins: [itemsFuncMixin],
    name: 'productDesc',
    components: {
      draggable
    },
    // beforeRouteEnter(to, from, next) {
    //   // 安卓端判断说明书来源来控制显示'立即使用'按钮
    //   console.log(from)
    //   if (from.name === 'createShow') {
    //     console.log('判断是从createShow路由来')
    //     next(vm => {
    //       vm.$nextTick(() => {
    //         setTimeout(() => {
    //           vm.isConfirmEdit()
    //           vm.isPreview = true
    //           vm.set_preview(true)
    //         }, 1000)
    //
    //       })
    //     })
    //   }
    //   next()
    //   // 在渲染该组件的对应路由被 confirm 前调用
    //   // 不！能！获取组件实例 `this`
    //   // 因为当守卫执行前，组件实例还没被创建
    // },

    created() {

      // console.log(this.GET_IS_PREVIEW)
      // 模拟模块排序
      // setTimeout( () => {
      //   this.mixArray.sort()
      // },5000)
    },
    computed: {
      ...mapGetters([
          'GET_UINFO',
          'GET_TEMP_DATA',
          'GET_IS_PREVIEW',
          'GET_BANNER_HEIGHT',
          'GET_MODULE_ICON'
        ]
      ),
      selModuleHeight() {
        // return `height:${window.screen.availHeight * window.devicePixelRatio}px;top:0`
      }
    },
    data() {
      return {
        // 模板数据
        // banner高度
        bannerHeight: '',
        mix: [],
        mixArray: [],
        MIcon: [],//模块图标
        MDimgs: [],//模块列表
        itemsOrder: [],
        itemsOrderFunc: {},
        showModal: false,
        startx: '',
        starty: '',
        isPreview: false,
        selMdTips: 0,
        MD: 'productDescTitleImgItems001',
        // discList: [],
        // ED: {}
      }
    },
    watch: {
      /**
       * 侦测数据变化以更新vuex
       * **/
      // thisTempData: {
      //   handler(val, oldval) {
      //     console.log('---------------')
      //     console.log('模板数据已更新...')
      //     console.log('---------------')
      //     this.setTempData(JSON.parse(JSON.stringify(val)))
      //   },
      //   deep: true
      // },
      GET_MODULE_ICON() {
        let vuex_module_icon = JSON.parse(JSON.stringify(this.GET_MODULE_ICON))
        this.MIcon = vuex_module_icon
      }
    },
    methods: {
      // 添加模块框显示
      showAddModule(moduleIcon) {
        this.MIcon = moduleIcon
        this.showAddSorts()
        this.$refs.selModule.style.top = 0
        this.$refs.addTisMd.style.bottom = 0
      },
      // 排序模块框显示
      sortModule() {
        // this.MIcon.splice(this.MIcon.length - 2, 2)
        this.showAddSorts()
        this.$refs.sortModule.style.top = '0'
      },
      showAddSorts() {
        document.getElementById('ediTingBtmBtns').style.height = '0'
        document.getElementById('app').style.position = 'fixed'
      },
      // 添加模块框隐藏
      hideAddModule() {
        // this.thisTempData.module_icon = this.MIcon
        // this.GET_MODULE_ICON(this.MIcon.concat([{
        //   // 编辑状态下增加两个图标
        //   module_icon: '&#xe62e;',
        //   module_name: '添加模块'
        // },
        //   {
        //     module_icon: '&#xe64e;',
        //     module_name: '更改顺序'
        //   }]))
        this.hideAddSorts()
        this.$refs.selModule.style.top = '17.786667rem'
        this.$refs.addTisMd.style.bottom = '-1.2rem'
        this.addEventListeners(false)
      },
      hideSortModule() {
        this.setModuleIcon(JSON.parse(JSON.stringify(this.MIcon)))
        this.thisTempData.module_icon = JSON.parse(JSON.stringify(this.MIcon))
        // this.topNavMd.push({
        //     // 编辑状态下增加两个图标
        //     module_icon: '&#xe62e;',
        //     module_name: '添加模块'
        //   },
        //   {
        //     module_icon: '&#xe64e;',
        //     module_name: '更改顺序'
        //   })
        this.hideAddSorts()
        this.$refs.sortModule.style.top = '17.786667rem'
      },
      hideAddSorts() {
        document.getElementById('app').style.position = 'static'
        document.getElementById('ediTingBtmBtns').style.height = '1.173333rem'
      },
      // 选中模块
      selThiMd(item, e, i) {
        this.selMdTips = i
        console.log(item.module_path)
      },
      // push模块
      pushMd: function (i) {
        console.log(this.MIcon[i].module_path)
        //更改显示模块图标
        // this.topNavMd
        // this.MIcon.splice(this.MIcon.length - 2, 0, this.MIcon[i])
        // this.$set(this.thisTempData, 'module_icon', this.MIcon.slice(0, this.MIcon.length - 2,))
        // 隐藏选择模块框
        this.hideAddModule()
        // 要添加的模块名字
        // const MD = this.MIcon[i].module_path + gethashcode()
        // 要添加的模块路径
        // const MDPATH = this.MIcon[i].module_path + gethashcode()
        // this.TEMP_ROOT_DATA.this_temp_all_module_data[MD] = wantAddModule
        //判断要添加的模块的名字，因为有的模块会有多个项，多个项的模块操纵难度会增加一个维度，鉴于时间关系暂定switch case
        switch (this.MIcon[i].module_path) {
          case 'mi_module_product_info':
            console.log('添加产品简介模块...')
            /** 产品简介标题图片 ******************************************************/
              // 复制要添加的模块的内容
            let p_info_top = JSON.parse(JSON.stringify(this.thisTempData.this_temp_all_module_data[this.MIcon[i].module_path]))
            // 要添加的项目名字
            const MD_title_img = this.MIcon[i].module_path + gethashcode()
            // 更新vuex中的数据
            this.$set(this.thisTempData.this_temp_all_module_data, [MD_title_img], p_info_top)
            // 定义即将追加的模块数据
            const titleImgItems = Vue.extend({

              mixins: [itemsFuncMixin],
              //模板字符串
              template: itemTempString.productDescTitleImgItems(),
              data() {
                return {
                  editable: true,
                  // 选择图片文件的id
                  choseimgfile: gethashcode(),
                  // 点击获取到的模块名
                  MDNAME: MD_title_img,
                  // 模块的名字
                  moduleName: '',
                  // 模块的路径
                  moduleNamePath: '',
                  //模块路径
                  path: ''
                }
              },
              created() {
                console.log('产品简介标题图片模块已挂载...')
                console.log(this.MDNAME)
                this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_info
                this.moduleNamePath = this.thisTempData.this_temp_all_module_data[this.MDNAME]
                this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].top_title_middle_stitle_btm_img.content
              }
            })
            // 注册即将追加的模块数据
            Vue.component(MD_title_img, titleImgItems)
            // push到页面中
            this.mixArray.push(MD_title_img)
            /** 产品简介标题图片 ******************************************************/


            // /** 产品简介四大优势项 **********************************************************/
            //   // 要添加的项目名字
            // const MD_fourbetter = this.MIcon[i].module_path + gethashcode()
            // // 更新vuex中的数据
            // this.$set(this.TEMP_ROOT_DATA.this_temp_all_module_data, [MD_fourbetter], p_info_top)
            // const fourbetter = Vue.extend({
            //   mixins: [itemsFuncMixin],
            //   //模板字符串
            //   template: itemTempString.productDescFourBetter(),
            //   data() {
            //     return {
            //       editable: true,
            //       // 选择图片文件的id
            //       choseimgfile: gethashcode(),
            //       // 点击获取到的模块名
            //       MDNAME: MD_fourbetter,
            //       // 模块的名字
            //       moduleName: '',
            //       // 模块的路径
            //       moduleNamePath: '',
            //       //模块路径
            //       path: ''
            //     }
            //   },
            //   created() {
            //     console.log('四大优势模块已挂载...')
            //     this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_info
            //     this.moduleNamePath = this.thisTempData.this_temp_all_module_data[this.MDNAME].product_desc_four_better
            //     this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].product_desc_four_better.content
            //     console.log(this.moduleNamePath)
            //   }
            // })
            // Vue.component(MD_fourbetter, fourbetter)
            // this.mixArray.push(MD_fourbetter)
            // /** 产品简介四大优势项 **********************************************************/
            //
            //
            // /** 产品简介健康生活 **************************************************************/
            // const MD_health = this.MIcon[i].module_path + gethashcode()
            // this.$set(this.TEMP_ROOT_DATA.this_temp_all_module_data, [MD_health], p_info_top)
            // const health = Vue.extend({
            //   mixins: [itemsFuncMixin],
            //   //模板字符串
            //   template: itemTempString.productDescScenes(),
            //   data() {
            //     return {
            //       editable: true,
            //       // 选择图片文件的id
            //       choseimgfile: gethashcode(),
            //       // 点击获取到的模块名
            //       MDNAME: MD_health,
            //       // 模块的名字
            //       moduleName: '',
            //       //模块路径
            //       path: ''
            //     }
            //   },
            //   created() {
            //     console.log('产品简介健康项已挂载...')
            //     this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_info
            //     this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].product_desc_scenes.content
            //     console.log(this.moduleNamePath)
            //   }
            // })
            // Vue.component(MD_health, health)
            // this.mixArray.push(MD_health)
            // /** 产品简介健康生活 **************************************************************/
            break;
          case 'mi_module_product_install':
            console.log('添加如何安装模块...')

            /** 如何安装 **************************************************************/
            let p_install = JSON.parse(JSON.stringify(this.thisTempData.this_temp_all_module_data[this.MIcon[i].module_path]))
            // 要添加的项目名字
            const MD_install = this.MIcon[i].module_path + gethashcode()
            // 更新vuex中的数据
            this.$set(this.thisTempData.this_temp_all_module_data, [MD_install], p_install)
            const install = Vue.extend({
              mixins: [itemsFuncMixin],
              //模板字符串
              template: itemTempString.productDescHowInstall(),
              data() {
                return {
                  editable: true,
                  // 选择图片文件的id
                  choseimgfile: gethashcode(),
                  // 点击获取到的模块名
                  MDNAME: MD_install,
                  // 模块的名字
                  moduleName: '',
                  //模块路径
                  path: ''
                }
              },
              created() {
                console.log('如何安装项已挂载...')
                this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_install
                this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].how_install.content
              }
            })
            Vue.component(MD_install, install)
            this.mixArray.push(MD_install)
            break;
          case 'mi_module_product_use':
            console.log('添加如何使用模块...')
            // 要添加的模块的名字
            const MD_how_use = this.MIcon[i].module_path + gethashcode()
            // 复制要添加的模块的内容
            let p_how_use = JSON.parse(JSON.stringify(this.thisTempData.this_temp_all_module_data[this.MIcon[i].module_path]))
            // 更新vuex中的模块数据
            this.$set(this.thisTempData.this_temp_all_module_data, [MD_how_use], p_how_use)
            const mi_module_product_use = Vue.extend({
              mixins: [itemsFuncMixin],
              template: itemTempString.productDescHowUse(),
              data() {
                return {
                  // 选择图片文件的id
                  choseimgfile: gethashcode(),
                  editable: true,
                  moduleNamePath: '',
                  MDNAME: MD_how_use,
                  //模块路径
                  path: ''
                }
              },
              created() {
                console.log('追加的模块已挂载...')
                console.log(this.MDNAME)
                this.moduleNamePath = this.thisTempData.this_temp_all_module_data[this.MDNAME]
                this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].how_use.content
                console.log(this.path)
              },

            })
            Vue.component(MD_how_use, mi_module_product_use)
            this.mixArray.push(MD_how_use)
            break;
          default:
            console.log('不知道哪个模块...' + this.MIcon[i].module_path)
            break;
        }


      },
      ...mapMutations({
        setTempData: 'SET_TEMP_DATA',
        set_uinfo: 'SET_UINFO',
        set_up_or_down: 'SET_UPORDOWN',
        set_edit: 'SET_EDITABLE',
        set_preview: 'SET_IS_PREVIEW',
        setModuleIcon: 'SET_MODULE_ICON'
      }),
      goEdit() {
        this.set_edit(true)
        this.$refs.confirm.style.bottom = '-1.173333rem'
        document.getElementById('ediTingBtmBtns').style.bottom = '0'
      },
      // 预览模板
      tempPreview() {
        this.set_edit(false)
        this.$refs.confirm.style.bottom = '0'
      },
      // 添加说明书介绍
      addDesc() {
        this.$router.push("/adddesc")
      },
      getdata(evt) {
        console.log(evt.draggedContext.element)
      },
      datadragEnd(evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        // console.log(this.list)
      },
      // mixin中的组件名存进数组
      mixin2array() {
        this.$nextTick(() => {
          for (let i in this.mix) {
            this.mixArray.push(i)
          }
        })
      },
      // 滚动屏幕执行逻辑
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        // if(scrollTop === this.GET_BANNER_HEIGHT){
        //   console.log('临界')
        // }
      },
      GetSlideDirection(startX, startY, endX, endY) {
        let dy = startY - endY;
        //var dx = endX - startX;
        let result = 0;
        if (dy > 0) {//向上滑动
          result = 1;
        } else if (dy < 0) {//向下滑动
          result = 2;
        }
        else {
          result = 0;
        }
        return result;
      },
      // 监听滚动事件
      addEventListeners(addorremove) {
        const that = this
        if (addorremove) {
          // window.addEventListener('scroll', this.handleScroll)
          var startX, startY;
          document.addEventListener('touchstart', function (ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
          }, false);

          document.addEventListener('touchend', function (ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = that.GetSlideDirection(startX, startY, endX, endY);
            switch (direction) {
              case 0:
                // alert("无操作");
                break;
              case 1:
                // 向上滑
                that.set_up_or_down('up')
                break;
              case 2:
                // 向下滑
                that.set_up_or_down('down')
                break;

              default:
            }
          }, false);
        } else {
          console.log('无监听滑动')
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        // banner高度赋值
        // console.log(document.getElementById('slider-wrapper'))
        // this.bannerHeight = document.getElementById('slider-wrapper').offsetHeight
        // 如果是从模板列表过来
        if (this.$route.query.tempid) {
          API._getTempDetail(this.$route.query.tempid).then((res) => {
            if (res.ret === API.ERROK) {
              console.log(res.content)
              this.setTempData(res.content.context)
              console.log('初始化模板框架载入数据：' + this.GET_TEMP_DATA)

              if (this.GET_TEMP_DATA !== '') {
                this.thisTempData = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
                this.thisTempData = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
                this.MDimgs = this.GET_TEMP_DATA.module_icon
              }
              //mixin赋值给data中的mix

              this.mix = itemsMixin.components
              this.mixin2array()

              // 更新vuex后才载入模块

            } else {
              this.itemsOrder = this.thisTempData.module_sort
              // this.mix = this.TEMP_ROOT_DATA.module_sort
              for (let i = 0; i < this.itemsOrder.length; i++) {
                let len = this.itemsOrder[i].split("_").length
                let t = this.itemsOrder[i]
                // 不带hash的模块
                if (len === 4) {
                  // console.log(t)
                  switch (t) {
                    case 'mi_module_product_info':
                      // this.itemsOrderFunc[t] = this.mix.productDescTitleImgItems
                      // this.mixArray.push('productDescTitleImgItems')
                      break;
                  }
                  //带hash的模块
                } else if (len === 5) {
                  let last = this.itemsOrder[i].split("_").splice(0, 4).join("_")
                  let lastHash = this.itemsOrder[i].split("_")[this.itemsOrder[i].split("_").length - 1]
                  switch (last) {
                    case 'mi_module_product_info':
                      const titleImgItems = Vue.extend({
                        mixins: [itemsFuncMixin],
                        //模板字符串
                        template: itemTempString.productDescTitleImgItems(),
                        data() {
                          return {
                            editable: false,
                            // 选择图片文件的id
                            choseimgfile: lastHash,
                            // 点击获取到的模块名
                            MDNAME: t,
                            // 模块的名字
                            moduleName: '',
                            // 模块的路径
                            moduleNamePath: '',
                            //模块路径
                            path: ''
                          }
                        },
                        created() {
                          console.log('产品简介标题图片模块已挂载...')
                          console.log(this.MDNAME)
                          this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_info
                          this.moduleNamePath = this.thisTempData.this_temp_all_module_data[this.MDNAME]
                          this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].top_title_middle_stitle_btm_img.content
                        }
                      })
                      // 注册即将追加的模块数据
                      Vue.component(t, titleImgItems)
                      // push到页面中
                      this.mixArray.push(t)
                      break;
                    case 'mi_module_product_install':
                      const install = Vue.extend({
                        mixins: [itemsFuncMixin],
                        //模板字符串
                        template: itemTempString.productDescHowInstall(),
                        data() {
                          return {
                            editable: true,
                            // 选择图片文件的id
                            choseimgfile: lastHash,
                            // 点击获取到的模块名
                            MDNAME: t,
                            // 模块的名字
                            moduleName: '',
                            //模块路径
                            path: ''
                          }
                        },
                        created() {
                          console.log('如何安装项已挂载...')
                          this.moduleName = this.thisTempData.this_temp_all_module_data.mi_module_product_install
                          this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].how_install.content
                        }
                      })
                      // 注册即将追加的模块数据
                      Vue.component(t, install)
                      // push到页面中
                      this.mixArray.push(t)
                      break;
                    case 'mi_module_product_use':
                      const how_use = Vue.extend({
                        mixins: [itemsFuncMixin],
                        template: itemTempString.productDescHowUse(),
                        data() {
                          return {
                            // 选择图片文件的id
                            choseimgfile: lastHash,
                            editable: false,
                            moduleNamePath: '',
                            MDNAME: t,
                            //模块路径
                            path: ''
                          }
                        },
                        created() {
                          console.log('追加的模块已挂载...')
                          console.log(this.MDNAME)
                          this.moduleNamePath = this.thisTempData.this_temp_all_module_data[this.MDNAME]
                          this.path = this.thisTempData.this_temp_all_module_data[this.MDNAME].how_use.content
                          console.log(this.path)
                        },

                      })
                      Vue.component(t, how_use)
                      this.mixArray.push(t)
                      break;
                  }
                  console.log(last)
                  console.log(lastHash)
                  // console.log(t)
                }
                // let last = this.itemsOrder[i].split("_")[this.itemsOrder[i].split("_").length - 1]
                // let len = this.itemsOrder[i].split("_")[this.itemsOrder[i].split("_").length
                // if(typeof (parseInt(this.itemsOrder[i].split("_")[this.itemsOrder[i].split("_").length - 1])) === 'NaN'){
                //   console.log(this.itemsOrder[i])
                // }
              }
              alert(res.msg)
            }
          })
        } else if (this.$route.query.wxId) {
          // 如果是用户浏览进来
          console.log()
        }


        console.log('初始化模板框架载入数据：' + this.GET_TEMP_DATA)
        // 更新vuex后才载入模块
        // this.mixin2array()
        //mixin赋值给data中的mix
        // this.mix = itemsMixin.components


      })
      // this.mixin2array()
      this.$nextTick(() => {
        console.log(this.GET_IS_PREVIEW)
        if (this.GET_IS_PREVIEW) {
          console.log('是预览状态')
          this.$refs.confirm.style.bottom = '0'
        }
      })
      //判断进入说明书的来源
      // this.isConfirmEdit()
      // 模拟模块排序
      // setTimeout( () => {
      //   this.mixArray.sort()
      //   console.log(this.mixArray)
      // },5000)

      this.addEventListeners(true)

    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="stylus">
  .ITC-ROOT
    /*margin-bottom 44px*/
    padding-bottom 44px
    /*filter:blur(5px)*/
    .confirm
      width 100%
      height 44px
      background rgba(46, 46, 48, 0.8)
      position fixed
      bottom -44px
      line-height 44px
      text-align center
      color #fff
      font-size 14px
      font-weight 300
      transition all 0.5s
    .sortModule
      width 100%
      height 100%
      overflow-y scroll
      position fixed
      top 667px
      left 0
      background rgb(255, 255, 255)
      transition all 0.5s
      -webkit-overflow-scrolling touch
      padding-bottom 44px
      .sortModuleWrap
        width 345px
        -webkit-overflow-scrolling touch
        margin 20px auto
        overflow hidden
        position relative
        .sortModuleWrapTitle
          text-align center
          font-size 18px
          color #2E2E30
          line-height 32px
          margin-bottom 20px
          position relative
          .iconfont
            font-size 20px
            font-weight 300
            position absolute
            right 0
            vertical-align middle
        .sortStart
          border-top 2px solid #f5f5f5
          margin-top 16px
          .sortItem
            width 100%
            height 60px
            line-height 60px
            font-size 16px
            border-bottom 1px solid #f5f5f5
            h2
              text-indent 1em
              font-weight 300
              i
                font-size 16px
                margin-right 8px
                font-weight 300
    .selModule
      width 100%
      height 100%
      overflow-y scroll
      position fixed
      top 667px
      left 0
      background rgb(255, 255, 255)
      transition all 0.5s
      -webkit-overflow-scrolling touch
      padding-bottom 44px
      .selModuleWrap
        width 345px
        -webkit-overflow-scrolling touch
        margin 20px auto
        overflow hidden
        position relative
        .selModuleTitle
          text-align center
          font-size 16px
          color #2E2E30
          line-height 32px
          margin-bottom 20px
          position relative
          .iconfont
            font-size 20px
            font-weight 300
            position absolute
            right 0
            vertical-align middle

        .modulesCon
          display flex
          flex-wrap wrap
          justify-content space-around
          align-items flex-start
          align-content flex-start
          .modulesConItems
            /*flex 1 1 50%*/
            width 159px
            height 240px
            margin-bottom 10px
            text-align center
            overflow hidden
            border 1px solid #02C2A2
            border-radius 4px
            img
              width 100%
              height 100%
              transition all 0.3s
              border none
            .light
              border 4px solid #02C2A2
        .addTisMd
          position fixed
          bottom -45px
          width 100%
          left 0
          height 45px
          line-height 45px
          color #fff
          background #02C2A2
          border-radius 3px
          font-size 14px

    .dropitem
      width 31%
      display inline-block
      text-align center
      height 100px
      line-height 100px
      background #ccc
      margin 20px 2px

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
</style>
