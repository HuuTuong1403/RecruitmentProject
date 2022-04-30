import classes from './style.module.scss'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'

export const StepsPay = ({ stepArray, currentStep, onChangeStep }) => {
  const { t } = useTranslation()
  const { Step } = Steps

  return (
    <div className={classes.stepsPay}>
      <Steps current={currentStep} onChange={onChangeStep}>
        {stepArray.map((step, index) => (
          <Step key={index} title={t(step.title)} description={step.description} />
        ))}
      </Steps>
    </div>
  )
}
