import { ButtonField } from 'custom-fields'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const ModalNotify = ({
  showModal,
  onClose,
  onOk,
  title,
  children,
  captionBtnClose = 'Cancel',
  captionBtnOk = 'Accept',
  loading = false,
}) => {
  const { t } = useTranslation()

  return (
    <Modal visible={showModal} onCancel={onClose} title={title} footer={null}>
      {children}
      <div className={classes.modalNotify__actions}>
        <ButtonField
          backgroundcolor="#dd4b39"
          backgroundcolorhover="#bf0000"
          padding="5px"
          radius="10px"
          onClick={onClose}
        >
          {t(captionBtnClose)}
        </ButtonField>

        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#0a436ead"
          padding="5px"
          radius="10px"
          onClick={onOk}
          loading={loading}
        >
          {t(captionBtnOk)}
        </ButtonField>
      </div>
    </Modal>
  )
}
