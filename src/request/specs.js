import $axios from "@/common/http" // 导入封装好的axios!



/* 获取商品规格列表 */
export async function getSpecs(page = 1, size = 10) {
    let res = await $axios.get("/specslist", {
        params: {
            page,
            size

        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}

/**
 * 添加商品规格
 * @param {*} data  添加的数据
 */
export function addSpecs(data) {
    return $axios.post("/specsadd", data)


}

/**
 * 修改商品规格
 * @param {*} data  修改的数据
 */
export function editSpecs(data) {
    return $axios.post("/specsedit", data)

}


/**
 * 删除商品规格
 * @param {*} id  删除的用户uid
 */
export function delSpecs(id) {


    return $axios.post("/specsdelete", { id })

}
/**
 * 获取商品规格个数
 * 
 */
export async function getTotal() {
    let res = await $axios.get("/specscount")
    return res.list[0].total
}


