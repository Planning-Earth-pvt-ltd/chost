import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiCpu, FiHardDrive, FiServer, FiShield, FiCalendar, FiCheck } from "react-icons/fi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ConfigureVPS = () => {
  const navigate = useNavigate();

  const [cpu, setCpu] = useState("4");
  const [ram, setRam] = useState("8");
  const [storage, setStorage] = useState([150]);
  const [os, setOs] = useState("ubuntu");
  const [backup, setBackup] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const cpuOptions = [
    { value: "2", label: "2 Cores", price: 500 },
    { value: "4", label: "4 Cores", price: 1000 },
    { value: "6", label: "6 Cores", price: 1500 },
    { value: "8", label: "8 Cores", price: 2000 },
  ];

  const ramOptions = [
    { value: "4", label: "4 GB", price: 300 },
    { value: "8", label: "8 GB", price: 600 },
    { value: "16", label: "16 GB", price: 1200 },
    { value: "32", label: "32 GB", price: 2400 },
  ];

  const osOptions = [
    { value: "ubuntu", label: "Ubuntu 22.04 LTS", icon: "🐧" },
    { value: "debian", label: "Debian 12", icon: "🌀" },
    { value: "rocky", label: "Rocky Linux 9", icon: "🏔️" },
    { value: "windows", label: "Windows Server 2022", icon: "🪟" },
  ];

  const billingMultipliers = {
    monthly: 1,
    "6months": 0.9,
    yearly: 0.8,
  };

  const billingLabels = {
    monthly: "Monthly",
    "6months": "6 Months (10% off)",
    yearly: "Yearly (20% off)",
  };

  const calculatePrice = useMemo(() => {
    const cpuPrice = cpuOptions.find(o => o.value === cpu)?.price || 0;
    const ramPrice = ramOptions.find(o => o.value === ram)?.price || 0;
    const storagePrice = storage[0] * 2;
    const backupPrice = backup ? 200 : 0;
    const basePrice = cpuPrice + ramPrice + storagePrice + backupPrice;
    const multiplier = billingMultipliers[billingCycle as keyof typeof billingMultipliers];
    return Math.round(basePrice * multiplier);
  }, [cpu, ram, storage, backup, billingCycle]);

  const handleContinue = () => {
    navigate("/checkout", {
      state: {
        config: { cpu, ram, storage: storage[0], os, backup, billingCycle },
        price: calculatePrice,
      },
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center">
            Configure Your <span className="text-gradient">VPS</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Build the perfect server for your needs
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Configuration Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* CPU Selector */}
              <motion.div
                className="card-elevated rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FiCpu className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">CPU Cores</h3>
                </div>
                <RadioGroup value={cpu} onValueChange={setCpu} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cpuOptions.map((option) => (
                    <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Label
                        htmlFor={`cpu-${option.value}`}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          cpu === option.value
                            ? "border-primary bg-primary/10 shadow-soft"
                            : "border-border hover:border-primary/50 bg-background"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`cpu-${option.value}`} className="sr-only" />
                        <span className="text-2xl font-bold">{option.value}</span>
                        <span className="text-sm text-muted-foreground">Cores</span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>

              {/* RAM Selector */}
              <motion.div
                className="card-elevated rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FiServer className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">RAM</h3>
                </div>
                <RadioGroup value={ram} onValueChange={setRam} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ramOptions.map((option) => (
                    <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Label
                        htmlFor={`ram-${option.value}`}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          ram === option.value
                            ? "border-primary bg-primary/10 shadow-soft"
                            : "border-border hover:border-primary/50 bg-background"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`ram-${option.value}`} className="sr-only" />
                        <span className="text-2xl font-bold">{option.value}</span>
                        <span className="text-sm text-muted-foreground">GB</span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>

              {/* Storage Slider */}
              <motion.div
                className="card-elevated rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FiHardDrive className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Storage</h3>
                  <span className="ml-auto text-2xl font-bold text-primary">{storage[0]} GB</span>
                </div>
                <Slider
                  value={storage}
                  onValueChange={setStorage}
                  min={75}
                  max={400}
                  step={25}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>75 GB</span>
                  <span>400 GB</span>
                </div>
              </motion.div>

              {/* OS Selector */}
              <motion.div
                className="card-elevated rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FiServer className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Operating System</h3>
                </div>
                <Select value={os} onValueChange={setOs}>
                  <SelectTrigger className="w-full h-12 rounded-xl bg-muted border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {osOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.icon}</span>
                          <span>{option.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Backup Toggle & Billing Cycle */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="card-elevated rounded-2xl p-6"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiShield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Backup</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backup" className="text-muted-foreground">
                      Daily automated backups
                    </Label>
                    <Switch id="backup" checked={backup} onCheckedChange={setBackup} />
                  </div>
                </motion.div>

                <motion.div
                  className="card-elevated rounded-2xl p-6"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FiCalendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Billing Cycle</h3>
                  </div>
                  <Select value={billingCycle} onValueChange={setBillingCycle}>
                    <SelectTrigger className="w-full h-12 rounded-xl bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(billingLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
            </div>

            {/* Right Panel - Summary Card */}
            <div className="lg:col-span-1">
              <motion.div
                className="card-elevated rounded-2xl p-6 sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Configuration Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-semibold">{cpu} Cores</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-semibold">{ram} GB</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-semibold">{storage[0]} GB NVMe</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">OS</span>
                    <span className="font-semibold">
                      {osOptions.find(o => o.value === os)?.label.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Backup</span>
                    <span className="font-semibold">{backup ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Billing</span>
                    <span className="font-semibold capitalize">{billingLabels[billingCycle as keyof typeof billingLabels].split(' ')[0]}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Total Price</span>
                    {billingCycle !== "monthly" && (
                      <span className="text-xs text-primary font-semibold">
                        {billingCycle === "6months" ? "10% OFF" : "20% OFF"}
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    ₹{calculatePrice.toLocaleString()}
                    <span className="text-lg text-muted-foreground">
                      /{billingCycle === "monthly" ? "mo" : billingCycle === "6months" ? "6mo" : "yr"}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  className="w-full py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-soft flex items-center justify-center gap-2"
                >
                  <FiCheck className="h-5 w-5" />
                  Continue to Checkout
                </motion.button>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FiShield className="h-4 w-4 text-primary" />
                    <span>DDoS Protection Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FiServer className="h-4 w-4 text-primary" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FiCheck className="h-4 w-4 text-primary" />
                    <span>Root Access</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfigureVPS;
