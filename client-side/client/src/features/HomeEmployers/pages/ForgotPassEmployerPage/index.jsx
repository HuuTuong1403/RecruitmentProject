import { forgotPassEmployer } from 'features/HomeEmployers/api/homeEmployer.api'
import { scrollToTop } from 'common/functions'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import AuthComponent from 'components/AuthComponent'
import ForgotPassNotify from 'components/ForgotPassNotify'
import notification from 'components/Notification'
import SendMail from 'components/SendMail'

const ForgotPassEmployerPage = () => {
  scrollToTop()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()
  const [isNotify, setIsNotify] = useState(false)
  useTitle(`${t('forgotpass')}`)

  useEffect(() => {
    const employer = selectEmployerLocal()
    if (employer) history.push('/employers')
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await forgotPassEmployer(data)
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
      {!isNotify ? (
        <SendMail loading={loading} onSubmit={onSubmit} isEmployer />
      ) : (
        <ForgotPassNotify />
      )}
    </AuthComponent>
  )
}

export default ForgotPassEmployerPage
