import { DataContext } from '../store/GlobalState'
import Loading from '../components/Loading'
import Toast from '../components/Toast'
import { useContext } from 'react'
import ACTIONS from '../store/Actions'

const Notify = () => {

    const [state, dispath] = useContext(DataContext)
    const { notify } = state

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error &&
                <Toast
                    msg={{ title: 'Erro', msg: notify.error }}
                    handleShow={() => dispath({ type: ACTIONS.NOTIFY, payload: {} })}
                    bgColor="bg-danger"
                />}
            {notify.success &&
                <Toast
                    msg={{ title: 'Sucesso', msg: notify.success }}
                    handleShow={() => dispath({ type: ACTIONS.NOTIFY, payload: {} })}
                    bgColor="bg-success"
                />}
        </>
    )

}

export default Notify