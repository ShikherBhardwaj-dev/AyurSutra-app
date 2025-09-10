const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ayursutra",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["patient", "practitioner"],
      default: "patient",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Additional user profile fields
    profile: {
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
      medicalHistory: [String],
      preferences: {
        notifications: {
          email: { type: Boolean, default: true },
          sms: { type: Boolean, default: true },
          inApp: { type: Boolean, default: true },
        },
      },
      // Patient-specific wellness data
      wellnessMetrics: {
        sleepQuality: { type: Number, default: 0 },
        energyLevel: { type: Number, default: 0 },
        overallWellness: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
      },
    },
    // For practitioners
    practitionerInfo: {
      licenseNumber: String,
      specializations: [String],
      experience: Number,
      clinicName: String,
      clinicAddress: String,
      consultationFee: Number,
      availableHours: {
        start: String,
        end: String,
      },
      workingDays: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Patient Progress Schema
const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedSessions: {
      type: Number,
      default: 0,
    },
    totalSessions: {
      type: Number,
      default: 21, // Typical Panchakarma duration
    },
    nextMilestone: {
      type: String,
      default: "Complete initial assessment",
    },
    wellnessScores: [
      {
        date: { type: Date, default: Date.now },
        wellness: Number,
        energy: Number,
        sleep: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Notifications Schema
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pre", "post", "reminder", "appointment", "general"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    read: {
      type: Boolean,
      default: false,
    },
    scheduledFor: Date,
  },
  {
    timestamps: true,
  }
);

// Therapy Sessions Schema
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    practitionerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["abhyanga", "shirodhara", "swedana", "basti", "nasya", "other"],
      default: "abhyanga",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: String,
    feedback: {
      wellness: Number,
      energy: Number,
      sleep: Number,
      comments: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    userType: this.userType,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "ayursutra_secret_key", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const User = mongoose.model("User", userSchema);
const Progress = mongoose.model("Progress", progressSchema);
const Notification = mongoose.model("Notification", notificationSchema);
const Session = mongoose.model("Session", sessionSchema);

// Auth middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ayursutra_secret_key"
    );
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ message: "Invalid token or user inactive" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Validation middleware
const validateSignup = (req, res, next) => {
  const { fullName, email, password, phone, userType } = req.body;

  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!phone || phone.trim().length < 10) {
    errors.push("Please provide a valid phone number");
  }

  if (userType && !["patient", "practitioner"].includes(userType)) {
    errors.push("User type must be either patient or practitioner");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || !email.includes("@")) {
    errors.push("Please provide a valid email address");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

// Helper function to create initial user data
const createInitialUserData = async (userId, userType) => {
  try {
    // Create initial progress record for patients
    if (userType === "patient") {
      const progress = new Progress({
        userId,
        overallProgress: Math.floor(Math.random() * 20) + 10, // Random starting progress between 10-30%
        completedSessions: 0,
        totalSessions: 21,
        nextMilestone: "Complete initial assessment",
        wellnessScores: [
          {
            wellness: Math.floor(Math.random() * 3) + 7, // Random score between 7-10
            energy: Math.floor(Math.random() * 3) + 7,
            sleep: Math.floor(Math.random() * 3) + 8,
          },
        ],
      });
      await progress.save();

      // Create welcome notification
      const welcomeNotification = new Notification({
        userId,
        title: "Welcome to AyurSutra!",
        message:
          "Your Panchakarma journey begins now. We've prepared a personalized care plan for you.",
        type: "general",
        priority: "high",
      });
      await welcomeNotification.save();

      // Create sample sessions
      const sessions = [
        {
          userId,
          name: "Initial Consultation",
          type: "other",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          time: "10:00 AM",
          duration: 45,
          status: "scheduled",
          progress: 0,
        },
        {
          userId,
          name: "Abhyanga Therapy",
          type: "abhyanga",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
          time: "2:00 PM",
          duration: 60,
          status: "scheduled",
          progress: 0,
        },
      ];

      await Session.insertMany(sessions);
    } else {
      // For practitioners, create different welcome notification
      const practitionerWelcome = new Notification({
        userId,
        title: "Welcome, Practitioner!",
        message:
          "Your practitioner account is ready. You can now manage your patients' Panchakarma treatments.",
        type: "general",
        priority: "high",
      });
      await practitionerWelcome.save();
    }
  } catch (error) {
    console.error("Error creating initial user data:", error);
  }
};

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// User registration
app.post("/api/auth/signup", authLimiter, validateSignup, async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      userType,
      profile,
      practitionerInfo,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email address",
      });
    }

    // Create new user
    const userData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone.trim(),
      userType: userType || "patient",
    };

    // Add optional profile data
    if (profile) {
      userData.profile = profile;
    }

    // Add practitioner info if user is practitioner
    if (userType === "practitioner" && practitionerInfo) {
      userData.practitionerInfo = practitionerInfo;
    }

    const user = new User(userData);
    await user.save();

    // Create initial user data (progress, notifications, etc.)
    await createInitialUserData(user._id, user.userType);

    // Generate token
    const token = user.generateAuthToken();

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email address is already registered",
      });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
});

