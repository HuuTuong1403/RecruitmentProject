import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { AiOutlineSwap } from 'react-icons/ai'
import { Collapse, Checkbox, Tooltip, Switch } from 'antd'
import { scaleOptions, companyTypeOptions } from 'common/constants/options'
import {
  FaMedkit,
  FaPlaneDeparture,
  FaDollarSign,
  FaUserMd,
  FaGraduationCap,
  FaChartLine,
  FaLaptop,
  FaRegMoneyBillAlt,
  FaTaxi,
  FaBlackTie,
  FaHeartbeat,
} from 'react-icons/fa'
import { getDetailEmployerAsync } from 'features/Employers/slices/thunks'
import { IoLibrary } from 'react-icons/io5'
import { MdGroup } from 'react-icons/md'
import { schemaUpdateProfileEmployer } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { selectEmployerDetail, selectedStatus } from 'features/Employers/slices/selectors'
import { updateProfileEmployer } from 'features/Employers/api/employer.api'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import AvatarUpload from 'components/AvatarUpload'
import ButtonField from 'custom-fields/ButtonField'
import CKEditorField from 'custom-fields/CKEditorField'
import classes from './style.module.scss'
import InputBorderField from 'custom-fields/InputBorderField'
import LabelField from 'custom-fields/LabelField'
import LoadingSuspense from 'components/Loading'
import notification from 'components/Notification'
import parse from 'html-react-parser'
import SelectField from 'custom-fields/SelectField'
import SelectLocationField from 'custom-fields/SelectLocationField'

