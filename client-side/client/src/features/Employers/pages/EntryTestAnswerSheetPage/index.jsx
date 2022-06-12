import { dateFormatHourMinute } from 'common/constants/dateFormat'
import { convertTime } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, NotFoundData } from 'components'
import { TableData } from 'features/Employers/components'
import { selectAnswerSheets, selectedStatus } from 'features/Employers/slices/selectors'
import { getAnswerSheetByIdAsync } from 'features/Employers/slices/thunks'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import classes from './style.module.scss'

const EntryTestAnswerSheetPage = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const title = new URLSearchParams(useLocation().search).get('title')
  const { idEntryTest } = useParams()
  const dispatch = useDispatch()
  const answerSheets = useSelector(selectAnswerSheets)
  const status = useSelector(selectedStatus)

  useTitle(`${t('Manage participant history')}
  ${title}`)

  useEffect(() => {
    dispatch(getAnswerSheetByIdAsync({ id: idEntryTest }))
  }, [dispatch, idEntryTest])

  const columns = [
    {
      title: t('Executor'),
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: t('Username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('Total right question'),
      dataIndex: 'totalRightQuestion',
      key: 'totalRightQuestion',
    },
    {
      title: t('Exam time'),
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: t('Total score'),
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('Date finished'),
      dataIndex: 'dateFinished',
      key: 'dateFinished',
    },
  ]

  const handleDetail = (idEntryTest, idAnswerSheet) => {
    history.push(`/entry-tests/${idEntryTest}/result/${idAnswerSheet}`)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    answerSheets && (
      <Fragment>
        <div className={classes.headerBack}>
          <div>
            <BiArrowBack onClick={() => history.goBack()} />
          </div>
          <div>
            {t('Manage participant history')} <span style={{ fontWeight: 500 }}>{title}</span>
          </div>
        </div>

        {answerSheets.length === 0 ? (
          <NotFoundData title={t('There are no candidates for this entry test yet')} />
        ) : (
          <TableData
            titleList={`${t('List of candidates participating in the test')} ${title}`}
            columns={columns}
            isDetail
            titleDetail={t('View detailed results of candidates')}
            dataSource={answerSheets.map((answerSheet, index) => {
              const { _id, jobSeeker, duration, totalRightQuestion, achievedFullScore, createdAt } =
                answerSheet
              const { totalQuestion, totalScore, requiredPass } = answerSheet.entryTest

              return {
                key: _id,
                ...jobSeeker,
                duration: convertTime(duration, t),
                index: index + 1,
                title: jobSeeker.fullname,
                idAnswerSheet: _id,
                idEntryTest: answerSheet.entryTest._id,
                totalRightQuestion: `${totalRightQuestion}/${totalQuestion}`,
                totalScore: `${achievedFullScore}/${totalScore}`,
                status: achievedFullScore < requiredPass ? t('Not achieved') : t('Achieved'),
                dateFinished: moment(createdAt || '').format(dateFormatHourMinute),
              }
            })}
            onDetail={handleDetail}
            isUseAction
          />
        )}
      </Fragment>
    )
  )
}

export default EntryTestAnswerSheetPage
