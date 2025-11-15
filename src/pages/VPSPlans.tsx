import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const VPSPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "9.99",
      description: "Perfect for small projects and testing",
      features: [
        "1 vCPU Core",
        "2 GB RAM",
        "25 GB NVMe SSD",
        "1 TB Bandwidth",
        "99.9% Uptime SLA",
      ],
    },
    {
      name: "Professional",
      price: "24.99",
      description: "Ideal for growing applications",
      features: [
        "2 vCPU Cores",
        "4 GB RAM",
        "80 GB NVMe SSD",
        "3 TB Bandwidth",
        "99.95% Uptime SLA",
        "Free SSL Certificate",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "49.99",
      description: "For high-traffic applications",
      features: [
        "4 vCPU Cores",
        "8 GB RAM",
        "160 GB NVMe SSD",
        "5 TB Bandwidth",
        "99.99% Uptime SLA",
        "Free SSL Certificate",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "99.99",
      description: "Maximum performance and reliability",
      features: [
        "8 vCPU Cores",
        "16 GB RAM",
        "320 GB NVMe SSD",
        "10 TB Bandwidth",
        "99.99% Uptime SLA",
        "Free SSL Certificate",
        "24/7 Priority Support",
        "Dedicated IP",
      ],
    },
  ];

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            VPS <span className="text-gradient">Pricing Plans</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include DDoS protection and automated backups.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative card-glass rounded-2xl p-8 shadow-card ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-semibold rounded-full bg-gradient-cloud text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gradient">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheck className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/configure-vps" state={{ selectedPlan: plan.name }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-cloud text-primary-foreground glow"
                      : "border-2 border-border hover:bg-muted"
                  }`}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VPSPlans;
