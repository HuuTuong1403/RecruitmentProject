const fs = require('fs');

const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const replaceHTML = (application, pass_cv_annoucement) => {
  let output = pass_cv_annoucement.replace(
    /{{%fullName%}}/g,
    application.fullName
  );
  output = output.replace(/{{%jobTitile%}}/g, application.job.jobTitle);
  output = output.replace(
    /{{%companyName%}}/g,
    application.job.company.companyName
  );
  output = output.replace(
    /{{%companyWebsite%}}/g,
    application.job.company.companyWebsite
  );
  output = output.replace(/{{%logo%}}/g, application.job.company.logo);
  const today = new Date();
  const date = ` ngày ${today.getDate()} tháng ${today.getMonth()} năm ${today.getFullYear()}`;
  output = output.replace(/{{Date}}/g, date);
  return output;
};
const replaceHTMLParticipant = (participant, participantEmail) => {
  let output = participantEmail.replace(
    /{{%fullName%}}/g,
    participant.fullName
  );
  output = output.replace(/{{%phone%}}/g, participant.phone);
  output = output.replace(
    /{{%address%}}/g,
    `${participant.address.street}, ${participant.address.ward}, ${participant.address.district}, ${participant.address.city}`
  );
  output = output.replace(
    /{{%interestingField%}}/g,
    participant.interestingField
  );
  output = output.replace(/{{%logo%}}/g, participant.event.company.logo);
  output = output.replace(/{{%imgCover%}}/g, participant.event.imageCover);
  output = output.replace(/{{%eventName%}}/g, participant.event.eventName);
  output = output.replace(
    /{{%location%}}/g,
    `${participant.event.address.street}, ${participant.event.address.ward}, ${participant.event.address.district}, ${participant.event.address.city}`
  );
  return output;
};
const replaceHTMLEntryTest = (bodyEmail, entryTestAnnoucement) => {
  let output = entryTestAnnoucement.replace(
    /{{%companyName%}}/g,
    bodyEmail.companyName
  );
  output = output.replace(/{{%jobTitle%}}/g, bodyEmail.jobTitle);
  output = output.replace(/{{%logo%}}/g, bodyEmail.logo);
  output = output.replace(/{{%url%}}/g, bodyEmail.url);
  return output;
};
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = 'MST Recruiment <mst.recruitment94@gmail.com>';
    this.url = url;
    this.user = user;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // Send the actual email
  async send(html, subject) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendResetPassword() {
    var resetPasswordFiles = fs.readFileSync(
      `${__dirname}/../public/ResetPassword/ResetPassword.html`,
      'utf-8'
    );
    const content = resetPasswordFiles.replace(/{%resetURL%}/g, this.url);
    await this.send(
      content,
      '[MST-Company] Khôi phục mật khẩu của bạn (Hợp lệ trong vòng 10 phút)'
    );
  }
  async sendConfirmEmail() {
    var confirmEmailFiles = fs.readFileSync(
      `${__dirname}/../public/ConfirmEmail/ConfirmEmail.html`,
      'utf-8'
    );
    const content = confirmEmailFiles.replace(/{%authenURL%}/g, this.url);
    await this.send(
      content,
      '[MST-Company] Xác thực tài khoản (Hợp lệ trong vòng 10 phút)'
    );
  }
  async sendIssueAccountEmail(password) {
    var issueAcountEmailFiles = fs.readFileSync(
      `${__dirname}/../public/IssueAccount/IssueAccountEmail.html`,
      'utf-8'
    );
    //Send email to employer
    var content = issueAcountEmailFiles.replace(
      /{%username%}/g,
      this.user.username
    );
    content = content.replace(/{%password%}/g, password);
    await this.send(
      content,
      `[MST-Company] Yêu cầu cấp tài khoản cho công ty ${this.user.companyName} thành công`
    );
  }
  async sendPassedCVAnnouncementEmail() {
    const pass_cv_annoucement = fs.readFileSync(
      `${__dirname}/../public/AnnoucementEmail/Passed_CV_Annoucement.html`,
      'utf-8'
    );
    const content = replaceHTML(this.user.application, pass_cv_annoucement);
    await this.send(
      content,
      `[${this.user.application.job.company.companyName}] Thông báo trúng tuyển tại vị trí ${this.user.application.job.jobTitle} thành công`
    );
  }
  async sendParticipantEmail() {
    const participantEmail = fs.readFileSync(
      `${__dirname}/../public/EventEmail/participant_event.html`,
      'utf-8'
    );
    const content = replaceHTMLParticipant(
      this.user.participant,
      participantEmail
    );
    await this.send(
      content,
      `[${this.user.participant.event.company.companyName}] Thông báo đăng ký tham gia sự kiện ${this.user.participant.event.eventName} thành công`
    );
  }
  async sendEntryTestEmail() {
    const entryTestAnnoucement = fs.readFileSync(
      `${__dirname}/../public/AnnoucementEmail/EntryTestAnnouncement.html`,
      'utf-8'
    );
    const content = replaceHTMLEntryTest(
      this.user.bodyEmail,
      entryTestAnnoucement
    );
    await this.send(
      content,
      `[${this.user.bodyEmail.companyName}] Thông báo tham gia kiểm tra đánh giá năng lực cho vị trí  ${this.user.bodyEmail.jobTitle}`
    );
  }
};
