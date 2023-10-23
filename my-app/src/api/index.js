import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回promise对象
    return http.get('/home/getData')
}

// 获取用户列表
export const getUser = (params) => { 
    // 返回用户列表
    return http.get('/user/getUser', params)
}

// 新增用户
export const addUser = (data) => {
    return http.post('/user/add', data)
}

// 编辑用户
export const editUser = (data) => {
    return http.post('/user/adit', data)
}

// 删除用户
export const delUser = (data) => {
    return http.post('/user/del', data)
}