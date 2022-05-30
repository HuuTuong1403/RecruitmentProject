import { getAllServicePackageAsync } from 'features/HomeEmployers/slices/thunks'
import { LoadingSuspense, ModalNotify, ModalSignIn, notification } from 'components'
import { selectServicePackages, selectStatus } from 'features/HomeEmployers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import NumberFormat from 'react-number-format'
import { ButtonField } from 'custom-fields'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { createCart } from 'features/Employers/api/employer.api'
import { fetchCartAsync } from 'features/Employers/slices/thunks'

const ServicePage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  useTitle(`${t('List of service packages')}`)
  const servicePackages = useSelector(selectServicePackages)
  const status = useSelector(selectStatus)
  const user = selectJobSeekerLocal()
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const employer = selectEmployerLocal()

  useEffect(() => {
    dispatch(getAllServicePackageAsync())
  }, [dispatch])

  const handleOpenModal = (item) => {
    if (user) {
      notification(`${t('Please log out of the job seeker account')}`, 'error')
    } else {
      if (employer) {
        setShowModal(true)
        setData(item)
      } else {
        setShowModal(true)
      }
    }
  }

  const handleRegisterService = async () => {
    setLoading(true)
    const result = await createCart({ id: data._id, data: { paidPrice: data.price } })
    if (result.status === 'success') {
      notification(
        `${t('Register service package')} ${data.packageName.toLowerCase()} ${t(
          'successfully'
        )} ${t('Service package has been added to your cart')}`,
        'success'
      )
      dispatch(fetchCartAsync())
      setShowModal(false)
    } else {
      notification(result.message, 'error')
    }
    setLoading(false)
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  return status ? (
    <LoadingSuspense height="50vh" />
  ) : (
    servicePackages && (
      <Fragment>
        {employer ? (
          <ModalNotify
            showModal={showModal}
            onClose={onCloseModal}
            title={t('Register service package')}
            onOk={handleRegisterService}
            loading={loading}
          >
            <div className={classes.notifyContent}>
              {t('Are you sure to register to the service package')} <b>{data.packageName}</b>?
            </div>
          </ModalNotify>
        ) : (
          <ModalSignIn showModal={showModal} onCloseModal={onCloseModal} isEmployee />
        )}
        <div className={classes.servicePage}>
          <div className={classes.servicePage__title}>
            {t('Price list and information of service packages')}
          </div>
          <div className={classes.servicePage__list}>
            {servicePackages.map((item) => (
              <div key={item._id} className={classes.servicePage__item}>
                <div className={classes.servicePage__item__name}>{item.packageName}</div>
                <div className={classes.servicePage__item__price}>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator={true}
                    value={item.price.VND}
                    suffix="₫"
                    displayType={'text'}
                  />
                </div>
                <div className={classes.servicePage__item__desc}>
                  <span>{t('Detail')}:</span> {item.description}
                </div>
                <ul className={classes.servicePage__item__listService}>
                  <li>
                    {t('Apply for')}: {t(item.postType)}
                  </li>
                  <li>
                    {t('Maximum number of posts')}: {item.postQuantity}
                  </li>
                  {item.services.map((service) => (
                    <li key={service._id}>{service.serviceName}</li>
                  ))}
                </ul>
                <div className={classes.servicePage__item__actions}>
                  <ButtonField
                    backgroundcolor="#007bff"
                    backgroundcolorhover="#0069d9"
                    radius="5px"
                    onClick={() => handleOpenModal(item)}
                    uppercase
                  >
                    {t('Register now')}
                  </ButtonField>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    )
  )
}

export default ServicePage
