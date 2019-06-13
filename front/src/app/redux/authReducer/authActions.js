import axios from 'axios'
import { OPEN_BASE_URL, API_BASE_URL } from '../../utils/constants'

export function login(values) {
    return submitLogin(values, `${OPEN_BASE_URL}/login`)
}

export async function signup(values) {
    return await submitSignUp(values, `${API_BASE_URL}/signup`)
}

function submitLogin(values, url) {

    // return new Promise(async (resolve, reject) => {
    //     setTimeout(() => resolve(dispatch(
    //         { type: 'USER_FETCHED', payload: { name: 'name', email: 'email' } }
    //     )), 5000  )
        
    // }) ;

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch(
                    { type: 'USER_FETCHED', payload: resp.data }
                )
                return true
            })
            .catch(e => {
              console.log('Erro')
                    return false
            })
    }
}

function submitSignUp(values, url) {
    return axios.post(url, values)
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${OPEN_BASE_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}