// User login
app.post("/api/auth/login", authLimiter, validateLogin, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user by email
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      isActive: true,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token with different expiry based on rememberMe
    const tokenExpiry = rememberMe ? "30d" : "7d";
    const payload = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "ayursutra_secret_key",
      {
        expiresIn: tokenExpiry,
      }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
});

// Get current user
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user dashboard data
app.get("/api/dashboard", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user progress
    let progress = await Progress.findOne({ userId });
    if (!progress && req.user.userType === "patient") {
      // Create default progress if none exists
      progress = new Progress({
        userId,
        overallProgress: 15,
        completedSessions: 2,
        totalSessions: 21,
        nextMilestone: "Complete detoxification phase",
      });
      await progress.save();
    }

    // Get recent notifications
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get upcoming sessions
    const upcomingSessions = await Session.find({
      userId,
      date: { $gte: new Date() },
      status: { $in: ["scheduled", "in-progress"] },
    })
      .sort({ date: 1 })
      .limit(5);

    // Get wellness metrics from user profile
    const user = await User.findById(userId).select("profile.wellnessMetrics");
    const wellnessMetrics = user?.profile?.wellnessMetrics || {
      sleepQuality: 85,
      energyLevel: 78,
      overallWellness: 82,
    };

    res.json({
      progress: progress || {
        overallProgress: 0,
        completedSessions: 0,
        totalSessions: 21,
        nextMilestone: "Begin your wellness journey",
      },
      notifications,
      upcomingSessions,
      wellnessMetrics,
      userType: req.user.userType,
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Get user notifications
app.get("/api/notifications", authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ notifications });
  } catch (error) {
    console.error("Notifications fetch error:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// Mark notification as read
app.put("/api/notifications/:id/read", authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ notification });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({ message: "Error updating notification" });
  }
});

// Get user sessions
app.get("/api/sessions", authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ date: 1 })
      .populate("practitionerId", "fullName email");

    res.json({ sessions });
  } catch (error) {
    console.error("Sessions fetch error:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

// Create new session
app.post("/api/sessions", authenticateToken, async (req, res) => {
  try {
    const { name, type, date, time, duration, practitionerId } = req.body;

    const session = new Session({
      userId: req.user._id,
      name,
      type: type || "abhyanga",
      date: new Date(date),
      time,
      duration: duration || 60,
      practitionerId,
      status: "scheduled",
      progress: 0,
    });

    await session.save();

    // Create notification for the session
    const notification = new Notification({
      userId: req.user._id,
      title: "Session Scheduled",
      message: `Your ${name} session has been scheduled for ${date} at ${time}`,
      type: "appointment",
      priority: "medium",
    });
    await notification.save();

    res.status(201).json({ session });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ message: "Error creating session" });
  }
});

// Update session feedback
app.put("/api/sessions/:id/feedback", authenticateToken, async (req, res) => {
  try {
    const { wellness, energy, sleep, comments } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        feedback: { wellness, energy, sleep, comments },
        status: "completed",
        progress: 100,
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update user progress
    const progress = await Progress.findOne({ userId: req.user._id });
    if (progress) {
      progress.completedSessions += 1;
      progress.overallProgress = Math.min(
        100,
        (progress.completedSessions / progress.totalSessions) * 100
      );

      // Add wellness score to history
      progress.wellnessScores.push({
        date: new Date(),
        wellness,
        energy,
        sleep,
      });

      await progress.save();
    }

    // Update user wellness metrics
    await User.findByIdAndUpdate(req.user._id, {
      "profile.wellnessMetrics.sleepQuality": sleep * 10,
      "profile.wellnessMetrics.energyLevel": energy * 10,
      "profile.wellnessMetrics.overallWellness": wellness * 10,
      "profile.wellnessMetrics.lastUpdated": new Date(),
    });

    res.json({ session });
  } catch (error) {
    console.error("Update session feedback error:", error);
    res.status(500).json({ message: "Error updating session feedback" });
  }
});

// Get user progress
app.get("/api/progress", authenticateToken, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user._id });

    if (!progress && req.user.userType === "patient") {
      // Create default progress
      const newProgress = new Progress({
        userId: req.user._id,
        overallProgress: 10,
        completedSessions: 0,
        totalSessions: 21,
        nextMilestone: "Complete initial assessment",
      });
      await newProgress.save();
      return res.json({ progress: newProgress });
    }

    res.json({ progress: progress || {} });
  } catch (error) {
    console.error("Progress fetch error:", error);
    res.status(500).json({ message: "Error fetching progress" });
  }
});

// Update user profile
app.put("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user._id;

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.email;
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// Change password
app.put("/api/auth/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(req.user._id);

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout (client-side token removal, but we can track it)
app.post("/api/auth/logout", authenticateToken, async (req, res) => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    message: "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { error: error.message }),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

startServer().catch(console.error);
