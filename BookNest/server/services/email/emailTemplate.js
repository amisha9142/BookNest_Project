const emailHeader = `
  <div style="background-color: #2c3e50; padding: 20px; text-align: center; color: #ffffff;">
    <h1 style="margin: 0;">BookNest</h1>
    <p style="margin: 10px 0 0 0;">Your ultimate  management solution</p>
  </div>`;

const emailFooter = `
  <div style="background-color: #ecf0f1; padding: 20px; text-align: center;">
    <p style="margin: 0;">&copy; 2024 BookNest Manager. All rights reserved.</p>
    <p style="margin: 5px 0 0 0;">For any assistance, contact us at support@BookNest.com</p>
    <p style="margin: 5px 0 0 0;">123 Stock Street, Productivity City, BookLand</p>
  </div>`;

const congratulationEmail = ({ email }) => {
  return {
    subject: "Welcome to BookNest Manager!",
    html: `
        ${emailHeader}
        <div style="padding: 20px;">
          <p>Hello, ${email}!</p>
          <p>Welcome to BookNest Manager! We’re excited to have you on board.</p>
          <p>Start organizing your Books, managing your projects, and collaborating with your team.</p>
          <p>If you have any questions, feel free to reach out to our support team at any time.</p>
          <p>Happy managing!</p>
        </div>
        ${emailFooter}
      `,
  };
}

const otpEmail = ({ email, otp }) => {
  return {
    subject: "Your OTP for BookNest Manager",
    html: `
        ${emailHeader}
        <div style="padding: 20px;">
          <p>Hello, ${email}!</p>
          <p>Thank you for signing up with BookNest Manager. Please use the following OTP to verify your account:</p>
          <p><strong>OTP: ${otp}</strong></p>
          <p>The OTP will expire in 10 minutes.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
        ${emailFooter}
      `,
  };
};



const forgotPasswordEmail = ({ email, otp }) => {
  return {
    subject: "Your Password Reset OTP for BookNest Manager",
    html: `
        ${emailHeader}
        <div style="padding: 20px;">
          <p>Hello, ${email}!</p>
          <p>You requested to reset your password. Please use the following OTP to reset your password:</p>
          <p><strong>OTP: ${otp}</strong></p>
          <p>The OTP will expire in 10 minutes.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
        ${emailFooter}
      `,
  };
};




module.exports = {
  congratulationEmail,
  otpEmail,
  forgotPasswordEmail,
};
