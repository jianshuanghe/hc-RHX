//产品介绍模块
export function miDesc() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
<div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled='!editable'></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section class="MITEMS-WRAP list-complete-item"
               v-for="(item,index) in dataPath.descCon" :key="item.index">
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.descCon)"
          @up-this-items="UpThisItems(index,dataPath.descCon)"
          @down-this-items="DownThisItems(index,dataPath.descCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <!-- @blur 传递的数据依次是 1：待更改数据的指向.2:新值.3:属性值-->
            <!--<h2 class="itemTitleConTitleRightCon nowrap needsclick" v-html="item.title"></h2>-->
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      id="test"
                      v-model="item.title"
                      :style="editTextOutLine"
                      :disabled="!editable"></textarea>
            <!-- @input = "item.item_title = $event.target.innerHTML"-->
            <!--<p class="needsclick" v-html="item.s_title"></p>-->
            <textarea
              v-model="item.s_title"
              class="itemTitleConStitle"
              :style="editTextOutLine"
              placeholder="请输入副标题"
              :disabled="!editable"
              v-if="editable"></textarea>
          </div>
        </div>
        <div class="itemConWrap MITEMS">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.descCon[index])"
                           @remove-img="removeImg(index,dataPath.descCon[index])" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" alt="" class="needsclick"  :data-item="item" @click="showChoseImgBtns()" v-if="item.item_img">
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
</div>`
  return tempData
}
//如何安装模块
export function miInstall() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
<div :id="dataPath.icon.moduleName" class="maodian"></div>
<!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled="!editable"></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out' class="installRoot">
      <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
               v-for="(item,index) in dataPath.installCon" :key="item.index"
      >
      <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.installCon)"
          @up-this-items="UpThisItems(index,dataPath.installCon)"
          @down-this-items="DownThisItems(index,dataPath.installCon)">
        </manage-module-items-tips>
        <textarea
          v-model="item.title"
          placeholder="请输入..."
          class="item_title"
          :style="editTextOutLine"
          :disabled="!editable"></textarea>
        <textarea
          class="item_con"
          v-model="item.item_con"
          placeholder="请输入..."
          :style="editTextOutLine"
          :disabled="!editable"></textarea>
        <div class="itemConWrap MITEMS" v-if="item.item_img">
          <div class="itemConWrap_imgWrap item_img">
             <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.installCon[index])"
                           @remove-img="removeImg(index,dataPath.installCon[index])" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" class="needsclick" @click.prevent="showChoseImgBtns" v-if="item.item_img">
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
// 如何使用模块
export function miUse() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              :style="editTextOutLine"
              :disabled="!editable"
              v-model="dataPath.icon.moduleTitle"
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out' class="">
    <section class="MITEMS-WRAP list-complete-item mi_install_thisItem"
             v-for="(item,index) in dataPath.useCon" :key="item.index">
      <manage-module-items-tips
        v-show="show.isShowItemstips" :tIndex="index"
        @delate-this-items="DelateThisItems(index,dataPath.useCon)"
        @up-this-items="UpThisItems(index,dataPath.useCon)"
        @down-this-items="DownThisItems(index,dataPath.useCon)">
      </manage-module-items-tips>
      <div class="itemTitleConTitleWrap">
        <textarea
          class="itemTitleConTitleRightCon"
          :style="editTextOutLine"
          :disabled="!editable"
          v-model="item.title"
        >
        </textarea>
        <textarea
          class="itemTitleConStitle"
          :style="editTextOutLine"
          :disabled="!editable"
          v-model="item.s_title"
        ></textarea>
      </div>
      <div class="itemConWrap MITEMS">
        <div class="itemConWrap_imgWrap">
          <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.useCon[index])"
                         @remove-img="removeImg(index,dataPath.useCon[index])" :choseimgfile="choseimgfile">
          </changeImgTips>
          <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns" v-if="item.item_img">
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
// 注意事项
export function miCare() {
  const tempDta = `<div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled='!editable'
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section class="MITEMS-WRAP list-complete-item"
               v-for="(item,index) in dataPath.careCon" :key="item.index">
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.careCon)"
          @up-this-items="UpThisItems(index,dataPath.careCon)"
          @down-this-items="DownThisItems(index,dataPath.careCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      v-model="item.title"
                      :style="editTextOutLine"
                      :disabled="!editable"
            ></textarea>
            <textarea
              v-model="item.s_title"
              class="itemTitleConStitle"
              :style="editTextOutLine"
              :disabled="!editable"
            ></textarea>
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
  return tempDta
}
// 基本参数
export function miCanshu() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :style="editTextOutLine"
              :disabled='!editable'
    ></textarea>
    <transition-group name="list-complete" tag="div" mode='in-out'>
      <section class="MITEMS-WRAP list-complete-item"
        v-for="(item,index) in dataPath.canshuCon"
               :key="item.index"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index,dataPath.canshuCon)"
          @up-this-items="UpThisItems(index,dataPath.canshuCon)"
          @down-this-items="DownThisItems(index,dataPath.canshuCon)">
        </manage-module-items-tips>
        <div class="itemTitleCon">
          <div class="itemTitleConTitleWrap P_LeftLable">
            <textarea class="itemTitleConTitleRightCon"
                      ref="test"
                      :style="editTextOutLine"
                      :disabled="!editable"
                      v-model="item.title"
            ></textarea>
          </div>
        </div>
        <div class="itemConWrap MITEMS">
          <div class="itemConWrap_imgWrap">
            <changeImgTips v-if="show.isChoseImg && item.item_img" @change-img="changeImg(index,dataPath.canshuCon[index])"
                           @remove-img="removeImg(index,dataPath.canshuCon[index])" :choseimgfile="choseimgfile">
            </changeImgTips>
            <img :src="item.item_img" alt="" class="needsclick" @click.prevent="showChoseImgBtns" v-if="item.item_img">
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
// 联系我们
export function miContact() {
  const tempData = `<div class="itemRoot" v-if="renderThis">
    <div :id="dataPath.icon.moduleName" class="maodian"></div>
    <textarea class="module_name"
              v-model="dataPath.icon.moduleTitle"
              :disabled="!editable"
              :style="editTextOutLine"
    ></textarea>
    <!--联系信息-->
    <div class="callUs">
      <div class="itemTitleCon">
        <div class="itemTitleConTitleWrap P_LeftLable">
      <textarea class="itemTitleConTitleRightCon"
                ref="test"
                :style="editTextOutLine"
                :disabled="!editable"
                v-model="sortPath[0].item_title"
      >联系方式</textarea>
          <!-- @input = "item.item_title = $event.target.innerHTML"-->
          <!--<p class="needsclick" v-html="item.s_title"></p>-->
        </div>
      </div>
      <div class="itemConWrap MITEMS">
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-dianhua1"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>电话</h3>
            <textarea
              v-model="sortPath[0].companyPhone"
              :disabled="!editable"
              :style="editTextOutLine"
            >400-8899-202</textarea>
          </div>
        </div>
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-youxiang1"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>邮箱</h3>
            <textarea
              v-model="sortPath[0].companyEmail"
              :disabled="!editable"
              :style="editTextOutLine"
            ></textarea>
          </div>
        </div>
        <div class="callUsItems">
          <div class="callUsIcons">
            <i class="iconfont icon-tubiao201"></i>
          </div>
          <div class="callUsIconsRight">
            <h3>地址</h3>
            <textarea
              v-model="sortPath[0].companyAddress"
              :disabled="!editable"
              :style="editTextOutLine"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!--留言模块-->
    <div class="pushMsg">
      <div class="itemTitleCon">
        <div class="itemTitleConTitleWrap P_LeftLable">
      <textarea class="itemTitleConTitleRightCon"
                :style="editTextOutLine"
                v-model="sortPath[1].item_title"
                :disabled="!editable"
      ></textarea>
          <!--ref="test"-->
        </div>
      </div>
      <div class="pushMsgCon">
        <br>
        <input type="text" placeholder="如何称呼您" v-model="pushMsg.name">
        <input type="tel"
                mm="99"
               placeholder="在这里输入联系电话哦"
               maxlength="11"
               v-model="pushMsg.mobile"
        ><textarea name="" id="" cols="30" rows="10" placeholder="说点什么吧，我可是非常期待呢"
                   v-model="pushMsg.cont"
                   maxlength="300"
      ></textarea>
      </div>
      <button class="pushMsgBtn"
              :disabled="!pushMsg.mobile||!pushMsg.name||!pushMsg.cont"
              @click="pushMsgFunc"

      >提 交 信 息</button>
    </div>
  </div>`
  return tempData
}
