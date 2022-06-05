export const api = {
    urls: {
        baseUrl: 'https://norma.nomoreparties.space/api',
        ingredients: '/ingredients',
        orders: '/orders',
        registration: '/auth/register',
        forgotPassword: '/password-reset',
        resetPassword: '/reset',
        login: '/auth/login',
        logout: '/auth/logout',
        updateToken: '/auth/token',
        user: '/auth/user'
    },
    headers: {
        'Content-Type': 'application/json'
    }
}
