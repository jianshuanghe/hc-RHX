<template>
  <div>
    <div class="navTopGroup" ref="navTopGroup">
      <ul class="navTopWrapper" :style="modulesListWidth" :class="GET_EDITABLE ? 'manageNavStyle' : 'b'">
        <transition-group name="list-complete" tag="div" mode='in-out'>
          <li
            v-for='(item,index) in NAV_ROOT_DATA.module_icon'
            :key='index'
            :style="modulesListItemWidth">
            <div class="tab-icon">
              <div class="nav-del-btn" @click="delThisModule(index)" v-if="editable">
                <i class="iconfont">&#xe657;</i>
                <!--<i>-</i>-->
              </div>
              <!--<img :src="item.defaultIcon" class="selIcon shake">-->
              <!--<a href="">{{item.module_icon}}</a>-->
              <i v-html="item.module_icon" class="iconfont"
                 @click="clickModuleIcon($event.target.innerHTML,index)
            ">
              </i>
            </div>
            <span class="tab-link nowrap"
                  :contenteditable="editable"
                  :style="editTextOutLine"
                  @click="selectText($event)">{{item.module_name}}</span>
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="navTopGroup hideNavTopGroup" ref="hideNavTopGroup"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import {itemsFuncMixin} from 'common/js/itemsFuncMixin'
  import BScroll from 'better-scroll'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    // mixins: [itemsFuncMixin],
    manageTopNav: {},
    name: "top-nav",
    data() {
      return {
        // 屏幕宽度
        screenWidth: document.body.clientWidth,
        // 模块按钮
        module_icon: [],
        // 导航组件的所有数据
        NAV_ROOT_DATA:'',
        editable: false,

      }
    },
    created() {
      // 拿到图标并存下
      // this.module_icon = JSON.parse(JSON.stringify(this.thisTempData.module_icon))
      this.NAV_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
      // console.log('是否为可编辑状态：' + this.GET_EDITABLE)

    },
    watch: {
      GET_TEMP_DATA: {
        handler(val, oldval) {
          this.NAV_ROOT_DATA = JSON.parse(JSON.stringify(val))
          // this.NAV_ROOT_DATA.module_icon.push({
          //     // 编辑状态下增加两个图标
          //     module_icon: '&#xe62e;',
          //     module_name: '添加模块'
          //   },
          //   {
          //     module_icon: '&#xe64e;',
          //     module_name: '更改顺序'
          //   }
          // )
        },
        deep: true
      },
      GET_EDITABLE(v) {
        if (v === true) {
          this.editable = true
          this.NAV_ROOT_DATA.module_icon.push({
              // 编辑状态下增加两个图标
              module_icon: '&#xe62e;',
              module_name: '添加模块'
            },
            {
              module_icon: '&#xe64e;',
              module_name: '更改顺序'
            }
          )
        } else {
          this.editable = false
          this.NAV_ROOT_DATA.module_icon.splice((this.NAV_ROOT_DATA.module_icon.length - 2), 2)
        }
      },
      // thisTempData(v, o) {
      //   console.log('真的？')
      //   this.module_icon = this.thisTempData.module_icon
      // },
      GET_MODULE_ICON: {
        handler(v, o) {
          console.log('排序了DSFSDFSFSD....')
          // this.$set()
          this.topNavMd = JSON.parse(JSON.stringify(this.GET_MODULE_ICON))
          // this.topNavMd.push({
          //     // 编辑状态下增加两个图标
          //     module_icon: '&#xe62e;',
          //     module_name: '添加模块'
          //   },
          //   {
          //     module_icon: '&#xe64e;',
          //     module_name: '更改顺序'
          //   })
        },
        deep: true
      },
      // thisTempData: {
      //   handler(v, o) {
      //     console.log('排序了')
      //   },
      //   deep: true
      // }
    },
    methods: {
      /**
       * 用户输入的数据加以操作
       * path:待修改的数据指向
       * insert:新值
       * key:属性值
       * **/
      changThisClickData(path, insert, key) {
        console.log(path[key])
        // let thisMain = eval(path)
        path[key] = insert
      },
      // 可编辑文字区域点击全选
      selectText(containerid) {
        if (document.selection && this.editable) {
          const range = document.body.createTextRange();
          range.moveToElementText(containerid.target);
          range.select();
        } else if (window.getSelection && this.editable) {
          const range = document.createRange();
          range.collapse(true) // 光标追加到最后
          range.selectNodeContents(containerid.target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);

        }
      },
      /**
       *更新vuex数据
       * **/
      ...mapMutations({
        setTempData: 'SET_TEMP_DATA',
        setEditable: 'SET_EDITABLE',
        setModuleIcon: 'SET_MODULE_ICON'
      }),
      /**
       * 点击导航按钮事件
       * **/
      clickModuleIcon(e, i) {
        //如果是编辑状态下的点击
        if (this.GET_EDITABLE) {
          // 判断点击了添加模块按钮
          if (i === this.NAV_ROOT_DATA.module_icon.length - 2) {
            this.$emit('add-module', this.NAV_ROOT_DATA.module_icon)
            console.log('点击了添加按钮')
            // 判断点击了排序按钮
          } else if (i === this.NAV_ROOT_DATA.module_icon.length - 1) {
            this.$emit('sort-module')
            console.log('点击了排序按钮')
          } else {
            //编辑状态下点击其它按钮逻辑
            console.log(i)
          }
        } else {
          //如果在非编辑状态下的点击
        }

      },
      /**
       * 删除按钮事件
       * **/
      delThisModule(index) {
        if (this.NAV_ROOT_DATA.module_icon.length !== 3) {
          //要删除的模块的路径
          console.log(this.NAV_ROOT_DATA.module_icon[index].module_path)
          console.log(this.NAV_ROOT_DATA.this_temp_all_module_data[this.NAV_ROOT_DATA.module_icon[index].module_path])
          delete this.NAV_ROOT_DATA.this_temp_all_module_data[this.NAV_ROOT_DATA.module_icon[index].module_path]
          this.NAV_ROOT_DATA.module_icon.splice(index, 1)
          // this.setTempData(JSON.parse(JSON.stringify(this.NAV_ROOT_DATA)))
          this.$emit('del-this-module',this.NAV_ROOT_DATA.this_temp_all_module_data,this.NAV_ROOT_DATA.module_icon)
          // this.thisTempData.module_icon.splice(index, 1)
          // this.thisTempData.module_icon = this.module_icon.slice(0, this.module_icon.length - 2)
        } else if (this.NAV_ROOT_DATA.module_icon.length = 3) {
          alert('不能再删啦,好好编辑吧。')
        }
      },
      // 滚动屏幕执行逻辑
      hScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        const nav = this.$refs.navTopGroup
        const hideNav = this.$refs.hideNavTopGroup
        if (scrollTop > this.GET_BANNER_HEIGHT) {
          hideNav.style.display = 'block'
          nav.style.position = 'fixed'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
        } else {
          hideNav.style.display = 'none'
          nav.style.position = 'static'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
        }
      },
      /**
       * 导航吸顶
       * **/


    },
    computed: {
      modulesListItemWidth() {
        const that = this
        return (function (w) {
          switch (w) {
            case 1:
              return `width:${that.screenWidth}px`
              break;
            case 2:
              return `width:${that.screenWidth / 2}px`
              break;
            case 3:
              return `width:${that.screenWidth / 3}px`
              break;
            case 4:
              return `width:${that.screenWidth / 4}px`
              break;
            default:
              return `width:${(that.screenWidth / 4) - ((that.screenWidth / 4) / 8)}px`
          }
        })(this.NAV_ROOT_DATA.module_icon.length)
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
              return `width:${((that.screenWidth / 4) - ((that.screenWidth / 4) / 8)) * w}px`
          }
        })(this.NAV_ROOT_DATA.module_icon.length)
      },
      editTextOutLine() {
        if (this.editable) {
          return `outline:.02rem dashed rgba(172,172,172,1)`
        }
      },
      GET_EDITABLE() {
        return this.GET_EDITABLE
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
    mounted() {
      this.$nextTick(() => {
        this.$refs.hideNavTopGroup.style.display = 'none'
        window.addEventListener('scroll', this.hScroll)
        let scroll = new BScroll('.navTopGroup', {
          scrollX: true,
          click: true
        })

      })

    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
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

  .navTopWrapper li span {
    font-size: $font-size-small;
    max-width: 5em
    display: inline-block
    padding: 3px
  }

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
        span
          outline none !important
        .nav-del-btn
          display none
      &:nth-last-child(2)
        .tab-icon
          background $color-fff
          border 1px dashed $color-9b
          .iconfont
            color $color-cyd
        span
          outline none !important
        .nav-del-btn
          display none


</style>
