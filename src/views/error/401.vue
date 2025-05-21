<template>
<div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" >
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          401错误!
        </h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">
              回首页
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img src='../../assets//401/401.gif' width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import errImage from "../../assets/401/401.gif"

// let { proxy } = getCurrentInstance()

// const errGif = ref(errImage + "?" + +new Date())

// function back() {
//   if (proxy.$route.query.noGoBack) {
//     proxy.$router.push({ path: "/" })
//   } else {
//     proxy.$router.go(-1)
//   }
// }
</script>

<style lang='scss' scoped>

</style>
