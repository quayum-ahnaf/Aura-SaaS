"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/components/toast";
import { User, Mail, Briefcase, Save, Loader2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setJobTitle(user.jobTitle);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !jobTitle) {
      toast({
        title: "ValidationError",
        description: "All fields are required to update your profile.",
        type: "error",
      });
      return;
    }

    setIsSaving(true);
    // Simulate brief API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateUser(name, email, jobTitle);
    setIsSaving(false);

    toast({
      title: "Profile Updated",
      description: "Your settings were saved successfully and synced across components.",
      type: "success",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Update your personal developer profile details and configuration settings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Personal Information
            </h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Provide your details to customize your navigation and invoice headers.
            </p>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="settings-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
                <input
                  id="settings-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSaving}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="settings-email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
                <input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSaving}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="settings-title" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Job Title
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
                <input
                  id="settings-title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={isSaving}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 py-2.5 px-6 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 font-semibold text-sm transition-all shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Information Cards */}
        <div className="space-y-6">
          {/* Security Mock Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-50 mb-3">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <KeyRound className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm">Security & Password</h4>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              To update your account password, secure SSO connections, or configure two-factor authentication, please configure a backend identity manager like Auth0 or Clerk.
            </p>
            <button
              disabled
              className="mt-4 w-full py-2 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-400 dark:text-zinc-650 cursor-not-allowed text-center"
            >
              Configure Identity Provider
            </button>
          </div>

          {/* Dev Info Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            {/* Soft color ambient indicator */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-2">Sandbox Status</h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              This settings panel writes state directly to React Context and persists it securely in your browser's local storage (`localStorage`). A hard reload will preserve your name, email, and custom changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
