import { resetPassword } from 'features/Home/api/home.api'
import { ScrollToTop } from 'common/functions'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { ChangePassForgot, notification } from 'components'

const ChangePassForgotPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  useTitle(`${t('Change pass jobseeker')}`)
  const history = useHistory()
  const { token } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      history.push('/home/forgot-pass')
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await resetPassword(data, token)
      if (result.status === 'success') {
        setLoading(false)
        notification(`${t('Password recovery successful')}`, 'success')
        history.push('/home/sign-in')
      } else {
        setLoading(false)
        notification(`${t('Token is invalid or expired')}`, 'error')
      }
    } catch (error) {
      setLoading(false)
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
  }

  return <ChangePassForgot loading={loading} onSubmit={onSubmit} />
}

export default ChangePassForgotPage
