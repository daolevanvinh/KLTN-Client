import HomePage_Guest from './HomePage_Guest/HomePage_Guest'
import About from './About/About'
import CoursePage from './CoursePage/CoursePage'
import NotFoundPage from "./NotFoundPage/NotFoundPage"
import VideoCoursePage from "./VideoCoursePage/VideoCoursePage"
import MyPage from "./MyPage/MyPage"
import InstructorPage from "./InstructorPage/InstructorPage"
import InstructorCoursePage from "./InstructorCoursePage/InstructorCoursePage"
import InstructorLessonPage from "./InstructorLessonPage/InstructorLessonPage"
import InstructorMessagePage from "./InstructorMessagePage/InstructorMessagePage"
import InstructorAnnoucementPage from "./InstructorAnnoucementPage/InstructorAnnoucementPage"
import ForgotPasswordPage from "./ForgotPasswordPage/ForgotPasswordPage"
import SearchPage from "./SearchPage/SearchPage.vue"
import Cart from "./Cart/Cart.vue";
import ProfileViewPage from "./ProfileViewPage/ProfileViewPage.vue"
import InstructorNewAnnouce from "./InstructorNewAnnouce/InstructorNewAnnouce.vue"
import InstructorPremiumPage from "./InstructorPremiumPage/InstructorPremiumPage.vue"
import InstructorMyPackage from "./InstructorMyPackagePage/InstructorMyPackagePage"
export default [
    // Guest
    {
        path: '',
        name: 'home-page-guest',
        component: HomePage_Guest
    },
    {
        path: 'About',
        name: 'about-page',
        component: About
    },
    {
        path: 'course/:id',
        name: 'course-detail-page',
        props: true,
        component: CoursePage
    },
    {
        path: 'courseLesson/:id',
        name: 'lesson-page',
        component: VideoCoursePage
    },
    {
        path: 'search',
        name: 'search-page',
        component: SearchPage
    },
    {
        path: 'profile/:app_id',
        name: 'profile-view-page',
        component: ProfileViewPage
    },
    // user
    {
        path: '/mypage',
        name: 'my-page',
        component: MyPage,
        props: true
    },
    {
        path: '/cart',
        name: 'cart-page',
        component: Cart
    },
    {
        path: '/instructor',
        name: 'instructor-page',
        component: InstructorPage,
        redirect: '/instructor/course',
        meta: {
            instructor: true
        },
        children: [
            {
                path: 'newAnnouce',
                name: 'ins-new-annouce-page',
                component: InstructorNewAnnouce,
                meta: {
                    instructor: true
                }
            },
            {
                path: 'course',
                name: 'ins-course-page',
                component: InstructorCoursePage,
                meta: {
                    instructor: true
                }
            },
            {
                path: 'lesson',
                name: 'ins-lesson-page',
                component: InstructorLessonPage,
                meta:  {
                    instructor: true,
                    course_id: ''
                }
            },
            {
                path: 'message',
                name: 'ins-message-page',
                component: InstructorMessagePage,
                meta: {
                    instructor: true
                }
            },
            {
                path: 'annouce',
                name: 'ins-annouce-page',
                component: InstructorAnnoucementPage,
                meta: {
                    instructor: true
                }
            },
            {
                path: 'package',
                name: 'ins-package-page',
                component: InstructorPremiumPage,
                meta: {
                    instructor: true
                }
            },
            {
                path: 'myPackage',
                name: 'ins-my-package-page',
                component: InstructorMyPackage,
                meta: {
                    instructor: true
                }
            }
        ]
    },
    {
        path: '/forgotPassword',
        name: 'forgot-password-page',
        component: ForgotPasswordPage
    },
    {
        path: '/404',
        name: 'not-found-page',
        component: NotFoundPage
    },
    {
        path: '*',
        redirect: '/404'
    }
]