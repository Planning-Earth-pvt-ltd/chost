import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiCreditCard, FiChevronDown } from "react-icons/fi";
import { SiGooglepay, SiPaytm, SiPhonepe } from "react-icons/si";
import { BsBank } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const price = location.state?.price || 1299;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [animatedPrice, setAnimatedPrice] = useState(0);
  
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  if (!config) {
    navigate("/configure-vps");
    return null;
  }

  // Animated price counter
  useEffect(() => {
    let start = 0;
    const end = price;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedPrice(end);
        clearInterval(timer);
      } else {
        setAnimatedPrice(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/confirmation", { state: { config, paymentMethod } });
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardData({ ...cardData, number: formatted });
    }
  };

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
  ];

  return (
    <div className="min-h-screen bg-mesh py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 rounded-full bg-gradient-cloud/10 mb-4">
            <FiLock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Secure <span className="text-gradient">Payment</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your preferred payment method
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selector */}
              <div className="card-glass rounded-2xl p-6 space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiCreditCard className="h-6 w-6 text-primary" />
                  Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid gap-4">
                    {/* Credit/Debit Card */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5 glow"
                          : "border-border/50 bg-card/30"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <FiCreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Credit / Debit Card</span>
                        </Label>
                      </div>
                    </motion.div>

                    {/* UPI */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "upi"
                          ? "border-primary bg-primary/5 glow"
                          : "border-border/50 bg-card/30"
                      }`}
                      onClick={() => setPaymentMethod("upi")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="flex gap-2">
                            <SiGooglepay className="h-5 w-5 text-primary" />
                            <SiPhonepe className="h-5 w-5 text-secondary" />
                            <SiPaytm className="h-5 w-5 text-accent" />
                          </div>
                          <span className="font-semibold">UPI</span>
                        </Label>
                      </div>
                    </motion.div>

                    {/* Net Banking */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "netbanking"
                          ? "border-primary bg-primary/5 glow"
                          : "border-border/50 bg-card/30"
                      }`}
                      onClick={() => setPaymentMethod("netbanking")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                          <BsBank className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Net Banking</span>
                        </Label>
                      </div>
                    </motion.div>

                    {/* EMI */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "emi"
                          ? "border-primary bg-primary/5 glow"
                          : "border-border/50 bg-card/30"
                      }`}
                      onClick={() => setPaymentMethod("emi")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="emi" id="emi" />
                        <Label htmlFor="emi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <MdAccountBalance className="h-5 w-5 text-primary" />
                          <span className="font-semibold">EMI Options</span>
                          <span className="ml-auto text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                            Available
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Details */}
              <AnimatePresence mode="wait">
                {paymentMethod === "card" && (
                  <motion.div
                    key="card-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="card-glass rounded-2xl p-6 space-y-6"
                  >
                    {/* Animated Card Preview */}
                    <motion.div
                      className="relative h-48 rounded-2xl bg-gradient-cloud p-6 text-primary-foreground overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                      </div>
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <FiCreditCard className="h-10 w-10" />
                          <div className="text-xs font-medium">PLANNING EARTH</div>
                        </div>
                        <div>
                          <div className="text-2xl font-mono tracking-wider mb-4">
                            {cardData.number || "•••• •••• •••• ••••"}
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-xs opacity-70 mb-1">Card Holder</div>
                              <div className="font-medium">{cardData.name || "YOUR NAME"}</div>
                            </div>
                            <div>
                              <div className="text-xs opacity-70 mb-1">Expires</div>
                              <div className="font-medium">{cardData.expiry || "MM/YY"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card Form */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardData.expiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + "/" + value.slice(2, 4);
                              }
                              setCardData({ ...cardData, expiry: value });
                            }}
                            maxLength={5}
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 4) {
                                setCardData({ ...cardData, cvv: value });
                              }
                            }}
                            maxLength={4}
                            required
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "upi" && (
                  <motion.div
                    key="upi-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="card-glass rounded-2xl p-6 space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.1 }} className="p-3 rounded-xl bg-primary/10">
                          <SiGooglepay className="h-8 w-8 text-primary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-3 rounded-xl bg-secondary/10">
                          <SiPhonepe className="h-8 w-8 text-secondary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-3 rounded-xl bg-accent/10">
                          <SiPaytm className="h-8 w-8 text-accent" />
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Enter your UPI ID (e.g., 9876543210@paytm)
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <span className="text-sm">Save UPI ID for future payments</span>
                      <Switch />
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "netbanking" && (
                  <motion.div
                    key="netbanking-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="card-glass rounded-2xl p-6 space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <BsBank className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Select Your Bank</h3>
                        <p className="text-sm text-muted-foreground">Choose from popular banks</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select value={selectedBank} onValueChange={setSelectedBank} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to your bank's secure payment gateway to complete the transaction.
                      </p>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "emi" && (
                  <motion.div
                    key="emi-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="card-glass rounded-2xl p-6 space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-accent/10">
                        <MdAccountBalance className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">EMI Options</h3>
                        <p className="text-sm text-muted-foreground">Convert to easy installments</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {[3, 6, 9, 12].map((months) => (
                        <motion.div
                          key={months}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-xl border border-border/50 bg-card/30 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{months} Months EMI</div>
                              <div className="text-sm text-muted-foreground">
                                ₹{Math.ceil(price / months)}/month
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Total</div>
                              <div className="font-semibold">
                                ₹{Math.ceil(price * (1 + months * 0.01))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> EMI is subject to approval by your card issuer. Interest rates may vary.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button type="submit" className="w-full py-6 text-lg font-semibold bg-gradient-cloud glow">
                  <FiLock className="mr-2 h-5 w-5" />
                  Pay Now - ₹{price.toLocaleString("en-IN")}
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground">
                Your payment information is encrypted and secure. By proceeding, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </form>
          </motion.div>

          {/* Right Panel - Sticky Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="card-glass rounded-2xl p-6 shadow-card space-y-6">
                <h2 className="text-2xl font-bold text-gradient">Order Summary</h2>

                <Separator />

                {/* Configuration Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU Cores</span>
                    <span className="font-semibold">{config.cpu} Cores</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-semibold">{config.ram}GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-semibold">{config.storage}GB NVMe</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Operating System</span>
                    <span className="font-semibold">{config.os}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Backups</span>
                    <span className="font-semibold">{config.backup ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Billing Cycle</span>
                    <span className="font-semibold">{config.billing}</span>
                  </div>
                </div>

                <Separator />

                {/* Included Features */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-muted-foreground mb-3">Included Features</div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>DDoS Protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Full Root Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-cloud-purple" />
                    <span>24/7 Support</span>
                  </div>
                </div>

                <Separator />

                {/* Animated Total Price */}
                <div className="p-6 rounded-xl bg-gradient-cloud/10 border border-primary/20">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                      <div className="text-sm text-muted-foreground">
                        (Billed {config.billing?.toLowerCase()})
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-4xl font-bold text-gradient"
                    >
                      ₹{animatedPrice.toLocaleString("en-IN")}
                    </motion.div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiLock className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                  <div className="h-3 w-px bg-border" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiCreditCard className="h-3 w-3" />
                    <span>Encrypted</span>
                  </div>
                  <div className="h-3 w-px bg-border" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>🔒</span>
                    <span>PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
