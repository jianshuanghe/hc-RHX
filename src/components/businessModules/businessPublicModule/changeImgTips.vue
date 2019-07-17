<template>
  <div class="popover_content">
    <div class="popover_btns">
      <a ><label :for="choseimgfile" @click="changeImg">替换</label></a>
      <a @click="removeImg">移除</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "change-img-tips",
    props: ['choseimgfile'],
    methods: {
      changeImg() {
        this.$emit('change-img')
      },
      removeImg() {
        this.$emit('remove-img')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .popover_content {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: rgb(46, 46, 48)
    border-radius: 7px;
    max-width: 100%;
  }

  .popover_content .popover_btns {
    margin-top: -40px;
    font-size: 0
  }

  .popover_content .popover_btns a {
    font-size: 12px
    display: inline-block;
    width: 50%;
    height: 20px
    line-height: 20px;
    box-sizing: border-box;
    float: left;
    border-right: 0.5px solid #fff;
    color: #fff;
    cursor: pointer;
  }

  .popover_content .popover_btns a label {
    display: block;
    cursor: pointer;
  }

  .popover_content .popover_btns a:nth-last-child(1) {
    border-left: 0.5px solid #fff;
    border-right: none;
  }

  .popover_content:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: rgb(46, 46, 48);
    margin-top: 24px;
    transform: rotate(45deg)
  }
</style>
