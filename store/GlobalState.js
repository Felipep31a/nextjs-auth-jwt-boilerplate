import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getMethod } from '../utils/fetch'
import ACTIONS from './Actions'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initial = { notify: {}, auth: {} }
    const [state, dispath] = useReducer(reducers, initial)

    useEffect(() => {

        const firstLogin = localStorage.getItem('firstLogin')

        if (firstLogin) {
            getMethod('auth/accessToken').then(res => {
                console.log('res.err',res.err)
                if (res.err) return localStorage.removeItem('firstLogin')
                
                dispath({
                    type: ACTIONS.AUTH,
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })

            })
        }

    }, [])

    return (
        <DataContext.Provider value={[state, dispath]}>
            {children}
        </DataContext.Provider>
    )
}