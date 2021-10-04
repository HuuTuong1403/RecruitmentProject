exports.customJobQuery = (req, res, next) => {
  const subObjectPatten = /\b(%)\b/g;
  if (req.query.jobTitle) {
    req.query.jobTitle = { $regex: req.query.jobTitle, $options: 'si' };
  }
  if (req.query.position) {
    req.query.position = { $regex: req.query.position, $options: 'si' };
  }
  if (req.query.companyName) {
    req.query.companyName = { $regex: req.query.companyName, $options: 'si' };
  }
  if (req.query.skills) {
    let skills = req.query.skills;
    skills = skills.split(',');
    req.query.skills = { $in: skills };
  }
  if (req.query.createdAt) {
    let date = new Date();
    date.setDate(date.getDate() - req.query.createdAt);
    req.query.createdAt = { gte: date };
  }
  if (req.query['location%city']) {
    req.query['location%city'] = {
      $regex: req.query['location%city'],
      $options: 'si',
    };
  }
  req.query.fields = `logo,jobTitle,companyName,salary,location,skills,createdAt,finishDate,slug`;
  const qurStr = JSON.stringify(req.query);
  if (subObjectPatten.test(qurStr)) {
    const subObject = qurStr.replace(/\b(%)\b/g, (match) => '.');
    req.query = JSON.parse(subObject);
  }
  //console.log(req.query);
  next();
};
