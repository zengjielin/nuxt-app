import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import modules from "./modules";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      ...state,
      counter: 0
    },
    getters: {
      ...getters
    },
    mutations: {
      ...mutations,
      increment(state) {
        state.counter++;
      }
    },
    actions: {
      ...actions
    },
    modules: {
      ...modules
    }
  });

export default store;
