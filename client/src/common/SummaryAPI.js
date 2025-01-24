export const baseURL = 'http://localhost:8080'

const SummaryAPI = {
    register:{
        url :'/api/user/register',
        method: 'post'
    },
    login:{
        url: '/api/user/login',
        method: 'post'
    },
    forgot_passsword:{
        url: '/api/user/forgot-password',
        method: 'put'
    },
    forgot_passsword_otp_verification:{
        url: '/api/user/verify-forgot-password',
        method:'put'
    },
    resetPassword : {
        url : "/api/user/reset-password",
        method : 'put'
    },
    refreshToken:{
        url:'/api/user/refresh-token',
        method:'post'
    },
    userDetails:{
        url:'/api/user/user-details',
        method:'get'
    },
    logout:{
        url:'/api/user/logout',
        method:'get'
    },
    uploadAvatar:{
        url : '/api/user/upload-avatar',
        method:'put'
    },
    updateUserDetails:{
        url : '/api/user/update-user',
        method:'put'
    }
}

export default SummaryAPI;