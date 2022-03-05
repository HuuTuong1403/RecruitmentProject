import { fetchProvincesAsync } from 'features/Home/slices/thunks'
import { fetchSkillsAsync } from 'features/Jobs/slices/thunks'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import Routers from './routers'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProvincesAsync())
    dispatch(fetchSkillsAsync())
  }, [dispatch])

  return (
    <Fragment>
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  )
}

export default withTranslation()(App)
