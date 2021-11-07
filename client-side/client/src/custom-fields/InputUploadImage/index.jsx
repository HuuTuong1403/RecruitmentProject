import classes from "./style.module.scss";
import ErrorText from "components/ErrorText";
import ImageContainer from "components/ImageContainer";

const InputUploadImage = ({
  error,
  setError,
  images,
  setImages,
  placeholder,
  isMultiple,
  fileName,
  setFileName,
}) => {

  const checkValidImage = (file) => {
    const validCvImage = ["image/jpg", "image/jpeg", "image/png", "image/svg"];

    if (!validCvImage.includes(file.type)) {
      setError("Only .jpg .jpeg .png .svg format is supported");
      return false;
    }

    if (file.size >= 5000000) {
      setError("File limit 5MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (checkValidImage(image)) {
        setFileName(image.name);
        const src = URL.createObjectURL(image);
        const id = src.slice(src.lastIndexOf("/") + 1).trim();
        setImages([{ image, id, src }]);
      } else {
        setImages([]);
        setFileName("");
      }
    } else {
      setImages([]);
      setError("Please select cover photo");
      setFileName("");
    }
  };

  const handleChangeMultipleFile = (e) => {
    if (e.target.files) {
      let newImage = images;
      let fileNameList;
      if (fileName) {
        fileNameList = fileName.split(", ");
      } else {
        fileNameList = [];
      }
      for (let i = 0; i < e.target.files.length; i++) {
        let image = e.target.files[i];
        if (checkValidImage(image)) {
          fileNameList.push(image.name);
          let src = URL.createObjectURL(image);
          let id = src.slice(src.lastIndexOf("/") + 1).trim();
          newImage.push({ image, id, src });
        }
      }
      setFileName(fileNameList.join(", "));
      setImages(newImage);
    }
  };

  const handleDeleteImage = (id, index) => {
    if (isMultiple) {
      const fileNameList = fileName.split(", ");
      const newFileName = fileNameList.filter((item, i) => i !== index);
      setFileName(newFileName.join(", "));
      setImages((prevState) => prevState.filter((item) => item.id !== id));
    } else {
      setFileName("");
      setImages([]);
    }
  };

  return (
    <div className={classes.inputImage}>
      <input
        className={classes.inputImage__fakeFile}
        placeholder={placeholder}
        defaultValue={fileName}
        disabled
      />
      <input
        type="file"
        multiple={isMultiple}
        onChange={isMultiple ? handleChangeMultipleFile : handleChangeFile}
        className={classes.inputImage__file}
      />
      <div className={classes.inputImage__list}>
        {images.map((img, index) => (
          <ImageContainer
            key={img.id}
            src={img.src}
            id={img.id}
            index={index}
            onDelete={handleDeleteImage}
            alt={img.src}
          />
        ))}
      </div>
      <ErrorText errors={error} />
    </div>
  );
};

export default InputUploadImage;
