import { Controller } from "react-hook-form";
import { Fragment } from "react";
import { Rate } from "antd";
import { AiOutlineFrown, AiOutlineMeh, AiOutlineSmile } from "react-icons/ai";
import ErrorText from "components/ErrorText";
import { useTranslation } from "react-i18next";

const RatingField = ({
  name,
  control,
  allowClear = false,
  defaultValue,
  disabled = false,
  count = 5,
  isOT = false,
  setReviewOT,
  fontSize,
  errors,
}) => {
  const { t } = useTranslation();

  const otRate = [
    "Totally unsatisfied",
    "Unsatisfied",
    "Normal",
    "Satisfied",
    "Totally satisfied",
  ];

  const customIcons = {
    1: <AiOutlineFrown />,
    2: <AiOutlineFrown />,
    3: <AiOutlineMeh />,
    4: <AiOutlineSmile />,
    5: <AiOutlineSmile />,
  };

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return isOT ? (
            <Fragment>
              <Rate
                count={count}
                tooltips={otRate.map((item) => t(item))}
                style={{ fontSize: fontSize }}
                character={({ index }) => customIcons[index + 1]}
                allowClear={allowClear}
                disabled={disabled}
                value={value}
                defaultValue={value}
                onChange={(value) => {
                  onChange(value);
                  if (setReviewOT) {
                    setReviewOT(otRate[value - 1]);
                  }
                }}
              />

              <span
                style={{
                  marginLeft: "10px",
                  color: `${
                    value < 3 ? "red" : value === 3 ? "orange" : "green"
                  }`,
                }}
              >
                {value > 0 ? t(`${otRate[value - 1]}`) : ""}
              </span>
            </Fragment>
          ) : (
            <Rate
              count={count}
              style={{ fontSize: fontSize }}
              allowClear={allowClear}
              disabled={disabled}
              value={value}
              defaultValue={value}
              onChange={onChange}
            />
          );
        }}
      />
      {errors && <ErrorText errors={errors} />}
    </Fragment>
  );
};

export default RatingField;
