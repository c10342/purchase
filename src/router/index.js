import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/home'
import SelectCity from '@/containers/selectCity.vue'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import LoginAndRegister from '@/containers/loginAndRegist.vue'
import Vanni from '@/components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:'selectCity',
          name:'selectCity',
          component:SelectCity
        }
      ]
    },
    {
      path:'/loginandregister',
      name: 'loginandregister',
      component: LoginAndRegister,
      children:[
        {
          path:'login',
          name:'login',
          component:Login
        },
        {
          path:'register',
          name:'register',
          component:Register
        },
        {
          path:'/',
          redirect:'login'
        }
      ]
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/vanni',
      name:'vanni',
      component:Vanni
    }
  ]
})
