export default {
    adminObject: state => state.adminState.object,
    userObject: state => state.userState.object,
    cart: state => state.ATCState.cart,
    loadHide: state => state.headerState.hide,
    adminGetCategoryLoading: state => state.adminCategoryState.loading,
    adminGetCategories: state => state.adminCategoryState.list,
    adminGetCategoryObject: state => state.adminCategoryState.object,
    adminGetTopicLoading: state => state.adminTopicState.loading,
    adminGetTopics: state => state.adminTopicState.list,
    adminGetTopicObject: state => state.adminTopicState.object,
    adminQuestionBotList: state => state.adminQuestionBotState.list,
    adminQuestionBotLoading: state => state.adminQuestionBotState.loading,
    adminMessageBotList: state => state.adminMessageBotState.list,
    adminMessageBotLoading: state => state.adminMessageBotState.loading,
    // user
    mypageTab: state => state.mypageTabState.hash,
    userUserInfo: state=>state.userState.user,
    userUserInfoLoading: state=>state.userState.loading,
    userGetCategoryLoading: state => state.userCategoryState.loading,
    userGetCategories: state => state.userCategoryState.list,
    userGetCategoryObject: state => state.userCategoryState.object,
    userCourseList: state => state.userCourseState.list,
    userCourseLoading: state => state.userCourseState.loading,
    userLessonList: state => state.userLessonState.list,
    userLessonLoading: state => state.userLessonState.loading,
    userLessonObject: state => state.userLessonState.object,
    userCourseLikeList: state => state.userCourseLike.list,
    userCourseLikeLoading: state => state.userCourseLike.loading,
    userCoursePriceTierList: state => state.userPriceTierState.list,
    userCoursePriceTierLoading: state => state.userPriceTierState.loading,
    userPublicCourseList: state => state.userPublicCourseState.list,
    userPublicCourseLoading: state => state.userPublicCourseState.loading,
    userForgotPasswordLoading: state => state.userForgotPassword.loading,
    userCourseListCartList: state => state.userCourseListCartState.list,
    userCourseListCartLoading: state => state.userCourseListCartState.loading,
    userStudentCourseList: state => state.userStudentCourseState.list,
    userStudentCourseLoading: state => state.userStudentCourseState.loading,
    userStudentCourseLessonList: state => state.userStudentCourseLessonState.list,
    userStudentCourseLessonLoading: state => state.userStudentCourseLessonState.loading,
    userCurrentVideoLesson: state => state.userCurrentVideoState.object,
    userStudentCourseLessonCommentList: state => state.userStudentCourseLessonCommentState.list,
    userStudentCourseLessonCommentLoading: state => state.userStudentCourseLessonCommentState.loading,
    userDeleteCommentLoading: state => state.userDeleteCommentState.loading,
    // guest
    guestCategoryList: state => state.guestCategoryState.list,
    guestCategoryLoading: state => state.guestCategoryState.loading,
    guestCategoryObject: state => state.guestCategoryState.object,
    guestBotList: state => state.guestMessageBotState.list,
    guestBotLoading: state => state.guestMessageBotState.loading,
    guestBotObject: state => state.guestMessageBotState.object,
    guestCategoryTopCourseList: state => state.guestCategoryWithTopCouseState.list,
    guestCategoryTopCourseLoading: state => state.guestCategoryWithTopCouseState.loading,
    hideHeader: state => state.headerStateUser.hide,
    hideFooter: state => state.footerStateUser.hide,
    guestHideAutoAnswer: state => state.guestAutoAnswerState.hide,
    guestCourseDetailObject: state => state.guestCourseDetail.object,
    guestCourseDetailLoading: state => state.guestCourseDetail.loading,
    historyCourseList: state => state.historyCourseState.list,
    guestSearchList: state => state.guestSearchState.list,
    guestSearch: state => state.guestSearchState.search,
    guestSearchLoading: state => state.guestSearchState.loading,
    guestProfileViewObject: state => state.guestProfileViewState.object,
    guestProfileViewList: state => state.guestProfileViewState.list,
    guestProfileViewLoading: state => state.guestProfileViewState.loading,
    guestInfoSearchFromHeaderList: state => state.guestInfoSearchFromHeader.list,
    guestInfoSearchFromHeaderLoading: state => state.guestInfoSearchFromHeader.loading,













    // hung
    userCommentState: state => state.userCommentState.list,
    userCommentStateLoading: state => state.userCommentState.loading,

    userTop5CourseStateList: state => state.top5CourseState.list,
    userTop5CourseStateLoading: state => state.top5CourseState.loading,
    userTop5CourseStateTop5: state => state.top5CourseState.topfive,

    userGetInfoInstructorTotalCourse: state => state.infoInstructorState.total,
    userGetInfoInstructor: state => state.infoInstructorState.infoInstructor,
    userGetInfoInstructorLoading: state => state.infoInstructorState.loading,
    userLoadCart: state => state.userATCState.carts,
    userLoadCartTotal: state => state.userATCState.total,
    
    // guest
    guestGetDetailCourseAmountReview: state => state.guestDetailCourseState.amountReview,
    guestGetDetailCourse: state => state.guestDetailCourseState.detailCourse,
    guestGetDetailCourseLoading: state => state.guestDetailCourseState.loading,

    loadCourse: state => state.courseState.list,
}