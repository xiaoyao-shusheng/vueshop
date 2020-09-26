import dayjs from "dayjs"

export default {
    pixImg: function (val, pix = "http://localhost:3030") {
        return pix + val
    },
    getTime: function (val, str = 'YYYY/MM/DD HH:mm:ss') {
        //val  是变量
        return dayjs(val * 1).format(str)
    }
}