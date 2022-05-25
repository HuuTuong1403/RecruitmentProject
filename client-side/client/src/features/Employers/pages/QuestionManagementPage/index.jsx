import { ButtonField } from 'custom-fields'
import { FaTrash } from 'react-icons/fa'
import { Fragment, useEffect } from 'react'
import { getAllQuestionAsync } from 'features/Employers/slices/thunks'
import { LoadingSuspense, NotFoundData } from 'components'
import { MdAddCircleOutline } from 'react-icons/md'
import { pathEmployer } from 'common/constants/path'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'
import { TableQuestionAnswer } from 'features/Employers/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
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
            onClick={() => history.push(pathEmployer.createdQuestion)}
          >
            <MdAddCircleOutline style={{ marginRight: '2px' }} /> {t('Add question')}
          </ButtonField>
          <span style={{ marginLeft: '5px', marginRight: '5px' }}></span>
          <ButtonField
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#ff7875"
            radius="5px"
            width="10%"
            onClick={() => history.push(pathEmployer.trashQuestion)}
          >
            <FaTrash style={{ marginRight: '2px' }} /> {t('Trash')}
          </ButtonField>
        </div>
        {questions.length === 0 ? (
          <NotFoundData title={t('You have not created any questions yet')} />
        ) : (
          <Fragment>
            <TableQuestionAnswer questions={questions} />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default QuestionManagementPage
