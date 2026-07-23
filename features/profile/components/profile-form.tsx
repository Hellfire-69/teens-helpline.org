"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "../schema";
import { updateProfile } from "../service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Companion } from "@/features/onboarding/components/companions/Companions";
import { AlertCircle, CheckCircle, Mail, Calendar, Sparkles, User as UserIcon } from "lucide-react";
import type { AuthUserContext } from "@/features/auth/types";
import { signOutAction } from "@/features/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { motion } from "motion/react";

const COMPANIONS = [
  { id: "lumina", name: "Lumina" },
  { id: "bramble", name: "Bramble" },
  { id: "pip", name: "Pip" },
  { id: "zephyr", name: "Zephyr" },
  { id: "orion", name: "Orion" },
  { id: "nova-spark", name: "Nova Spark" },
  { id: "ember", name: "Ember" },
  { id: "moss", name: "Moss" },
  { id: "puddle", name: "Puddle" },
  { id: "cloud", name: "Cloud" },
];

const AGE_BANDS = ["13-15", "16-19", "Prefer not to say"];

export function ProfileForm({ auth }: { auth: AuthUserContext }) {
  const { profile, user } = auth;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      alias: profile?.alias || "",
      age_band: profile?.age_band || "",
      avatar_id: auth.preferences?.avatar_id || null,
    },
  });

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  if (!profile) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Card className="max-w-md w-full bg-white/60 dark:bg-night-950/60 border-white/20 backdrop-blur-xl text-center shadow-lg rounded-radius-xl">
            <CardContent className="pt-8 pb-10 px-8 space-y-6">
              <div className="w-20 h-20 bg-aurora-dusk/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-10 h-10 text-aurora-dusk" />
              </div>
              <h2 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white">
                Anonymous Session
              </h2>
              <p className="text-type-body-md text-ink-600 dark:text-ink-300">
                You are currently browsing anonymously. We don't save any profile data for anonymous sessions to ensure your privacy. 
                If you want to save your preferences and chat history, please create a persistent account.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      await updateProfile(values);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update profile.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (password.length < 6) {
      setPasswordMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setPasswordMessage({ type: "error", text: error.message });
    } else {
      setPasswordMessage({ type: "success", text: "Password updated successfully." });
      setPassword("");
    }
  };

  const currentAvatarId = form.watch("avatar_id");
  const currentAlias = form.watch("alias") || "Choose an alias";
  const currentAge = form.watch("age_band") || "Not set";
  
  // Safe date formatting
  let memberSince = "Recently";
  try {
    if (profile.created_at) {
      memberSince = new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
  } catch {
    // Ignore invalid dates
  }

  return (
    <div className="max-w-[1120px] mx-auto w-full pb-16 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-type-display font-fraunces font-semibold text-ink-900 dark:text-white mb-2">
          Your Profile
        </h1>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300">
          Manage how you appear on the platform. Remember, you never need to use your real name.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-8">
        
        {/* Left Column: Identity Preview */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4"
        >
          <Card className="bg-white/70 dark:bg-night-950/70 shadow-md border-white/20 backdrop-blur-xl overflow-hidden relative rounded-radius-xl">
            {/* Soft gradient header mimicking aurora mesh */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-aurora-dusk/20 via-aurora-sea/20 to-aurora-dawn/20 opacity-70" />
            
            <CardContent className="pt-16 pb-8 px-6 text-center relative z-10">
              <div className="w-32 h-32 mx-auto mb-6 bg-paper-50 dark:bg-night-900 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-night-950 relative transition-transform duration-500 hover:scale-[1.02]">
                 <Companion id={(currentAvatarId as Parameters<typeof Companion>[0]["id"]) || "nova-spark"} size={72} animate={true} />
              </div>
              
              <h2 className="text-type-title-lg font-fraunces font-semibold text-ink-900 dark:text-white mb-2">
                {currentAlias}
              </h2>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-sea/10 text-aurora-sea text-type-label mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                {profile.role}
              </div>

              <div className="space-y-5 text-left border-t border-ink-300/15 pt-6">
                <div className="flex items-center gap-4 text-type-body-md text-ink-700 dark:text-ink-200">
                  <div className="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-ink-500" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-type-body-sm text-ink-400">Account Email</span>
                    <span className="truncate font-medium">{user?.email || "No email linked"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-type-body-md text-ink-700 dark:text-ink-200">
                  <div className="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4 text-ink-500" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-type-body-sm text-ink-400">Age Band</span>
                    <span className="truncate font-medium">{currentAge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-type-body-md text-ink-700 dark:text-ink-200">
                  <div className="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-ink-500" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-type-body-sm text-ink-400">Member Since</span>
                    <span className="truncate font-medium">{memberSince}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Editable Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8"
        >
          <div className="flex flex-col gap-6 h-full">
            {/* Identity Settings Card */}
            <Card className="bg-white/60 dark:bg-night-950/60 shadow-sm border-white/20 backdrop-blur-xl rounded-radius-xl">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                
                {/* Identity Settings */}
                <div className="space-y-6">
                  <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white border-b border-ink-300/15 pb-4">
                    Identity Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-type-label text-ink-700 dark:text-ink-200 block">Alias</label>
                      <Input 
                        {...form.register("alias")} 
                        placeholder="Choose an alias" 
                        className="w-full bg-white dark:bg-night-900"
                      />
                      {form.formState.errors.alias && (
                        <p className="text-type-body-sm text-signal-crisis mt-1">{form.formState.errors.alias.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-type-label text-ink-700 dark:text-ink-200 block">Age Band</label>
                      <div className="relative">
                        <select 
                          {...form.register("age_band")}
                          className="w-full h-[44px] rounded-radius-sm border border-ink-300/30 bg-white dark:bg-night-900 px-4 py-2 text-type-body-md text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-aurora-sea/50 transition-all appearance-none"
                        >
                          <option value="" disabled>Select your age band</option>
                          {AGE_BANDS.map(band => (
                            <option key={band} value={band}>{band}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-ink-400">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      {form.formState.errors.age_band && (
                        <p className="text-type-body-sm text-signal-crisis mt-1">{form.formState.errors.age_band.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-6">
                  <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white border-b border-ink-300/15 pb-4">
                    Companion Avatar
                  </h3>
                  <div className="space-y-4">
                    <p className="text-type-body-sm text-ink-500 dark:text-ink-400">
                      Choose a companion to represent you across the platform.
                    </p>
                    <Controller
                      control={form.control}
                      name="avatar_id"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {COMPANIONS.map((c) => {
                            const isSelected = field.value === c.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => field.onChange(c.id)}
                                className={`
                                  group relative flex flex-col items-center justify-center p-4 rounded-radius-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                  ${isSelected 
                                    ? "bg-aurora-sea/10 border-2 border-aurora-sea scale-[1.02] shadow-sm" 
                                    : "bg-white/50 dark:bg-night-900/50 border border-ink-300/20 hover:border-ink-300/40 hover:bg-white dark:hover:bg-night-900"
                                  }
                                `}
                              >
                                <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                                  <Companion id={c.id as Parameters<typeof Companion>[0]["id"]} size={48} animate={isSelected} />
                                </div>
                                <span className={`text-[11px] font-medium transition-colors ${isSelected ? "text-aurora-sea" : "text-ink-600 dark:text-ink-300"}`}>
                                  {c.name}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    />
                  </div>
                </div>

                {message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className={`p-4 rounded-radius-md flex items-start gap-3 border ${
                      message.type === 'success' 
                        ? 'bg-signal-safe/5 border-signal-safe/20 text-signal-safe' 
                        : 'bg-signal-crisis/5 border-signal-crisis/20 text-signal-crisis'
                    }`}
                  >
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <p className="text-sm font-medium">{message.text}</p>
                  </motion.div>
                )}

                <div className="pt-6 flex items-center justify-end border-t border-ink-300/15">
                  <Button type="submit" variant="primary" disabled={isSubmitting} className="min-w-[140px]">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
                
                </form>
              </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card className="bg-white/60 dark:bg-night-950/60 shadow-sm border-white/20 backdrop-blur-xl rounded-radius-xl">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-6">
                  <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white border-b border-ink-300/15 pb-4">
                    Account Settings
                  </h3>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2 max-w-sm">
                    <label className="text-type-label text-ink-700 dark:text-ink-200 block">Change Password</label>
                    <Input 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password" 
                      className="w-full bg-white dark:bg-night-900"
                    />
                  </div>
                  {passwordMessage && (
                    <p className={`text-type-body-sm ${passwordMessage.type === "success" ? "text-signal-safe" : "text-signal-crisis"}`}>
                      {passwordMessage.text}
                    </p>
                  )}
                  <Button type="submit" variant="secondary" className="min-w-[140px]">
                    Update Password
                  </Button>
                </form>

                <div className="pt-8">
                  <Button onClick={() => signOutAction()} variant="destructive" className="bg-signal-crisis/10 text-signal-crisis hover:bg-signal-crisis hover:text-white transition-colors">
                    Logout
                  </Button>
                </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
