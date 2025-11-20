import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Create <span className="text-gradient">Account</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join thousands of satisfied customers
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="card-glass rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:bg-accent transition-colors"
              >
                <FcGoogle className="h-5 w-5" />
                <span className="font-medium">Continue with Google</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:bg-accent transition-colors"
              >
                <FaGithub className="h-5 w-5" />
                <span className="font-medium">Continue with GitHub</span>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
              </div>
            </div>

            {/* Name - Floating Label */}
            <div className="relative">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer placeholder-transparent"
                placeholder="Full Name"
                required
              />
              <label
                htmlFor="name"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  formData.name || focusedField === "name"
                    ? "-top-2 text-xs bg-muted px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                }`}
              >
                Full Name
              </label>
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Email - Floating Label */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer placeholder-transparent"
                placeholder="Email Address"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  formData.email || focusedField === "email"
                    ? "-top-2 text-xs bg-muted px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                }`}
              >
                Email Address
              </label>
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Password - Floating Label */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer placeholder-transparent"
                placeholder="Password"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  formData.password || focusedField === "password"
                    ? "-top-2 text-xs bg-muted px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                }`}
              >
                Password
              </label>
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password - Floating Label */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer placeholder-transparent"
                placeholder="Confirm Password"
                required
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                  formData.confirmPassword || focusedField === "confirmPassword"
                    ? "-top-2 text-xs bg-muted px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                }`}
              >
                Confirm Password
              </label>
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-cloud text-primary-foreground glow"
            >
              Create Account
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
