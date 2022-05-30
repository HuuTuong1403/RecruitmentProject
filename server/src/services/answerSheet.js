exports.markAnswer = (answerContents, questions) => {
  let totalRightQuestion = 0;
  let achievedFullScore = 0;
  answerContents = answerContents.map((answerContent) => {
    answerContentTemp = answerContent;
    question = questions.find((currentValue) => {
      if (answerContent.idQuestion.toString() == currentValue._id.toString()) {
        return currentValue;
      }
    });
    let rightAnswerCount = 0;
    answerContent.selectedChoice.forEach((choice) => {
      question.answers.forEach((answer) => {
        console.log(answer.answer.isCorrect);
        console.log(choice);
        if (answer.answer.isCorrect == choice) {
          rightAnswerCount += 1;
        }
      });
    });
    const rightAnswerTotal = 0;
    question.answers.reduce((rightAnswerTotal, answer) =>
      answer.isCorrect ? rightAnswerTotal + 1 : rightAnswerTotal
    );
    if (rightAnswerCount == 0 || rightAnswerCount > rightAnswerTotal) {
      answerContentTemp.isCorrect = 0;
    } else if (rightAnswerCount == rightAnswerTotal) {
      answerContentTemp.isCorrect = 2;
      answerContentTemp.achievedScore = question.score;
      totalRightQuestion += 1;
      achievedFullScore += question.score;
    } else {
      if (question.isFullScore == 0) {
        answerContentTemp.isCorrect = 1;
        answerContentTemp.achievedScore =
          question.score * (rightAnswerCount / rightAnswerTotal);
      } else {
        answerContentTemp.isCorrect = 2;
        answerContentTemp.achievedScore = question.score;
        totalRightQuestion += 1;
        achievedFullScore += question.score;
      }
      return answerContentTemp;
    }
  });
  return {
    totalRightQuestion,
    achievedFullScore,
    answerContents,
  };
};
