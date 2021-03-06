import EmployeePage from "./EmployeePage/EmployeePage"
import ITPage from "./ITPage/ITPage"
import CategoryPage from "./CategoryPage/CategoryPage"
import CoursePage from "./CoursePage/CoursePage"
import ChatBotPage from "./ChatBotPage/ChatBotPage"
import TopicPage from "./TopicPage/TopicPage"
import StatisticalPage from "./StatisticalPage/StatisticalPage"
import StorageBusiness from "./StorageBusinessPage/StorageBusinessPage"
import AccountPage from "./AccountPage/AccountPage"
import AdminLoginPage from "./LoginPage/LoginPage"
import PricePage from "./PricePage/PricePage"
import MyAdminPage from '../admin-modules/AccountPage/AccountPage.vue'
import UserManagePage from "../admin-modules/UserManagePage/UserManagePage.vue"
export default [
    {
        path: '',
        name: 'admin-login-page',
        component: AdminLoginPage
    },
    {
        path: 'it',
        name: 'it-page',
        component: ITPage,
        meta: {
            emp: false
        }
    },
    {
        path: 'emp',
        name: 'employee-page',
        component: EmployeePage,
        meta: {
            emp: true
        }
    },
    {
        path: 'category',
        name: 'category-page',
        component: CategoryPage,
        meta: {
            emp: true
        }
    },
    {
        path: 'topic',
        name: 'topic-page',
        component: TopicPage,
        meta: {
            emp: true
        }
    },
    {
        path: 'course',
        name: 'course-page',
        component: CoursePage,
        meta: {
            emp: true
        }
    },
    {
        path: 'chatbot',
        name: 'chatbot-page',
        component: ChatBotPage,
        meta: {
            emp: true
        }
    },
    {
        path: 'statistical',
        name: 'statistical-page',
        component: StatisticalPage,
        meta: {
            emp: true
        }
    },
    {
        path: 'storageBusiness',
        name: 'storage-business-page',
        component: StorageBusiness,
        meta: {
            emp: true
        }
    },
    {
        path: ':id',
        name: 'account-page',
        component: AccountPage,
        meta: {
            emp: true
        }
    },
    {
        path: 'pricepage',
        name: 'price-page',
        component: PricePage,
        meta: {
            emp: true
        }
    },
    {
        path: 'myadminpage',
        name: 'myadmin-page',
        component: MyAdminPage
    },
    {
        path: 'users',
        name: 'users-page',
        component: UserManagePage,
        meta: {
            emp: true
        }
    }
]