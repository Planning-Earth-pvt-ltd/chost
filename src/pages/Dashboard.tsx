import { motion } from "framer-motion";
import { FiServer, FiCpu, FiHardDrive, FiActivity, FiPower, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  const servers = [
    {
      id: 1,
      name: "Production Server",
      status: "running",
      ip: "192.168.1.100",
      cpu: "45%",
      ram: "62%",
      storage: "38%",
      plan: "Professional",
    },
    {
      id: 2,
      name: "Development Server",
      status: "stopped",
      ip: "192.168.1.101",
      cpu: "0%",
      ram: "0%",
      storage: "22%",
      plan: "Starter",
    },
  ];

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage and monitor your VPS instances
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Servers", value: "2", icon: FiServer, color: "text-cloud-blue" },
              { label: "Running", value: "1", icon: FiPower, color: "text-accent" },
              { label: "Total CPU", value: "6 Cores", icon: FiCpu, color: "text-cloud-purple" },
              { label: "Total Storage", value: "105 GB", icon: FiHardDrive, color: "text-cloud-indigo" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Server List */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Your Servers</h2>
            
            {servers.map((server, index) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-8 rounded-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Server Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{server.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          server.status === "running"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {server.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">IP Address</p>
                        <p className="font-semibold">{server.ip}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Plan</p>
                        <p className="font-semibold">{server.plan}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">CPU Usage</p>
                        <p className="font-semibold">{server.cpu}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">RAM Usage</p>
                        <p className="font-semibold">{server.ram}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <FiPower className="h-5 w-5 text-primary" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-colors"
                    >
                      <FiActivity className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-colors"
                    >
                      <FiSettings className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
