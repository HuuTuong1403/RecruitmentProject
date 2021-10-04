import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedJobDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import { fetchJobDetailAsync } from "features/Jobs/slices/thunks";
import { Fragment, useEffect } from "react";
import LoadingSuspense from "components/Loading";
import classes from "./style.module.scss";
import { FaBuilding } from "react-icons/fa";
import { MdLocationOn, MdOpenInBrowser } from "react-icons/md";
import moment from "moment";
import { IoMdCalendar } from "react-icons/io";
import ButtonField from "custom-fields/ButtonField";

const JobDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobDetailAsync(slug));
  }, [dispatch, slug]);

  const jobDetail = useSelector(selectedJobDetail);
  const loading = useSelector(selectedStatus);
  const {
    workingTime,
    companyName,
    companyType,
    companyWebsite,
    logo,
    ot,
    scale,
    location,
    benifits,
    description,
    jobTitle,
    position,
    reason,
    requirements,
    responsibilities,
    salary,
    skills,
    level,
    finishDate,
  } = jobDetail;

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" showText={false} />
      ) : (
        <div className={classes.jobDetail}>
          <div className={classes.jobDetail__top}>
            <div className={classes["jobDetail__top--wrapped"]}>
              <div>
                <Link to="/home">
                  <img src={logo} alt={logo} />
                </Link>
              </div>
              <div>
                <div>
                  <div>{jobTitle}</div>
                  <div>
                    <Link to="/home">
                      <FaBuilding style={{ marginRight: "8px" }} />
                      {companyName}
                    </Link>
                  </div>
                  <a href={companyWebsite} target="_blank" rel="noreferrer">
                    <MdOpenInBrowser style={{ marginRight: "8px" }} />
                    {companyWebsite}
                  </a>
                  <div>
                    <MdLocationOn style={{ marginRight: "8px" }} />
                    {`Quận ${location?.district}, ${location?.city}`}
                  </div>
                  <div>
                    <IoMdCalendar
                      style={{ marginRight: "8px", fontSize: "18px" }}
                    />
                    {`Hạn nộp hồ sơ: ${moment(finishDate).format(
                      "DD/MM/yyyy"
                    )}`}
                  </div>
                </div>
                <div>
                  <ButtonField
                    backgroundcolor="#0a426e"
                    backgroundcolorhover="#324554"
                    color="#fff"
                    type="button"
                  >
                    Ứng tuyển ngay
                  </ButtonField>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.jobDetail__content}>
            <div className={classes["jobDetail__content--wrapped"]}>
              <div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  3 lý do tham gia cùng chúng tôi
                </div>
                <div
                  className={classes["jobDetail__content--wrapped--content"]}
                >
                  {reason
                    ?.split("\n")
                    .map((str, index) =>
                      str === "" ? "" : <p key={index}>{str}</p>
                    )}
                </div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  Mô tả công việc
                </div>
                <div
                  className={classes["jobDetail__content--wrapped--content"]}
                >
                  {description
                    ?.split("\n")
                    .map((str, index) =>
                      str === "" ? "" : <p key={index}>{str}</p>
                    )}
                </div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  Yêu cầu ứng viên
                </div>
                <div
                  className={classes["jobDetail__content--wrapped--content"]}
                >
                  {requirements
                    ?.split("\n")
                    .map((str, index) =>
                      str === "" ? "" : <p key={index}>{str}</p>
                    )}
                </div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  Lợi ích
                </div>
                <div
                  className={classes["jobDetail__content--wrapped--content"]}
                >
                  {benifits
                    ?.split("\n")
                    .map((str, index) =>
                      str === "" ? "" : <p key={index}>{str}</p>
                    )}
                </div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  Trách nhiệm
                </div>
                <div
                  className={classes["jobDetail__content--wrapped--content"]}
                >
                  {responsibilities
                    ?.split("\n")
                    .map((str, index) =>
                      str === "" ? "" : <p key={index}>{str}</p>
                    )}
                </div>
                <div className={classes["jobDetail__content--wrapped--title"]}>
                  Kỹ năng
                </div>
                <div className={classes["container"]}>
                  {skills?.map((skill, index) => (
                    <div
                      className={classes["container__card-skill"]}
                      key={index}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={classes["jobDetail__content--wrapped--table"]}>
                  <div
                    className={
                      classes["jobDetail__content--wrapped--table--top"]
                    }
                  >
                    THÔNG TIN TUYỂN DỤNG
                  </div>
                  <div
                    className={
                      classes["jobDetail__content--wrapped--table--bottom"]
                    }
                  >
                    <div>
                      Thời gian làm việc:{" "}
                      <span>{`${workingTime?.start} - ${workingTime?.finish}`}</span>
                    </div>
                    <div>
                      Vị trí tuyển dụng: <span>{position}</span>
                    </div>
                    <div>
                      Cấp độ: <span>{level}</span>
                    </div>
                    <div>
                      Mức lương:{" "}
                      <span>
                        {salary?.min
                          ? `${salary.min} - ${salary.max} ${salary.type}`
                          : `${salary?.type}`}
                      </span>
                    </div>
                    <div>
                      Số lượng: <span>{scale} người</span>
                    </div>
                    <div>
                      OT:{" "}
                      <span>{ot ? "Lương bổ sung cho OT" : "Không OT"}</span>
                    </div>
                    <div>
                      Loại công ty: <span>{companyType}</span>
                    </div>
                    <div>
                      Địa điểm làm việc: <span>{location?.city}</span>
                    </div>
                    <div>
                      <ButtonField
                        backgroundcolor="#0a426e"
                        backgroundcolorhover="#324554"
                        color="#fff"
                        type="button"
                        width="100%"
                      >
                        Ứng tuyển ngay
                      </ButtonField>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default JobDetail;
