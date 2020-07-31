import Vuex from 'vuex';
import Vue from 'vue';
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
Vue.use(Vuex);
export interface IRootState {}
export default new Vuex.Store<IRootState>({});
