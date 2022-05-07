import classes from './style.module.scss'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'

export const StepsPay = ({ stepArray, currentStep, onChangeStep }) => {
  const { t } = useTranslation()
  const { Step } = Steps
  const [width] = useWindowSize()

  return (
    <div className={classes.stepsPay}>
      <Steps
        direction={width < 768 ? 'vertical' : 'horizontal'}
        current={currentStep}
        onChange={onChangeStep}
      >
        {stepArray.map((step, index) => (
          <Step key={index} title={t(step.title)} description={step.description} />
        ))}
      </Steps>
    </div>
  )
}
