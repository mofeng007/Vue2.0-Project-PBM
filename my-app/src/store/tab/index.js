// 菜单相关
export default {
    state: {
        // 控制菜单展开还是收起
        isCollapse: false,
        // 面包屑
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/home',
            }
        ],
    },

    mutations: {
        COLLAPSEMENU(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        SELECTMENU(state, val) {
            // 判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name);
                // 如果不存在
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        // 删除指定tag数据
        DELETEMENU(state, item) {
           const idnex = state.tabsList.findIndex(val => val.name === item.name);
        //    console.log("sdasdadada",val)
           state.tabsList.splice(idnex, 1);
        }
    },
}