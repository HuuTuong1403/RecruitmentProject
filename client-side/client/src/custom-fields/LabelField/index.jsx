import classes from './style.module.scss'

export const LabelField = ({ label, isCompulsory = false }) => {
  return (
    <label className={classes.labelTitle}>
      {label} {isCompulsory && <span>*</span>}
    </label>
  )
}
