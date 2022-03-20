import { Fragment, useEffect } from 'react'
import { getAllServicePackageDeletedAsync } from 'features/SystemManager/slices/thunks'
import { LoadingSuspense, NotFoundData } from 'components'
import { selectServicePackageDeleted, selectStatus } from 'features/SystemManager/slices/selectors'
import { TableServicePackage } from 'features/SystemManager/components'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const ServicePackageTrashList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useTitle(`${t('Service Package Deleted')}`)
  const status = useSelector(selectStatus)
  const servicePackagesDeleted = useSelector(selectServicePackageDeleted)

  useEffect(() => {
    dispatch(getAllServicePackageDeletedAsync())
  }, [dispatch])

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.servicePackage}>
      {servicePackagesDeleted && (
        <div>
          {servicePackagesDeleted.length === 0 ? (
            <NotFoundData
              title={`${t('There are currently no service package deleted').toUpperCase()}`}
            />
          ) : (
            <Fragment>
              <div className={classes.titleTable}>
                {t('List of service packages deleted in system')}
              </div>
              <TableServicePackage datas={servicePackagesDeleted} isTrash />
            </Fragment>
          )}
        </div>
      )}
    </div>
  )
}

export default ServicePackageTrashList
