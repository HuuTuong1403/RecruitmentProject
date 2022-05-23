import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, NotFoundData } from 'components'
import { TableOrderAvailable } from 'features/Employers/components'
import { selectAvailableSP, selectedStatus } from 'features/Employers/slices/selectors'
import { getAvailableServicePackageAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import classes from './style.module.scss'

const ServicePackageManagement = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const servicePackages = useSelector(selectAvailableSP)
  const status = useSelector(selectedStatus)

  useTitle(`${t('Registered service package')}`)

  useEffect(() => {
    dispatch(getAvailableServicePackageAsync())
  }, [dispatch])

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    servicePackages && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Registered service package')}</div>
        {servicePackages.length === 0 ? (
          <NotFoundData title={t('You have not subscribed to any service package yet')} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${
              servicePackages.length
            } ${t('Registered service package').toLowerCase()}`}</div>

            <TableOrderAvailable orders={servicePackages} />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default ServicePackageManagement
