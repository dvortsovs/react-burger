
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

//
// export const GET_SIGNOUT_REQUEST = 'GET_SIGNOUT_REQUEST';
// export const GET_SIGNOUT_SUCCESS = 'GET_SIGNOUT_SUCCESS';
// export const GET_SIGNOUT_FAILED = 'GET_SIGNOUT_FAILED';
//
//
//
// export const singOut = () => {
//     return dispatch => {
//         dispatch({
//             type: GET_SIGNOUT_REQUEST
//         })
//         fetch(`${api.urls.baseUrl}${api.urls.logout}`, {
//             method: 'POST',
//             headers: api.headers,
//             body: JSON.stringify({
//                 "token": ''
//             })
//         })
//             .then((res) => {
//                 if (res.ok) {
//                     return res.json()
//                 }
//                 return Promise.reject(res.status)
//             })
//             .then((res) => {
//                 dispatch({
//                     type: GET_SIGNOUT_SUCCESS,
//                 })
//             })
//             .catch(() => {
//                 dispatch({
//                     type: GET_SIGNOUT_FAILED,
//                 })
//             })
//     }
// }
