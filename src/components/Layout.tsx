import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCloud, FiMenu, FiX, FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "VPS Hosting", path: "/vps-plans" },
    { name: "Pricing", path: "/vps-plans" },
    { name: "Support", path: "#support" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-border bg-background/95 backdrop-blur-sm shadow-soft"
            : "border-b border-transparent bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-primary"
              >
                <FiCloud className="h-8 w-8" />
              </motion.div>
              <motion.span
                className="text-xl font-bold text-foreground"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Planning Earth Cloud
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.div key={link.path + link.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors ${
                      isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path + link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                          isActive(link.path)
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="flex flex-col gap-2 pt-4 border-t border-border"
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full px-4 py-3 text-sm font-medium text-center rounded-xl border border-border hover:bg-secondary transition-colors">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full px-4 py-3 text-sm font-semibold text-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Get Started
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FiCloud className="h-8 w-8 text-primary" />
                <span className="font-bold text-lg text-foreground">Planning Earth Cloud</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enterprise-grade VPS hosting with unmatched performance and reliability. Scale with confidence.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-4">
                {[
                  { icon: FiGithub, href: "#", label: "GitHub" },
                  { icon: FiTwitter, href: "#", label: "Twitter" },
                  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FiMail, href: "#", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/30 transition-all group"
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Hosting Section */}
            <div>
              <h3 className="font-bold text-base mb-6 text-foreground">Hosting</h3>
              <ul className="space-y-3">
                {[
                  { name: "VPS Plans", to: "/vps-plans" },
                  { name: "Configure VPS", to: "/configure-vps" },
                  { name: "Pricing", to: "/vps-plans" },
                  { name: "Data Centers", to: "#" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="font-bold text-base mb-6 text-foreground">Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: "Documentation", href: "#" },
                  { name: "API Reference", href: "#" },
                  { name: "Support Center", href: "#" },
                  { name: "Status Page", href: "#" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-bold text-base mb-6 text-foreground">Legal</h3>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Cookie Policy", href: "#" },
                  { name: "GDPR", href: "#" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Planning Earth Cloud. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Trust Center
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Compliance
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
