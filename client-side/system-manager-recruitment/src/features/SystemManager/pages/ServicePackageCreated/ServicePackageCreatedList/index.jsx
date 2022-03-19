import { selectServicePackages, selectStatus } from 'features/SystemManager/slices/selectors'
import { ButtonField } from 'custom-fields'
import { getAllServicePackageAsync } from 'features/SystemManager/slices/thunks'
import { LoadingSuspense, NotFoundData } from 'components'
import { MdAddCircleOutline } from 'react-icons/md'
import { TableServicePackage } from 'features/SystemManager/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import { pathSystemManager } from 'common/constants/path'

const ServicePackageCreatedPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  useTitle(`${t('Service Package Management')}`)
  const status = useSelector(selectStatus)
  const servicePackages = useSelector(selectServicePackages)

  useEffect(() => {
    dispatch(getAllServicePackageAsync())
  }, [dispatch])

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.servicePackage}>
      <div className={classes.servicePackage__actions}>
        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          radius="5px"
          width="20%"
          onClick={() => history.push(pathSystemManager.packageCreateItem)}
        >
          <MdAddCircleOutline className={classes.icon} />
          {t('Create Service Package')}
        </ButtonField>

        <ButtonField
          backgroundcolor="#007bff"
          backgroundcolorhover="#007bffad"
          radius="5px"
          width="20%"
          onClick={() => history.push('/dashboard/service-manage/created')}
        >
          <MdAddCircleOutline className={classes.icon} />
          {t('Add Service')}
        </ButtonField>
      </div>
      {servicePackages && (
        <div>
          {servicePackages.length === 0 ? (
            <NotFoundData title={`${t('There are currently no service package').toUpperCase()}`} />
          ) : (
            <TableServicePackage datas={servicePackages} />
          )}
        </div>
      )}
    </div>
  )
}

export default ServicePackageCreatedPage
