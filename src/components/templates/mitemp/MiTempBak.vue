<template>
  <div class="temp_root" ref="temp_root" v-if="TEMP_ROOT_DATA.tempCon">
    <!--&lt;!&ndash; 选择上传文件bridge &ndash;&gt;-->
    <!--<input type="file" :id="banner.bannerImgFile" class="hide" ref="" accept="image/*">-->
    <!--&lt;!&ndash; 选择上传文件bridge &ndash;&gt;-->
    <!-- banner start -->
    <div class="slider-wrapper" id="slider-wrapper" ref="sliderWrapper">
      <div class="slider-content" v-if="TEMP_ROOT_DATA.tempCon.banner.length">
        <div class="slider" ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <div v-for="(item,index) in TEMP_ROOT_DATA.tempCon.banner" :key="index">
              <div>
                <!--<changeImgTips @change-img="changeBannerImg"-->
                <!--v-if="!editable"-->
                <!--:choseimgfile="banner.bannerImgFile"-->
                <!--&gt;-->
                <!--</changeImgTips>-->
                <!--<a :href="item.linkUrl">-->
                <img @load="loadImage" :src="item.picUrl">
                <!--</a>-->
              </div>
            </div>
          </div>
          <div class="dots" v-if="TEMP_ROOT_DATA">
            <span class="dot" :class="{active: banner.currentPageIndex === index }"
                  v-for="(item, index) in banner.dots"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- banner end -->
    <!-- nav start -->
    <div class="navTopGroup" ref="navTopGroup" id="navTopGroup" v-if="TEMP_ROOT_DATA">
      <ul class="navTopWrapper" :class="GET_EDITABLE ? 'manageNavStyle' : 'b'" :style="modulesListWidth">
        <transition-group name="list-complete" tag="div" mode='in-out'>
          <li
            v-for='(item,index) in TEMP_ROOT_DATA.tempCon.modules'
            :key='index'
            :style="modulesListItemWidth">
            <div class="tab-icon">
              <div class="nav-del-btn" @click="delThisModule(item,index)" v-if="editable">
                <i class="iconfont">&#xe657;</i>
                <!--<i>-</i>-->
              </div>
              <!--<img :src="item.defaultIcon" class="selIcon shake">-->
              <!--<a href="">{{item.module_icon}}</a>-->
              <i v-html="item.icon.iconImg" class="iconfont"
                 @click="clickModuleIcon($event.target.innerHTML,index)
            ">
              </i>
            </div>
            <!--<span class="tab-link nowrap"-->
            <!--:contenteditable="editable"-->
            <!--@click="selectText($event)">{{item.icon.iconName}}</span>-->
            <textarea name="" id="" v-model="item.icon.iconName" class="tab-link nowrap" :style="editTextOutLine"
                      maxlength="5"
                      placeholder="请输入"
                      :disabled="!editable"
            ></textarea>
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="navTopGroup hideNavTopGroup" ref="hideNavTopGroup" id="hideNavTopGroup"></div>
    <!--选择图标模框-->
    <div class="selIconGroup" ref="selIconGroup" id="selIconGroup" v-if="TEMP_ROOT_DATA">
      <ul class="navTopWrapper selIconWrap" :style="selIconWrapWidth">
        <li
          v-for="(item,index) in TEMP_ROOT_DATA.tempCon.selIconList"
          :key="index"
        >
          <i class="iconfont" v-html="item" @click="clickSelIcon($event.target.innerHTML,index)"></i>
        </li>
      </ul>
      <h2 class="selIconGroupTitle">选一个喜欢的图标吧</h2>
    </div>
    <div class="selIconGroup hideselIconGroup" ref="hideselIconGroup"></div>
    <!--选择模框结束-->
    <!--<div class="navTopGroup hideNavTopGroup" ref="hideNavTopGroup"></div>-->
    <!-- nav end -->
    <!--   模块容器   --------------------------------------------->
    <div id="moduleWrap" ref="moduleWrap" v-if="TEMP_ROOT_DATA">
      <transition-group name="list-complete" tag="div" mode='in-out'>
        <div v-for="(m,index) in mixArray" :key="index" class="list-complete-item">
          <!--index控制模块的顺序-->
          <component
            v-bind:is="m"
            :key="index"
            @del-this-module="delThisModule"
            :TEMP_ROOT_DATA="TEMP_ROOT_DATA"
          >
            <!--传递根数据给子组件数据-->
          </component>
        </div>
      </transition-group>


      <!--如何使用 start-->
      <!--<div class="itemRoot">-->

      <!--</div>-->
      <!--如何使用 end-->
    </div>
    <!--   模块容器   --------------------------------------------->
    <!--立即使用按钮-->
    <div class="confirm" ref="confirm" id="confirm" @click="goEdit" style="" v-if="TEMP_ROOT_DATA">去编辑</div>
    <!--编辑中的按钮-->
    <div class="ediTingBtmBtns" ref="ediTingBtmBtns" id="ediTingBtmBtns" style="" v-if="TEMP_ROOT_DATA">
      <div class="ediTingBtmBtnsItems">
        <a><i class="iconfont icon-shiyong01"></i> &nbsp;存为草稿</a>
      </div>
      <div class="ediTingBtmBtnsItems" @click="temp_preview">
        <a><i class="iconfont icon-L2"></i> &nbsp;预览</a>
      </div>
      <div class="ediTingBtmBtnsItems goLine" @click="addDesc">
        <a>发布上线</a>
      </div>
    </div>
    <!--选择模块模框-->
    <div class="selModule" id="selModule" ref="selModule" v-if="BAK_DATA">
      <div class="selModuleWrap">
        <h2 class="selModuleTitle">添加模块<i class="iconfont icon-L1" @click="hideAddModule"></i></h2>
        <div class="modulesCon">
          <div class="modulesConItems"
               v-for="(item,index) in BAK_DATA.tempCon.modules"
               :key="index"
          >
            <img :src="item.icon.moduleImg" alt=""
                 @click.prevent="selThisMd(item,$event.target,index)"
                 :class="{'light':selMdTips === index}">
          </div>
        </div>
        <input type="button" value="添加" ref="addTisMd" class="addTisMd" @click="addMd" :disabled="!selMd"
        >
      </div>
    </div>
    <!--排序模块框-->
    <div class="sortModule" ref="sortModule" v-if="TEMP_ROOT_DATA">
      <div class="sortModuleWrap">
        <h2 class="sortModuleWrapTitle">拖动排序哟<i class="iconfont icon-L1" @click="hideSortModule"></i></h2>
        <draggable
          class="sortStart"
          :move="getdata"
          v-model="TEMP_ROOT_DATA.tempCon.modulesSort"
          @update="datadragEnd"
          :options="{animation:500}">
          <div v-for="(item,index) in TEMP_ROOT_DATA.tempCon.modulesSort" :key="index" class="sortItem">
            <h2><i class="iconfont icon-L4"></i>{{index+1}}&nbsp;{{TEMP_ROOT_DATA.tempCon.modules[item].icon.iconName}}
            </h2>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
  import {gethashcode} from 'common/js/hash'
  import * as moduleString from './moduleString'
  import * as API from "config/api";
  import {addClass, autoTextarea} from 'common/js/dom'
  import BScroll from 'better-scroll'
  import {mapMutations, mapGetters} from 'vuex'
  import {itemsMixin} from 'common/js/mdMixin'
  import {itemsFuncMixin} from 'common/js/mdFunc'
  import draggable from 'vuedraggable'


  export default {
    name: "mi-temp",
    mixins: [itemsMixin],
    data() {
      return {
        /*模板原始值*/
        TEMP_ROOT_DATA: '',
        //备份数据
        BAK_DATA: '',
        // 原始模块
        OriginalModule: {},
        //渲染模块顺序
        mixArray: [],
        //模块的个数
        moduleLength: '',
        //是否可编辑
        editable: false,
        sortModules: [],
        // 追加的两个按钮
        add_icon: {
          "icon": {
            "iconImg": "&#xe62e;",
            "iconName": "添加模块"
          }
        },
        sort_icon: {
          "icon": {
            "iconImg": "&#xe64e;",
            "iconName": "更改顺序"
          }
        },
        // 添加模块时选中的模块的index
        selMdTips: 0,
        // 添加模块时选中的即将添加的模块的名字
        selMd: '',
        /*banner start*/
        banner: {
          dots: [],
          currentPageIndex: 0,
          loop: true,
          autoPlay: true,
          interval: 4000,
          bannerImgFile: 'bid'
        },
        /*banner end*/
        /*nav start*/
        nav: {
          // 屏幕宽度
          screenWidth: document.body.clientWidth
        },
        // 点击选择的即将更换的图标
        wantChangeIcon: '',
        /*nav end*/
      }
    },
    watch: {
      GET_EDITABLE(v) {
        if (v === true) {
          this.editable = true
        } else {
          this.editable = false
        }
      }
    },
    created() {
      if (this.$route.query.confirmEdit) {
        console.log('入口为模板列表')
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
        this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA))))
        console.log('是否为可编辑状态：' + this.GET_EDITABLE)
      }
      else if (this.$route.query.wxId) {
        console.log('入口为分享')
        //获取说明书数据
        API._InstrucDetails(this.$route.query.instrucId).then(res => {
          if (res.ret == API.ERROK) {
            this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context))
            this.setTempData(JSON.parse(JSON.stringify(res.content.context)))
            this.againEditEntry(false)
            setTimeout(() => {
              // this.temp_preview()
              this.editable = false
              this.set_edit(false)
              this.TEMP_ROOT_DATA.tempCon.editable = false
              this._initSlider()
              this.refresh()
              this._initDots()
              this._play()
            }, 500)
            this.editable = false
            // this.$refs.confirm.style.bottom = '-1.173333rem'
            // document.getElementById('confirm').style.bottom = '-1.173333rem'
          }
        });
      } else if (this.$route.query.instrucId && this.$route.query.tempId) {
        console.log('入口为编辑')
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
        API._getTempDetail(this.$route.query.tempId).then((res) => {
          if (res.ret === API.ERROK) {
            this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res.content.context))))
          }
        })
        this.againEditEntry(true)
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.hScroll)
        this.mixin2array()
        //区分是从选择模板过来还是用户从其它途径过来
        if (this.$route.query.confirmEdit) {
          //入口为从模板选择进入状态
          this.OriginalModule = itemsMixin.components
        } else if (this.$route.query.wxId) {
          // 入口为用户浏览状态
          console.log('入口为用户浏览状态。。')
          setTimeout(() => {
            this.goEdit()
            this.temp_preview()
            this.editable = false
            this.set_edit(false)
            this.TEMP_ROOT_DATA.tempCon.editable = false
            document.getElementById('confirm').style.bottom = '-1.173333rem'
            this.set_banner_height(this.$refs.sliderWrapper.offsetHeight)
          }, 500)
        } else if (this.$route.query.instrucId && this.$route.query.tempId) {
          //入口为编辑状态
          this.temp_preview()
          setTimeout(() => {
            this.goEdit()
            this.editable = true
            this.set_edit(true)
            this.TEMP_ROOT_DATA.tempCon.editable = true
          }, 1000)
        }
        //获取到所有textarea并处理自适应高度的问题
        // let test = document.querySelectorAll('textarea')
        // for (let i = 0; i < test.length; i++) {
        //   autoTextarea(test[i])
        // }
        /**
         * banner start
         * **/
        this.set_banner_height(this.$refs.sliderWrapper.offsetHeight)
        console.log(this.$refs.sliderWrapper.offsetHeight)
        setTimeout(() => {
          this._setSliderWidth()
          this._initDots()
          this._initSlider()
          if (this.banner.autoPlay) {
            this._play()
          }
        }, 20)
        window.addEventListener('resize', () => {
          if (!this.slider || !this.slider.enabled) {
            return
          }
          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => {
            if (this.slider.isInTransition) {
              this._onScrollEnd()
            } else {
              if (this.banner.autoPlay) {
                this._play()
              }
            }
            this.refresh()
          }, 60)
        })
        /**
         * banner end
         * **/
        /**
         * nav start
         * **/
        window.addEventListener('scroll', this.hScroll)
        let scroll = new BScroll('.navTopGroup', {
          scrollX: true,
          click: true
        })
        let selscroll = new BScroll('.selIconGroup', {
          scrollX: true,
          click: true
        })
        /**
         * nav end
         * **/

      })
    },
    methods: {
      //再次编辑的入口
      againEditEntry(t) {
        API._InstrucDetails(this.$route.query.instrucId).then(res => {
          if (res.ret === API.ERROK) {
            console.log(res.content.context)
            this.TEMP_ROOT_DATA = res.content.context
            //遍历再次编辑的模块的顺序然后动态注册组件
            for (let md of this.TEMP_ROOT_DATA.tempCon.modulesSort) {
              let len = md.split("_").length
              if (len === 2) {
                switch (md) {
                  case 'mi_desc':
                    const desc = Vue.extend({
                      mixins: [itemsFuncMixin],
                      props: ['TEMP_ROOT_DATA'],
                      template: moduleString.miDesc(),
                      data() {
                        return {
                          // 选择图片文件的id
                          choseimgfile: gethashcode(),
                          editable: t,
                          mdKey: md,
                          dataPath: '',
                          //排序追加项目专用数据指向
                          sortPath: ''
                        }
                      },
                      created() {
                        this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                        this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
                      }
                    })
                    Vue.component(md, desc)
                    this.mixArray.push(md)
                    break;
                  case 'mi_install':
                    const install = Vue.extend({
                      mixins: [itemsFuncMixin],
                      props: ['TEMP_ROOT_DATA'],
                      template: moduleString.miInstall(),
                      data() {
                        return {
                          // 选择图片文件的id
                          choseimgfile: gethashcode(),
                          editable: t,
                          mdKey: md,
                          dataPath: '',
                          //排序追加项目专用数据指向
                          sortPath: ''
                        }
                      },
                      created() {
                        this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                        this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
                      }
                    })
                    Vue.component(md, install)
                    this.mixArray.push(md)
                    break;
                }
              } else if (len === 3) {
                console.log('用户新增的模块')
                let HashMdName = md.split("_").splice(0, 2).join("_")
                let HashMdHash = md.split("_")[md.split("_").length - 1]
                switch (HashMdName) {
                  case 'mi_desc':
                    const desc = Vue.extend({
                      mixins: [itemsFuncMixin],
                      props: ['TEMP_ROOT_DATA'],
                      template: moduleString.miDesc(),
                      data() {
                        return {
                          // 选择图片文件的id
                          choseimgfile: gethashcode(),
                          editable: t,
                          mdKey: md,
                          dataPath: '',
                          //排序追加项目专用数据指向
                          sortPath: ''
                        }
                      },
                      created() {
                        this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                        this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
                      }
                    })
                    Vue.component(md, desc)
                    this.mixArray.push(md)
                    break;
                  case 'mi_install':
                    const install = Vue.extend({
                      mixins: [itemsFuncMixin],
                      props: ['TEMP_ROOT_DATA'],
                      template: moduleString.miInstall(),
                      data() {
                        return {
                          // 选择图片文件的id
                          choseimgfile: gethashcode(),
                          editable: t,
                          mdKey: md,
                          dataPath: '',
                          //排序追加项目专用数据指向
                          sortPath: ''
                        }
                      },
                      created() {
                        this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                        this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
                      }
                    })
                    Vue.component(md, install)
                    this.mixArray.push(md)
                    break;
                }
              }
            }
          } else {
            alert(res.msg)
          }
        });
      },
      // 添加说明书简介
      addDesc() {
        this.temp_preview()
        this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        this.$router.push("/adddesc")
      },
      // 替换banner图片
      // changeBannerImg() {
      //   console.log('替换bann')
      // },
      //添加模块操作
      addMd() {
        //当前要添加的模块的名字
        console.log(this.selMd)
        //制造要添加的模块在数据中的名字(key) 例如 : mi_desc
        let addModuleKey = this.selMd + gethashcode()
        //复制要添加的模块的数据
        let addModuleData = JSON.parse(JSON.stringify(this.BAK_DATA.tempCon.modules[this.selMd]))
        console.log(addModuleData)
        //更改要添加的模块的数据的模块
        addModuleData.icon.moduleName = addModuleKey
        //干掉那两个增加个排序的图标
        this.delAddAndSortBtn()
        //更改本地的数据
        this.$set(this.TEMP_ROOT_DATA.tempCon.modules, addModuleKey, addModuleData)
        //找回那两个增加个排序的图标
        this.addAddAndSortBtn()
        //追加要添加的模块的名字到顺序维护数组
        this.TEMP_ROOT_DATA.tempCon.modulesSort.push(addModuleKey)
        //隐藏当前添加模块框
        this.hideAddModule()
        //追加模块到页面中
        //判断要添加的模块的名字，因为有的模块会有多个项，多个项的模块操纵难度会增加一个维度，鉴于时间关系暂定switch case
        switch (this.selMd) {
          case 'mi_desc':
            const desc = Vue.extend({
              mixins: [itemsFuncMixin],
              props: ['TEMP_ROOT_DATA'],
              template: moduleString.miDesc(),
              data() {
                return {
                  // 选择图片文件的id
                  choseimgfile: gethashcode(),
                  editable: true,
                  mdKey: addModuleKey,
                  dataPath: '',
                  //排序追加项目专用数据指向
                  sortPath: ''
                }
              },
              created() {
                this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
              }
            })
            Vue.component(addModuleKey, desc)
            this.mixArray.push(addModuleKey)
            console.log('添加产品简介模块')
            // console.log(this.TEMP_ROOT_DATA.tempCon.modules)
            // for (let i in this.TEMP_ROOT_DATA.tempCon.modules) {
            //   // if (i !== 'add_icon' || 'sort_icon') {
            //   //   // this.sortModules.push(i)
            //   //   console.log('等于了')
            //   // }
            //   i === 'add_icon' || i === 'sort_icon' ? '' : this.sortModules.push(i)
            // }
            // console.info(this.sortModules)
            break;
          case 'mi_install':
            const install = Vue.extend({
              mixins: [itemsFuncMixin],
              props: ['TEMP_ROOT_DATA'],
              template: moduleString.miInstall(),
              data() {
                return {
                  // 选择图片文件的id
                  choseimgfile: gethashcode(),
                  editable: true,
                  dataPath: '',
                  //模块的key
                  mdKey: addModuleKey,
                  //排序追加项目专用数据指向
                  sortPath: '',

                }
              },
              created() {
                this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
              }
            })
            Vue.component(addModuleKey, install)
            this.mixArray.push(addModuleKey)
            console.log('添加如何安装模块')
          default:
            break;
        }
      },
      /**
       * 点击导航按钮事件
       * **/
      clickModuleIcon(e, i) {
        //如果是编辑状态下的点击
        if (this.GET_EDITABLE) {
          // 判断点击了添加模块按钮
          if (i === 'add_icon') {
            this.$refs.selModule.style.top = 0
            this.$refs.addTisMd.style.bottom = 0
            this.$refs.ediTingBtmBtns.style.height = 0
            setTimeout(() => {
              document.getElementById('app').style.position = 'fixed'
            }, 300)
            console.log('点击了添加按钮')
            // 判断点击了排序按钮
          } else if (i === 'sort_icon') {
            this.$refs.sortModule.style.top = 0
            this.$refs.ediTingBtmBtns.style.height = 0
            setTimeout(() => {
              document.getElementById('app').style.position = 'fixed'
            }, 300)
            console.log('点击了排序按钮')
          } else {
            //编辑状态下点击其它按钮逻辑
            console.log(i)
            this.wantChangeIcon = i
            this.$refs.selIconGroup.style.height = '3.5rem'
            this._initSelIconWrap()
          }
        } else {
          //如果在非编辑状态下的点击
        }

      },
      /**
       * 导航删除按钮事件
       * **/
      delThisModule(item, index) {
        if (this.TEMP_ROOT_DATA.tempCon.modulesSort.length !== 1) {
          // 删除本地数据中的某个模块
          this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, index)
          // 删除存储模块顺序的某个模块
          for (let i = 0; i < this.TEMP_ROOT_DATA.tempCon.modulesSort.length; i++) {
            this.TEMP_ROOT_DATA.tempCon.modulesSort[i] === index ? this.TEMP_ROOT_DATA.tempCon.modulesSort.splice(i, 1) : ''
          }
          // 删除渲染模块的数组的某个模块
          for (let i = 0; i < this.mixArray.length; i++) {
            this.mixArray[i] === index ? this.mixArray.splice(i, 1) : ''
          }
        } else {
          alert('不能再删啦,好好编辑吧。')
        }
        // if () {
        //   //要删除的模块的路径
        //   // console.log(this.NAV_ROOT_DATA.module_icon[index].module_path)
        //   // console.log(this.NAV_ROOT_DATA.this_temp_all_module_data[this.NAV_ROOT_DATA.module_icon[index].module_path])
        //   // delete this.NAV_ROOT_DATA.this_temp_all_module_data[this.NAV_ROOT_DATA.module_icon[index].module_path]
        //   // this.NAV_ROOT_DATA.module_icon.splice(index, 1)
        //   // // this.setTempData(JSON.parse(JSON.stringify(this.NAV_ROOT_DATA)))
        //   // this.$emit('del-this-module', this.NAV_ROOT_DATA.this_temp_all_module_data, this.NAV_ROOT_DATA.module_icon)
        //   // this.thisTempData.module_icon.splice(index, 1)
        //   // this.thisTempData.module_icon = this.module_icon.slice(0, this.module_icon.length - 2)
        // } else if (this.NAV_ROOT_DATA.module_icon.length = 3) {
        //   alert('不能再删啦,好好编辑吧。')
        // }
      },
      // 点击选中的图标
      clickSelIcon(item, index) {
        // console.log(item)
        // console.log(index)
        this.TEMP_ROOT_DATA.tempCon.modules[this.wantChangeIcon].icon.iconImg = item
        this.$refs.selIconGroup.style.height = '0'
        // setTimeout(() => {
        //
        // },200)
      },
      //去编辑按钮
      goEdit() {
        this.set_edit(true)
        this.addAddAndSortBtn()
        document.getElementById('confirm').style.bottom = '-1.173333rem'
        // this.$refs.ediTingBtmBtns.style.bottom = '0'
        document.getElementById('ediTingBtmBtns').style.bottom = '0'
        this.banner.autoPlay = false
        if (this.TEMP_ROOT_DATA) {
          this._initSlider()
        }

      },
      // 隐藏选择模块框
      hideAddModule() {
        this.$refs.selModule.style.top = '17.786667rem'
        this.$refs.addTisMd.style.bottom = '-1.2rem'
        this.$refs.ediTingBtmBtns.style.height = '1.173333rem'
        document.getElementById('app').style.position = 'static'
      },
      // 预览操作
      temp_preview() {
        this.set_edit(false)
        this.delAddAndSortBtn()
        this.$refs.confirm.style.bottom = '0'
        this.$refs.ediTingBtmBtns.style.bottom = '-1.173333rem'
        this.banner.autoPlay = true

      },
      // 选中模块
      selThisMd(item, e, i) {
        this.selMdTips = i
        this.selMd = JSON.parse(JSON.stringify(item.icon.moduleName))
      },
      //去除增加和排序按钮
      delAddAndSortBtn() {
        this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, 'add_icon')
        this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, 'sort_icon')
      },
      //增加增加和排序按钮
      addAddAndSortBtn() {
        if (this.TEMP_ROOT_DATA) {
          this.$set(this.TEMP_ROOT_DATA.tempCon.modules, 'add_icon', this.add_icon)
          this.$set(this.TEMP_ROOT_DATA.tempCon.modules, 'sort_icon', this.sort_icon)
        }
      },
      // mixin中的组件名存进数组
      mixin2array() {
        this.$nextTick(() => {
          for (let i in this.OriginalModule) {
            this.mixArray.push(i)
          }
        })
      },
      //拖动排序函数
      getdata(evt) {
        console.log(evt.draggedContext.element)
      },
      // 拖动排序完毕执行函数
      datadragEnd: function (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        // 拖动排序后的渲染顺序改变
        this.mixArray = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modulesSort))

        // 更改json对象数据中模块key的顺序来改变导航中图标的顺序
        this.delAddAndSortBtn()
        let wantSortMd = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modules))
        let toSortMd = JSON.parse(JSON.stringify(this.mixArray))
        let doneMd = []
        for (let i = 0; i < toSortMd.length; i++) {
          doneMd.push({[toSortMd[i]]: wantSortMd[toSortMd[i]]})
        }
        // 定义改变顺序后的模块数据
        let changeDoneMd = {}
        for (let i = 0; i < doneMd.length; i++) {
          changeDoneMd[[toSortMd[i]]] = wantSortMd[toSortMd[i]]
        }
        this.TEMP_ROOT_DATA.tempCon.modules = changeDoneMd

        // 重置editable状态
        setTimeout(() => {
          this.set_edit(false)
        }, 100)
        setTimeout(() => {
          this.set_edit(true)
        }, 200)
        this.addAddAndSortBtn()
        // 排序json数组中的顺序
        // console.log(this.list)
      },
      // 排序模块隐藏
      hideSortModule() {
        document.getElementById('app').style.position = 'static'
        document.getElementById('ediTingBtmBtns').style.height = '1.173333rem'
        this.$refs.sortModule.style.top = '17.786667rem'
      },
      /**
       * banner start
       * **/
      // 滚动屏幕执行逻辑
      hScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        let nav = document.getElementById('navTopGroup')
        let hideNav = document.getElementById('hideNavTopGroup')
        let selIcon = this.$refs.selIconGroup
        let hideSelIcon = this.$refs.hideselIconGroup
        document.getElementById('selIconGroup').style.height = '0'
        if (scrollTop > this.GET_BANNER_HEIGHT) {
          hideNav.style.display = 'block'
          // hideSelIcon.style.display = 'block'
          nav.style.position = 'fixed'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
          selIcon.style.position = 'fixed'
          selIcon.style.top = '2.1333333rem'
        } else {
          hideNav.style.display = 'none'
          hideSelIcon.style.display = 'none'
          selIcon.style.position = 'static'
          nav.style.position = 'static'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
        }
      },
      /**
       * 导航吸顶
       * **/
      refresh() {
        if (this.slider) {
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.slider.refresh()
          }, 20)
        }
      },
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.banner.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        if (this.TEMP_ROOT_DATA) {
          this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
              loop: this.banner.loop,
              threshold: 0.3,
              speed: 400
            }
          })
          this.slider.on('scrollEnd', this._onScrollEnd)
          this.slider.on('touchend', () => {
            if (this.banner.autoPlay) {
              this._play()
            }
          })
          this.slider.on('beforeScrollStart', () => {
            if (this.banner.autoPlay) {
              clearTimeout(this.timer)
            }
          })
        }

      },
      _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.banner.currentPageIndex = pageIndex
        if (this.banner.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.banner.dots = new Array(this.children.length)
        console.log(this.children)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.banner.interval)
      },
      /**
       * banner end
       * **/
      _initSelIconWrap() {
        let selscroll = new BScroll('.selIconGroup', {
          scrollX: true,
          click: true
        })
      },
      ...mapMutations({
        setTempData: 'SET_TEMP_DATA',
        set_up_or_down: 'SET_UPORDOWN',
        set_edit: 'SET_EDITABLE',
        set_preview: 'SET_IS_PREVIEW',
        set_banner_height: 'SET_BANNER_HEIGHT'
      }),
    },
    computed: {
      //编辑状态线
      editTextOutLine() {
        if (this.editable) {
          return `border:.02rem dashed rgba(172,172,172,1);border-radius:3px`
        }
      },
      modulesListItemWidth() {
        const that = this
        return (function (w) {
          switch (w) {
            case 1:
              return `width:${that.nav.screenWidth}px`
              break;
            case 2:
              return `width:${that.nav.screenWidth / 2}px`
              break;
            case 3:
              return `width:${that.nav.screenWidth / 3}px`
              break;
            case 4:
              return `width:${that.nav.screenWidth / 4}px`
              break;
            default:
              return `width:${(that.nav.screenWidth / 4) - ((that.nav.screenWidth / 4) / 8)}px`
              break;
          }
        })(Object.keys(this.TEMP_ROOT_DATA.tempCon.modules).length)
      },
      modulesListWidth() {
        const that = this
        return (function (w) {
          switch (w) {
            case 2:
              return `width:100%`
              break;
            case 3:
              return `width:100%`
              break;
            case 4:
              return `width:100%`
            default:
              return `width:${((that.nav.screenWidth / 4) - ((that.nav.screenWidth / 4) / 8)) * w}px`
              break;
          }
        })(Object.keys(this.TEMP_ROOT_DATA.tempCon.modules).length)
      },
      selIconWrapWidth() {
        return `width:${(this.TEMP_ROOT_DATA.tempCon.selIconList.length * 1.6) / 2}rem`
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
    components: {
      draggable,
      changeImgTips
    },
    activated() {
      /**
       * banner start
       * **/
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.banner.currentPageIndex = pageIndex
      if (this.banner.autoPlay) {
        this._play()
      }
      /**
       * banner end
       * **/
    },
    deactivated() {
      /**
       * banner start
       * **/
      this.slider.disable()
      clearTimeout(this.timer)
      /**
       * banner end
       * **/

    },
    beforeDestroy() {
      /**
       * banner start
       * **/
      this.slider.disable()
      clearTimeout(this.timer)
      /**
       * banner end
       * **/
      window.removeEventListener("scroll", this.hScroll);
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .temp_root {
    background #fff
    padding-bottom 60px
    z-index 10
  }

  .slider-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 200px
    overflow: hidden
    .slider-content
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      .slider
        min-height: 1px
        height: 100%
        position: relative
        .slider-group
          position: relative
          overflow: hidden
          white-space: nowrap
          height: 100%
          .slider-item
            float: left
            height: 100%
            box-sizing: border-box
            overflow: hidden
            text-align: center
            position relative
            a
              display: block
              width: 100%
              height: 100%
              overflow: hidden
              text-decoration: none
            img
              display: block
              width: 100%
              height 200px
        .dots
          position: absolute
          right: 0
          left: 0
          bottom: 12px
          transform: translateZ(1px)
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            transition all 0.3s
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll

  //nav start
  * {
    transition all 0.5s
  }

  .navTopWrapper {
    width 100%
    height 100%
  }

  .navTopWrapper li {
    height 100%
    text-align center
    float left
    color $color-5d
    transition all 0.5s
  }

  .navTopWrapper li textarea {
    font-size: $font-size-small;
    max-width: 5em
    display: inline-block
    padding: 1px
    text-align: center
    border-radius: 3px
    height: 16px
    font-weight: 300
    resize: none
  }

  //.navTopWrapper li textarea:focus {
  //border: 1px dashed #ccc
  //border-radius 3px
  //}

  .tab-icon {
    width 40px
    height 40px
    line-height 40px
    border-radius 50%
    /*border 1px solid #ccc*/
    margin 10px auto 4px auto
    background $color-bd
    text-align center
    position relative
  }

  .tab-icon i {
    font-size 20px
    color $color-fff
  }

  .navTopGroup {
    width 100%
    height 80px
    /*display flex*/
    /*background #eee*/
    box-shadow: 0 0 10px #f0e7e7
    background rgba(255, 255, 255, 0.9)
    margin-bottom .5px
    overflow hidden
    z-index 999
  }

  .selIconGroup {
    overflow hidden
    z-index 999
    height 0
    background rgba(245, 245, 245, 0.9)
  }

  .selIconGroupTitle {
    width 375px
    text-align center
    font-size 14px
    color $color-cyd
    font-weight 300
    margin-top -20px
  }

  .selIconWrap {
    /*width: 4000px;*/
  }

  .selIconWrap li {
    width: 56px
    height 56px
    line-height 56px
  }

  .selIconWrap li i {
    font-size: 28px
  }

  .nav-del-btn {
    width 16px
    height 16px
    border-radius 8px
    position absolute
    top -4px
    right -9px
    font-size 0
    /*transition all 0.3s*/
  }

  .nav-del-btn i {
    font-size 20px
    /*font-weight bolder*/
    position absolute
    color red
    top -12px
    right 1px
    z-index 10
    /*transition all 0.3s*/
  }

  .manageNavStyle
    li
      &:nth-last-child(1)
        .tab-icon
          background $color-fff
          border 1px dashed $color-9b
          .iconfont
            color $color-cyd
        textarea
          border none !important
        .nav-del-btn
          display none
      &:nth-last-child(2)
        .tab-icon
          background $color-fff
          border 1px dashed $color-9b
          .iconfont
            color $color-cyd
        textarea
          border none !important
        .nav-del-btn
          display none

  .hideNavTopGroup {
    display: none
  }

  .hideselIconGroup {
    height 3.5rem
    display none
  }

  //nav end
  //底部去编辑按钮
  .confirm
    width 100%
    height 44px
    background rgba(46, 46, 48, 0.8)
    position fixed
    //bottom -44px
    bottom 0
    line-height 44px
    text-align center
    color #fff
    font-size 14px
    font-weight 300
    transition all 0.5s

  //编辑中的按钮
  .ediTingBtmBtns
    width 100%
    display flex
    height 44px
    background rgba(46, 46, 48, .8)
    position fixed
    bottom -44px
    transition all .3s
    justify-content center
    z-index 99999
    .ediTingBtmBtnsItems
      flex 1
      text-align center
      line-height 44px
      a
        display block
        color #fff
        font-size 16px
        font-weight 300
        line-height 44px
        cursor pointer
        i
          font-size 16px
    .goLine
      background linear-gradient(to right, rgba(21, 212, 159, 1), rgba(87, 214, 207, 1))

  //增加模块框
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
    z-index 11
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
        &:disabled
          background: #98e4d8 !important;

  //排序模块框
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
    z-index 10
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
              float right
</style>
