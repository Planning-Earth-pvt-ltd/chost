import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import { useEffect } from "react";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;

  useEffect(() => {
    if (!config) {
      navigate("/");
    }
  }, [config, navigate]);

  if (!config) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex p-6 rounded-full bg-gradient-cloud/10 mb-8"
          >
            <FiCheckCircle className="h-20 w-20 text-accent" />
          </motion.div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Success!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your VPS has been successfully created
          </p>

          {/* Details Card */}
          <div className="card-glass rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold mb-6 text-center">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-semibold">#VPS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold">{config.plan}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-muted-foreground">Datacenter</span>
                <span className="font-semibold">{config.datacenter.toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-accent">Provisioning</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="card-glass rounded-xl p-6 mb-8 flex items-start gap-4">
            <FiMail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent your server credentials and setup instructions to your email address.
                Your VPS will be ready in approximately 5-10 minutes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-cloud text-primary-foreground glow"
              >
                Go to Dashboard
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-border hover:bg-muted transition-colors"
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
