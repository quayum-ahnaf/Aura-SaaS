"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import CustomChart from "@/components/custom-chart";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Percent, 
  ArrowUpRight,
  ChevronRight,
  Activity,
  ArrowDownRight,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ActivityItem {
  id: string;
  user: string;
  email: string;
  action: string;
  time: string;
  status: "success" | "warning" | "error" | "info";
}

const recentActivities: ActivityItem[] = [
  {
    id: "act-1",
    user: "Sarah Connor",
    email: "s.connor@cyberdyne.com",
    action: "upgraded to Pro Plan ($29/mo)",
    time: "12 minutes ago",
    status: "success",
  },
  {
    id: "act-2",
    user: "Miles Dyson",
    email: "m.dyson@cyberdyne.com",
    action: "invoice payment #1042 past due",
    time: "2 hours ago",
    status: "warning",
  },
  {
    id: "act-3",
    user: "John Doe",
    email: "johndoe@gmail.com",
    action: "subscribed to Enterprise Plan ($99/mo)",
    time: "5 hours ago",
    status: "success",
  },
  {
    id: "act-4",
    user: "Ellen Ripley",
    email: "ripley@nostromo.org",
    action: "canceled subscription (churned)",
    time: "1 day ago",
    status: "error",
  },
  {
    id: "act-5",
    user: "Marcus Wright",
    email: "m.wright@projectangel.com",
    action: "created a Free account",
    time: "1 day ago",
    status: "info",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const metrics = [
    {
      title: "Monthly Recurring Revenue",
      value: "$48,250",
      change: "+12.4%",
      changeType: "up",
      icon: DollarSign,
      color: "indigo",
    },
    {
      title: "Active Customers",
      value: "3,124",
      change: "+8.2%",
      changeType: "up",
      icon: Users,
      color: "violet",
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: "-0.3%",
      changeType: "down",
      icon: Percent,
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          Welcome back, {user?.name || "Developer"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Here's an overview of your platform's subscription metrics and growth.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Top corners color accents */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none transition-opacity group-hover:opacity-15 ${
                metric.color === "indigo" ? "bg-indigo-500" :
                metric.color === "violet" ? "bg-violet-500" : "bg-emerald-500"
              }`} />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className={`p-2.5 rounded-xl ${
                  metric.color === "indigo" ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400" :
                  metric.color === "violet" ? "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400" :
                  "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {metric.value}
                </span>
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold ${
                  metric.changeType === "up" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" 
                    : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                }`}>
                  {metric.changeType === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                vs. previous 30 days
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <CustomChart />
      </motion.div>

      {/* Bottom Grid: Recent Activity Feed */}
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Recent Platform Activity
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                Real-time subscription operations and customer signups.
              </p>
            </div>
            <Link
              href="/subscriptions"
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              <span>View Customers</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  {/* Color-coded Activity Dot */}
                  <div className="relative flex items-center justify-center">
                    <span className={`h-2 w-2 rounded-full ${
                      activity.status === "success" ? "bg-emerald-500" :
                      activity.status === "warning" ? "bg-amber-500" :
                      activity.status === "error" ? "bg-rose-500" : "bg-blue-500"
                    }`} />
                    <span className={`absolute h-4.5 w-4.5 rounded-full animate-ping opacity-25 ${
                      activity.status === "success" ? "bg-emerald-400" :
                      activity.status === "warning" ? "bg-amber-400" :
                      activity.status === "error" ? "bg-rose-400" : "bg-blue-400"
                    }`} style={{ animationDuration: "3s" }} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200">
                      <span className="font-semibold text-zinc-950 dark:text-zinc-50">{activity.user}</span>{" "}
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">{activity.action}</span>
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {activity.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
