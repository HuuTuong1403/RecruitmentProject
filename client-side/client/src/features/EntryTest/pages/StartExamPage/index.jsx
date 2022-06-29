import { createRef, useRef, useState } from 'react'
import { LoadingSuspense, ModalNotify, notification } from 'components'
import {
  selectAnswerClient,
  selectAnswerContent,
  selectEntryTest,
  selectShowModal,
  selectStatus,
  selectTime,
} from 'features/EntryTest/slices/selector'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import Countdown from 'react-countdown'
import { NumQuestion, Questionitem } from 'features/EntryTest/components'
import {
  handleChangeAnswerClient,
  handleChangeAnswerContent,
  handleModal,
  resetState,
  setTimeCountDown,
} from 'features/EntryTest/slices'
import { createAnswerSheet } from 'features/EntryTest/api/entryTests.api'
import { ButtonField } from 'custom-fields'

const StartExamPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const idApplication = new URLSearchParams(useLocation().search).get('idApplication')
  const history = useHistory()
  const dispatch = useDispatch()
  const entryTestData = useSelector(selectEntryTest)
  const status = useSelector(selectStatus)
  const scrollQuesRef = useRef([])
  const visible = useSelector(selectShowModal)
  const time = useSelector(selectTime)
  const [loaded, setLoadded] = useState(false)
  const [loading, setLoading] = useState(false)
  const answerClient = useSelector(selectAnswerClient)
  const answerContent = useSelector(selectAnswerContent)
  const timeOut = useRef(null)

  useTitle(entryTestData?.title ?? '')

  useEffect(() => {
    if (!entryTestData) {
      history.goBack()
    } else {
      if (!loaded) {
        dispatch(setTimeCountDown({ time: entryTestData.duration }))
        scrollQuesRef.current = [...Array(entryTestData.questions.length).keys()].map(
          (_, i) => scrollQuesRef.current[i] ?? createRef()
        )
        setLoadded(true)
      }
    }
  }, [dispatch, entryTestData, id, history, loaded])

  // #region Renderer Custom Time Countdown
  const renderer = ({ minutes, seconds, completed, total }) => {
    const styleDefault = { fontWeight: 500 }
    if (completed) {
      timeOut.current = total
      return (
        <>
          <div
            className={classes.startExam__numQues__timeCount__countdown}
            style={{ color: 'red' }}
          >
            Hết thời gian làm bài
          </div>
          <ModalNotify
            title="Nộp bài kiểm tra"
            showModal={true}
            maskClosable={false}
            onOk={() => handleCreateAnswerSheet('timeOut')}
            captionBtnOk="Nộp bài"
            captionBtnClose="Hủy"
          >
            <div>
              Thời gian làm bài kiểm tra của bạn đã kết thúc. Bạn vui lòng nhấn nút nộp bài để tiến
              hành nộp bài kiểm tra!
            </div>
          </ModalNotify>
        </>
      )
    } else {
      timeOut.current = total
      return (
        <div className={classes.startExam__numQues__timeCount__countdown}>
          Thời gian còn lại:{' '}
          <span
            style={minutes < 1 && seconds < 10 ? { ...styleDefault, color: 'red' } : styleDefault}
          >
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
          </span>
        </div>
      )
    }
  }
  // #endregion

  const validateAnswerSheet = () => {
    let _error = ''

    if (answerClient.every((item) => item.selectedChoice.length !== 0)) {
      _error = ''
    } else {
      _error += 'Câu hỏi '
      answerClient.forEach((item, index) => {
        if (item.selectedChoice.length === 0) {
          _error += `${index + 1}${index !== answerClient.length - 1 ? ', ' : ' '} `
        }
      })
      _error += 'chưa có đáp án'
    }

    if (_error !== '') {
      notification(_error, 'error')
      return false
    }

    return true
  }

  const handleCreateAnswerSheet = async (type) => {
    if (type !== 'timeOut') {
      if (!validateAnswerSheet()) {
        dispatch(handleModal())
        return
      }
    }

    setLoading(true)
    const data = {
      answerContents: answerContent,
      duration: entryTestData.duration - timeOut.current / 1000,
    }

    const res = await createAnswerSheet({ id, data, idApplication })
    if (res.status === 'success') {
      const data = (res.data || {}).data || {}
      if (data) {
        notification('Nộp bài thi thành công! Vui lòng kiểm tra kết quả', 'success')
        dispatch(handleModal())
        dispatch(resetState())
        history.replace(`/entry-tests/${id}/result/${data._id}`)
      }
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handlerScrollToQuestion = (index) => {
    scrollQuesRef.current[index].current.scrollIntoView({ behavior: 'smooth' })
  }

  // #region Handler When Click Input Radio Or Checkbox
  const handlerChangeAnswerQuestion = (e, idQues, choiceContent, choiceClient, type) => {
    dispatch(handleChangeAnswerClient({ type, idQues, isChecked: e.target.checked, choiceClient }))
    dispatch(
      handleChangeAnswerContent({ type, idQues, isChecked: e.target.checked, choiceContent })
    )
  }
  // #endregion

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    entryTestData && (
      <div className={classes.startExam}>
        <div className={classes.startExam__numQues}>
          <div className={classes.startExam__numQues__wrap}>
            <NumQuestion onScroll={handlerScrollToQuestion} questions={entryTestData.questions} />
          </div>

          {time && (
            <div className={classes.startExam__numQues__timeCount}>
              <Countdown date={time} renderer={renderer} />
            </div>
          )}

          <div style={{ width: '100%' }}>
            <ButtonField
              backgroundcolor="#1e88e5"
              backgroundcolorhover="#1774c6"
              radius="5px"
              onClick={() => dispatch(handleModal())}
              uppercase
            >
              Hoàn thành bài thi
            </ButtonField>
          </div>
        </div>

        {visible && (
          <ModalNotify
            showModal={visible}
            onClose={() => dispatch(handleModal())}
            title="Nộp bài"
            onOk={handleCreateAnswerSheet}
            captionBtnOk="Nộp bài"
            captionBtnClose="Hủy"
            loading={loading}
          >
            <div>Hoàn thành kiểm tra và kết thúc bài thi</div>
          </ModalNotify>
        )}

        <div className={classes.startExam__title}>{entryTestData.title}</div>

        <div className={classes.startExam__questionList}>
          {entryTestData.questions.map((question, i) => {
            const { _id } = question
            return (
              <Questionitem
                key={_id}
                scrollRef={scrollQuesRef.current[i]}
                index={i}
                question={question}
                onChange={handlerChangeAnswerQuestion}
              />
            )
          })}
        </div>
      </div>
    )
  )
}

export default StartExamPage
