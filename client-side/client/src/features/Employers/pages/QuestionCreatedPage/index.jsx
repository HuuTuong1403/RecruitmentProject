import { BiArrowBack } from 'react-icons/bi'
import { ButtonField, LabelField, InputDataField, SelectField } from 'custom-fields'
import { FaPlusCircle, FaSave, FaTrash } from 'react-icons/fa'
import { formatArrayForSelect } from 'common/functions'
import { questionLevelOptions, questionTypeOptions } from 'common/constants/options'
import { schemaCreateQuestion } from 'common/constants/schema'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './style.module.scss'
import { ModalNotify, notification } from 'components'
import { Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import Select from 'react-select'
import {
  createQuestion,
  getQuestionById,
  softDeleteQuestion,
  updateQuestionById,
} from 'features/Employers/api/employer.api'

const QuestionCreatedPage = () => {
  const key = new URLSearchParams(useLocation().search).get('key')
  const { t } = useTranslation()
  const history = useHistory()
  const [isMultiple, setIsMultiple] = useState(false)
  const [answerList, setAnswerList] = useState([])
  const [isFullScore, setIsFullScore] = useState(-1)
  const [isRandom, setIsRandom] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(null)
  const [idQues, setIDQues] = useState(key ? key : '')
  const [showModal, setShowModal] = useState(false)
  const skillAdd = []
  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })
  const [selectSkill, setSelectSkill] = useState([])
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ mode: 'all', resolver: yupResolver(schemaCreateQuestion) })

  useTitle(`${t('Add new question & answer')}`)

  useEffect(() => {
    const getQuestion = async (id) => {
      const result = await getQuestionById({ id: id })
      const { data } = result.data
      if (data) {
        setQuestion(data)
        setIsUpdate(true)
      } else {
        setIsUpdate(false)
      }
    }

    if (idQues) {
      getQuestion(idQues)
    }
  }, [idQues])

  useEffect(() => {
    if (question) {
      setValue('questionContent', question.questionContent)
      setValue('duration', question.duration)
      setValue('score', question.score)
      setValue('questionType', question.questionType)
      setValue('level', question.level)
      setValue('explanation', question.explanation)
      setValue('tips', question.tips)
      setSelectSkill(skills.filter((item) => question.skills.includes(item.label)))
      setIsRandom(question.isRandom)

      if (question.isFullScore === 0 || question.isFullScore === 1) {
        setIsMultiple(true)
        setIsFullScore(question.isFullScore)
      } else {
        setIsMultiple(false)
      }

      setAnswerList(question.answers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, setValue])

  const optionsQuestionLevel = formatArrayForSelect(
    questionLevelOptions,
    'Question level',
    t,
    false,
    null,
    true,
    'choose-questionLevel'
  )

  const optionsQuestionType = formatArrayForSelect(
    questionTypeOptions,
    'Question type',
    t,
    false,
    null,
    true,
    'choose-questionType'
  )

  const handleCheckMultiple = (value) => {
    if (value === 'Multi-choice') {
      setIsMultiple(true)
      setIsFullScore(1)
    } else {
      setIsMultiple(false)
      setIsFullScore(-1)
    }
    answerList.forEach((el) => {
      el.answer.isCorrect = false
    })
    setAnswerList([...answerList])
  }

  const handleCreateQuestion = async (data) => {
    if (!validateData()) {
      return
    }

    const _dataSave = {
      ...data,
      answers: answerList,
      isRandom,
      isFullScore,
      skills: selectSkill.map((skill) => skill.label),
    }

    setLoading(true)
    const result = await createQuestion(_dataSave)
    if (result.status === 'success') {
      setLoading(false)
      notification(`${t('Create question successfully')}`, 'success')
      const { _id } = result.data.data
      setIDQues(_id)
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  const handleUpdateQuestion = async (data) => {
    if (!validateData()) {
      return
    }

    const _dataSave = {
      ...data,
      answers: answerList,
      isRandom,
      isFullScore,
      skills: selectSkill.map((skill) => skill.label),
    }
    setLoading(true)
    const result = await updateQuestionById({ id: idQues, data: _dataSave })
    if (result.status === 'success') {
      notification(t('Update question successfully'), 'success')
    } else {
      notification(result.message, 'error')
    }
    setLoading(false)
  }

  const handleAddAnswer = () => {
    if (answerList.length >= 6) {
      notification(
        `${t('Questions can only have a maximum of')} ${answerList.length} ${t('answers')}`,
        'error'
      )
      return
    }
    const answers = [
      { choice: 'A', index: 1, answer: { contentChoice: '', isCorrect: false } },
      { choice: 'B', index: 2, answer: { contentChoice: '', isCorrect: false } },
      { choice: 'C', index: 3, answer: { contentChoice: '', isCorrect: false } },
      { choice: 'D', index: 4, answer: { contentChoice: '', isCorrect: false } },
      { choice: 'E', index: 5, answer: { contentChoice: '', isCorrect: false } },
      { choice: 'F', index: 6, answer: { contentChoice: '', isCorrect: false } },
    ]

    answerList.push({ choice: '', answer: { contentChoice: '', isCorrect: false } })
    answerList.forEach((answer, index) => {
      answerList[index].choice = answers[index].choice
    })
    setAnswerList([...answerList])
  }

  const handleCheckCorrectAnswer = (e, answer) => {
    if (isMultiple) {
      const _index = answerList.findIndex((data) => data.choice === answer.choice)
      if (_index >= 0) {
        if (e.target.checked) {
          answerList[_index].answer.isCorrect = true
        } else {
          answerList[_index].answer.isCorrect = false
        }
      }
      setAnswerList([...answerList])
    } else {
      answerList.forEach((el) => {
        el.answer.isCorrect = false
      })
      const _index = answerList.findIndex((data) => data.choice === answer.choice)
      if (_index >= 0) {
        answerList[_index].answer.isCorrect = true
      }
      setAnswerList([...answerList])
    }
  }

  const handleChangeAnswerContent = (e, answer) => {
    const _index = answerList.findIndex((data) => data.choice === answer.choice)
    if (_index >= 0) {
      answerList[_index].answer.contentChoice = e.target.value.trim()
    }

    setAnswerList([...answerList])
  }

  const handleRemoveAnswer = (answer) => {
    const _index = answerList.indexOf(answer)
    if (_index > -1) {
      answerList.splice(_index, 1)
    }
    setAnswerList([...answerList])
  }

  const validateData = () => {
    let _error = ''

    if (selectSkill.length < 1) {
      _error += `${t('Please select at least 1 skill for the question')}\n`
    }

    if (answerList.length > 0) {
      if (answerList.length < 2) {
        _error += `${t('The question must have at least 2 answers')}\n`
      }

      const _checkContent = answerList.some((answer) => answer.answer.contentChoice === '')
      if (_checkContent) {
        _error += `${t('Answer')} `
        answerList.forEach((answer, index) => {
          if (answer.answer.contentChoice === '') {
            _error += `${answer.choice}${index !== answerList.length - 1 ? ', ' : ' '}`
          }
        })
        _error += `${t('has no content')}\n`
      }

      const _hasCorrect = answerList.some((answer) => answer.answer.isCorrect)
      if (!_hasCorrect) {
        _error += `${t('Please choose the correct answer')}\n`
      }
    } else {
      _error += `${t('Please add an answer to the question')}!\n`
    }

    if (_error !== '') {
      notification(_error, 'error')
      return false
    }
    return true
  }

  const changeSkillHandler = (option) => {
    setSelectSkill(option)
    option.forEach((skill) => {
      skillAdd.push({ label: skill.label, value: skill.value })
    })
  }

  const handeDeleteQuestion = async () => {
    const result = await softDeleteQuestion({ id: idQues })

    if (result.status === 204) {
      notification(t('Move question & answer to trash successfully'), 'success')
      history.goBack()
      setIsUpdate(false)
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  return (
    <div className={classes.questionCreated}>
      {showModal && (
        <ModalNotify
          showModal={showModal}
          onClose={() => setShowModal(false)}
          title={t('Move question & answer to trash')}
          onOk={handeDeleteQuestion}
        >
          <div className={classes.notifyContent}>
            {t('Are you sure to move this question & answer to trash')}?
          </div>
        </ModalNotify>
      )}
      <div className={classes.headerBack}>
        <div>
          <BiArrowBack onClick={() => history.goBack()} />
        </div>
        <div>
          {isUpdate ? t('Update question & answer') : t('Add new question & answer')}{' '}
          <span className={classes.headerBack__compulsory}>(*: {t('Compulsory')})</span>
        </div>
      </div>

      <div className={classes.actionData}>
        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          radius="10px"
          padding="5px"
          loading={loading}
          onClick={handleSubmit(isUpdate ? handleUpdateQuestion : handleCreateQuestion)}
        >
          <FaSave className={classes.actionData__icon} />
          {isUpdate ? t('Update') : t('Add new')}
        </ButtonField>

        {isUpdate && (
          <ButtonField
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#ff7875"
            radius="10px"
            padding="5px"
            onClick={() => setShowModal(true)}
          >
            <FaTrash className={classes.actionData__icon} />
            {t('Delete')}
          </ButtonField>
        )}
      </div>

      <div>
        <LabelField label={t('Question content')} isCompulsory />
        <InputDataField
          name="questionContent"
          control={control}
          defaultValue={''}
          errors={errors?.questionContent?.message}
          placeholder={t('Enter question content')}
          style={{ borderRadius: '5px' }}
        />
      </div>

      <div className={classes.formGroup}>
        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Score')} isCompulsory />
          <InputDataField
            name="score"
            control={control}
            defaultValue={''}
            errors={errors?.score?.message}
            placeholder={t('Enter question score')}
            style={{ borderRadius: '5px' }}
          />
        </div>

        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Question answer time')} isCompulsory />
          <InputDataField
            name="duration"
            control={control}
            defaultValue={''}
            errors={errors?.duration?.message}
            placeholder={t('Enter the time to answer the question')}
            style={{ borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }} className={classes.formGroup__formControl}>
          <LabelField label={t('Question type')} isCompulsory />
          <SelectField
            name="questionType"
            control={control}
            defaultValue={`${t('choose-questionType')}`}
            getValue={handleCheckMultiple}
            optionList={optionsQuestionType}
            placeholder={t('choose-questionType')}
            errors={errors?.questionType?.message}
          />
        </div>

        <div style={{ marginBottom: '10px' }} className={classes.formGroup__formControl}>
          <LabelField label={t('Question level')} isCompulsory />
          <SelectField
            name="level"
            control={control}
            defaultValue={`${t('choose-questionLevel')}`}
            optionList={optionsQuestionLevel}
            placeholder={t('choose-questionLevelLevel')}
            errors={errors?.level?.message}
            style={{ marginBottom: '10px' }}
          />
        </div>

        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Question explanation')} isCompulsory />
          <InputDataField
            name="explanation"
            control={control}
            defaultValue={''}
            errors={errors?.explanation?.message}
            placeholder={t('Enter question explanation')}
            style={{ borderRadius: '5px', marginBottom: '10px' }}
          />
        </div>

        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Suggestions for answering questions')} />
          <InputDataField
            name="tips"
            control={control}
            defaultValue={''}
            errors={errors?.tips?.message}
            placeholder={t('Enter suggestions for answering questions')}
            style={{ borderRadius: '5px', marginBottom: '10px' }}
          />
        </div>
      </div>

      <div>
        <LabelField label={t('Choose the skill for the question')} isCompulsory />
        <Select
          isMulti
          placeholder={t('choose skills')}
          options={skills}
          value={selectSkill}
          onChange={changeSkillHandler}
          closeMenuOnSelect={false}
          style={{ width: '100%' }}
        />
      </div>

      <div className={classes.actionData}>
        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          radius="10px"
          padding="5px"
          onClick={handleAddAnswer}
        >
          <FaPlusCircle className={classes.actionData__icon} />
          {t('Add answer')}
        </ButtonField>

        <label>
          <input
            type="checkbox"
            onChange={(event) => (event.target.checked ? setIsRandom(false) : setIsRandom(true))}
            checked={isRandom ? false : true}
            className={classes.questionCreated__checkBox}
          />
          <span className={classes.questionCreated__checkBox__content}>{t('Fixed answer')}</span>
        </label>

        {isMultiple && (
          <label>
            <input
              type="checkbox"
              onChange={(event) => (event.target.checked ? setIsFullScore(0) : setIsFullScore(1))}
              checked={isFullScore === 0 ? true : false}
              className={classes.questionCreated__checkBox}
            />
            <span className={classes.questionCreated__checkBox__content}>
              {isFullScore === 0
                ? t('It is not mandatory to choose all correct answers')
                : t('All correct answers are required')}
            </span>
          </label>
        )}
      </div>

      <div className={classes.questionCreated__answerList}>
        {answerList.map((answer) => (
          <div key={answer.choice} className={classes.questionCreated__answerList__item}>
            <input
              type={isMultiple ? 'checkbox' : 'radio'}
              name="answerChoice"
              checked={answer.answer.isCorrect}
              className={classes.questionCreated__checkBox}
              onChange={(event) => handleCheckCorrectAnswer(event, answer)}
            />
            <div className={classes.questionCreated__answerList__item__choice}>
              {answer.choice}.
            </div>
            <input
              className={classes.questionCreated__answerList__item__inputContent}
              type="text"
              defaultValue={answer.answer.contentChoice}
              placeholder={`${t('Enter answer content')} ${answer.choice}`}
              onChange={(event) => handleChangeAnswerContent(event, answer)}
            />
            <Tooltip title={`${t('Remove an answer')} ${answer.choice}`} placement="left">
              <span
                className={classes.questionCreated__answerList__item__trash}
                onClick={() => handleRemoveAnswer(answer)}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCreatedPage
