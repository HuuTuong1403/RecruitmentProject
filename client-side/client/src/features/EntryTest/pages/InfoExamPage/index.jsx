import { ButtonField } from 'custom-fields'
import { convertTime } from 'common/functions'
import { FaPlay, FaHome } from 'react-icons/fa'
import { Fragment, useEffect } from 'react'
import { getEntryTestByIdAsync } from 'features/EntryTest/slices/thunks'
import { LoadingSuspense, ModalSignIn } from 'components'
import { resetState } from 'features/EntryTest/slices'
import { selectEntryTest, selectStatus } from 'features/EntryTest/slices/selector'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const InfoExamPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const entryTestData = useSelector(selectEntryTest)
  const status = useSelector(selectStatus)
  const [showModal, setShowModal] = useState(false)

  useTitle(entryTestData?.title ?? '')

  useEffect(() => {
    const getEntryTest = async () => {
      const result = await dispatch(getEntryTestByIdAsync({ id }))
      if (result.error) {
        setShowModal(true)
      }
    }
    getEntryTest()
  }, [dispatch, history, id])

  const handleDoExam = () => {
    history.push(`/entry-tests/join/${id}/start`)
    dispatch(resetState())
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <Fragment>
      <ModalSignIn
        showModal={showModal}
        onCloseModal={() => {
          setShowModal(false)
          history.go(0)
        }}
      />
      {entryTestData && (
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
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                uppercase
                radius="10px"
                onClick={() => history.replace('/')}
              >
                <FaHome className={classes.wrapper__action__icon} /> Quay lại trang chủ
              </ButtonField>

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
      )}
    </Fragment>
  )
}

export default InfoExamPage
