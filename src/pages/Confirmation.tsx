import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMail, FiServer, FiShield, FiHardDrive, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

type ProvisioningStage = {
  id: string;
  name: string;
  icon: React.ReactNode;
  duration: number;
  status: "pending" | "active" | "complete";
};

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;

  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [stages, setStages] = useState<ProvisioningStage[]>([
    {
      id: "os",
      name: "Installing Operating System",
      icon: <FiHardDrive className="h-5 w-5" />,
      duration: 90,
      status: "active",
    },
    {
      id: "network",
      name: "Configuring Network",
      icon: <FiServer className="h-5 w-5" />,
      duration: 60,
      status: "pending",
    },
    {
      id: "security",
      name: "Setting Up Security",
      icon: <FiShield className="h-5 w-5" />,
      duration: 90,
      status: "pending",
    },
    {
      id: "final",
      name: "Finalizing Setup",
      icon: <FiCheckCircle className="h-5 w-5" />,
      duration: 60,
      status: "pending",
    },
  ]);

  const [currentStageProgress, setCurrentStageProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!config) {
      navigate("/");
    }
  }, [config, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Provisioning stages progress
  useEffect(() => {
    const totalDuration = 300; // 5 minutes
    const elapsed = 300 - timeRemaining;

    // Calculate overall progress
    const progress = Math.min((elapsed / totalDuration) * 100, 100);
    setOverallProgress(progress);

    // Update stages based on elapsed time
    let cumulativeTime = 0;
    const updatedStages = stages.map((stage, index) => {
      const stageEndTime = cumulativeTime + stage.duration;

      let status: "pending" | "active" | "complete" = "pending";
      if (elapsed >= stageEndTime) {
        status = "complete";
      } else if (elapsed >= cumulativeTime && elapsed < stageEndTime) {
        status = "active";
        // Calculate progress within current stage
        const stageProgress = ((elapsed - cumulativeTime) / stage.duration) * 100;
        setCurrentStageProgress(stageProgress);
      }

      cumulativeTime = stageEndTime;
      return { ...stage, status };
    });

    setStages(updatedStages);
  }, [timeRemaining]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
            className="inline-flex p-6 rounded-full bg-accent/10 mb-8"
          >
            <FiCheckCircle className="h-20 w-20 text-accent" />
          </motion.div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="text-primary">Success!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your VPS has been successfully created
          </p>

          {/* Details Card */}
          <div className="card-elevated rounded-2xl p-8 mb-8 text-left">
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

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="card-elevated rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <FiClock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Provisioning in Progress</h2>
            </div>

            {/* Timer Display */}
            <motion.div
              className="text-center mb-8"
              animate={{
                scale: timeRemaining % 2 === 0 ? 1 : 1.02,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl font-bold text-primary mb-2">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-muted-foreground">Estimated time remaining</p>
            </motion.div>

            {/* Overall Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>

            {/* Provisioning Stages */}
            <div className="space-y-4">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    stage.status === "complete"
                      ? "border-green-500/50 bg-green-500/5"
                      : stage.status === "active"
                      ? "border-primary bg-primary/5 glow"
                      : "border-border/30 bg-card/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: stage.status === "active" ? 360 : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: stage.status === "active" ? Infinity : 0,
                        ease: "linear",
                      }}
                      className={`p-3 rounded-full ${
                        stage.status === "complete"
                          ? "bg-green-500/20 text-green-500"
                          : stage.status === "active"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stage.icon}
                    </motion.div>

                    {/* Stage Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{stage.name}</span>
                        <AnimatePresence mode="wait">
                          {stage.status === "complete" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-1 text-green-500 text-sm"
                            >
                              <FiCheckCircle className="h-4 w-4" />
                              <span>Complete</span>
                            </motion.div>
                          )}
                          {stage.status === "active" && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                              />
                              <span className="text-primary text-sm font-medium">
                                In Progress
                              </span>
                            </motion.div>
                          )}
                          {stage.status === "pending" && (
                            <span className="text-muted-foreground text-sm">Pending</span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Stage Progress Bar */}
                      {stage.status === "active" && (
                        <Progress value={currentStageProgress} className="h-1.5" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Info Box */}
          <div className="card-elevated rounded-xl p-6 mb-8 flex items-start gap-4">
            <FiMail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent your server credentials and setup instructions to your email address.
                You'll receive another email once provisioning is complete.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-soft hover:shadow-elevated transition-all"
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
