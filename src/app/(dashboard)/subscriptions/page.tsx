"use client";

import React, { useState } from "react";
import { Search, Filter, AlertCircle, ShieldAlert, Check, X, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Past due" | "Canceled";
  plan: "Free" | "Pro Plan" | "Enterprise Plan";
  price: string;
  joined: string;
}

const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Sarah Connor",
    email: "s.connor@cyberdyne.com",
    status: "Active",
    plan: "Pro Plan",
    price: "$29/mo",
    joined: "Jan 12, 2026",
  },
  {
    id: "cust-2",
    name: "John Doe",
    email: "johndoe@gmail.com",
    status: "Active",
    plan: "Enterprise Plan",
    price: "$99/mo",
    joined: "Feb 05, 2026",
  },
  {
    id: "cust-3",
    name: "Miles Dyson",
    email: "m.dyson@cyberdyne.com",
    status: "Past due",
    plan: "Pro Plan",
    price: "$29/mo",
    joined: "Mar 21, 2026",
  },
  {
    id: "cust-4",
    name: "Ellen Ripley",
    email: "ripley@nostromo.org",
    status: "Canceled",
    plan: "Free",
    price: "$0/mo",
    joined: "Apr 15, 2026",
  },
  {
    id: "cust-5",
    name: "Marcus Wright",
    email: "m.wright@projectangel.com",
    status: "Active",
    plan: "Pro Plan",
    price: "$29/mo",
    joined: "May 11, 2026",
  },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
            Customers & Subscriptions
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Manage your user accounts, subscription tiers, and payment statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8.5 bg-zinc-900/5 text-zinc-950 dark:bg-zinc-100/10 dark:text-zinc-50 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
            Total Customers: {mockCustomers.length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400 dark:text-zinc-500 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Past due">Past due</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Plan Tier
                </th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Monthly Rate
                </th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8.5 w-8.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold text-xs shadow-inner">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
                            {customer.name}
                          </p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        {customer.plan === "Enterprise Plan" ? (
                          <ShieldCheck className="h-4 w-4 text-violet-500" />
                        ) : customer.plan === "Pro Plan" ? (
                          <Check className="h-4 w-4 text-indigo-500" />
                        ) : (
                          <X className="h-4 w-4 text-zinc-400" />
                        )}
                        <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                          {customer.plan}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-650 dark:text-zinc-400 font-medium">
                      {customer.price}
                    </td>
                    <td className="py-4 px-6">
                      {customer.status === "Active" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                      {customer.status === "Past due" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Past due
                        </span>
                      )}
                      {customer.status === "Canceled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 ring-1 ring-zinc-500/20 dark:ring-zinc-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                          Canceled
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-400 dark:text-zinc-500">
                      {customer.joined}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 px-6 text-center text-sm text-zinc-450 dark:text-zinc-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8 text-zinc-300 dark:text-zinc-700" />
                      <p className="font-semibold text-zinc-600 dark:text-zinc-450">No customers found</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">Try adjusting your filters or search query.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
