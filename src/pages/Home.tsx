import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiServer, FiZap, FiShield, FiUnlock, FiCheck } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: FiZap,
      title: "NVMe Performance",
      description: "Lightning-fast NVMe SSD storage for maximum speed and reliability",
    },
    {
      icon: FiServer,
      title: "99.9% Uptime",
      description: "Enterprise-grade infrastructure with guaranteed uptime SLA",
    },
    {
      icon: FiUnlock,
      title: "Full Root Access",
      description: "Complete control over your server with root-level permissions",
    },
    {
      icon: FiShield,
      title: "Free DDoS Protection",
      description: "Advanced security with enterprise-grade DDoS mitigation included",
    },
  ];

  const plans = [
    {
      name: "Starter",
      ram: "2GB RAM",
      cpu: "1 vCPU",
      storage: "25GB NVMe",
      price: "₹499",
      period: "/month",
      features: ["1TB Bandwidth", "Free DDoS Protection", "99.9% Uptime", "24/7 Support"],
    },
    {
      name: "Professional",
      ram: "4GB RAM",
      cpu: "2 vCPU",
      storage: "50GB NVMe",
      price: "₹999",
      period: "/month",
      popular: true,
      features: ["2TB Bandwidth", "Free DDoS Protection", "99.9% Uptime", "Priority Support"],
    },
    {
      name: "Enterprise",
      ram: "8GB RAM",
      cpu: "4 vCPU",
      storage: "100GB NVMe",
      price: "₹1,999",
      period: "/month",
      features: ["4TB Bandwidth", "Advanced DDoS Protection", "99.99% Uptime", "Dedicated Support"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 bg-secondary/20">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm font-medium text-primary">
                  🇮🇳 Hosted in India
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
                Enterprise-Grade
                <br />
                <span className="text-primary">Cloud Hosting</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
                Fast, secure and affordable VPS solutions built for developers and businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/vps-plans">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-soft"
                  >
                    View VPS Plans
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-border hover:bg-secondary transition-colors"
                  >
                    Create Account
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Animated Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[500px]">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      rotate: [0, i === 1 ? 3 : -3, 0],
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + i * 0.1,
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                    className={`absolute card-elevated p-8 ${
                      i === 0 ? 'top-0 right-0 w-64' : 
                      i === 1 ? 'top-32 right-20 w-72 z-10' : 
                      'top-64 right-8 w-64'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <FiServer className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Server #{i + 1}</div>
                        <div className="text-sm text-muted-foreground">Active</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="text-foreground font-medium">{15 + i * 20}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">RAM</span>
                        <span className="text-foreground font-medium">{2 + i * 2}GB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="text-primary font-medium">99.9%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Powerful Features for <span className="text-primary">Your Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run high-performance applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-elevated p-8"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Simple, <span className="text-primary">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect VPS plan for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative card-elevated p-8 ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <FiServer className="text-primary" />
                    <span className="font-medium text-foreground">{plan.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiZap className="text-primary" />
                    <span className="font-medium text-foreground">{plan.ram}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiServer className="text-primary" />
                    <span className="font-medium text-foreground">{plan.storage}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-border">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FiCheck className="text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/configure-vps">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-2 border-border hover:bg-secondary'
                    }`}
                  >
                    Configure
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-8 text-lg">
              Trusted by developers & startups across India
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {["Startups", "Agencies", "E-commerce", "SaaS Companies", "Developers"].map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-muted-foreground/60 font-medium text-lg"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of developers and businesses who trust Planning Earth Cloud
              </p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 text-lg font-semibold rounded-xl bg-background text-foreground hover:bg-secondary transition-colors"
                >
                  Create Your Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
