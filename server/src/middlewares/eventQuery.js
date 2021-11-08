exports.customEventQuery = (req, res, next) => {
  const subObjectPatten = /\b(%)\b/g;
  if (req.query.eventName) {
    req.query.eventName = { $regex: req.query.eventName, $options: 'si' };
  }
  if (req.query.eventOrganizer) {
    req.query.eventOrganizer = {
      $regex: req.query.eventOrganizer,
      $options: 'si',
    };
  }
  if (req.query.topic) {
    req.query.topic = {
      $regex: req.query.topic,
      $options: 'si',
    };
  }
  if (req.query.createdAt) {
    let date = new Date();
    date.setDate(date.getDate() - req.query.createdAt);
    req.query.createdAt = { gte: date };
  }
  if (req.query['address%city']) {
    req.query['address%city'] = {
      $regex: req.query['address%city'],
      $options: 'si',
    };
  }
  //req.query.fields = `logo,jobTitle,companyName,salary,location,skills,createdAt,finishDate,slug`;
  const qurStr = JSON.stringify(req.query);
  if (subObjectPatten.test(qurStr)) {
    const subObject = qurStr.replace(/\b(%)\b/g, (match) => '.');
    req.query = JSON.parse(subObject);
  }
  //console.log(req.query);
  next();
};
