import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'

const ServicePackageTrashPage = () => {
  const { t } = useTranslation()
  useTitle(`${t('Service Package Deleted')}`)

  return (
    <div>
      <h1>Trash</h1>
    </div>
  )
}

export default ServicePackageTrashPage
