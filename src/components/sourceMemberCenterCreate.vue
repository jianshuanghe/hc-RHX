<template>
  <div class="hello">
    <div >
      <loading :show="loadingShow" text="请稍等..."></loading>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'vux';
  export default {
    name: 'sourceMemberCenterCreate',
    components: {
      Loading
    },
    data () {
      return {
        loadingShow: false,
        promiseJd: false
      };
    },
    created() {
      let query = this.$route.query;
      query.herf = decodeURIComponent(this.$route.query.herf);
      localStorage.setItem('queryMC', JSON.stringify(query));
      let userId = '';
      if (this.$route.query.userId) { // 如果存在userId
        userId = this.$route.query.userId;
      }
      let that = this;
      var promise = new Promise(function(resolve, reject) {
        if (userId !== '') { // 如果存在userId, 则缓存下来
          localStorage.setItem('userId', userId);
        }
        resolve();
      }).catch(new Function());
      promise.then(function() { // 异步操作
        that.promiseJd = true;
      });
    },
    watch: {
      promiseJd: {
        handler (a, b) {
          console.log(a, b);
          this.getToRouter();
        },
        deep: true
      }
    },
    methods: {
      getToRouter () {
        let query = this.$route.query;
        if (query.tempType === '1') {
          // tempType = 1 代表进入定制模板
          console.log('1');
          this.$router.push({
            path: '/cust',
            query: {
              tempId: query.tempId,
              sourceMember: query.sourceMember, // 定义来源参数 FB：发现商机页面, FI流量承载页
              confirmEdit: 200
            }
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  h1, h2 {
    font-weight: normal;
    color $color-cyd
    font-size 50px
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
