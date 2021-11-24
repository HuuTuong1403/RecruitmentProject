import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const LabelField = (props) => {
  const { t } = useTranslation()
  const { label, isCompulsory } = props

  return (
    <label className={classes.labelTitle}>
      {label} {isCompulsory && <span>* {t('Compulsory')}</span>}
    </label>
  )
}

export default LabelField
