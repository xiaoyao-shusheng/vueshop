// 获取菜单列表！
import { getUser } from "@/request/user"
export default {
    namespaced: true,
    state: {
        userlist: [],
        page: 1,
        size: 10 // 菜单列表
    },
    getters: {
        userlist: state => state.userlist,
        page: state => state.page,
        size: state => state.size,
    },
    mutations: {
        SET_LIST(state, data) {
            state.userlist = data;
        },
        SET_page(state, data) {
            state.page = data;
        },
        SET_size(state, data) {
            state.size = data;
        }
    },
    actions: {
        // 请求菜单列表的数据！
        async get_user_list({ commit, state }) {
            let res = await getUser(state.pag, state.size);
            commit('SET_LIST', res)
        }
    }
};