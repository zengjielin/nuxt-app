<template>
  <div class="container">
    <!-- 没啥作用 -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  asyncData({ redirect }) {
    // 重定向到官网主页
    redirect('/layout/home')
  },
  methods: {
    ...mapActions({
      _login: "login",
    }),
    // async login() {
    //   const res = await this._login();
    // },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
