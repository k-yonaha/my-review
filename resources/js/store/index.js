import { createStore } from 'vuex';
import maps from './maps';

const store = createStore({
  modules: {
    maps,
  },
});

export default store;