import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;

  if (!config) {
    navigate("/configure-vps");
    return null;
  }

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { config } });
  };

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">Checkout</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Review your configuration and complete your order
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Configuration Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">{config.plan}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">CPU Cores</span>
                    <span className="font-semibold">{config.cpu} Cores</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-semibold">{config.ram} GB</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-semibold">{config.storage} GB NVMe SSD</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Operating System</span>
                    <span className="font-semibold capitalize">{config.os}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Datacenter</span>
                    <span className="font-semibold">{config.datacenter.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Included Features</h2>
                
                <ul className="space-y-3">
                  {[
                    "DDoS Protection",
                    "Automated Daily Backups",
                    "Free SSL Certificate",
                    "Root Access",
                    "99.9% Uptime SLA",
                    "24/7 Support",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <FiCheck className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="card-glass rounded-2xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">$24.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Setup Fee</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-border/50">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-gradient">$24.99</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Billed monthly</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToPayment}
                  className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-cloud text-primary-foreground glow"
                >
                  Proceed to Payment
                </motion.button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
