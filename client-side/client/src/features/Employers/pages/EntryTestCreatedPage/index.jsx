import { BiArrowBack } from 'react-icons/bi'
import { ButtonField, InputDataField, LabelField, SelectField } from 'custom-fields'
import { DrawerAddQuestion, QuestionList } from 'features/Employers/components'
import { FaPlusCircle, FaSave, FaTrash } from 'react-icons/fa'
import { formatArrayForSelect } from 'common/functions'
import { questionLevelOptions } from 'common/constants/options'
import { schemaCreateEntryTest } from 'common/constants/schema'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './style.module.scss'
import Select from 'react-select'
import { LoadingSuspense, ModalNotify, NotFoundData, notification } from 'components'
import {
  createEntryTest,
  getEntryTestById,
  softDeleteEntryTest,
  updateEntryTestById,
} from 'features/Employers/api/employer.api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllQuestionAsync } from 'features/Employers/slices/thunks'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'

const EntryTestCreatedPage = () => {
  const dispatch = useDispatch()
  const key = new URLSearchParams(useLocation().search).get('key')
  const { t } = useTranslation()
  const history = useHistory()
  const questions = useSelector(selectQuestions)
  const status = useSelector(selectedStatus)
  const [isUpdate, setIsUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [questionsSelect, setQuestionsSelect] = useState([])
  const [loading, setLoading] = useState(false)
  const [idEntryTest, setIDEntryTest] = useState(key ? key : '')
  const [dataEntryTest, setDataEntryTest] = useState(null)

  const skillAdd = []
  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })
  const [skillsSelect, setSkillsSelect] = useState([])

  const optionsQuestionLevel = formatArrayForSelect(
    questionLevelOptions,
    'Question level',
    t,
    false,
    null,
    true,
    'choose-levelEntryTest'
  )

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ mode: 'all', resolver: yupResolver(schemaCreateEntryTest) })

  useTitle(t('Create entry test'))

  useEffect(() => {
    const getEntryTest = async (id) => {
      const result = await getEntryTestById({ id })
      const { data } = result.data
      if (data) {
        setDataEntryTest(data)
        setIsUpdate(true)
      } else {
        setIsUpdate(false)
      }
    }

    if (idEntryTest) {
      getEntryTest(idEntryTest)
    }
  }, [idEntryTest])

  useEffect(() => {
    if (isUpdate) {
      dispatch(getAllQuestionAsync())
    }
  }, [isUpdate, dispatch])

  useEffect(() => {
    if (dataEntryTest) {
      setValue('title', dataEntryTest.title)
      setValue('description', dataEntryTest.description)
      setValue('requiredPass', dataEntryTest.requiredPass)
      setValue('difficultLevel', dataEntryTest.difficultLevel)
      setSkillsSelect(skills.filter((item) => dataEntryTest.skills.includes(item.label)))
      const newSelectQuestion = questions?.filter((question) =>
        dataEntryTest.questions.includes(question._id)
      )
      setQuestionsSelect(newSelectQuestion)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEntryTest, setValue, questions])

  const handleCreateEntryTest = async (data) => {
    if (!validateData()) {
      return
    }

    const _dataSave = {
      ...data,
      skills: skillsSelect.map((skill) => skill.label),
      questions: questionsSelect.map((question) => question._id),
    }

    setLoading(true)
    const result = await createEntryTest(_dataSave)
    if (result.status === 'success') {
      setLoading(false)
      notification(t('Create entry test successfully'), 'success')
      const { _id } = result.data.data
      if (_id) {
        setIDEntryTest(_id)
      }
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  const handleUpdateEntryTest = async (data) => {
    if (!validateData()) {
      return
    }

    const _dataSave = {
      ...data,
      skills: skillsSelect.map((skill) => skill.label),
      questions: questionsSelect.map((question) => question._id),
    }
    setLoading(true)
    const result = await updateEntryTestById({ id: idEntryTest, data: _dataSave })
    if (result.status === 'success') {
      notification(`${t('Update entry test successfully')}`, 'success')
    } else {
      notification(result.message, 'error')
    }
    setLoading(false)
  }

  const validateData = () => {
    let _error = ''

    if (skillsSelect.length < 1) {
      _error += `${t('Please select at least 1 skill for the entry test')}\n`
    }

    if (questionsSelect.length < 1) {
      _error += `${t('Please select at least 1 question for the entry test')}`
    }

    if (_error !== '') {
      notification(_error, 'error')
      return false
    }

    return true
  }

  const handleDeleteEntryTest = async () => {
    const result = await softDeleteEntryTest({ id: idEntryTest })
    if (result.status === 204) {
      notification(t('Move entry test to trash successfully'), 'success')
      history.goBack()
      setIsUpdate(false)
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  const handleAddQuestion = () => {
    setVisibleDrawer(true)
  }

  const handleSelectQuestion = (question) => {
    setQuestionsSelect((prev) => [...prev, { ...question }])
  }

  const handleDeleteSelectQuestion = (id) => {
    const newQuestions = questionsSelect.filter((question) => question._id !== id)
    setQuestionsSelect(newQuestions)
  }

  const handlerChangeSkill = (option) => {
    setSkillsSelect(option)
    option.forEach((skill) => {
      skillAdd.push({ label: skill.label, value: skill.value })
    })
  }

  const QuestionListRender = () => {
    if (isUpdate && status) {
      return <LoadingSuspense height="30vh" />
    } else {
      return questionsSelect.length === 0 ? (
        <NotFoundData title={t('Bạn chưa thêm bất kỳ câu hỏi nào')} />
      ) : (
        <QuestionList
          questions={questionsSelect}
          onDeleteQuestion={handleDeleteSelectQuestion}
          isSelectList
        />
      )
    }
  }

  return (
    <div className={classes.entryTestCreated}>
      {showModal && (
        <ModalNotify
          showModal={showModal}
          onClose={() => setShowModal(false)}
          title={t('Move entry test to trash')}
          onOk={handleDeleteEntryTest}
        >
          <div className={classes.notifyContent}>
            {t('Are you sure to move this entry test to trash')}?
          </div>
        </ModalNotify>
      )}
      <div className={classes.headerBack}>
        <div>
          <BiArrowBack onClick={() => history.goBack()} />
        </div>
        <div>
          {t('Add entry test')}{' '}
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
          onClick={handleSubmit(isUpdate ? handleUpdateEntryTest : handleCreateEntryTest)}
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

      <div className={classes.formGroup}>
        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Entry test title')} isCompulsory />
          <InputDataField
            name="title"
            control={control}
            defaultValue=""
            errors={errors?.title?.message}
            placeholder={t('Enter entry test title')}
            style={{ borderRadius: '5px' }}
          />
        </div>

        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Entry test description')} isCompulsory />
          <InputDataField
            name="description"
            control={control}
            defaultValue=""
            errors={errors?.description?.message}
            placeholder={t('Enter entry test description')}
            style={{ borderRadius: '5px' }}
          />
        </div>

        <div className={classes.formGroup__formControl}>
          <LabelField label={t('Minimum score passed')} isCompulsory />
          <InputDataField
            name="requiredPass"
            control={control}
            defaultValue={''}
            errors={errors?.requiredPass?.message}
            placeholder={t('Enter minimum score to pass entry test')}
            style={{ borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }} className={classes.formGroup__formControl}>
          <LabelField label={t('Question level')} isCompulsory />
          <SelectField
            name="difficultLevel"
            control={control}
            defaultValue={`${t('choose-levelEntryTest')}`}
            optionList={optionsQuestionLevel}
            placeholder={t('choose-levelEntryTest')}
            errors={errors?.difficultLevel?.message}
            style={{ marginBottom: '10px' }}
          />
        </div>
      </div>

      <div>
        <LabelField label={t('Choose the skill for the entry test')} isCompulsory />
        <Select
          isMulti
          placeholder={t('choose skills')}
          options={skills}
          value={skillsSelect}
          onChange={handlerChangeSkill}
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
          onClick={handleAddQuestion}
        >
          <FaPlusCircle className={classes.actionData__icon} />
          {t('Add question')}
        </ButtonField>

        <DrawerAddQuestion
          visible={visibleDrawer}
          onClose={() => setVisibleDrawer(false)}
          selectedQuestion={questionsSelect}
          onSelectQuestion={handleSelectQuestion}
          skills={skills}
          selectedSkill={skillsSelect}
          onChangeSkill={handlerChangeSkill}
        />
      </div>

      <QuestionListRender />
    </div>
  )
}

export default EntryTestCreatedPage