const EmployerProfilePage = () => {
  ScrollToTop()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const employerDetail = useSelector(selectEmployerDetail)
  const { Panel } = Collapse
  const [welfareUpdate, setWelfareUpdate] = useState([])
  const [showText, setShowText] = useState(false)
  const [text, setText] = useState('')
  const [OT, setOT] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logo, setLogo] = useState(null)
  const status = useSelector(selectedStatus)

  useTitle(`${t('Account Management')}`)

  useEffect(() => {
    if (!employerDetail) {
      dispatch(getDetailEmployerAsync())
    }
  }, [dispatch, employerDetail])

  useEffect(() => {
    if (employerDetail) {
      setWelfareUpdate(employerDetail.welfare ?? [])
      setOT(employerDetail.ot ?? false)
      setText(parse(employerDetail.description ?? ''))
    }
  }, [employerDetail])

  const optionsScale = scaleOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const optionsCompanyType = companyTypeOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const provinces = useSelector(selectedProvinces)?.map((province) => ({
    label: province.name,
    value: province.code,
  }))
  provinces.unshift({ label: `${t('choose-province')}`, value: '' })

  const districts = useSelector(selectedDistricts)?.map((district) => ({
    label: district.name,
    value: district.code,
  }))
  districts.unshift({ label: `${t('choose-district')}`, value: '' })

  const wards = useSelector(selectedWards)?.map((ward) => ({
    label: ward.name,
    value: ward.code,
  }))
  wards.unshift({ label: `${t('choose-ward')}`, value: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaUpdateProfileEmployer),
  })

  const submitUpdateProfileEmployer = async (dataUpdateProfile) => {
    setLoading(true)

    const {
      city,
      district,
      ward,
      street,
      description,
      companyName,
      companyWebsite,
      scale,
      phone,
      TIN,
      companyType,
    } = dataUpdateProfile

    if (
      !logo &&
      city === employerDetail?.address?.city &&
      district === employerDetail?.address?.district &&
      ward === employerDetail?.address?.ward &&
      street === employerDetail?.address?.street &&
      companyName === employerDetail?.companyName &&
      companyWebsite === employerDetail?.companyWebsite &&
      scale === employerDetail?.scale &&
      phone === employerDetail?.phone &&
      TIN === employerDetail?.TIN &&
      OT === employerDetail?.ot &&
      companyType === employerDetail?.companyType &&
      description === employerDetail?.description &&
      welfareUpdate === employerDetail?.welfare
    ) {
      setLoading(false)
      notification(`${t('Updated data unchanged')}`, 'error')
    } else {
      const payload = new FormData()
      payload.append('address[city]', city)
      payload.append('address[district]', district)
      payload.append('address[ward]', ward)
      payload.append('address[street]', street)
      welfareUpdate.forEach((item) => payload.append('welfare', item))
      payload.append('description', description)
      payload.append('companyName', companyName)
      payload.append('companyWebsite', companyWebsite)
      payload.append('scale', scale)
      payload.append('companyType', companyType)
      payload.append('phone', phone)
      payload.append('ot', OT)
      payload.append('TIN', TIN)
      payload.append('photo-logo', logo)

      const result = await updateProfileEmployer(payload)
      if (result.status === 'success') {
        setLoading(false)
        notification(`${t('Update information successful')}`, 'success')
        dispatch(getDetailEmployerAsync())
      } else {
        setLoading(false)
        notification(result.message, 'error')
      }
    }
  }

  const changeAvatar = (file) => {
    setLogo(file)
  }

  const handleCancelUpdate = () => {
    setOT(employerDetail.ot)
    setWelfareUpdate(employerDetail.welfare)
    reset({
      companyName: employerDetail.companyName,
      city: employerDetail.address.city,
      district: employerDetail.address.district,
      ward: employerDetail.address.ward,
      street: employerDetail.address.street,
      companyWebsite: employerDetail.companyWebsite,
      scale: employerDetail.scale,
      phone: employerDetail.phone,
      TIN: employerDetail.TIN,
      companyType: employerDetail.companyType,
      description: employerDetail.description,
    })
  }

  const welfareList = [
    {
      title: `${t('Insurance')}`,
      value: 'Chế độ bảo hiểm',
      icon: <FaMedkit className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Travel opportunities')}`,
      value: 'Cơ hội du lịch',
      icon: <FaPlaneDeparture className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Paid leave')}`,
      value: 'Nghỉ phép có lương',
      icon: <FaDollarSign className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Health care')}`,
      value: 'Chăm sóc sức khỏe',
      icon: <FaUserMd className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Training Scheme')}`,
      value: 'Đào tạo',
      icon: <FaGraduationCap className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Salary review')}`,
      value: 'Tăng lương',
      icon: <FaChartLine className={classes.employerProfile__icon} />,
    },
    {
      title: 'Laptop',
      value: 'Laptop',
      icon: <FaLaptop className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Allowances')}`,
      value: 'Phụ cấp',
      icon: <FaRegMoneyBillAlt className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Employee Shuttle')}`,
      value: 'Xe đưa đón',
      icon: <FaTaxi className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Library')}`,
      value: 'Thư viện',
      icon: <IoLibrary className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Uniform')}`,
      value: 'Đồng phục',
      icon: <FaBlackTie className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Group activities')}`,
      value: 'Hoạt động nhóm',
      icon: <MdGroup className={classes.employerProfile__icon} />,
    },
    {
      title: `${t('Sport club')}`,
      value: 'CLB thể thao',
      icon: <FaHeartbeat className={classes.employerProfile__icon} />,
    },
  ]

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.employerProfile}>
      {employerDetail && (
        <form
          onSubmit={handleSubmit(submitUpdateProfileEmployer)}
          className={classes.employerProfile__wrapped}
        >
          <div className={classes.titleDashboard}>
            {t('Account Management')} <span>(*: {t('Compulsory')})</span>
          </div>
          <div className={classes.top}>
            <div className={classes.top__left}>
              <AvatarUpload
                src={employerDetail.logo}
                shape="square"
                size={220}
                changeAvatar={changeAvatar}
              />
            </div>
            <div className={classes.top__right}>
              <div>
                {/* Company name */}
                <InputBorderField
                  fontSize="26px"
                  bold="700"
                  placeholder={t('phd-companyName')}
                  defaultValue={employerDetail.companyName}
                  {...register('companyName')}
                  errors={errors?.companyName?.message}
                />
              </div>

              {/* Email */}
              <div className={classes.top__group}>
                <LabelField label="Email:" />
                <div className={classes['top__group--text']}>{employerDetail.email}</div>
              </div>

              {/* Username */}
              <div className={classes.top__group}>
                <LabelField label={`${t('Username')}:`} />
                <div className={classes['top__group--text']}>{employerDetail.username}</div>
              </div>

              {/* Website */}
              <div className={classes.top__group}>
                <LabelField label={`${t('Website')}:`} />
                <InputBorderField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t('phd-companyWebsite')}
                  defaultValue={employerDetail.companyWebsite}
                  {...register('companyWebsite')}
                  errors={errors?.companyWebsite?.message}
                />
              </div>

              {/* Phone */}
              <div className={classes.top__group}>
                <LabelField label={`${t('phone number')}:`} />
                <InputBorderField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t('phd-phone-signup')}
                  defaultValue={employerDetail.phone}
                  {...register('phone')}
                  errors={errors?.phone?.message}
                />
              </div>

              {/* Tax code */}
              <div className={classes.top__group}>
                <LabelField label={`${t('Tax code')}:`} />
                <InputBorderField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t('phd-taxCode')}
                  defaultValue={employerDetail.TIN}
                  {...register('TIN')}
                  errors={errors?.TIN?.message}
                />
              </div>

              {/* Street */}
              <div className={classes.top__group}>
                <LabelField label={`${t('Address')}:`} />
                <InputBorderField
                  fontSize="15px"
                  bold="normal"
                  placeholder={t('phd-address')}
                  defaultValue={employerDetail.address.street}
                  {...register('street')}
                  errors={errors?.street?.message}
                />
              </div>

              {/* OT */}
              <div className={classes.top__group}>
                <LabelField label={`${t('Work overtime')}:`} />
                <Switch
                  checkedChildren={t('Do allow')}
                  unCheckedChildren={t('Do not allow')}
                  onChange={() => setOT((prevState) => !prevState)}
                  defaultChecked={employerDetail.ot}
                  checked={OT}
                />
              </div>
            </div>
          </div>
          <div className={classes.bottom}>
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
              <Panel header={t('Information about company')} className={classes.panel} key="1">
                <div className={classes.bottom__wrapped}>
                  {/* Description */}
                  <div className={classes['bottom__wrapped--description']}>
                    <LabelField label={t('Company description')} isCompulsory />
                    <Tooltip title={showText ? `${t('Edit text')}` : `${t('View in text form')}`}>
                      <AiOutlineSwap
                        className={classes['bottom__wrapped--swapIcon']}
                        onClick={() => setShowText((prevState) => !prevState)}
                      />
                    </Tooltip>
                    {showText ? (
                      <div style={{ padding: '10px 0' }}>{text}</div>
                    ) : (
                      <CKEditorField
                        setText={setText}
                        name="description"
                        control={control}
                        defaultValue={employerDetail.description}
                        errors={errors?.description?.message}
                      />
                    )}
                  </div>

                  <div className={classes['bottom__wrapped--scale-type']}>
                    {/* Company Size */}
                    <div>
                      <LabelField label={t('Company size')} isCompulsory />
                      <SelectField
                        name="scale"
                        control={control}
                        defaultValue={employerDetail.scale ?? `${t('phd-select-scale')}`}
                        optionList={optionsScale}
                        placeholder={t('phd-select-scale')}
                        errors={errors?.scale?.message}
                      />
                    </div>

                    {/* Company type */}
                    <div>
                      <LabelField label={t('Company type')} isCompulsory />
                      <SelectField
                        name="companyType"
                        control={control}
                        defaultValue={employerDetail.companyType ?? `${t('phd-companyType')}`}
                        optionList={optionsCompanyType}
                        placeholder={t('phd-companyType')}
                        errors={errors?.companyType?.message}
                      />
                    </div>
                  </div>
                </div>
              </Panel>
              {employerDetail.address && (
                <Panel header={t('Address information')} className={classes.panel} key="2">
                  <div className={classes['bottom__wrapped--scale-type']}>
                    {/* Province */}
                    <div>
                      <LabelField label={t('Province')} isCompulsory />
                      <SelectLocationField
                        setValue={setValue}
                        name="city"
                        control={control}
                        defaultValue={employerDetail.address.city}
                        locationList={provinces}
                        placeholder={t('choose-province')}
                        errors={errors?.city?.message}
                      />
                    </div>

                    {/* District */}
                    <div>
                      <LabelField label={t('District')} isCompulsory />
                      <SelectLocationField
                        setValue={setValue}
                        name="district"
                        control={control}
                        defaultValue={employerDetail.address.district}
                        locationList={districts}
                        placeholder={t('choose-district')}
                        errors={errors?.district?.message}
                      />
                    </div>

                    {/* Ward */}
                    <div>
                      <LabelField label={t('Ward')} isCompulsory />
                      <SelectLocationField
                        name="ward"
                        control={control}
                        defaultValue={employerDetail.address.ward}
                        locationList={wards}
                        placeholder={t('choose-ward')}
                        errors={errors?.ward?.message}
                      />
                    </div>
                  </div>
                </Panel>
              )}
              <Panel header={t('Information about welfare')} className={classes.panel} key="3">
                {/* Welfare */}
                <div>
                  <Checkbox.Group
                    value={welfareUpdate}
                    defaultValue={employerDetail.welfare}
                    onChange={(checkedValues) => setWelfareUpdate(checkedValues)}
                  >
                    <div className={classes['bottom__wrapped--welfare']}>
                      {welfareList.map((welfare, index) => {
                        return (
                          <div key={index}>
                            <Checkbox value={welfare.value}>
                              {welfare.icon}
                              {welfare.title}
                            </Checkbox>
                          </div>
                        )
                      })}
                    </div>
                  </Checkbox.Group>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className={classes.employerProfile__actions}>
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              onClick={handleCancelUpdate}
              type="button"
              uppercase
            >
              {t('Cancel')}
            </ButtonField>
            <ButtonField
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              loading={loading}
              type="submit"
              uppercase
            >
              {t('Update Information')}
            </ButtonField>
          </div>
        </form>
      )}
    </div>
  )
}

export default EmployerProfilePage
