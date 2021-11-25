import {
  issueAccountManager,
  issueAccountAdministrator,
} from 'features/Administrator/api/admin.api'
import { schemaIssueAccountAdmin, schemaIssueAccountManager } from 'common/constants/schema'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import InputField from 'custom-fields/InputField'
import LabelField from 'custom-fields/LabelField'
import notification from 'components/Notification'

const IssueAccountForm = (props) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { isAdmin, title } = props
  useTitle(`${t('Issue Account')}`)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(isAdmin ? schemaIssueAccountAdmin : schemaIssueAccountManager),
  })

  const issueAccountManagerHandler = async (dataIssue) => {
    setLoading(true)
    const result = await issueAccountManager(dataIssue)
    if (result.status === 'success') {
      setLoading(false)
      notification(`${t('Successfully granting system management account')}`, 'success')
      reset()
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  const issueAccountAdminHandler = async (dataIssue) => {
    setLoading(true)
    const result = await issueAccountAdministrator(dataIssue)
    if (result.status === 'success') {
      setLoading(false)
      notification(`${t('Successfully granting system administrator account')}`, 'success')
      reset()
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  return (
    <div className={classes.issueAccount}>
      <div className={classes.issueAccount__wrapped}>
        <div className={classes['issueAccount__wrapped--title']}>{t(title)}</div>
        <form
          className={classes['issueAccount__wrapped--form']}
          onSubmit={handleSubmit(isAdmin ? issueAccountAdminHandler : issueAccountManagerHandler)}
        >
          <div>
            <div>
              <LabelField isCompulsory={true} label={t('username')} />
              <InputField
                placeholder={t('phd-username')}
                {...register('username')}
                errors={errors?.username?.message}
              />
            </div>
            {isAdmin && (
              <div>
                <LabelField isCompulsory={true} label={'Email'} />
                <InputField
                  placeholder={t('phd-email')}
                  {...register('email')}
                  errors={errors?.email?.message}
                />
              </div>
            )}
            <div>
              <LabelField isCompulsory={true} label={t('fullname')} />
              <InputField
                placeholder={t('phd-fullname')}
                {...register('fullname')}
                errors={errors?.fullname?.message}
              />
            </div>
            <div>
              <LabelField isCompulsory={true} label={t('password')} />
              <InputField
                type="password"
                placeholder={t('phd-password')}
                {...register('password')}
                errors={errors?.password?.message}
              />
            </div>
            <div>
              <LabelField isCompulsory={true} label={t('confirm password')} />
              <InputField
                type="password"
                placeholder={t('phd-confirm-pass')}
                {...register('passwordConfirm')}
                errors={errors?.passwordConfirm?.message}
              />
            </div>
            <div className={classes['issueAccount__wrapped--actions']}>
              <div>
                <ButtonField
                  backgroundcolor="#ff4d4f"
                  color="#fff"
                  backgroundcolorhover="#ff7875"
                  radius="5px"
                  width="100%"
                  uppercase="true"
                  onClick={() => reset()}
                >
                  {t('Cancel')}
                </ButtonField>
              </div>
              <div>
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  color="#fff"
                  radius="5px"
                  width="100%"
                  uppercase="true"
                  loading={loading}
                >
                  {t('Issue Account')}
                </ButtonField>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueAccountForm
