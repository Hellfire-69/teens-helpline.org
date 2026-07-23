"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WarningCircle, UserCircle, Trash, SignOut } from "@phosphor-icons/react";
import type { AuthUserContext } from "@/features/auth/types";
import { anonymizeUserData, signOut } from "../service";
import { motion } from "motion/react";

export function SettingsPageClient({ auth }: { auth: AuthUserContext }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteData = async () => {
    setIsDeleting(true);
    try {
      await anonymizeUserData();
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const isAnonymous = auth.type === "anonymous" || auth.type === "guest";

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300">
          Manage your account, session, and data preferences.
        </p>
      </motion.div>

      {/* Account Section */}
      <Card className="bg-white/60 dark:bg-night-950/60 shadow-sm border-white/20 backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-ink-300/10">
          <CardTitle className="flex items-center gap-2 text-type-title-md">
            <UserCircle weight="fill" className="w-5 h-5 text-aurora-dusk" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-type-body-md font-medium text-ink-900 dark:text-white">
                {isAnonymous ? "Anonymous Session" : "Persistent Account"}
              </p>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300">
                {isAnonymous 
                  ? "You are currently browsing anonymously." 
                  : (auth.user?.email ? `Signed in as ${auth.user.email}` : "Signed in.")}
              </p>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="w-full md:w-auto">
              <SignOut weight="bold" className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session / Data Section */}
      <Card className="bg-white/60 dark:bg-night-950/60 shadow-sm border-white/20 backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-ink-300/10">
          <CardTitle className="flex items-center gap-2 text-type-title-md text-signal-crisis">
            <WarningCircle weight="fill" className="w-5 h-5" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {isAnonymous ? (
            <div className="p-4 bg-ink-50 dark:bg-night-900 rounded-radius-md border border-ink-300/20 text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              <strong>Note:</strong> Your session data is not recoverable if you leave or sign out. We do not store any personal information or persistent chat history for anonymous users.
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="max-w-md">
                <p className="text-type-body-md font-medium text-ink-900 dark:text-white mb-1">
                  Delete My Data
                </p>
                <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  This will permanently anonymize your profile. Your alias and avatar will be removed, and you will be signed out. This action is irreversible.
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger render={<Button variant="destructive" className="w-full md:w-auto shrink-0 mt-2 md:mt-0" />}>
                  <Trash weight="bold" className="w-4 h-4 mr-2" />
                  Delete My Data
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-signal-crisis flex items-center gap-2">
                      <WarningCircle weight="fill" className="w-5 h-5" />
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription className="text-type-body-md pt-2">
                      This action will permanently remove your alias and avatar from our systems. 
                      Your safety records and past anonymous usage data may be retained for safety and auditing purposes, but they will no longer be linked to your identity.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-6 flex gap-3">
                    <DialogTrigger render={<Button variant="ghost" />}>
                      Cancel
                    </DialogTrigger>
                    <Button variant="destructive" onClick={handleDeleteData} disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Yes, delete my data"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
