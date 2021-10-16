module.exports = (obj, ...allowedFields) => {
  var newObj = {};
  allowedFields.forEach((el) => {
    newObj[el] = obj[el];
  });
  return newObj;
};
