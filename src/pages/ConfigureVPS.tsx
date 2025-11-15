import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiServer, FiHardDrive, FiCpu, FiActivity } from "react-icons/fi";

const ConfigureVPS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan || "Professional";

  const [config, setConfig] = useState({
    plan: selectedPlan,
    cpu: "2",
    ram: "4",
    storage: "80",
    os: "ubuntu",
    datacenter: "us-east",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/checkout", { state: { config } });
  };

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-center">
            Configure Your <span className="text-gradient">VPS</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Customize your server to match your exact requirements
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Plan Selection */}
            <div className="card-glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-cloud/10">
                  <FiServer className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Select Plan</h2>
              </div>

              <select
                value={config.plan}
                onChange={(e) => setConfig({ ...config, plan: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Starter">Starter - $9.99/mo</option>
                <option value="Professional">Professional - $24.99/mo</option>
                <option value="Business">Business - $49.99/mo</option>
                <option value="Enterprise">Enterprise - $99.99/mo</option>
              </select>
            </div>

            {/* Resources */}
            <div className="card-glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-cloud/10">
                  <FiCpu className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Resources</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">CPU Cores</label>
                  <select
                    value={config.cpu}
                    onChange={(e) => setConfig({ ...config, cpu: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="1">1 Core</option>
                    <option value="2">2 Cores</option>
                    <option value="4">4 Cores</option>
                    <option value="8">8 Cores</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">RAM (GB)</label>
                  <select
                    value={config.ram}
                    onChange={(e) => setConfig({ ...config, ram: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="2">2 GB</option>
                    <option value="4">4 GB</option>
                    <option value="8">8 GB</option>
                    <option value="16">16 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Storage (GB)</label>
                  <select
                    value={config.storage}
                    onChange={(e) => setConfig({ ...config, storage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="25">25 GB</option>
                    <option value="80">80 GB</option>
                    <option value="160">160 GB</option>
                    <option value="320">320 GB</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Operating System */}
            <div className="card-glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-cloud/10">
                  <FiHardDrive className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Operating System</h2>
              </div>

              <select
                value={config.os}
                onChange={(e) => setConfig({ ...config, os: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ubuntu">Ubuntu 22.04 LTS</option>
                <option value="debian">Debian 11</option>
                <option value="centos">CentOS 8</option>
                <option value="fedora">Fedora 38</option>
                <option value="windows">Windows Server 2022</option>
              </select>
            </div>

            {/* Datacenter Location */}
            <div className="card-glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-cloud/10">
                  <FiActivity className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Datacenter Location</h2>
              </div>

              <select
                value={config.datacenter}
                onChange={(e) => setConfig({ ...config, datacenter: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="us-east">US East (New York)</option>
                <option value="us-west">US West (San Francisco)</option>
                <option value="eu-west">EU West (London)</option>
                <option value="eu-central">EU Central (Frankfurt)</option>
                <option value="asia-pacific">Asia Pacific (Singapore)</option>
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-cloud text-primary-foreground glow"
            >
              Continue to Checkout
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfigureVPS;
