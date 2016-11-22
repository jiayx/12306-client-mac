<style scoped>
    
</style>

<template>
    <el-row>
      <el-col :span="24">
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" class="">
          <el-form-item label="密码" prop="pass">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
</template>

<script>

  import { remote } from 'electron';
  import { WINDOW_LOGIN } from './const';
  import { mapGetters, mapActions } from 'vuex';
  const { BrowserWindow } = remote;
  
  export default {
    props: ['windowLogin'],
    methods: {
      show() {
        this.windowLogin.show();
      },
      hide() {
        this.windowLogin.hide();
      },
      handleSubmit() {
        console.log('提交登录');
      },
      handleReset() {
        console.log('清空');
      },
    },
    data: () => ({
      form: {
        username: 'jiayanxiang',
        password: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    }),
  };
</script>
