import { Fragment, useState } from 'react'
import { Popover } from 'antd'
import { ButtonField } from 'custom-fields'
import classes from './style.module.scss'

export const PopoverField = ({
  children,
  title,
  subTitle,
  titleCancel,
  titleOk,
  onClickOk,
  loading,
  isSwap = false,
}) => {
  const [showPopover, setShowPopover] = useState(false)
  const content = (
    <Fragment>
      <div>{subTitle}</div>
      <div className={classes.popoverField}>
        <ButtonField
          backgroundcolor={isSwap ? '#dd4b39' : '#067951'}
          backgroundcolorhover={isSwap ? '#ff7875' : '#2baa7e'}
          padding="2px"
          onClick={() => setShowPopover((prevState) => !prevState)}
        >
          {titleCancel}
        </ButtonField>
        <ButtonField
          backgroundcolor={isSwap ? '#067951' : '#dd4b39'}
          backgroundcolorhover={isSwap ? '#2baa7e' : '#ff7875'}
          padding="2px"
          loading={loading}
          onClick={onClickOk}
        >
          {titleOk}
        </ButtonField>
      </div>
    </Fragment>
  )
  return (
    <Popover
      content={content}
      trigger="click"
      title={title}
      visible={showPopover}
      onVisibleChange={() => setShowPopover((prevState) => !prevState)}
    >
      {children}
    </Popover>
  )
}
