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
    ATC_request(state) {
        state.ATCState.loading = true
    },
    ATC_success(state) {
        state.ATCState.loading = false
    },
    ATC_error(state) {
        state.ATCState.loading = false
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
            console.log(state.guestCategoryState.list)
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
        if(data.list) {
            state.userLessonState.list = data.list
        }
        if(data.object) {
            state.userLessonState.object = data.object
        }
    },
    user_lesson_error(state) {
        state.userLessonState.loading = false
    },
    admin_question_bot_request(state) {
        state.adminQuestionBotState.loading = true
    },
    admin_question_bot_success(state, data) {
        state.adminQuestionBotState.loading = false
        if(data.list) {
            state.adminQuestionBotState.list = data.list
        }
        if(data.object) {
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
        if(data.list) {
            state.adminMessageBotState.list = data.list
        }
        if(data.object) {
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
        if(data.list) {
            state.guestMessageBotState.list = data.list
        }
        if(data.object) {
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
            console.log(state.guestCategoryWithTopCouseState.list)
        }
        if (data.object) {
            state.guestCategoryWithTopCouseState.object = data.object
        }
    },
    guest_category_topCourse_error(state) {
        state.guestCategoryWithTopCouseState.loading = false
    }
}