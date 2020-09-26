import $axios from "@/common/http" // 导入封装好的axios!



/* 获取用户列表 */
export async function getMember() {
    let res = await $axios.get("/memberlist")
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}



/**
 * 修改用户
 * @param {*} data  修改的数据
 */
export function editMember(data) {
    return $axios.post("/memberedit", data)

}


/**
 * 删除用户
 * @param {*} id  删除的ID
 */
export function delMember(id) {
    return $axios.post("/memberdelete", { id })
}



