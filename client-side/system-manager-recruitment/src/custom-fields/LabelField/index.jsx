import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaQuestionCircle } from 'react-icons/fa'
import classes from './style.module.scss'

export const LabelField = ({ label, isCompulsory, labelTooltip }) => {
  const { t } = useTranslation()
  return isCompulsory ? (
    <Tooltip title={t('Compulsory')}>
      <label className={classes.labelTitle}>
        {label} <span className={classes.labelTitle}__compulsory>*</span>
      </label>
    </Tooltip>
  ) : (
    <label className={classes.labelTitle}>
      {label}
      {labelTooltip && (
        <span className={classes.labelTitle__tooltip}>
          <Tooltip placement="topRight" title={labelTooltip}>
            <FaQuestionCircle />
          </Tooltip>
        </span>
      )}
    </label>
  )
}
