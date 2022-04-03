import { BannerHomeEmp, EmployersUs, FeatureC, Statistic } from 'features/HomeEmployers/components'
import { Fragment } from 'react'
import { ScrollToTop } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import ScrollAnimation from 'react-animate-on-scroll'

const HomeEmployerPage = () => {
  ScrollToTop()
  const { t } = useTranslation()

  useTitle(`${t('Post job and create free Entry Test')}`)

  return (
    <Fragment>
      <BannerHomeEmp />
      <ScrollAnimation animateIn="animate__fadeInLeft" animateOut="animate__fadeOutLeft">
        <FeatureC />
      </ScrollAnimation>
      <ScrollAnimation animateIn="animate__fadeInRight" animateOut="animate__fadeOutRight">
        <Statistic />
      </ScrollAnimation>
      <ScrollAnimation animateIn="animate__fadeInLeft" animateOut="animate__fadeOutLeft">
        <EmployersUs />
      </ScrollAnimation>
    </Fragment>
  )
}

export default HomeEmployerPage
