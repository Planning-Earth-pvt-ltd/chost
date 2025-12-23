import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const checkoutFormSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  address: z.string()
    .trim()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(200, { message: "Address must be less than 200 characters" }),
  city: z.string()
    .trim()
    .min(2, { message: "City must be at least 2 characters" })
    .max(100, { message: "City must be less than 100 characters" }),
  state: z.string()
    .trim()
    .min(2, { message: "State must be at least 2 characters" })
    .max(100, { message: "State must be less than 100 characters" }),
  pincode: z.string()
    .trim()
    .length(6, { message: "Pincode must be 6 digits" })
    .regex(/^[0-9]+$/, { message: "Pincode must contain only numbers" }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const config = location.state?.config;
  const price = location.state?.price || 2500;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  if (!config) {
    navigate("/configure-vps");
    return null;
  }

  const onSubmit = (data: CheckoutFormValues) => {
    navigate("/payment", { state: { config, userInfo: data, price } });
    toast({
      title: "Information saved",
      description: "Proceeding to payment...",
    });
  };

  const osLabels: Record<string, string> = {
    ubuntu: "Ubuntu 22.04 LTS",
    debian: "Debian 12",
    rocky: "Rocky Linux 9",
    windows: "Windows Server 2022",
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
            Complete Your <span className="text-gradient">Order</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Just a few more details to get your VPS up and running
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - User Information Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    className="card-elevated rounded-2xl p-8"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FiUser className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Contact Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  placeholder=" "
                                  className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                />
                                <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                  Full Name
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder=" "
                                  className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                />
                                <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                  Email Address
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  placeholder=" "
                                  className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                />
                                <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                  Phone Number
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="card-elevated rounded-2xl p-8"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FiMapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Billing Address</h2>
                    </div>

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  placeholder=" "
                                  className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                />
                                <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                  Street Address
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder=" "
                                    className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                  />
                                  <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                    City
                                  </FormLabel>
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs mt-1" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder=" "
                                    className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                  />
                                  <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                    State
                                  </FormLabel>
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs mt-1" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder=" "
                                    className="peer h-14 pt-6 pb-2 px-4 rounded-xl bg-muted border-border focus:border-primary transition-all"
                                  />
                                  <FormLabel className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                    Pincode
                                  </FormLabel>
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button - Mobile Only */}
                  <div className="lg:hidden">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-soft flex items-center justify-center gap-2"
                    >
                      <FiCheck className="h-5 w-5" />
                      Proceed to Payment
                    </motion.button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Right Panel - Sticky Summary Card */}
            <div className="lg:col-span-1">
              <motion.div
                className="card-elevated rounded-2xl p-6 sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">CPU</span>
                    <span className="font-semibold">{config.cpu} Cores</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">RAM</span>
                    <span className="font-semibold">{config.ram} GB</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Storage</span>
                    <span className="font-semibold">{config.storage} GB NVMe</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">OS</span>
                    <span className="font-semibold text-sm">{osLabels[config.os] || config.os}</span>
                  </div>
                  {config.backup && (
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Backup</span>
                      <span className="font-semibold">Enabled</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Billing</span>
                    <span className="font-semibold capitalize">
                      {config.billingCycle === "6months" ? "6 Months" : config.billingCycle}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Amount</span>
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    ₹{price.toLocaleString()}
                    <span className="text-lg text-muted-foreground">
                      /{config.billingCycle === "monthly" ? "mo" : config.billingCycle === "6months" ? "6mo" : "yr"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>
                </div>

                {/* Submit Button - Desktop Only */}
                <div className="hidden lg:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={form.handleSubmit(onSubmit)}
                    type="button"
                    className="w-full py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-soft flex items-center justify-center gap-2"
                  >
                    <FiCheck className="h-5 w-5" />
                    Proceed to Payment
                  </motion.button>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCheck className="h-3 w-3 text-primary" />
                    <span>Secure SSL Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCheck className="h-3 w-3 text-primary" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCheck className="h-3 w-3 text-primary" />
                    <span>24/7 Premium Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCheck className="h-3 w-3 text-primary" />
                    <span>DDoS Protection Included</span>
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

export default Checkout;
