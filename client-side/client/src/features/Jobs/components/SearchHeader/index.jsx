import {
  dateCreatedAtOptions,
  levelOptions,
  positionOptions,
  salaryOptions,
} from 'common/constants/options'
import { ButtonField, WrappedInput as InputField, LabelField } from 'custom-fields'
import { Collapse } from 'reactstrap'
import { FaFilter } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { selectedIsFilter } from 'features/Jobs/slices/selectors'
import { selectedProvinces } from 'features/Home/slices/selectors'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { toggleOpenFilter } from 'features/Jobs/slices'
import { useHistory, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import Select from 'react-select'
import { formatArrayForSelect } from 'common/functions'

export const SearchHeader = () => {
  let query = new URLSearchParams(useLocation().search)
  const type = query.get('type')
  const history = useHistory()
  const { t } = useTranslation()
  const searchKey = useRef()
  const dispatch = useDispatch()
  const isOpen = useSelector(selectedIsFilter)
  const optionsDateCreate = dateCreatedAtOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const optionsLevel = levelOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const optionsPosition = positionOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const optionsSalry = salaryOptions.map((item, index) => ({
    value: item.value,
    label: index === 0 ? t(item.label) : `${t('From')} ${item.label}`,
  }))

  const provinces = formatArrayForSelect(useSelector(selectedProvinces), 'Province', t, true, {
    name: 'Tất cả',
    code: '',
  })

  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })

  const [selectProvince, setSelectProvince] = useState(query.get('location%city') ?? 'Tất cả')
  const [selectSalary, setSelectSalary] = useState(query.get('salary%min[gte]') ?? 'Tất cả')
  const [selectLevel, setSelectLevel] = useState(query.get('level') ?? 'Tất cả')
  const [selectPosition, setSelectPosition] = useState(query.get('position') ?? 'Tất cả')
  const [selectCreateDate, setSelectCreateDate] = useState(query.get('createdAt') ?? 'Tất cả')
  const querySkills = query.get('skills') === null ? [] : query.get('skills').split(',')
  const [selectSkill, setSelectSkill] = useState([])
  const [textSkill, setTextSkill] = useState('')

  const changeSkillHandler = (option) => {
    setSelectSkill(option)
    const value = []
    option.forEach((skill) => {
      value.push(skill.label)
    })
    setTextSkill(value.join(','))
  }

  const changeProvinceHandler = (selectOption) => {
    setSelectProvince(selectOption.label)
  }

  const changeSalaryHandler = (selectOption) => {
    setSelectSalary(selectOption.value)
  }

  const changeLevelHandler = (selectOption) => {
    setSelectLevel(selectOption.value)
  }

  const changePositionHandler = (selectOption) => {
    setSelectPosition(selectOption.value)
  }

  const changeCreateDateHandler = (selectOption) => {
    setSelectCreateDate(selectOption.value)
  }

  const deleteFilterHandler = () => {
    setSelectSalary('Tất cả')
    setSelectLevel('Tất cả')
    setSelectPosition('Tất cả')
    setSelectCreateDate('Tất cả')
    setSelectSkill([])
    setTextSkill('')
  }

  const toggle = () => {
    setSelectSkill(skills.filter((item) => querySkills.includes(item.label)))
    dispatch(toggleOpenFilter())
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    const textKey = searchKey.current.value
    if (
      textKey === '' &&
      selectProvince === 'Tất cả' &&
      selectSalary === 'Tất cả' &&
      selectLevel === 'Tất cả' &&
      selectPosition === 'Tất cả' &&
      selectCreateDate === 'Tất cả' &&
      textSkill === ''
    ) {
      history.push('/jobs/search?type=all')
    } else {
      const province = selectProvince === 'Tất cả' ? '' : `location%city=${selectProvince}&`
      const keyword = textKey === '' ? '' : `jobTitle=${textKey}&`
      const salary = selectSalary === 'Tất cả' ? '' : `salary%min[gte]=${selectSalary}&`
      const level = selectLevel === 'Tất cả' ? '' : `level=${selectLevel}&`
      const position = selectPosition === 'Tất cả' ? '' : `position=${selectPosition}&`
      const skill = textSkill === '' ? '' : `skills=${textSkill}&`
      const date = selectCreateDate === 'Tất cả' ? '' : `createdAt=${selectCreateDate}`
      history.push(`/jobs/search?${keyword}${province}${salary}${level}${position}${skill}${date}`)
    }
  }

  return (
    <section className={classes.searchHeader}>
      <div className={classes.searchHeader__content}>
        <div className={classes.searchHeader__container}>
          <form onSubmit={searchSubmitHandler}>
            {/* Filter Job Name */}
            <div className={classes['searchHeader__container--input-search']}>
              <InputField
                ref={searchKey}
                defaultValue={!type ? query.get('jobTitle') : ''}
                placeholder={t('search-key')}
                icon={<FaSearch />}
              />
            </div>

            {/* Filter Province */}
            <div className={classes['searchHeader__container--input-location']}>
              <Select
                placeholder={t('choose-province')}
                options={provinces}
                value={provinces[0].options?.find((item) => item.label === selectProvince)}
                onChange={changeProvinceHandler}
              />
            </div>
            <div className={classes['searchHeader__container--button']}>
              <ButtonField
                backgroundcolor="#324554"
                backgroundcolorhover="#333"
                type="submit"
                uppercase
              >
                {t('search')}
              </ButtonField>
            </div>
          </form>
          <div>
            <FaFilter onClick={toggle} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <div className={classes.searchHeader__collapse}>
          <form className={classes['searchHeader__collapse--form']} onSubmit={searchSubmitHandler}>
            <div className={classes['searchHeader__collapse--form--top']}>
              {/* Filter Position */}
              <div>
                <LabelField label={t('Position')} />
                <Select
                  options={optionsPosition}
                  value={optionsPosition.filter((position) => {
                    return position.value === selectPosition
                  })}
                  onChange={changePositionHandler}
                />
              </div>

              {/* Filter Level */}
              <div>
                <LabelField label={t('Level')} />
                <Select
                  options={optionsLevel}
                  value={optionsLevel.filter((level) => {
                    return level.value === selectLevel
                  })}
                  onChange={changeLevelHandler}
                />
              </div>

              {/* Filter Salary */}
              <div>
                <LabelField label={t('Salary')} />
                <Select
                  options={optionsSalry}
                  value={optionsSalry.filter((salary) => {
                    return salary.value === selectSalary
                  })}
                  onChange={changeSalaryHandler}
                />
              </div>

              {/* Filter Skill */}
              <div>
                <LabelField label={t('Skill')} />
                <Select
                  isMulti
                  placeholder={t('choose skills')}
                  options={skills}
                  value={selectSkill}
                  onChange={changeSkillHandler}
                />
              </div>

              {/* Filter Date Created */}
              <div>
                <LabelField label={t('Posted Within')} />
                <Select
                  options={optionsDateCreate}
                  value={optionsDateCreate.filter((date) => {
                    return date.value === selectCreateDate
                  })}
                  onChange={changeCreateDateHandler}
                />
              </div>
            </div>
            <div className={classes['searchHeader__collapse--form--actions']}>
              <ButtonField
                backgroundcolor="#324554"
                backgroundcolorhover="#333"
                type="submit"
                uppercase
              >
                {t('Confirm')}
              </ButtonField>
              <ButtonField
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                type="button"
                uppercase
                onClick={deleteFilterHandler}
              >
                {t('Clear filters')}
              </ButtonField>
            </div>
          </form>
        </div>
      </Collapse>
    </section>
  )
}
