
// 获取菜单列表！
import { getMenu } from "@/request/menu"
export default {
    namespaced: true,
    state: {
        menulist: [] //菜单列表
    },
    getters: {
        menulist: state => state.menulist
    },

    mutations: {
        SET_LIST(state, date) {
            state.menulist = date
        }
    },

    actions: {
        async  get_menu_list({ commit }) {
            let res = await getMenu();
            // console.log(res);
            commit('SET_LIST', res)

        }
    }
}
