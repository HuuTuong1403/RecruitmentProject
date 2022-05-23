import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, NotFoundData } from 'components'
import { ButtonField } from 'custom-fields'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'
import { getAllQuestionAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAddCircleOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from './style.module.scss'

const QuestionManagementPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const status = useSelector(selectedStatus)
  const questions = useSelector(selectQuestions)

  useTitle(`${t('Question & answer management')}`)

  useEffect(() => {
    dispatch(getAllQuestionAsync())
  }, [dispatch])

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    questions && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Question & answer management')}</div>
        <div style={{ marginTop: '4px' }}>
          <ButtonField
            backgroundcolor="#007bff"
            backgroundcolorhover="#007bffad"
            radius="5px"
            width="15%"
            onClick={() => history.push('/employers/dashboard/questions/created')}
          >
            <MdAddCircleOutline style={{ marginRight: '2px' }} /> {t('Add question')}
          </ButtonField>
        </div>
        {questions.length === 0 ? (
          <NotFoundData title={t('You have not created any questions yet')} />
        ) : (
          <Fragment>
            <div className={classes.titleTable}>Danh sách câu hỏi</div>
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default QuestionManagementPage
