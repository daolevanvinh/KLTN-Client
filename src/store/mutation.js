export default {
    changeTab(state, data) {
        state.mypageTabState.hash = data
    },
    adminLogin_request(state) {
        state.adminState.loading = true
    },
    adminLogin_success(state) {
        state.adminState.loading = false
    },
    adminLogin_error(state) {
        state.adminState.loading = false
    },
    user_request(state) {
        state.userState.loading = true
    },
    user_success(state, data) {
        state.userState.loading = false
        if (data.user) {
            state.userState.user = data.user
        }
    },
    user_error(state) {
        state.userState.loading = false
    },
    user_logout(state) {
        state.userState.user = {}
    },
    ShowHeaderAdmin(state) {
        state.headerState.hide = false
    },
    HideHeaderAdmin(state) {
        state.headerState.hide = true
    },
    admin_getCategory_request(state) {
        state.adminCategoryState.loading = true
    },
    admin_getCategory_success(state, data) {
        state.adminCategoryState.loading = false
        if (data.list) {
            state.adminCategoryState.list = data.list
        }
        if (data.object) {
            state.adminCategoryState.object = data.object
        }
    },
    admin_getCategory_error(state) {
        state.adminCategoryState.loading = false
    },
    admin_getTopic_request(state) {
        state.adminTopicState.loading = true
    },
    admin_getTopic_success(state, data) {
        state.adminTopicState.loading = false
        if (data.list) {
            state.adminTopicState.list = data.list
        }
        if (data.object) {
            state.adminTopicState.object = data.object
        }
    },
    admin_getTopic_error(state) {
        state.adminTopicState.loading = false
    },
    user_getCategory_request(state) {
        state.userCategoryState.loading = true
    },
    user_getCategory_success(state, data) {
        state.userCategoryState.loading = false
        if (data.list) {
            state.userCategoryState.list = data.list
        }
        if (data.object) {
            state.userCategoryState.object = data.object
        }
    },
    user_getCategory_error(state) {
        state.userCategoryState.loading = false
    },
    user_course_request(state) {
        state.userCourseState.loading = true
    },
    user_course_success(state, data) {
        state.userCourseState.loading = false
        if (data.list) {
            state.userCourseState.list = data.list
        }
        if (data.object) {
            state.userCourseState.object = data.object
        }
    },
    user_course_error(state) {
        state.userCourseState.loading = false
    },
    guest_category_request(state) {
        state.guestCategoryState.loading = true
    },
    guest_category_success(state, data) {
        state.guestCategoryState.loading = false
        if (data.list) {
            state.guestCategoryState.list = data.list
            //console.log(state.guestCategoryState.list)
        }
        if (data.object) {
            state.guestCategoryState.object = data.object
        }
    },
    guest_category_error(state) {
        state.guestCategoryState.loading = false
    },
    user_lesson_request(state) {
        state.userLessonState.loading = true
    },
    user_lesson_success(state, data) {
        state.userLessonState.loading = false
        if (data.list) {
            state.userLessonState.list = data.list
        }
        if (data.object) {
            state.userLessonState.object = data.object
        }
    },
    user_lesson_error(state) {
        state.userLessonState.loading = false
    },
    user_lesson_empty_list(state) {
        state.userLessonState.list = []
    },
    admin_question_bot_request(state) {
        state.adminQuestionBotState.loading = true
    },
    admin_question_bot_success(state, data) {
        state.adminQuestionBotState.loading = false
        if (data.list) {
            state.adminQuestionBotState.list = data.list
        }
        if (data.object) {
            state.adminQuestionBotState.object = data.object
        }
    },
    admin_question_bot_error(state) {
        state.adminQuestionBotState.loading = false
    },
    admin_message_bot_request(state) {
        state.adminMessageBotState.loading = true
    },
    admin_message_bot_success(state, data) {
        state.adminMessageBotState.loading = false
        if (data.list) {
            state.adminMessageBotState.list = data.list
        }
        if (data.object) {
            state.adminMessageBotState.object = data.object
        }
    },
    admin_message_bot_error(state) {
        state.adminMessageBotState.loading = false
    },
    guest_message_bot_request(state) {
        state.guestMessageBotState.loading = true
    },
    guest_message_bot_success(state, data) {
        state.guestMessageBotState.loading = false
        if (data.list) {
            state.guestMessageBotState.list = data.list
        }
        if (data.object) {
            state.guestMessageBotState.object = data.object
        }
    },
    guest_message_bot_error(state) {
        state.guestMessageBotState.loading = false
    },
    guest_category_topCourse_request(state) {
        state.guestCategoryWithTopCouseState.loading = true
    },
    guest_category_topCourse_success(state, data) {
        state.guestCategoryWithTopCouseState.loading = false
        if (data.list) {
            state.guestCategoryWithTopCouseState.list = data.list
            //console.log(state.guestCategoryWithTopCouseState.list)
        }
        if (data.object) {
            state.guestCategoryWithTopCouseState.object = data.object
        }
    },
    guest_category_topCourse_error(state) {
        state.guestCategoryWithTopCouseState.loading = false
    },

    user_ATC_request(state) {
        state.userCourseListCartState.loading = true
    },
    user_ATC_success(state, data) {
        if (data.list) {
            state.userCourseListCartState.list = data.list
        }
        if (data.object) {
            state.userCourseListCartState.object = data.object
        }
        state.userCourseListCartState.loading = false
    },
    user_ATC_error(state) {
        state.userCourseListCartState.loading = false
    },
    user_courseComment_request(state) {
        state.userCommentState.loading = true
    },
    user_courseComment_success(state, data) {
        console.log("cái này là check", data.list)
        state.userCommentState.list = data.list
        state.userCommentState.loading = false
    },
    user_courseComment_error(state) {
        state.userCommentState.loading = false
    },
    guest_top5Course_request(state) {
        state.guestTop5CourseState.loading = true
    },
    guest_top5Course_success(state) {
        state.guestTop5CourseState.loading = false
    },
    guest_top5Course_error(state) {
        state.guestTop5CourseState.loading = false
    },
    getInfoInstructor_request(state) {
        state.infoInstructorState.loading = true
    },
    getInfoInstructor_success(state) {
        state.infoInstructorState.loading = false
    },
    getInfoInstructor_error(state) {
        state.infoInstructorState.loading = false
    },
    guest_getDetailCourse_request(state) {
        state.guestDetailCourseState.loading = true
    },
    guest_getDetailCourse_success(state, data) {
        if (data.detail) {
            state.guestDetailCourseState.detailCourse = data.detail
        }
        if (data.amounReview) {
            state.guestDetailCourseState.amountReview = data.amountReview
        }
        state.guestDetailCourseState.loading = false
    },
    guest_getDetailCourse_error(state) {
        state.guestDetailCourseState.loading = false
    },
    user_course_like_request(state) {
        state.userCourseLike.loading = true
    },
    user_course_like_success(state, data) {
        state.userCourseLike.loading = false
        if (data.list) {
            state.userCourseLike.list = data.list
        }
        if (data.object) {
            state.userCourseLike.object = data.object
        }
    },
    user_course_like_error(state) {
        state.userCourseLike.loading = false
    },
    ShowHeaderUser(state) {
        state.headerStateUser.hide = false
    },
    HideHeaderUser(state) {
        state.headerStateUser.hide = true
    },
    ShowFooterUser(state) {
        state.footerStateUser.hide = false
    },
    HideFooterUser(state) {
        state.footerStateUser.hide = true
    },
    HideAutoAnswer(state) {
        state.guestAutoAnswerState.hide = true
    },
    user_course_price_tier_request(state) {
        state.userPriceTierState.loading = true
    },
    user_course_price_tier_success(state, data) {
        state.userPriceTierState.loading = false
        if (data.list) {
            state.userPriceTierState.list = data.list
        }
        if (data.object) {
            state.userPriceTierState.object = data.object
        }
    },
    user_course_price_tier_error(state) {
        state.userPriceTierState.loading = false
    },
    user_public_course_request(state) {
        state.userPriceTierState.loading = true
    },
    user_public_course_success(state, data) {
        state.userPublicCourseState.loading = false
        if (data.list) {
            state.userPublicCourseState.list = data.list
        }
        if (data.object) {
            state.userPublicCourseState.object = data.object
        }
    },
    user_public_course_error(state) {
        state.userPublicCourseState.loading = false
    },
    user_forgot_password_request(state) {
        state.userForgotPassword.loading = true
    },
    user_forgot_password_success(state, data) {
        state.userForgotPassword.loading = false
        if (data.list) {
            state.userForgotPassword.list = data.list
        }
        if (data.object) {
            state.userForgotPassword.object = data.object
        }
    },
    user_forgot_password_error(state) {
        state.userForgotPassword.loading = false
    },
    guest_course_detail_request(state) {
        state.guestCourseDetail.loading = true
    },
    guest_course_detail_success(state, data) {
        state.guestCourseDetail.loading = false
        if (data.list) {
            state.guestCourseDetail.list = data.list
        }
        if (data.object) {
            state.guestCourseDetail.object = data.object
        }
    },
    guest_course_detail_error(state) {
        state.guestCourseDetail.loading = false
    },
    updateHistoryCourseList(state) {
        if (localStorage.historyCourseList)
            state.historyCourseState.list = JSON.parse(localStorage.historyCourseList)
        else {
            state.historyCourseState.list = []
            localStorage.historyCourseList = JSON.stringify([])
        }
    },
    user_student_course_request(state) {
        state.userStudentCourseState.loading = true
    },
    user_student_course_success(state, data) {
        state.userStudentCourseState.loading = false
        if (data.list) {
            state.userStudentCourseState.list = data.list
        }
        if (data.object) {
            state.userStudentCourseState.object = data.object
        }
    },
    user_student_course_error(state) {
        state.userStudentCourseState.loading = false
    },
    user_student_lesson_request(state) {
        state.userStudentCourseLessonState.loading = true
    },
    user_student_lesson_success(state, data) {
        state.userStudentCourseLessonState.loading = false
        if (data.list) {
            state.userStudentCourseLessonState.list = data.list
        }
        if (data.object) {
            state.userStudentCourseLessonState.object = data.object
        }
    },
    user_student_lesson_error(state) {
        state.userStudentCourseLessonState.loading = false
    },
    user_set_current_video_link(state, object) {
        state.userCurrentVideoState.object = object
    },
    user_student_lesson_comment_request(state) {
        state.userStudentCourseLessonCommentState.loading = true
    },
    user_student_lesson_comment_success(state, data) {
        state.userStudentCourseLessonCommentState.loading = false
        if (data.list) {
            state.userStudentCourseLessonCommentState.list = data.list
        }
        if (data.object) {
            state.userStudentCourseLessonCommentState.object = data.object
        }
    },
    user_student_lesson_comment_error(state) {
        state.userStudentCourseLessonCommentState.loading = false
    },
    user_student_lesson_comment_delete(state, flag) {
        state.userDeleteCommentState.loading = flag
    },
    guest_search_request(state) {
        state.guestSearchState.loading = true
    },
    guest_search_success(state, data) {
        state.guestSearchState.loading = false
        if (data.list) {
            state.guestSearchState.list = data.list
        }
        if (data.object) {
            state.guestSearchState.object = data.object
        }
    },
    guest_search_error(state) {
        state.guestSearchState.loading = false
    },
    guest_set_search(state, search) {
        state.guestSearchState.search = search
    },
    guest_profile_view_request(state) {
        state.guestProfileViewState.loading = true
    },
    guest_profile_view_success(state, data) {
        state.guestProfileViewState.loading = false
        if (data.list) {
            state.guestProfileViewState.list = data.list
        }
        if (data.object) {
            state.guestProfileViewState.object = data.object
        }
    },
    guest_profile_view_error(state) {
        state.guestProfileViewState.loading = false
    },
    guest_header_seach_request(state) {
        state.guestInfoSearchFromHeader.loading = true
    },
    guest_header_search_success(state, data) {
        state.guestInfoSearchFromHeader.loading = false
        if (data.list) {
            state.guestInfoSearchFromHeader.list = data.list
        }
        if (data.object) {
            state.guestInfoSearchFromHeader.object = data.object
        }
    },
    guest_header_search_error(state) {
        state.guestInfoSearchFromHeader.loading = false
    },
    guest_search_currentLoading(state, loading) {
        state.guestSearchState.currentLoading = loading
    },
    user_like_or_unlike_loading(state, loading) {
        state.userCourseLike.loadingForAction = loading
    },
    user_history_transaction_request(state) {
        state.userHistoryTransaction.loading = true
    },
    user_history_transaction_success(state, data) {
        state.userHistoryTransaction.loading = false
        if (data.list) {
            state.userHistoryTransaction.list = data.list
        }
        if (data.object) {
            state.userHistoryTransaction.object = data.object
        }
    },
    user_history_transaction_error(state) {
        state.userHistoryTransaction.loading = false
    },
    user_annouce_request(state) {
        state.userAnnouceState.loading = true
    },
    user_annouce_success(state, data) {
        state.userAnnouceState.loading = false
        if (data.list) {
            state.userAnnouceState.list = data.list
        }
        if (data.object) {
            state.userAnnouceState.object = data.object
        }

    },
    user_annouce_error(state) {
        state.userAnnouceState.loading = false
    },
    stu_annouce_request(state) {
        state.stuAnnouceState.loading = true
    },
    stu_annouce_success(state, data) {
        state.stuAnnouceState.loading = false
        if (data.list) {
            state.stuAnnouceState.list = data.list
        }
        if (data.object) {
            state.stuAnnouceState.object = data.object
        }
    },
    stu_annouce_error(state) {
        state.stuAnnouceState.loading = false
    },
    stu_annouce_by_course_request(state) {
        state.stuAnnouceByCourseState.loading = true
    },
    stu_annouce_by_course_success(state, data) {
        state.stuAnnouceByCourseState.loading = false
        if (data.list) {
            state.stuAnnouceByCourseState.list = data.list
        }
        if (data.object) {
            state.stuAnnouceByCourseState.object = data.object
        }
    },
    stu_annouce_by_course_error(state) {
        state.stuAnnouceByCourseState.loading = false
    },
    channel_request(state) {
        state.userChannelListState.loading = true
    },
    channel_success(state, data) {
        state.userChannelListState.loading = false
        if (data.list) {
            state.userChannelListState.list = data.list
        }
        if (data.object) {
            state.userChannelListState.object = data.object
        }
        if (data.courseList) {
            state.userChannelListState.courseList = data.courseList
        }
    },
    channel_error(state) {
        state.userChannelListState.loading = false
    },
    admin_storagePackage_request(state) {
        state.adminStoragePackageState.loading = true
    },
    admin_storagePackage_success(state, data) {
        state.adminStoragePackageState.loading = false
        if (data.list) {
            state.adminStoragePackageState.list = data.list
        }
        if (data.object) {
            state.adminStoragePackageState.object = data.object
        }
        if (data.courseList) {
            state.adminStoragePackageState.courseList = data.courseList
        }
    },
    admin_storagePackage_error(state) {
        state.adminStoragePackageState.loading = false
    },
    user_CourseComment_request(state) {
        state.userStudentCourseState.loading = true
    },
    user_CourseComment_success(state, data) {
        state.userStudentCourseState.loading = false
        if (data.list) {
            state.userStudentCourseState.list = data.list
        }
        if (data.object) {
            state.userStudentCourseState.object = data.object
        }
    },
    user_CourseComment_error(state) {
        state.userStudentCourseState.loading = false
    },
    user_StoragePackage_request(state) {
        state.userStoragePackageState.loading = true
    },
    user_StoragePackage_success(state, data) {
        state.userStoragePackageState.loading = false
        if (data.list) {
            state.userStoragePackageState.list = data.list
        }
        if (data.object) {
            state.userStoragePackageState.object = data.object
        }
    },
    user_StorageUser_error(state) {
        state.userStoragePackageState.loading = false
    },
    user_StorageUser_request(state) {
        state.userStorageUser.loading = true
    },
    user_StorageUser_success(state, data) {
        state.userStorageUser.loading = false
        if (data.list) {
            state.userStorageUser.list = data.list
        }
        if (data.object) {
            state.userStorageUser.object = data.object
        }
        if(data.course_list) {
            state.userStorageUser.course_list = data.course_list
        }
        if(data.bill_list) {
            state.userStorageUser.bill_list = data.bill_list
        }
    },
    user_StorageUser_error(state) {
        state.userStorageUser.loading = false
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //hung
    admin_getStatistical_request(state) {
        state.adminStatisticalState.loading = true
    },
    admin_getStatistical_success(state, data) {
        state.adminStatisticalState.loading = false
        if (data.list) {
            state.adminStatisticalState.list = data.list
        }
        if (data.object) {
            state.adminStatisticalState.object = data.object
        }
    },
    admin_getStatistical_error(state) {
        state.adminStatisticalState.loading = false
    },


    admin_getListCourse_request(state) {
        state.adminGetListCourseState.loading = true
    },
    admin_getListCourse_success(state, data) {
        state.adminGetListCourseState.loading = false
        if (data.list) {
            state.adminGetListCourseState.list = data.list
        }
        if (data.object) {
            state.adminGetListCourseState.object = data.object
        }
    },
    admin_getListCourse_error(state) {
        state.adminGetListCourseState.loading = false
    },


    admin_getListPricetier_request(state) {
        state.adminGetListPricetierState.loading = true
    },
    admin_getListPricetier_success(state, data) {
        state.adminGetListPricetierState.loading = false
        if (data.list) {
            state.adminGetListPricetierState.list = data.list
        }
        if (data.object) {
            state.adminGetListPricetierState.object = data.object
        }
    },
    admin_getListPricetier_error(state) {
        state.adminGetListPricetierState.loading = false
    },

    admin_getListCoursebyPrice_request(state) {
        state.adminGetListCoursebyPriceState.loading = true
    },
    admin_getListCoursebyPrice_success(state, data) {
        state.adminGetListCoursebyPriceState.loading = false
        if (data.list) {
            state.adminGetListCoursebyPriceState.list = data.list
        }
        if (data.object) {
            state.adminGetListCoursebyPriceState.object = data.object
        }
    },
    admin_getListCoursebyPrice_error(state) {
        state.adminGetListCoursebyPriceState.loading = false
    },

    admin_request(state) {
        state.adminState.loading = true
    },
    admin_success(state, data) {
        if (data.admin) {
            state.adminState.admin = data.admin
        }
        state.adminState.loading = false
    },
    admin_error(state) {
        state.adminState.loading = false
    },
    admin_managelistusers_request(state) {
        state.adminGetListUsersState.loading = true
    },
    admin_managelistusers_success(state, data) {
        state.adminGetListUsersState.loading = false
    },
    admin_managelistusers_error(state) {
        state.adminGetListUsersState.loading = false
    },

    //
}