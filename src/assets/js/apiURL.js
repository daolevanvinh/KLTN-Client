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
    userCourseComment: apiAddress + "/user/courseComment",
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
    userStoragePackage: apiAddress + "/user/storagePack",
    userStoragePackagePayment: apiAddress + "/user/storagePackage/payment",
    userStorageUser: apiAddress + "/user/storageUser",
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // hung
    adminGetSatistical: apiAddress + "/admin/detailstatistical",
    adminGetInfoSatistical: apiAddress + "/admin/statistical",
    adminGetInfoCourseStatistical: apiAddress + "/admin/coursestatistical",
    adminGetListCourse: apiAddress + "/admin/getlistcourse",
    adminUnactiveCourse: apiAddress + "/admin/unactivecourse",
    adminActiveCourse: apiAddress + "/admin/activecourse",

    adminGetListPricetier: apiAddress + "/admin/getlistpricetier",
    adminGetListCoursebyPrice: apiAddress + "/admin/getlistcoursebyprice",
    adminDeletePricetier: apiAddress + "/admin/deletepricetier",
    adminInsertPricetier: apiAddress + "/admin/insertpricetier",

    adminGetListMoneytype: apiAddress + '/admin/getlistmoneytype',
    adminGetListCoursebyMoneytype: apiAddress + '/admin/getlistcoursebymoneytype',
    adminDeleteMoneytype: apiAddress + '/admin/deletemoneytype',
    adminInsertMoneytype: apiAddress + '/admin/insertmoneytype',
    adminManageUsers: apiAddress + "/admin/users",

    adminGetInfo: apiAddress + "/admin",
    adminEditInfo: apiAddress + "/admin/edit/info",
    adminChangePassword: apiAddress + "/admin/changepassword",
}

exports.apiURL = apiURL