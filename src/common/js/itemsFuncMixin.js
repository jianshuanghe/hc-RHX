import manageModuleItemsTips from 'components/businessModules/businessPublicModule/manageModuleItemsTips'
import moduleManageBtns from 'components/businessModules/businessPublicModule/moduleManageBtns'
import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
import { mapMutations, mapGetters } from 'vuex'
import lrz from 'lrz'
import * as API from 'config/api'

export const itemsFuncMixin = {
    data() {
        return {
            // 是否渲染此项
            renderThis: true,
            //当前模板的数据
            thisTempData: '',
            editable: false,
            // 导航中的图标
            topNavMd: [],
            // navIcon: [],
            module_icon: [],
            choseImg: '',

            // 数据指向路径
            thisMainPath: '',
            // 当前选择的图片在当前项中的index
            choseImgIndex: '',
            show: {
                // 是否显示每一项的管理层
                isShowItemstips: false,
                // 是否显示管理按钮
                isShowManageBtn: true,
                // 是否点击选择图片
                isChoseImg: false
            }
        }
    },
    components: {
        moduleManageBtns,
        manageModuleItemsTips,
        changeImgTips
    },
    beforeCreate() {

    },
    created() {
        /**
         * 拿到vuex中的模板数据来操作
         * **/
        // this.$nextTick(() =>{
        // setTimeout(() =>{
        if (this.GET_TEMP_DATA !== '') {
            this.thisTempData = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
                // this.navIcon = JSON.parse(JSON.stringify(this.thisTempData.module_icon))
            this.module_icon = JSON.parse(JSON.stringify(this.thisTempData.module_icon))
            console.log('是否为可编辑状态：' + this.GET_EDITABLE)
        }

        // },2000)
        // })


    },
    watch: {
        /**
         * 侦测数据变化以更新vuex
         * **/
        thisTempData: {
            handler(val, oldval) {
                console.log('模板数据已更新')
                this.setTempData(JSON.parse(JSON.stringify(this.thisTempData)))
                    // this.module_icon = this.thisTempData.module_icon
                    // this.module_icon = JSON.parse(JSON.stringify(this.GET_MODULE_ICON))
            },
            deep: true
        },
        GET_EDITABLE(v) {
            if (v === true) {
                this.editable = true
                document.getElementById('ediTingBtmBtns').style.height = '1.173333rem'
                    // this.module_icon.push({
                    //     // 编辑状态下增加两个图标
                    //     module_icon: '&#xe62e;',
                    //     module_name: '添加模块'
                    //   },
                    //   {
                    //     module_icon: '&#xe64e;',
                    //     module_name: '更改顺序'
                    //   }
                    // )
            } else {
                this.editable = false
                document.getElementById('ediTingBtmBtns').style.height = '0'
                    // this.module_icon.splice((this.module_icon.length - 2), 2)
            }
        },
        // thisTempData(v, o) {
        //   this.module_icon = this.thisTempData.module_icon
        // },
        // GET_MODULE_ICON: {
        //   handler(v, o) {
        //     console.log('排序了....')
        //     // this.$set()
        //   },
        //   deep: true
        // },
        GET_MODULE_ICON() {
            // this.module_icon = JSON.parse(JSON.stringify(this.GET_MODULE_ICON))
            // console.log('导航的图标也更新了')
        },
        module_icon(v, o) {
            if (this.thisTempData.module_icon) {
                this.thisTempData.module_icon = JSON.parse(JSON.stringify(v))
            }
            // this.setTempData(this.thisTempData)
            // this.setModuleIcon(v)
        }
        // thisTempData: {
        //   handler(v, o) {
        //     console.log('排序了')
        //   },
        //   deep: true
        // }
    },
    methods: {
        /**
         *更新vuex数据
         * **/
        ...mapMutations({
            setTempData: 'SET_TEMP_DATA',
            setEditable: 'SET_EDITABLE',
            setModuleIcon: 'SET_MODULE_ICON'
        }),
        // /**
        //  * 点击导航按钮事件
        //  * **/
        // clickModuleIcon(e, i) {
        //   //如果是编辑状态下的点击
        //   if (this.GET_EDITABLE) {
        //     // 判断点击了添加模块按钮
        //     if (i === this.module_icon.length - 2) {
        //       this.$emit('add-module', this.module_icon)
        //       console.log('点击了添加按钮')
        //       // 判断点击了排序按钮
        //     } else if (i === this.module_icon.length - 1) {
        //       this.$emit('sort-module')
        //       console.log('点击了排序按钮')
        //     } else {
        //       //编辑状态下点击其它按钮逻辑
        //       console.log(i)
        //     }
        //   } else {
        //     //如果在非编辑状态下的点击
        //   }
        //
        // },
        // /**
        //  * 删除按钮事件
        //  * **/
        // delThisModule(index) {
        //   if (this.module_icon.length !== 3) {
        //     console.log(this.module_icon[index].module_path)
        //     this.module_icon.splice(index, 1)
        //
        //     // this.thisTempData.module_icon.splice(index, 1)
        //     // this.thisTempData.module_icon = this.module_icon.slice(0, this.module_icon.length - 2)
        //   } else if (this.module_icon.length = 3) {
        //     alert('不能再删啦,好好编辑吧。')
        //   }
        // },
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
        methods: {
            /**
             *更新vuex数据
             * **/
            ...mapMutations({
                setTempData: 'SET_TEMP_DATA',
                setEditable: 'SET_EDITABLE',
                setModuleIcon: 'SET_MODULE_ICON'
            }),
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
                let thisMain = eval(this.path)
                if (thisMain.length === 1) {
                    alert('删除后该模块也会被删除哦，您可以点击添加模块按钮再次添加该模块')
                    this.renderThis = false
                } else {
                    thisMain.splice(i, 1)
                }

            },
            /**
             * 上移此项
             * i:此项的index
             * main:待修改的数据指向
             * */
            UpThisItems(i, main) {
                let thisMain = eval(this.path)
                let startItems = thisMain.slice(i, i + 1)
                let goItems = thisMain.slice(i - 1, i)
                this.$set(thisMain, i, goItems[0])
                this.$set(thisMain, i - 1, startItems[0])
            },
            // 下移此项
            DownThisItems(i, main) {
                let thisMain = eval(this.path)
                let startItems = thisMain.slice(i, i + 1)
                let goItems = thisMain.slice(i + 1, i + 2)
                this.$set(thisMain, i + 1, startItems[0])
                this.$set(thisMain, i, goItems[0])
            },
            // 复加此项
            addThisItem() {
                let thisMain = eval(this.path)
                console.log(thisMain)
                let lastItems = JSON.parse(JSON.stringify((thisMain[thisMain.length - 1])))
                    // lastItems.index += 1
                lastItems.index += Math.random()
                thisMain.push(lastItems)
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
            // 点击图片弹出选择图片按钮
            showChoseImgBtns() {
                if (this.editable) {
                    this.show.isChoseImg = !this.show.isChoseImg
                }
                return
            },
            // 点击替换图片按钮
            changeImg(i) {
                // console.log(i)
                // 当前选择此模块的图片index
                this.show.isChoseImg = false
                this.choseImgIndex = i
                console.log('要更换图片的index为：' + i)
            },
            // 点击删除图片
            removeImg(index, key) {
                this.show.isChoseImg = false
                let thisMain = eval(this.path)
                thisMain[index][key] = ''
            },
            // 选择后的文件对象并上传
            getThisFile(e) {
                console.log(e)
                console.log('选择后的文件对象并上传')
                    // const that = this
                this.show.isChoseImg = false
                this.thisImgFile = e.target.files[0]
                console.log(this.thisImgFile)
                lrz(this.thisImgFile).then((afterImg) => {
                    const that = this
                    let formData = new FormData()
                    formData.append('file', this.thisImgFile)
                    formData.append('systemName', 'ruhexiu')
                    API._UploadImg(formData).then(
                        that.isThisImg()
                    ).then((res) => {
                        if (res.ret === API.ERROK) {
                            console.log(res)
                                // that.isThisImg()
                            that.thisMainPath[that.choseImgIndex].item_img = res.httpUrl
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
            }
        },
        computed: {
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
            ]),
        }
    }
}