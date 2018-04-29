import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import helloworld from '@/components/helloworld'
import home from '@/page/home'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        // component: HelloWorld
        component: home
    }]
})