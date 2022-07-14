export const api = {
    urls: {
        baseUrl: 'https://norma.nomoreparties.space/api',
        wsUrl: 'wss://norma.nomoreparties.space',
        ingredients: '/ingredients',
        orders: '/orders',
        allOrders: '/orders/all',
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
