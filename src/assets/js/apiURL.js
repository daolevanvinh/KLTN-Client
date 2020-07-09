var apiConfig = require('../../API/api.json')
var apiAddress = apiConfig.apiURL

var apiURL = {
    adminLogin: apiAddress + "/adminLogin",
    admin: apiAddress + "/admin",
    userLogin: apiAddress + "/userLogin",
    addToCart: apiAddress + "/addToCart",
    adminCategory: apiAddress + "/admin/category",
    adminTopic: apiAddress + "/admin/topic",
    adminQuestionBot: apiAddress + "/admin/bot/question",
    adminAnswerBot: apiAddress + "/admin/bot/answer",
    adminMessageBot: apiAddress + "/admin/bot/message",
    adminStoragePackage: apiAddress + "/admin/storagePackage",
    //// user
    user: apiAddress + "/user",
    userCategory: apiAddress + "/user/category",
    userCourse: apiAddress + "/user/course",
    userEditPassword: apiAddress + "/user/edit/password",
    userEditInfor: apiAddress + "/user/edit/infor",
    userEditProfile: apiAddress + "/user/edit/profile",
    userLesson: apiAddress + "/user/lesson",
    userEditLesson: apiAddress + "/user/lesson/edit",
    userCourseLike: apiAddress + "/user/courseLike",
    userCoursePriceTier: apiAddress + "/user/course/priceTier",
    userForgotPassword: apiAddress + "/user/forgotPassword",
    userCart: apiAddress + "/user/cart",
    userStudentCourse: apiAddress + "/user/student/courses",
    userStudentCourseLesson: apiAddress + "/user/student/lesson",
    userStudentCourseLessonComment: apiAddress + "/user/student/lesson/comment",
    userHistoryTransaction: apiAddress + "/user/history/transaction",
    Annouce: apiAddress + '/user/annouce',
    StuAnnouce: apiAddress + "/stu/annouce",
    StuAnnouceByCourse: apiAddress + '/stu/annouce/course',
    userChannel: apiAddress + '/user/channel',
    userChannelCourseList: apiAddress + "/user/channel/course",
    userChapter: apiAddress + "/user/chapter",
    //guest
    guestGetCategory: apiAddress + "/guest/category",
    guestGetCategoryWithTopCourse: apiAddress + "/guest/category/topCourse",
    guestChatBot: apiAddress + "/guest/bot",
    guestDetailCourse: apiAddress + "/guest/course",
    guestSearch: apiAddress + "/guest/search",
    guestProfileView: apiAddress + "/guest/profileview",
    guestSearchFromHeader: apiAddress + "/guest/search/header",
    // hung
    userInsertComment: apiAddress + "/user/course/insertcomment",
    guestGetListComment: apiAddress + "/guest/course/getlistcomment",
    guestGetTop5CourseByTopic: apiAddress + "/guest/course/gettop5course",
    guestGetDetailCourse: apiAddress + "/guest/course/getdetailcourse",
    guestGetInfoInstructor: apiAddress + "/guest/course/getinfoinstructor",

    userAddtoCart: apiAddress + "/user/addtocart",
    userGetCart: apiAddress + '/user/getcart',
    userDeleteCarts: apiAddress + '/deleteCarts',
    getCourse: apiAddress + '/getCourse',

}

exports.apiURL = apiURL