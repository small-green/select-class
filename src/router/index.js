import Vue from 'vue'
import VueRouter from 'vue-router'
//引入公共的css文件
import '../assets/css/global.css'
import axios from 'axios'
//管理员组件的引入
import index from '../views/admin/index.vue'
import aStudent from '../views/admin/student'
import aTeacher from '../views/admin/teacher'
import aMessage from '../views/admin/message'
import aFriends from '../views/admin/friends'
import aTopic from '../views/admin/topic'
import stuTopic from '../views/admin/stuTopic'
import aCollege from '../views/admin/college'
import aClass from '../views/admin/class'
import topicType from '../views/admin/topicType'
//登录
import login from '../views/others/login.vue'
//学生组件的引入
import student from '../views/student/index'
import again from '../views/student/again'
import myThesis from '../views/student/mythesis'
import thesisList from '../views/student/thesisList'
import offer from '../views/student/offer'
import person from '../views/student/person'
//导师组件的引入
import teacherIndex from '../views/teacher/index'
import teacherPerson from '../views/teacher/teacherPerson'
import teacherTopic from '../views/teacher/teacherTopic'
import teacherThesis from '../views/teacher/teacherThesis'
import teacherScore from '../views/teacher/teacherScore'
import teacherCount from '../views/teacher/teacherIndex'
import test from '../views/teacher/test.vue'
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios
Vue.use(VueRouter)

const routes = [
  { path: '/test', component:test },
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  //管理员的路由
  {
    path: '/index',
    component: index,
    redirect:"/date",
    children: [

      {
        path: '/student', component: aStudent
      },
      {
        path: '/topicType', component: topicType
      },
      {
        path: '/teacher', component: aTeacher
      },
      {
        path: '/topic', component: aTopic
      },
      {
        path: '/stuTopic', component: stuTopic
      },
      {
        path: '/message', component: aMessage
      },
      {
        path: '/friends', component: aFriends
      },
      {
        path: '/class', component: aClass
      },
      {
        path: '/college', component: aCollege
      },
      {path:'/date',name:"date",component:resove=>require(['@/views/admin/date.vue'],resove)}
    ]
  },
  //学生的路由
  {
    path:'/studentIndex',component:student,
    redirect:"/person",
    children:[
      {
        path: '/person',component:person
      },
      {
        path: '/offer',component:offer
      },
      {
        path: '/again',component:again
      },
      {
        path: '/myThesis',component:myThesis
      },
      {
        path: '/thesisList',component:thesisList
      },
    ]
  },
  {path:'/findPsw',name:"findPsw",component:resove=>require(['@/views/others/findPsw.vue'],resove)},
  //导师的路由
  {
    path: '/teacherIndex',component:teacherIndex,redirect:'/teacherCount',
    children:[{
      path:'/teacherPerson',component:teacherPerson
    },{
      path:'/teacherCount',component:teacherCount
    },
    {
      path:'/teacherTopic',component:teacherTopic
    },{
      path:'/teacherThesis',component:teacherThesis
    },{
      path:'/teacherScore',component:teacherScore
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
