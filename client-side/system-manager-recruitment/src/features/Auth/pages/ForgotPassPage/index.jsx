import { ScrollTop } from 'common/functions'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import AuthComponent from 'features/Auth/components/AuthComponent'
import ForgotPassNotify from 'features/Auth/components/ForgotPassNotify'
import SendMail from 'features/Auth/components/SendMail'

const ForgotPassPage = () => {
  ScrollTop()
  const { t } = useTranslation()
  const [isNotify, setIsNotify] = useState(false)
  useTitle(`${t('forgot pass')}`)

  const changeToNotifyHandler = () => setIsNotify((prevState) => !prevState)

  return (
    <AuthComponent title={t('forgot pass')}>
      {!isNotify ? <SendMail changeToNotify={changeToNotifyHandler} /> : <ForgotPassNotify />}
    </AuthComponent>
  )
}

export default ForgotPassPage
