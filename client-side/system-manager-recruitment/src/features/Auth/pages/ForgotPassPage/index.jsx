import { AuthComponent, ForgotPassNotify, SendMail } from 'features/Auth/components'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'

const ForgotPassPage = () => {
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
