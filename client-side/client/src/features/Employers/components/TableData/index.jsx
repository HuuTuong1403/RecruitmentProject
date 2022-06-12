import { Table, Tooltip } from 'antd'
import { PopoverField } from 'custom-fields'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEdit, FaEye, FaTrash, FaTrashRestore } from 'react-icons/fa'
import classes from './style.module.scss'

export const TableData = ({
  columns,
  dataSource,
  isTrash = false,
  isUseAction = false,
  titleList = '',
  onMoveTrash,
  onEdit,
  onRestore,
  onDelete,
  titlePopover,
  isDetail,
  onDetail,
  titleDetail,
}) => {
  const { t } = useTranslation()

  const ActionData = ({ id, title, idEntryTest, idAnswerSheet }) => {
    return (
      <div>
        {isTrash ? (
          <Fragment>
            <PopoverField
              title={titlePopover.restore ? t(titlePopover.restore.title) : ''}
              subTitle={titlePopover.restore ? t(titlePopover.restore.subTitle) + '?' : ''}
              titleCancel={t('Cancel')}
              titleOk={t('Restore')}
              onClickOk={() => onRestore(id)}
              isSwap
            >
              <FaTrashRestore className={`${classes.icon} ${classes.icon__restore}`} />
            </PopoverField>

            <PopoverField
              title={titlePopover.delete ? t(titlePopover.delete.title) : ''}
              subTitle={titlePopover.delete ? t(titlePopover.delete.subTitle) + '?' : ''}
              titleCancel={t('Cancel')}
              titleOk={t('Delete')}
              onClickOk={() => onDelete(id)}
            >
              <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
            </PopoverField>
          </Fragment>
        ) : (
          <Fragment>
            {onEdit && (
              <Tooltip title={t('Edit')}>
                <FaEdit
                  className={`${classes.icon} ${classes.icon__edit}`}
                  onClick={() => onEdit(id)}
                />
              </Tooltip>
            )}

            {onMoveTrash && (
              <PopoverField
                title={titlePopover.moveTrash ? t(titlePopover.moveTrash.title) : ''}
                subTitle={titlePopover.moveTrash ? t(titlePopover.moveTrash.subTitle) + '?' : ''}
                titleCancel={t('Cancel')}
                titleOk={t('Move trash')}
                onClickOk={() => onMoveTrash(id)}
              >
                <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
              </PopoverField>
            )}

            {isDetail && (
              <Tooltip title={titleDetail + ' ' + title}>
                <FaEye
                  className={`${classes.icon} ${classes.icon__edit}`}
                  onClick={() => {
                    if (idEntryTest && idAnswerSheet) {
                      onDetail(idEntryTest, idAnswerSheet)
                    } else {
                      onDetail(id, title)
                    }
                  }}
                />
              </Tooltip>
            )}
          </Fragment>
        )}
      </div>
    )
  }

  const newColumns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <ActionData
          id={record.key}
          title={record.title}
          idEntryTest={record.idEntryTest}
          idAnswerSheet={record.idAnswerSheet}
        />
      ),
    },
    ...columns,
  ]

  return (
    <Fragment>
      <div className={classes.titleTable}>{titleList}</div>
      <Table
        bordered
        scroll={{ x: 'max-content' }}
        columns={isUseAction ? newColumns : columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        showSorterTooltip={false}
        style={{ cursor: 'pointer' }}
      />
    </Fragment>
  )
}
