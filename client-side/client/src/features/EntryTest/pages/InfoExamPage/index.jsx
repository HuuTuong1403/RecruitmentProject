import { convertTime } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense } from 'components'
import { ButtonField } from 'custom-fields'
import { selectEntryTest, selectStatus } from 'features/EntryTest/slices/selector'
import { getEntryTestByIdAsync } from 'features/EntryTest/slices/thunks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import classes from './style.module.scss'
import { FaPlay } from 'react-icons/fa'

const InfoExamPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const entryTestData = useSelector(selectEntryTest)
  const status = useSelector(selectStatus)

  useTitle(entryTestData?.title ?? '')

  useEffect(() => {
    dispatch(getEntryTestByIdAsync({ id }))
  }, [dispatch, id])

  const handleDoExam = () => {
    history.push(`/entry-tests/join/${id}/start`)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    entryTestData && (
      <div className={classes.infoPage}>
        <div className={classes.wrapper}>
          <div className={classes.wrapper__title}>Bài kiểm tra: {entryTestData.title}</div>

          <div className={classes.wrapper__desc}>Mô tả: {entryTestData.description}</div>

          <div style={{ width: '100%' }} className={classes.labelWithLine}>
            <label>{t('Other information')}</label>
          </div>

          <div className={classes.wrapper__infoList}>
            <div className={classes.wrapper__infoList__infoItem}>
              Tổng số câu hỏi: {entryTestData.totalQuestion}
            </div>
            <div className={classes.wrapper__infoList__infoItem}>
              Thời gian thi: {convertTime(entryTestData.duration, t)}
            </div>
            <div className={classes.wrapper__infoList__infoItem}>
              Độ khó: {t(entryTestData.difficultLevel)}
            </div>
            <div className={classes.wrapper__infoList__infoItem}>
              Số điểm tối thiểu đạt: {entryTestData.requiredPass}
            </div>
            <div className={classes.wrapper__infoList__infoItem}>
              Kỹ năng: {entryTestData.skills.join(', ')}
            </div>
          </div>

          <div className={classes.wrapper__action}>
            <ButtonField
              backgroundcolor="#00c985"
              backgroundcolorhover="#34d49d"
              uppercase
              radius="10px"
              onClick={handleDoExam}
            >
              <FaPlay className={classes.wrapper__action__icon} /> Bắt đầu thi
            </ButtonField>
          </div>
        </div>
      </div>
    )
  )
}

export default InfoExamPage
