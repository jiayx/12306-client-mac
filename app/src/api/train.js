import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import request from 'request';

const agent = new https.Agent({
  host: 'kyfw.12306.cn',
  port: '443',
  path: '*',
  strictSSL: false,
  rejectUnauthorized: false,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// const cookieJar = request.jar();
const client = request.defaults({ jar: true });

const headers = {
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,es;q=0.2',
  Connection: 'keep-alive',
  // 'Content-Length': 0,
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Host: 'kyfw.12306.cn',
  Origin: 'https://kyfw.12306.cn',
  Referer: 'https://kyfw.12306.cn/otn/login/init',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
};

export default {
  // 获取列车信息
  getTrainList({ from, to, date }, cb) {
    console.log(from, to, date);
    const url = `https://kyfw.12306.cn/otn/leftTicket/queryX?leftTicketDTO.train_date=${date}&leftTicketDTO.from_station=${from}&leftTicketDTO.to_station=${to}&purpose_codes=ADULT`;
    console.log(url);

    fetch(url, { agent })
      .then((res) => res.json())
      .then((body) => {
        cb(body);
      });
  },
  // 获取车站信息
  getStations(cb) {
    const url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8971';
    fetch(url, { agent, headers })
      .then(res => res.text())
      .then(body => {
        body = body
          .replace('var station_names =\'@', '')
          .replace('\';', '')
          .replace(' ', '')
          .split('@');
        cb(body);
      });
  },
  // 登录
  login({ username, password, code }, cb) {
    const url = 'https://kyfw.12306.cn/otn/login/loginAysnSuggest';
    // code = encodeURIComponent(code);
    // console.log(code);
    const queryBody = (`loginUserDTO.user_name=${username}&userDTO.password=${password}&randCode=${code}`);
    // headers['Content-Length'] = queryBody.length;
    // console.log(queryBody, queryBody.length, cookieJar);

    const thisHeaders = Object.create(headers);

    const form = {
      'loginUserDTO.user_name': username,
      'userDTO.password': password,
      randCode: code,
    };
    // console.log(form);
    client.post({ url, form, headers: thisHeaders }, (error, response, body) => {
      // console.log(response);
      if (!error && response.statusCode == 200) {
        // console.log();
        cb(JSON.parse(body));
      }
    });
  },
  // 初始化并加载验证码
  loadVerify(cb) {
    this.init(() => {
      this.loadVerifyCode(cb);
    });
  },
  // 加载验证码
  loadVerifyCode(cb) {
    const url = 'https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand&' + Math.random();
    // const path = './app/assets/code.jpg';
    const path = 'code.jpg';
    const stream = fs.createWriteStream(path);
    client.get({ url, headers }, (error, response, body) => {
      // console.log(response.request.headers);
      if (!error && response.statusCode == 200) {
        // console.log(response);
      }
    }).pipe(stream).on('close', () => {
      fs.readFile(path, (err, data) => {
        // console.log(err, data);
        cb(data);
      });
    });
  },
  checkCode(code, cb) {
    const url = 'https://kyfw.12306.cn/otn/passcodeNew/checkRandCodeAnsyn';
    const queryBody = `randCode=${encodeURIComponent(code)}&rand=sjrand`;

    const form = {
      rand: 'sjrand',
      randCode: code,
    };
    client.post({ url, form, headers }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log();
        cb(JSON.parse(body));
      }
    });
  },
  getUserInfo(cb) {
    const url = 'https://kyfw.12306.cn/otn/modifyUser/initQueryUserInfo';
    client.get(url, cb);
  },
  init(cb) {
    const url = 'https://kyfw.12306.cn/otn/login/init';
    client.get(url, (error, response, body) => {
      // console.log(error, response, body);
      if (!error && response.statusCode == 200) {
        cb(body);
      }
    });
  },
  // 请求统一封装
  request(url, req, cb) {
    console.log(req);
    fetch(url, {
      ...req,
      agent,
    }).then(cb);
  },
};
