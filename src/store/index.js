import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

//导入模块
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"

let store = new Vuex.Store({
    state: {
        iscollspace: false //是否折叠 默认不折叠
    },
    mutations: {
        TOGGLE(state) {
            state.iscollspace = !state.iscollspace
        }
    },
    modules: {
        menu, role, user
    }
});
export default store