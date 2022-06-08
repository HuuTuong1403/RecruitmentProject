exports.markAnswer = async (answerContents, questions) => {
  let totalRightQuestion = 0;
  let achievedFullScore = 0;
  answerContents = answerContents.map((answerContent) => {
    let answerContentTemp = answerContent;
    question = questions.find((currentValue) => {
      if (answerContent.idQuestion.toString() == currentValue._id.toString()) {
        return currentValue;
      }
    });
    let rightAnswerCount = 0;
    answerContent.selectedChoice.forEach((choice) => {
      question.answers.forEach((answer) => {
        if (answer.answer.isCorrect && answer.choice == choice) {
          rightAnswerCount += 1;
        }
      });
    });
    let rightAnswerTotal = question.answers.filter(
      (answer) => answer.answer.isCorrect
    ).length;
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
    }
    return answerContentTemp;
  });
  return {
    totalRightQuestion,
    achievedFullScore,
    answerContents,
  };
};
