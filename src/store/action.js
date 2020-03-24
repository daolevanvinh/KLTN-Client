import axios from 'axios'
const apiConfig = require('../assets/js/apiURL').apiURL

export default {
    AdminLogin({ commit }, admin) {
        const apiUrl = apiConfig.adminLogin
        commit('adminLogin_request')
        return new Promise((resolve, reject) => {
            axios.post(apiUrl, {}, { params: admin })
                .then(function (response) {
                    commit('adminLogin_success')
                    resolve(response)
                })
                .catch(function (err) {
                    commit('adminLogin_error')
                    reject(err)
                })
        })
    },
    UserRegister({ commit }, user) {
        const apiURL = apiConfig.user
        commit('user_request')
        return new Promise((resolve, reject) => {
            axios.post(apiURL, {}, { params: user })
                .then(function (response) {
                    commit('user_success', response.data)
                    resolve(response);
                })
                .catch(function (err) {
                    commit('user_error')
                    reject(err)
                })
        })
    },
    UserLogin({ commit }, user) {
        const apiURL = apiConfig.userLogin
        commit('user_request')
        return new Promise((resolve, reject) => {
            axios.post(apiURL, {}, { params: user })
                .then(function (response) {
                    commit('user_success', response.data)
                    resolve(response);
                })
                .catch(function (err) {
                    commit('user_error')
                    reject(err)
                })
        })
    },
    AddToCart({ commit }, course_id) {
        const apiURL = apiConfig.addToCart
        let data = {
            token: localStorage.token,
            course_id: course_id
        }
        commit('ATC_request')
        return new Promise((resolve, reject) => {
            axios.post(apiURL, {}, { params: data })
                .then(function (response) {
                    commit('ATC_success', response.data)
                    resolve(response);
                })
                .catch(function (err) {
                    commit('ATC_error')
                    reject(err)
                })
        })
    },
    adminGetCategories({ commit }) {
        return new Promise((resolve, reject) => {
            let apiURL = apiConfig.adminCategory
            commit('admin_getCategory_request')
            axios.get(apiURL, { params: { token: localStorage.adminToken } })
                .then(function (response) {
                    commit('admin_getCategory_success', response.data)
                    resolve(response)
                })
                .catch(function (error) {
                    commit('admin_getCategory_error')
                    reject(error)
                })
        })
    },
    adminUpdateCategory({ commit }, category) {
        return new Promise((resolve, reject) => {
            let apiURL = apiConfig.adminCategory
            category.token = localStorage.adminToken
            let data = category
            commit('admin_getCategory_request')
            axios.patch(apiURL, {}, { params: data })
                .then(function (response) {
                    commit('admin_getCategory_success', response.data)
                    resolve(response)
                })
                .catch(function (error) {
                    commit('admin_getCategory_error')
                    reject(error)
                })
        })
    },
    adminInsertCategory({ commit }, category) {
        return new Promise((resolve, reject) => {
            let apiURL = apiConfig.adminCategory
            category.token = localStorage.adminToken
            let data = category
            commit('admin_getCategory_request')
            axios.post(apiURL, {}, { params: data })
                .then(function (response) {
                    commit('admin_getCategory_success', response.data)
                    resolve(response)
                })
                .catch(function (error) {
                    commit('admin_getCategory_error')
                    reject(error)
                })
        })
    },
    adminDisableOrEnableCategory({ commit }, category) {
        return new Promise((resolve, reject) => {
            let apiURL = apiConfig.adminCategory
            category.token = localStorage.adminToken
            let data = category
            commit('admin_getCategory_request')
            axios.delete(apiURL, { params: data })
                .then(function (response) {
                    commit('admin_getCategory_success', response.data)
                    resolve(response)
                })
                .catch(function (error) {
                    commit('admin_getCategory_error')
                    reject(error)
                })
        })
    }
}