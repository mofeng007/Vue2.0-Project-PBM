// 引入mock
import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import user from './mockServeData/user.js'

// 定义mock请求拦截
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData);

// 用户列表数据
// 新增
Mock.mock('/api/user/add','post',user.createUser)
// 编辑
Mock.mock('/api/user/adit','post',user.updateUser)
// 删除
Mock.mock('/api/user/del','post',user.deleteUser)
// 当前列表
Mock.mock(/api\/user\/getUser/,user.getUserList)