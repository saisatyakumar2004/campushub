const nodemailer = require("nodemailer");

// Create transporter using SMTP with STARTTLS on port 587
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",          // SMTP server
  port: 587,                       // STARTTLS port
  secure: false,                   // Use STARTTLS, not SSL
  auth: {
    user: "devendhar603@gmail.com",    // Your Gmail
    pass: "xivqapfjydrntbbc",          // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false       // Allow self-signed or expired certs (for dev only)
  },
  logger: true,    // Log all activity
  debug: true      // Show SMTP conversation in console
});

// Function to send OTP
const sendOTP = async (to, otp) => {
  const mailOptions = {
    from: '"Campus Hub" <devendhar603@gmail.com>', // Friendly sender name
    to,                                            // Receiver's email
    subject: "Your OTP for Password Reset",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    console.log("Attempting to send OTP to:", to);
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send OTP:", error);
  }
};

module.exports = sendOTP;
