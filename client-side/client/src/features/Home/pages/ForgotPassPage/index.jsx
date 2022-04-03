import { AuthComponent, ForgotPassNotify, notification, SendMail } from 'components'
import { forgotPassJobSeeker } from 'features/Home/api/home.api'
import { ScrollToTop } from 'common/functions'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'

const ForgotPassPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const history = useHistory()
  const [isNotify, setIsNotify] = useState(false)
  useTitle(`${t('forgotpass')}`)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = selectJobSeekerLocal()
    if (user) history.push('/home')
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await forgotPassJobSeeker(data)
      if (result.status === 'success') {
        setLoading(false)
        notification(`${t('Password recovery request has been sent successfully')}`, 'success')
        setIsNotify((prevState) => !prevState)
      } else {
        setLoading(false)
        notification(`${t('Email address not found in system')}`, 'error')
      }
    } catch (error) {
      setLoading(false)
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
  }

  return (
    <AuthComponent>
      {!isNotify ? <SendMail loading={loading} onSubmit={onSubmit} /> : <ForgotPassNotify />}
    </AuthComponent>
  )
}

export default ForgotPassPage
