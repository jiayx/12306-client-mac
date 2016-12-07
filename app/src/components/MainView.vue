<style scoped>
  .tool-bar {
    background: #fff;
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .footer {
    position: absolute;
    bottom: 0;
    height: 30px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
  }
  .border {
    border: 1px solid #EFF2F7;
  }
  .bg-white {
    background: #fff;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 4px;
  }
  .mark {
    position: absolute;
    background-position: 0 -96px;
    width: 27px;
    height: 27px;
    font-size: 0;
    background-image: url(https://kyfw.12306.cn/otn/resources/js/newpasscode/captcha.png);
  }
</style>

<template>
  <div style="height: 100%;">
    <el-row style="padding: 4px 8px;">
      <el-col :span="20">
        <el-row>
          <el-col :span="3" class="">
            <el-autocomplete
              v-model="from"
              :fetch-suggestions="querySearch"
              placeholder="出发地"
              :trigger-on-focus="true"
              @select="selectFrom"
            ></el-autocomplete>
          </el-col>
          <el-col :span="2" style="text-align:center;">
            <el-button v-on:click="exchange">↔️</el-button>
          </el-col>
          <el-col :span="3" class="">
            <el-autocomplete
              v-model="to"
              :fetch-suggestions="querySearch"
              placeholder="出发地"
              :trigger-on-focus="true"
              @select="selectTo"
            ></el-autocomplete>
          </el-col>
          <el-col :span="6" class="">
            <el-date-picker
              style="width: 100%; padding-left: 20px;"      
              v-model="startTime"
              type="date"
              format="yyyy-MM-dd"
              :placeholder="today">
            </el-date-picker>
          </el-col>
          <el-col :span="10" style="padding-left: 20px;padding-top: 8px;">
            <el-checkbox label="stud">学生票</el-checkbox>
            <el-checkbox label="shua">刷票</el-checkbox>
          </el-col>
          
        </el-row>
    
        <el-row style="margin-top: 10px;">
          <el-col :span="18" class="" style="padding: 0 6px; border-left: 4px solid #20A0FF;">
            <el-row>        
              <div class="block">
                <span>车型</span>
                <el-checkbox-group v-model="trainTypes" style="display: inline;">
                  <el-checkbox label="G">高铁</el-checkbox>
                  <el-checkbox label="D">动车</el-checkbox>
                  <el-checkbox label="Z">直达</el-checkbox>
                  <el-checkbox label="T">特快</el-checkbox>
                  <el-checkbox label="K">快速</el-checkbox>
                  <el-checkbox label="QT">其他</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-row>
            <el-row>            
            <div class="block">
              <span>席别</span>
              <el-checkbox-group v-model="seatTypes" style="display: inline;">
                <el-checkbox label="G">商务</el-checkbox>
                <el-checkbox label="D">特等</el-checkbox>
                <el-checkbox label="Z">一等</el-checkbox>
                <el-checkbox label="T">二等</el-checkbox>
                <el-checkbox label="K">高软</el-checkbox>
                <el-checkbox label="QT">软卧</el-checkbox>
                <el-checkbox label="K">硬卧</el-checkbox>
                <el-checkbox label="K">软座</el-checkbox>
                <el-checkbox label="K">硬座</el-checkbox>
                <el-checkbox label="K">无座</el-checkbox>
                <el-checkbox label="QT">其他</el-checkbox>                  
              </el-checkbox-group>
            </div>
            </el-row>
          </el-col>
          <el-col :span="6" style="padding-left: 6px; border-left: 4px solid #20A0FF;">
            <!--<el-row>
              <el-col :span="2" style="text-align: right;">
                <p style="color: red;">隐</p>
                <p style="color: red;">隐</p>
              </el-col>
              <el-col :span="11" style="">
                <el-checkbox label="QT" style="padding: 0;">无票</el-checkbox>
                <el-checkbox label="QT" style="padding: 0;">发站不同</el-checkbox>
              </el-col>
              <el-col :span="11" style="">
                <el-checkbox label="QT" style="">无票</el-checkbox>
                <el-checkbox label="QT" style="">发站不同</el-checkbox>
              </el-col>
            </el-row>-->
            <div class="block">
              <p style="color: red; width: 15px; display: inline;">隐</p>
              <el-checkbox label="FZBT">发站不同</el-checkbox>
              <el-checkbox label="WP">无票</el-checkbox>
            </div>
            <div class="block">
              <p style="color: red; width: 15px; display: inline;">藏</p>
              <el-checkbox label="DZBT">到站不同</el-checkbox>
              <el-checkbox label="XBWX" checked>席别未选</el-checkbox>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <el-button v-show="!isLogin" @click="login">登录</el-button>
        <el-button
        type="primary"
        size="large"
        @click="searchTrain"
        style="height: 80px; width: 100px; margin-top: 10px;">{{ searching }}</el-button>
      </el-col>
    </el-row>
    <el-row style="height: calc(100% - 24px - 100px);">
      <ele-table :train-list="filterList"></ele-table>
    </el-row>      
    <el-row style="height: 24px; background: #1D8CE0; color: #EFF2F7; z-index: 10000;">
      <el-col :span="8">
        <p style="line-height: 24px; font-size: 12px; margin: 0 10px;">{{ getMessage }}</p>        
      </el-col>
      <el-col :span="8">     
      </el-col>
      <el-col :span="8" :offset="8">
        <p style="line-height: 24px; font-size: 12px; margin: 0 10px; text-align: right;">当前登录：{{ getUser.姓名 || '未登录' }}</p>        
      </el-col>
    </el-row>

    <!--登录弹出框 BEGIN -->
    <el-dialog title="登录" v-model="loginFormVisible" size="small">
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" class="">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <input type="hidden" style="display: none;" v-model="form.code">
        <el-form-item label="验证码" prop="code">
          <div>
            <img v-if="verifyCode" @click="chooseCode" :src="verifyCode" alt="">
            <div @click="unchooseCode(index)" v-for="(mark, index) in marks" class="mark" :style="{ top: mark.top + 'px', left: mark.left + 'px' }"></div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--登录弹出框 END -->

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Datepicker from 'vue-datepicker';

  import EleTable from './EleTable';
  import Login from './Login';
  import { WINDOW_LOGIN } from './const';
  import train from '../api/train';

  // const { BrowserWindow } = require('electron').remote;

  const getDateString = (date) => {
    if (date == '' || date == undefined) {
      date = new Date();
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    return `${date.getFullYear()}-${month}-${day}`;
  };

  let windowLogin;
  
  const create = () => {
    // windowLogin = new BrowserWindow({ parent: BrowserWindow.fromId(1), id: WINDOW_LOGIN, width: 800, height: 500, title: '登录', show: false });
    // windowLogin.loadURL('/#login');
    // windowLogin = window.open('/', '登录', 'parent: 2');
  };

  export default {
    computed: mapGetters([
      'trainList',
      'filterList',
      'getMessage',
      'stations',
      'getUser',
    ]),
    methods: {
      ...mapActions([
        'getFilterList',
        'setMessage',
      ]),
      searchTrain() {
        const self = this;
        const data = {
          from: this.fromCode.toUpperCase(),
          to: this.toCode.toUpperCase(),
          date: getDateString(this.startTime),
          trainTypes: this.trainTypes,
          seatTypes: this.seatTypes,
          callback() {
            self.searching = '查询';
          },
        };
        this.searching = '查询中...';
        this.$store.dispatch('searchTrain', data);
      },
      selectFrom(from) {
        this.fromCode = from.code;
      },
      selectTo(to) {
        this.toCode = to.code;
      },
      exchange() {
        let temp = this.toCode;
        this.toCode = this.fromCode;
        this.fromCode = temp;
        temp = this.to;
        this.to = this.from;
        this.from = temp;
      },
      // 用来选择出发地和目的地的
      querySearch(queryString, cb) {
        const stations = this.$store.getters.stations;
        // console.log(stations);
        const results = queryString ? stations.filter(this.createFilter(queryString)) : stations;
        // 调用 callback 返回建议列表的数据
        console.log(results);
        cb(results);
      },
      createFilter(queryString) {
        return section => section.value.indexOf(queryString.toLowerCase()) === 0;
      },
      login() {
        console.log('登录');
        this.loginFormVisible = true;
        this.loadVerifyCode();
      },
      handleSubmit() {
        const self = this;
        const temp = [];
        this.points.forEach(mark => {
          temp.push(`${mark.left},${mark.top}`);
        });
        const code = temp.join(',');
        const data = {
          code,
          username: 'jiayanxiang',
          password: 'jia18792458926',
          cb: () => {
            self.loginFormVisible = false;
            self.isLogin = true;
          },
        };
        // console.log(data);
        this.$store.dispatch('login', data);
      },
      handleReset() {
        console.log('清空');
      },
      // 加载验证码
      loadVerifyCode() {
        const self = this;
        train.loadVerify(file => {
          const base64 = file.toString('base64');
          self.verifyCode = `data:image/jpeg;base64,${base64}`;
        });
      },
      // 选择验证码
      chooseCode(event) {
        if (event.offsetY <= 30 || event.offsetX < 1) {
          return;
        }

        const top = parseInt(event.offsetY - 1 - 27 / 2, 10);
        const left = parseInt(event.offsetX - 27 / 2, 10);
        this.marks.push({ left, top });
        this.points.push({ top: event.offsetY - 30, left: event.offsetX });
      },
      unchooseCode(index) {
        console.log(index);
        this.marks.splice(index, 1);
        this.points.splice(index, 1);
      },
    },
    watch: {
      // 如果 trainTypes 发生改变，这个函数就会运行
      trainTypes(type) {
        console.log(type);
        this.$store.dispatch('getFilterList', { filter: type });
      },
    },
    mounted() {
      // this.$store.dispatch('getStations');
    },
    created() {
      create();
      // if (! this.isLogin) {
      // }
    },
    data: () => ({
      from: '北京',
      to: '上海',
      fromCode: 'bjp',
      toCode: 'shh',
      startTime: '',
      today: getDateString(),
      trainTypes: ['G', 'D', 'Z', 'T', 'K', 'QT'],
      seatTypes: ['G', 'D', 'Z', 'T', 'K', 'QT'],
      searching: '查询',

      marks: [],
      points: [],
      isLogin: false,
      loginFormVisible: false,
      form: {
        username: 'jiayanxiang',
        password: 'jia18792458926',
        code: '',
      },
      verifyCode: null,
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
    components: {
      'date-picker': Datepicker,
      'ele-table': EleTable,
    },
  };
</script>