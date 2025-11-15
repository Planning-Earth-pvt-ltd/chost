import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiServer, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "NVMe SSD storage and high-performance CPUs for blazing speed",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "DDoS protection, SSL certificates, and automated backups",
    },
    {
      icon: FiServer,
      title: "99.9% Uptime",
      description: "Guaranteed uptime with redundant infrastructure",
    },
    {
      icon: FiTrendingUp,
      title: "Scalable",
      description: "Scale resources instantly as your needs grow",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-cloud-blue/10 via-cloud-indigo/5 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-cloud/10 border border-primary/20"
            >
              <span className="text-sm font-medium text-gradient">
                🚀 Next-Generation Cloud Infrastructure
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Cloud Hosting
              <br />
              <span className="text-gradient">Built for Scale</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Deploy your applications on enterprise-grade infrastructure with unmatched performance and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vps-plans">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-cloud text-primary-foreground glow"
                >
                  View VPS Plans
                </motion.button>
              </Link>
              <Link to="/configure-vps">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-border hover:bg-muted transition-colors"
                >
                  Configure Your VPS
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Planning Earth Cloud?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on cutting-edge technology to deliver the best hosting experience
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
                className="card-glass p-8 rounded-2xl shadow-card"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-cloud/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
            className="relative overflow-hidden rounded-3xl bg-gradient-cloud p-12 md:p-16 text-center"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 text-lg font-semibold rounded-xl bg-background text-foreground hover:bg-background/90 transition-colors"
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
