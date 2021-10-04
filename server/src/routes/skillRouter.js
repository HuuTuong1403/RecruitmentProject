const fs = require('fs');
const express = require('express');
const skillRouter = express.Router();

const skills = JSON.parse(
  fs.readFileSync(`${__dirname}/../public/data/Skills.json`, 'utf-8')
);

skillRouter.route('/').get((req, res, next) => {
  res.status(200).json({
    status: 'success',
    length: skills.length,
    data: skills,
  });
});

module.exports = skillRouter;
