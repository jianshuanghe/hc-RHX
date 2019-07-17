<template>
  <div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref accept="image/*">
    <!-- 选择上传文件bridge -->
    <!-- banner -->
    <div class="index-banner" v-if="banner.length">
      <img
        class="order-banner-img"
        style="margin:0"
        :src="banner[0].picUrl || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'"
        @click.prevent="showChoseImgBtns(item,index)"
      >
      <changeImgTips
        @change-img="changeImg(banner[0],'picUrl')"
        @remove-img="removeImg(banner[0],'picUrl')"
        :choseimgfile="choseimgfile"
        v-if="showItem === index"
      ></changeImgTips>
    </div>
  </div>
</template>

<script>
import { gethashcode } from "common/js/hash";
import changeImgTips from "components/businessModules/businessPublicModule/changeImgTips";
import * as API from "config/api";
import lrz from "lrz";
export default {
  name: "banenr",
  components: {
    changeImgTips
  },
  data() {
    return {
      editable: true,
      show: {
        isChoseImg: true
      },
      showItem: '', // 点击的图片显示操作按钮
      choseimgfile: gethashcode(),
      banner: [
        {
          linkUrl: "",
          picUrl: ""
        }
      ]
    };
  },
  methods: {
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
      console.log("AAA");
      this.choseImgPath = imgPath;
      this.choseImgKey = key;
      console.log("BBB");
      this.showItem = '' // 将标记置空
    },
    // 点击删除图片
    removeImg(imgPath, key) {
      imgPath[key] = "";
      this.showItem = '' // 将标记置空
    },
    // 选择后的文件对象并上传
    getThisFile(e) {
      this.thisImgFile = e.target.files[0];
      console.log(this.thisImgFile);
      lrz(this.thisImgFile).then(afterImg => {
        const that = this;
        let formData = new FormData();
        formData.append("file", afterImg.file);
        formData.append("systemName", "ruhexiu");
        API._UploadImg(formData).then(res => {
          if (res.ret === API.ERROK) {
            let fD = new FormData();
            fD.append("fileName", res.name);
            API._uploadSuccess(fD).then(rs => {
              if (rs.ret === API.ERROK) {
                that.$set(that.choseImgPath, that.choseImgKey, rs.httpUrl);
                // that.editable = false;
              }
            });
          }
        });
        console.log(afterImg);
      });
      e.target.value = "";
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';
@import '~common/stylus/variable';

.index-banner {
  position: relative;
}

.order-banner-img {
  width: 100%;
  height: 170px;
  display: block;
  margin: 12px 0;
}
</style>


