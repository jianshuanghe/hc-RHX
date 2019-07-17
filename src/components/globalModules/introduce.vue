<template>
    <div v-if="showEdit">
        <x-textarea class="introduce" v-model="text" :max="300" placeholder="用一段话介绍自己吧" :rows="8" :cols="30"></x-textarea>
        <div class="save" @click="showText">完成</div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.introduce {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  background: #fff;
  line-height: 24px;
}

.save {
  height: 45px;
  line-height: 45px;
  margin: 10px 15px;
  background: #02C2A2;
  color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
}
</style>

<script>
import { XTextarea } from "vux";
export default {
  props: ["showEdit","text"],
  name: "introduce",
  components: { XTextarea },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    showText() {
      this.$emit("showText", this.text);
    }
  }
};
</script>

