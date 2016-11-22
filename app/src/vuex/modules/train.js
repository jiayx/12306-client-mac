import * as types from '../mutation-types';
import train from '../../api/train';
import cheerio from 'cheerio';

const state = {
  // loginInfo: '',
  user: {},
  list: [],
  filterList: [],
  from: '',
  to: '',
  stations: [],
  trainTypes: ['G', 'D', 'Z', 'T', 'K'],
};

const getters = {
  trainList: state => state.list,
  filterList: state => state.filterList,
  stations: state => state.stations,
  getUser: state => state.user,
};

const actions = {
  // 查询列车
  searchTrain({ commit, dispatch }, query) {
    console.log(query);
    // dispatch('setMessage', { message: '查询中...' });
    commit(types.MESSAGE_CHANGE, '查询中...');
    train.getTrainList(query, result => {
      // console.log(result);
      commit(types.SEARCH_TRAIN, { trainList: result.data });
      // 获取完成 根据已有条件过滤一下再展示
      dispatch('getFilterList', { filter: query.trainTypes });
      query.callback();
    });
  },
  // 获取车站信息
  getStations({ commit }) {
    train.getStations(stations => {
      commit(types.UPDATE_SECTION_LIST, { stations });
    });
  },
  // 过滤列车
  getFilterList({ commit, dispatch }, { filter }) {
    const filterList = state.list.filter(item => {
      const trainType = item.queryLeftNewDTO.station_train_code[0];
      console.log(trainType);
      if (filter.indexOf(trainType) < 0 || (state.trainTypes.indexOf(trainType) < 0 && filter.indexOf('QT') >= 0)) {
        return false;
      }
      return true;
    });
    // console.log(filterList);
    commit(types.FILTER_TRAIN, { filterList });
    // dispatch('setMessage', { message: `查找到 ${state.filterList.length} 趟车` });
    commit(types.MESSAGE_CHANGE, `查找到 ${state.filterList.length} 趟车`);
  },
  // 登录
  login({ commit, dispatch }, user) {
    // commit(types.LOGINING);
    dispatch('setMessage', { message: '检查验证码...' });
    train.checkCode(user.code, (result) => {
      console.log(result.data);
      if (result.status == true && result.data.msg == 'TRUE') {
        dispatch('setMessage', { message: '验证码正确，登录中...' });
        // commit(types.MESSAGE_CHANGE, '验证码正确，登录中...');
        train.login(user, (result) => {
          console.log(result);
          train.getUserInfo((error, response, body) => {
            console.log(error, response, body);
            if (!error && response.statusCode == 200) {
              dispatch('setMessage', { message: '登录成功，获取用户信息...' });

              console.log(response);
              if (!error && response.statusCode == 200) {
                dispatch('setMessage', { message: '获取用户信息成功' });
                const $ = cheerio.load(body);
                // console.log($);
                const userInfo = {};
                $('#basic_info_view .info-item').each(function () {
                  let key = $(this).find('.label').text();
                  key = key.replace(/[*\s:：]/g, '');
                  userInfo[key] = $(this).find('.con').text();
                });
                console.log(userInfo);
                dispatch('setMessage', { message: '登录成功' });
                user.cb();
                commit(types.LOGIN_SUCCESS, { userInfo });
              } else {
                dispatch('setMessage', { message: '获取用户信息失败，请重新登录' });
              }
            } else {
              dispatch('setMessage', { message: '登录失败，请重试' });
            }
          });
        });
      } else {
        dispatch('setMessage', { message: '验证码有误，请核实' });
        // commit(types.MESSAGE_CHANGE, '验证码错误请核实');
      }
    });
    // train.init(result => {
    //   // console.log(result);
    //   dispatch('setMessage', { message: '检查验证码...' });
    //   train.checkCode(user.code, (result) => {
    //     console.log(result.data);
    //     if (result.status == true) {
    //       dispatch('setMessage', { message: '验证码正确，登录中...' });
    //       train.login(user, (result) => {
    //         console.log(result.messages);
    //         commit(types.LOGIN_SUCCESS, { user: {} });
    //       });
    //     }
    //   });
    // });
  },
  checkCode({ commit, dispatch }, code) {
    dispatch('setMessage', { message: '检查验证码...' });
    train.checkCode(code, (result) => {
      if (result.status == 200) {
        commit(types.CODE_IS_REGHT);
      }
    });
  },

};

const mutations = {
  [types.SEARCH_TRAIN](state, { trainList }) {
    state.list = trainList || [];
  },
  [types.ADD_TRAIN_FROM](state, { from }) {
    state.from = from;
  },
  [types.ADD_TRAIN_TO](state, { to }) {
    state.to = to;
  },
  [types.UPDATE_SECTION_LIST](state, { stations }) {
    if (state.stations.length > 0) return;
    stations.forEach(item => {
      const station = item.split('|');
      state.stations.push(
        {
          code: station[0],
          value: station[1],
        }
      );
    });
    // console.log(state.stations);
  },
  [types.FILTER_TRAIN](state, { filterList }) {
    state.filterList = filterList;
  },
  [types.LOGIN_SUCCESS](state, { userInfo }) {
    state.user = userInfo;
  },
  [types.CODE_IS_REGHT](state) {
    // state.user = user;
  },
  // [types.LOGIN_FAILED](state) {
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
