import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import ReactTypingEffect from 'react-typing-effect'

const LoadingSuspense = ({ height, showText = false }) => {
  const { t } = useTranslation()

  return (
    <div style={{ height: `${height}` }} className={classes['loading']}>
      <div className={classes['loading__wrapped']}>
        <div className={classes['loading__wrapped--lds-roller']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {showText && (
          <div className={classes['loading__wrapped--text']}>
            <ReactTypingEffect
              text={[`${t('loading-suspense')}`, `${t('wait-moment')}`]}
              cursorRenderer={(cursor) => <div>{cursor}</div>}
              eraseDelay={1000}
              eraseSpeed={5}
              typingDelay={500}
              speed={100}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingSuspense
