const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('./models/Employee');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          if (result) {
            const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Success", token });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        });
      } else {
        res.status(404).json({ message: "No record found" });
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Internal Server Error", error: err });
    });
});

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    bcrypt.hash(password, 3, async (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err });
      }

      const newEmployee = new EmployeeModel({ email, password: hashedPassword, name, role });
      await newEmployee.save();
      res.status(201).json(newEmployee);
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore[email] = { otp, expiresAt };

    await transporter.sendMail({
      from: 'saikiran929o38@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset - Calorie Tracker',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>It is valid for 10 minutes.</p>`
    });

    res.json({ message: 'OTP has been sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// -------------------- VERIFY OTP --------------------
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: 'OTP not requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: 'OTP expired' });
  if (otp !== record.otp) return res.status(400).json({ message: 'Invalid OTP' });

  // Issue temporary token after successful OTP verification
  const user = await User.findOne({ email });
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10m' });

  // Invalidate OTP
  delete otpStore[email];

  res.json({ message: 'OTP verified successfully', token });
});

// -------------------- RESET PASSWORD --------------------
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
