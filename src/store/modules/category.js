
// 获取菜单列表！
import { getCategory } from "@/request/category"
export default {
    namespaced: true,
    state: {
        catelist: [] //菜单列表
    },
    getters: {
        catelist: state => state.catelist
    },

    mutations: {
        SET_LIST(state, date) {
            state.catelist = date
        }
    },

    actions: {
        async  get_category_list({ commit }) {
            let res = await getCategory();
            // console.log(res);
            commit('SET_LIST', res)

        }
    }
}
