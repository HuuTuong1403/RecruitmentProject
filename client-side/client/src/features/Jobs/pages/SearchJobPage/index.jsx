import { clearNullObject } from 'common/functions'
import { fetchAllFavoriteJobAsync } from 'features/JobSeekers/slices/thunks'
import { fetchJobsSearchAsync } from 'features/Jobs/slices/thunks'
import { Fragment, useEffect } from 'react'
import { scrollToTop } from 'common/functions'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import JobSearchList from 'features/Jobs/components/JobSearchList'
import SearchHeader from 'features/Jobs/components/SearchHeader'

const SearchJobPage = () => {
  scrollToTop()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let query = new URLSearchParams(useLocation().search)
  const jobTitle = query.get('jobTitle')
  const location = query.get('location%city')
  const salary = query.get('salary%min[gte]')
  const level = query.get('level')
  const position = query.get('position')
  const createdAt = query.get('createdAt')
  const skills = query.get('skills')
  const companyName = query.get('companyName')
  const employer = selectEmployerLocal()
  const token = localStorage.getItem('token')

  let filter = clearNullObject({
    companyName,
    jobTitle,
    'location%city': location,
    'salary%min[gte]': salary,
    level,
    position,
    createdAt,
    skills,
  })

  useTitle(
    jobTitle || location || salary || level || position || createdAt || skills || companyName
      ? `${t('Find a job')} ${jobTitle ? `${t('with')} ${jobTitle}` : ''} 
        ${companyName ? `${t('at')} ${companyName}` : ''} 
        ${location ? `${t('at')} ${location}` : ''} 
        ${salary ? `${t('from')} ${salary} USD` : ''}
        ${level ? `${t('with level')} ${level}` : ''}
        ${position ? `${t('with position')} ${position}` : ''}
        ${createdAt ? `${t('posted within')} ${createdAt} ${t('day')}` : ''}
        ${skills ? `${t('with skill')} ${skills}` : ''}`
      : `${t('Find all jobs, recruitment news')}`
  )

  useEffect(() => {
    if (jobTitle || location || salary || level || position || createdAt || skills || companyName) {
      dispatch(fetchJobsSearchAsync({ filter }))
    }
  })

  useEffect(() => {
    if (!employer) {
      if (token) {
        dispatch(fetchAllFavoriteJobAsync())
      }
    }
  }, [dispatch, token, employer])

  return (
    <Fragment>
      <SearchHeader />
      <JobSearchList employer={employer} />
    </Fragment>
  )
}

export default SearchJobPage
