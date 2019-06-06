import axios from 'axios'
import { OPEN_BASE_URL, BASE_URL } from '../../utils/constants'

export function login(values) {
    return submitLogin(values, `${OPEN_BASE_URL}login`)
}

export async function signup(values) {
    return await submitSignUp(values, `${OPEN_BASE_URL}signup`)
}

function submitLogin(values, url) {

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                console.log(resp)
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