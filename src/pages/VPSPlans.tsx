import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheck, FiCpu, FiHardDrive, FiActivity } from "react-icons/fi";

const VPSPlans = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "6months" | "yearly">("monthly");

  const plans = [
    {
      name: "PE VPS 1",
      cpu: "1 vCPU",
      ram: "2 GB RAM",
      storage: "50 GB NVMe SSD",
      bandwidth: "1 TB Bandwidth",
      pricing: {
        monthly: 499,
        "6months": 449,
        yearly: 399,
      },
      features: [
        "Full Root Access",
        "Free DDoS Protection",
        "99.9% Uptime SLA",
        "24/7 Support",
        "Automated Backups",
      ],
    },
    {
      name: "PE VPS 2",
      cpu: "2 vCPU",
      ram: "4 GB RAM",
      storage: "100 GB NVMe SSD",
      bandwidth: "2 TB Bandwidth",
      pricing: {
        monthly: 999,
        "6months": 899,
        yearly: 799,
      },
      popular: true,
      features: [
        "Full Root Access",
        "Advanced DDoS Protection",
        "99.95% Uptime SLA",
        "Priority Support",
        "Automated Backups",
        "Free SSL Certificate",
      ],
    },
    {
      name: "PE VPS 4",
      cpu: "4 vCPU",
      ram: "8 GB RAM",
      storage: "200 GB NVMe SSD",
      bandwidth: "4 TB Bandwidth",
      pricing: {
        monthly: 1999,
        "6months": 1799,
        yearly: 1599,
      },
      features: [
        "Full Root Access",
        "Enterprise DDoS Protection",
        "99.99% Uptime SLA",
        "24/7 Priority Support",
        "Automated Backups",
        "Free SSL Certificate",
        "Dedicated IP",
        "Custom Firewall",
      ],
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return plan.pricing[billingCycle];
  };

  const getSavingsPercent = (cycle: typeof billingCycle) => {
    if (cycle === "6months") return "10";
    if (cycle === "yearly") return "20";
    return "0";
  };

  return (
    <div className="py-20 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-gradient">VPS Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Enterprise-grade virtual private servers with guaranteed resources and performance
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-secondary/50 shadow-soft">
            {[
              { value: "monthly" as const, label: "Monthly" },
              { value: "6months" as const, label: "6 Months" },
              { value: "yearly" as const, label: "Yearly" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setBillingCycle(option.value)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-all ${
                  billingCycle === option.value
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {option.label}
                {option.value !== "monthly" && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full bg-accent text-accent-foreground">
                    Save {getSavingsPercent(option.value)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`relative card-elevated rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft">
                    Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gradient">
                      ₹{getPrice(plan).toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground ml-2">/mo</span>
                  </div>
                  {billingCycle !== "monthly" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Billed {billingCycle === "6months" ? "semi-annually" : "annually"}
                    </p>
                  )}
                </div>

                {/* Specs */}
                <div className="space-y-4 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiCpu className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Processor</div>
                      <div className="font-semibold">{plan.cpu}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiActivity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Memory</div>
                      <div className="font-semibold">{plan.ram}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiHardDrive className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Storage</div>
                      <div className="font-semibold">{plan.storage}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiActivity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bandwidth</div>
                      <div className="font-semibold">{plan.bandwidth}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FiCheck className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/configure-vps" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "border-2 border-border hover:bg-secondary hover:border-primary"
                    }`}
                  >
                    Configure Plan
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            All plans include: Free setup, instant activation, and 30-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground/60">
            <span>✓ NVMe SSD Storage</span>
            <span>✓ DDoS Protection</span>
            <span>✓ Free Backups</span>
            <span>✓ 24/7 Support</span>
            <span>✓ Root Access</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VPSPlans;
