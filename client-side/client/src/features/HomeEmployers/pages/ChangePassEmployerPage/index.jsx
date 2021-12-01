import { resetPassEmployer } from 'features/HomeEmployers/api/homeEmployer.api'
import { scrollToTop } from 'common/functions'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import ChangePassForgot from 'components/ChangePassForgot'
import notification from 'components/Notification'

const ChangePassEmployerPage = () => {
  scrollToTop()
  const { t } = useTranslation()
  const history = useHistory()
  useTitle(`${t('Change pass employer')}`)
  const { token } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      history.push('/employers/forgot-pass')
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await resetPassEmployer(data, token)
      if (result.status === 'success') {
        setLoading(false)
        notification(`${t('Password recovery successful')}`, 'success')
        history.replace('/employers/sign-in')
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

export default ChangePassEmployerPage
