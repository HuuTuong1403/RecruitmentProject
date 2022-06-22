import { FaSearch } from 'react-icons/fa'
import { selectedProvinces } from 'features/Home/slices/selectors'
import { useHistory } from 'react-router'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { WrappedInput as InputField } from 'custom-fields'
import classes from './style.module.scss'
import ReactTypingEffect from 'react-typing-effect'
import Select from 'react-select'
import { formatArrayForSelect } from 'common/functions'

export const BannerHome = () => {
  const { t } = useTranslation()
  const [searchProvince, setSearchProvince] = useState('Tất cả')
  const searchKeyRef = useRef()
  const history = useHistory()

  const provinces = formatArrayForSelect(useSelector(selectedProvinces), 'Province', t, true, {
    name: 'Tất cả',
    code: '',
  })

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    const text = searchKeyRef.current.value
    if (text === '' && searchProvince === 'Tất cả') {
      history.push(`/jobs/search?type=all`)
    } else {
      history.push(
        `/jobs/search?${text === '' ? '' : `jobTitle=${text}&`}${
          searchProvince === 'Tất cả' ? '' : `location%city=${searchProvince}&`
        }`
      )
    }
  }

  const changeProvinceHandler = (selectedOption) => {
    setSearchProvince(selectedOption.label)
  }

  return (
    <div className={classes.banner}>
      <div className={classes.banner__wrapped}>
        <div className={classes['banner__wrapped-title']}>
          <ReactTypingEffect
            text={[`${t('find-job-for-you')}`, `${t('slogan-banner-2')}`]}
            cursorRenderer={(cursor) => <div>{cursor}</div>}
            eraseDelay={500}
            eraseSpeed={50}
            speed={100}
          />
        </div>
        <div className={classes['banner__wrapped-content']}>{t('search-minute')}</div>
        <form className={classes['banner__wrapped-search']} onSubmit={searchSubmitHandler}>
          <div>
            <InputField ref={searchKeyRef} placeholder={t('search-key')} icon={<FaSearch />} />
          </div>
          <div>
            <Select
              placeholder={t('choose-province')}
              onChange={changeProvinceHandler}
              options={provinces}
            />
          </div>
          <div>
            <button type="submit">{t('search')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
