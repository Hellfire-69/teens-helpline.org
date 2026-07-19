"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, ShieldWarning, Books, BookOpenText } from "@phosphor-icons/react";
import type { ParentDashboardData } from "@/features/dashboard/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function ParentDashboard({ data: _data }: { data: ParentDashboardData }) {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 30 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-space-6 pb-space-12"
    >
      <motion.div variants={itemVariants} className="mb-space-2">
        <h1 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-space-2">
          Parent Guidance
        </h1>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed">
          Welcome to the parent portal. Here you will find resources and information on how to support your teen effectively while respecting their privacy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6">
        
        {/* Confidentiality Notice */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
          <Card radius="lg" className="h-full bg-gradient-to-br from-paper-100 to-white dark:from-night-900 dark:to-night-950 border-aurora-dusk/20">
            <CardHeader className="pb-space-2">
              <CardTitle className="flex items-center gap-space-2 text-aurora-dusk text-type-title-md">
                <ShieldWarning weight="fill" className="w-6 h-6" /> 
                Privacy & Confidentiality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-space-4">
                <p className="text-type-body-md text-ink-600 dark:text-ink-300 leading-relaxed">
                  To ensure TeensHelpline remains a safe and trusted space, all conversations between your teen and our platform (including Nova and peer supporters) are <strong className="text-ink-900 dark:text-white">strictly confidential</strong>. 
                </p>
                <div className="p-space-4 bg-white dark:bg-black/20 rounded-radius-md border border-ink-300/10 text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  You will not have access to their chat logs, mood entries, or specific activities. We will only intervene or escalate if there is an imminent risk to their safety, in accordance with our safeguarding policies.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resources for Parents */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Card interactive radius="lg" className="h-full bg-aurora-dusk/5 dark:bg-aurora-dusk/10 border-aurora-dusk/20 shadow-sm flex flex-col justify-between">
            <div>
              <CardHeader className="pb-space-2">
                <CardTitle className="flex items-center gap-space-2 text-ink-900 dark:text-white text-type-title-md">
                  <Books weight="duotone" className="w-6 h-6 text-aurora-dusk" /> 
                  Parent Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mb-space-6 leading-relaxed">
                  Access articles and guides tailored for parents navigating teen mental health challenges. Learn how to be a supportive anchor.
                </p>
              </CardContent>
            </div>
            <div className="p-space-6 pt-0 mt-auto">
              <Button asChild variant="secondary" className="w-full bg-white/60 dark:bg-black/40 hover:bg-white border-white/40">
                <Link href="/study-hub">Browse Resources</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3">
          <Card radius="md" className="bg-aurora-sea/5 dark:bg-aurora-sea/10 border-aurora-sea/20">
            <CardContent className="p-space-6 flex gap-space-4 items-start md:items-center flex-col md:flex-row">
              <div className="w-12 h-12 rounded-radius-full bg-aurora-sea/20 flex flex-shrink-0 items-center justify-center">
                <Info weight="fill" className="w-6 h-6 text-aurora-sea" />
              </div>
              <div className="flex-1">
                <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white mb-space-1">Need help talking to your teen?</h3>
                <p className="text-type-body-sm text-ink-600 dark:text-ink-300">
                  It can be hard to know where to start. Check out our conversation starters and active listening guides in the Study Hub.
                </p>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4 md:mt-0 whitespace-nowrap bg-white hover:bg-ink-50 dark:bg-night-950 dark:hover:bg-ink-900">
                <Link href="/study-hub/article/conversation-starters">
                  <BookOpenText weight="duotone" className="w-4 h-4 mr-2" />
                  Read Guide
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}
