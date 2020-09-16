import $axios from "@/common/http" // 导入封装好的axios!



/* 获取管理员列表 */
export async function getUser(size = 10, page = 1) {
    let res = await $axios.get("/userlist", {
        parms: {
            size,
            page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}

/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export function addUser(data) {
    return $axios.post("/useradd", data)


}

/**
 * 修改管理员
 * @param {*} data  修改的数据
 */
export function editUser(data) {
    return $axios.post("/useredit", data)
    console.log(res);
}


/**
 * 删除管理员
 * @param {*} id  删除的用户uid
 */
export function delUser(uid) {
    return $axios.post("/userdelete", { uid })

}