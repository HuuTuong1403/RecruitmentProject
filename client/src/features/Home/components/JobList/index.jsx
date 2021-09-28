import classes from "./style.module.scss";
import JobItem from "../JobItem";
import Slider from "react-slick";

const JobList = (props) => {
  return (
    <div className={classes.joblist}>
      <div className={classes.joblist__container}>
        <div className={classes["joblist__container--title"]}>
          <div>Tin tuyển dụng, việc làm tốt nhất</div>
          <a className={classes["joblist__container--title--all"]} href="/">
            Xem tất cả
          </a>
        </div>
        <Slider style={{ width: "85%" }} {...settings}>
          {props.lists.map((job) => {
            return <JobItem key={job.id} job={job} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  pauseOnHover: true,
  rows: 3,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default JobList;
