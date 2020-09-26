import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取限时秒杀列表
 */
export async function getSeck() {
    let res = await $axios.get("/secklist")
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加限时秒杀
 * @param {*} data  添加的数据
 */
export function addSeck(data) {
    return $axios.post("/seckadd", data)
}
/**
 * 修改限时秒杀
 * @param {*} data  修改的数据
 */
export function editSeck(data) {
    return $axios.post("/seckedit", data)
}
/**
 * 删除限时秒杀
 * @param {*} id  删除的ID
 */
export function delSeck(id) {
    return $axios.post("/seckdelete", { id })
}