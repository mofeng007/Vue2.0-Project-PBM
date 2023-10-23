import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

//备份原型对象已有的push|replace方法
let push = VueRouter.prototype.push;
let replace = VueRouter.prototype.replace;
//重写VueRouter.prototype原型对象的push|replace方法
VueRouter.prototype.push = function (location) {
    //调用push方法且篡改push方法内部this指向->vueRouter类的实例
    push.call(this, location, () => { }, () => { });
}
VueRouter.prototype.replace = function (location) {
    //调用push方法且篡改push方法内部this指向->vueRouter类的实例
    replace.apply(this, [location, () => { }, () => { }]);
}
let router = new VueRouter({
    routes,
});

export default router