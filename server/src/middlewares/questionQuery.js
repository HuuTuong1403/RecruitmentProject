exports.customQuestionQuery = (req, res, next) => {
  const subObjectPatten = /\b(%)\b/g;
  if (req.query.questionContent) {
    req.query.questionContent = {
      $regex: req.query.questionContent,
      $options: 'si',
    };
  } else {
    req.query.questionContent = undefined;
  }
  if (req.query.skills) {
    let skills = req.query.skills;
    skills = skills.split(',');
    req.query.skills = { $in: skills };
  } else {
    req.query.skills = undefined;
  }
  const qurStr = JSON.stringify(req.query);
  if (subObjectPatten.test(qurStr)) {
    const subObject = qurStr.replace(/\b(%)\b/g, (match) => '.');
    req.query = JSON.parse(subObject);
  }
  next();
};
