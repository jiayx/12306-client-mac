import * as types from '../mutation-types';

const state = {
  message: '点击查询按钮开始查票',
};

const mutations = {
  [types.MESSAGE_CHANGE](state, { message }) {
    state.message = message;
  },
};

export default {
  state,
  mutations,
};
