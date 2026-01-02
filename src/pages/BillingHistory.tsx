import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Download, 
  FileText, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock,
  ArrowLeft,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  plan: string;
  billingPeriod: string;
}

const invoices: Invoice[] = [
  {
    id: "INV-2025-001",
    date: "2025-01-01",
    amount: 1499,
    status: "paid",
    description: "VPS Starter Plan - Monthly",
    plan: "Starter",
    billingPeriod: "Jan 2025",
  },
  {
    id: "INV-2024-012",
    date: "2024-12-01",
    amount: 1499,
    status: "paid",
    description: "VPS Starter Plan - Monthly",
    plan: "Starter",
    billingPeriod: "Dec 2024",
  },
  {
    id: "INV-2024-011",
    date: "2024-11-01",
    amount: 2999,
    status: "paid",
    description: "VPS Professional Plan - Monthly",
    plan: "Professional",
    billingPeriod: "Nov 2024",
  },
  {
    id: "INV-2024-010",
    date: "2024-10-01",
    amount: 2999,
    status: "paid",
    description: "VPS Professional Plan - Monthly",
    plan: "Professional",
    billingPeriod: "Oct 2024",
  },
  {
    id: "INV-2024-009",
    date: "2024-09-01",
    amount: 2999,
    status: "pending",
    description: "VPS Professional Plan - Monthly",
    plan: "Professional",
    billingPeriod: "Sep 2024",
  },
];

const BillingHistory = () => {
  const [filter, setFilter] = useState<string>("all");

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });

  const handleDownload = (invoice: Invoice) => {
    // Generate invoice content
    const invoiceContent = `
PLANNING EARTH CLOUD
Invoice: ${invoice.id}
----------------------------------------
Date: ${new Date(invoice.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
Description: ${invoice.description}
Billing Period: ${invoice.billingPeriod}
----------------------------------------
Amount: ₹${invoice.amount.toLocaleString("en-IN")}
Status: ${invoice.status.toUpperCase()}
----------------------------------------
Thank you for your business!
    `.trim();

    // Create blob and download
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Failed
          </Badge>
        );
    }
  };

  const totalSpent = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Billing History</h1>
          <p className="text-muted-foreground mt-1">
            View and download your past invoices
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold text-foreground">
                  ₹{totalSpent.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-xl font-bold text-foreground">
                  {invoices.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-foreground">
                  {invoices.filter((i) => i.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-lg font-semibold text-foreground">Invoices</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Invoice List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {invoice.id}
                      </h3>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(invoice.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-12 md:ml-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      ₹{invoice.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.billingPeriod}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(invoice)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingHistory;
