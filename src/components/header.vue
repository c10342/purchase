<template>
  <div class="my-header">
    <div class="my-left fontsize14">
      <ul>
        <li><a href="http://www.lashou.com/faq.php" target="_blank">帮助</a></li>
        <li><a href="http://www.lashou.com/feedback.php" target="_blank">反馈</a></li>
      </ul>
    </div>
    <div class="my-right fontsize14">
      <ul>
        <li class="my-item">
          <a href="/shop/index.html/" target="_blank">商家后台</a>
        </li>
        <li class="my-item" @click='settledIn'>商家入驻</li>
        <!-- <li>团购购物车(0)</li> -->
        <li @click="handelClick('orderList')">我的</li>
        <!-- <li>更多</li> -->
        <li v-if="userInfo.id?true:false">{{userInfo.username}}</li>
        <li v-if="userInfo.id?true:false" class="my-item" @click="logout">{{out}}</li>
        <li v-if="userInfo.id?false:true" class="my-item" @click="login">[登录]</li>
        <li v-if="userInfo.id?false:true" class="my-item" @click="register">[注册]</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 头部
import { mapGetters, mapMutations } from "vuex";
import { get } from "../util";

export default {
  data() {
    return {
      out: "退出"
    };
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    register() {
      this.$emit("register");
    },
    login() {
      this.$emit("login");
    },
    settledIn() {
      this.$emit("settledIn");
    },
    handelClick(str) {
      this.$emit("goTo", {
        name: str
      });
    },
    async logout() {
      try {
        this.out = "退出中...";
        this.setUserInfo({
            user:{},
            userDetail:{}
          });
        const result = await get("/tjsanshao/user/logout");
      } catch (error) {
        this.$message.error('服务器或者网络出现问题')
      }finally{
        this.out = "退出";
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>


<style lang="less" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    li {
      padding: 0 20px 0 0;
      cursor: pointer;
      &.my-item {
        color: #506eaa;
      }
      > a {
        display: block;
        text-decoration: none;
        color: black;
      }
    }
  }
}
</style>

