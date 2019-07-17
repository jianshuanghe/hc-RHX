//如何使用 项
export function productDescHowUse() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleNamePath.module_name"
        :contenteditable="editable"
        :style="editTextOutLine"
        @click="selectText($event)"
        @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in path"
        :key="item.index"
        class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <h2 v-html="item.item_title"
            class="how_use_item_title"
            :contenteditable="editable"
            :style="editTextOutLine"
            @click="selectText($event)"
            @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')"

        >
        </h2>
        <p v-html="item.item_con"
           class="how_use_item_con"
           :contenteditable="editable"
           :style="editTextOutLine"
           @click="selectText($event)"
           @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
        >

        </p>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips
              v-if="show.isChoseImg"
              @change-img="changeImg(index)"
              @remove-img="removeImg(index,'item_img')"
              :choseimgfile="choseimgfile">
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
  </div>`
  return tempData
}
// 产品介绍 标题 图片项
export function productDescTitleImgItems() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleName.module_name"
        :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
        @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in path"
        :key="item.index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <!-- @blur 传递的数据依次是 1：待更改数据的指向.2:新值.3:属性值-->
            <h2 class="itemTitleConTitleRightCon nowrap needsclick" v-html="item.item_title"
                :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
                @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')"
            ></h2>
            <!-- @input = "item.item_title = $event.target.innerHTML"-->
            <p :contenteditable="editable"
               class="needsclick"
               @click="selectText($event)"
               :style="editTextOutLine"
               v-if="item.item_s_title"
               v-html="item.item_s_title"
               @blur="changThisClickData(path[index],$event.target.innerHTML,'item_s_title')"
            ></p>
          </div>
        </div>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
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
  </div>`
  return tempData
}
// 产品介绍 四大优势项
export function productDescFourBetter() {
  const tempData = `<div v-if="renderThis" class="itemRoot">
    <div class="itemTitleCon">
      <div class="P_LeftLable itemTitleConTitleWrap">
        <h2 class="itemTitleConTitleRightCon nowrap needsclick"
            v-html="moduleNamePath.title"
            :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            @blur="changThisClickData(moduleNamePath,$event.target.innerHTML,'title')"
        ></h2>
      </div>
    </div>
    <transition-group name="list-complete" tag="div" mode='in-out' class="thisRoot">
      <section class="MITEMS-WRAP list-complete-item thisFoubetterItem"
               v-for="(item,index) in path"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <div v-if="item.item_num"
             v-html="item.item_num"
             class="item_num"
             :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
             @blur="changThisClickData(path[index],$event.target.innerHTML,'item_num')"
        ></div>
        <h2 v-html="item.item_title"
            class="item_title"
            :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')">
        </h2>
        <p v-html="item.item_con"
           :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
           @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
           class="item_con"
        >
        </p>
      </section>
    </transition-group>
    <module-manage-btns
      v-if="editable"
      @manage-this-item="manageThisItem"
      @finsh-manage-this-item="finshManageThisItem"
      @add-this-item="addThisItem">
    </module-manage-btns>
  </div>`
  return tempData
}
// 产品简介 健康h
export function productDescScenes() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->

    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section
        v-for="(item,index) in path"
        :key="item.index" class="MITEMS-WRAP list-complete-item"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns">
            <div v-html="item.item_con"
                 class="mi_health_item_con"
                 :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
                 @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
            >

            </div>
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
  </div>`
  return tempData
}
// 如何安装
export function productDescHowInstall() {
  const tempData = ` <div v-if="renderThis" class="itemRoot">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <h1 class="module_name needsclick"
        v-html="moduleName.module_name"
        :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
        @blur="changThisClickData(moduleName,$event.target.innerHTML,'module_name')">
    </h1>
    <transition-group name="list-complete" tag="div" mode='in-out' class="thisRoot">
      <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
               v-for="(item,index) in path"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,path)"
          @up-this-items="UpThisItems(index,path)"
          @down-this-items="DownThisItems(index,path)">
        </manage-module-items-tips>
        <h2 v-html="item.item_title"
            class="item_title"
            :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
            @blur="changThisClickData(path[index],$event.target.innerHTML,'item_title')">
        </h2>
        <p v-html="item.item_con"
           :contenteditable="editable" :style="editTextOutLine" @click="selectText($event)"
           @blur="changThisClickData(path[index],$event.target.innerHTML,'item_con')"
           class="item_con"
        >
        </p>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap item_img">
            <changeImgTips v-if="show.isChoseImg" @change-img="changeImg(index)"
                           @remove-img="removeImg(index,'item_img')" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" class="needsclick" @click.prevent="showChoseImgBtns">
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
  </div>`
  return tempData
}
