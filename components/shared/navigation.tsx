"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  House, 
  Books, 
  UsersThree, 
  ChatCircleDots, 
  Heartbeat, 
  Gear, 
  SignOut, 
  ShieldCheck, 
  UserCircle, 
  PenNib, 
  List, 
  X, 
  CaretLeft, 
  CaretRight 
} from "@phosphor-icons/react";
import { cn, easing } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { signOutAction } from "@/features/auth/actions";

// -----------------------------------------------------------------------------
// Sidebar Layout Context & Provider
// -----------------------------------------------------------------------------

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  const toggleCollapse = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Close mobile drawer on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      <div
        className="flex flex-1 h-full w-full"
        style={{
          "--sidebar-width": isCollapsed ? "80px" : "256px",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col h-full w-full md:ml-[var(--sidebar-width)] transition-[margin-left] duration-300 ease-in-out">
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Navigation Component (Desktop Collapsible Sidebar + Mobile Drawer)
// -----------------------------------------------------------------------------

export interface NavigationProps {
  role?: string | null;
  profile?: { alias: string | null } | null;
  type?: string | null;
  email?: string | null;
}

export function Navigation({ role, profile, type, email }: NavigationProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse, isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();
  const [hoveredNav, setHoveredNav] = React.useState<string | null>(null);

  // Route defaults to teen for anonymous/guests
  const dashboardHref = role === "parent" ? "/dashboard/parent" : "/dashboard/teen";

  const primaryNavItems = [
    { name: "Dashboard", href: dashboardHref, icon: House, disabled: false },
    { name: "Nova", href: "/chat", icon: ChatCircleDots, disabled: false },
    { name: "Mood Check", href: "/mood", icon: Heartbeat, disabled: false },
    { name: "Journal", href: "/journal", icon: PenNib, disabled: false },
    { name: "Peer Support", href: "/peer-support", icon: UsersThree, disabled: false },
    { name: "Support", href: "/consultation", icon: ShieldCheck, disabled: false },
    { name: "Study Hub", href: "/study-hub", icon: Books, disabled: false },
  ];

  // User Profile details formatted per Task 1
  const userAlias = profile?.alias || (email ? email.split("@")[0] : null) || (type === "anonymous" ? "Anonymous User" : "Guest User");
  const roleLabel = role === "parent" ? "Parent/Guardian" : role === "teen" ? "Teen" : type === "anonymous" ? "Anonymous" : "Guest";

  return (
    <>
      {/* --------------------------------------------------------------------- */}
      {/* Mobile Top Header with Hamburger Trigger                              */}
      {/* --------------------------------------------------------------------- */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-16 z-40 bg-white/70 dark:bg-night-950/70 bg-gradient-to-b from-aurora-dusk/[0.05] to-aurora-dusk/[0.03] backdrop-blur-[20px] border-b border-white/10 px-4 flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-md text-ink-900 dark:text-white hover:bg-ink-100/50 dark:hover:bg-ink-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
          >
            <List weight="duotone" className="w-6 h-6" />
          </button>
          <Link href={dashboardHref} className="flex items-center gap-2 outline-none rounded-radius-sm focus-visible:ring-2 focus-visible:ring-aurora-sea min-w-0">
            <Image
              src="/images/logo-v2.png"
              alt="TeensHelpline Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-radius-sm shrink-0"
            />
            <span className="font-fraunces text-[1.1875rem] font-semibold tracking-tight text-ink-900 dark:text-white truncate">
              TeensHelpline
            </span>
          </Link>
        </div>
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* Mobile Slide-Out Drawer & Backdrop Scrim                             */}
      {/* --------------------------------------------------------------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={easing.gentle}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-night-950/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={easing.gentle}
              className="md:hidden fixed top-0 left-0 bottom-0 z-40 w-80 max-w-[85vw] bg-white/85 dark:bg-night-950/85 bg-gradient-to-b from-aurora-dusk/[0.05] to-aurora-dusk/[0.03] backdrop-blur-[32px] border-r border-white/10 flex flex-col py-6 shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 mb-6">
                <Link
                  href={dashboardHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 outline-none rounded-radius-sm focus-visible:ring-2 focus-visible:ring-aurora-sea min-w-0"
                >
                  <Image
                    src="/images/logo-v2.png"
                    alt="TeensHelpline Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-radius-sm shrink-0"
                  />
                  <span className="font-fraunces text-[1.1875rem] font-semibold tracking-tight text-ink-900 dark:text-white truncate">
                    TeensHelpline
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-md text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                >
                  <X weight="duotone" className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Nav List */}
              <div className="flex-1 px-3 space-y-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-ink-300 mb-2 mt-2" aria-hidden="true">
                  Menu
                </p>
                {primaryNavItems.map((item) => {
                  const isActive = pathname === item.href || (item.name === "Dashboard" && pathname.startsWith("/dashboard"));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-3.5 px-4 py-3 min-h-[44px] rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
                        isActive
                          ? "text-aurora-sea"
                          : "text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 hover:text-ink-900 dark:hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-drawer-nav-indicator"
                          className="absolute inset-0 bg-aurora-sea/10 border border-aurora-sea/20 rounded-radius-md"
                          transition={easing.standard}
                        />
                      )}
                      <Icon weight={isActive ? "fill" : "duotone"} className="w-5 h-5 relative z-10 shrink-0" aria-hidden="true" />
                      <span className={cn("text-type-body-md relative z-10", isActive ? "font-semibold" : "font-medium")}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer: User Profile & Actions */}
              <div className="space-y-1 mt-auto pt-4 px-3 border-t border-ink-300/10">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 min-h-[44px] rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
                    pathname === "/profile"
                      ? "text-aurora-sea bg-aurora-sea/10"
                      : "text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 hover:text-ink-900 dark:hover:text-white"
                  )}
                >
                  <UserCircle weight={pathname === "/profile" ? "fill" : "duotone"} className="w-5 h-5 shrink-0" />
                  <span className={cn("text-type-body-md", pathname === "/profile" ? "font-semibold" : "font-medium")}>
                    Profile
                  </span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 min-h-[44px] rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
                    pathname === "/settings"
                      ? "text-aurora-sea bg-aurora-sea/10"
                      : "text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 hover:text-ink-900 dark:hover:text-white"
                  )}
                >
                  <Gear weight={pathname === "/settings" ? "fill" : "duotone"} className="w-5 h-5 shrink-0" />
                  <span className={cn("text-type-body-md", pathname === "/settings" ? "font-semibold" : "font-medium")}>
                    Settings
                  </span>
                </Link>

                {/* User Info & Logout */}
                <div className="pt-3 mt-2 border-t border-ink-300/10 px-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-radius-full bg-aurora-dusk/10 text-aurora-dusk flex items-center justify-center shrink-0">
                      <UserCircle weight="duotone" className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink-900 dark:text-white truncate">{userAlias}</p>
                      <p className="text-xs text-ink-400 truncate capitalize">{roleLabel}</p>
                    </div>
                  </div>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Log out of your account"
                      title="Log out"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-md text-ink-600 dark:text-ink-300 hover:bg-signal-crisis/10 hover:text-signal-crisis transition-colors shrink-0"
                    >
                      <SignOut weight="duotone" className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------------------------- */}
      {/* Desktop Collapsible Icon Sidebar                                      */}
      {/* --------------------------------------------------------------------- */}
      <motion.nav
        aria-label="Main navigation"
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={easing.standard}
        className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 bg-white/70 dark:bg-night-950/70 bg-gradient-to-b from-aurora-dusk/[0.05] to-aurora-dusk/[0.03] backdrop-blur-[20px] border-r border-white/10 flex-col py-6 overflow-hidden shadow-sm"
      >
        {/* Sidebar Header: Logo, Wordmark, and Collapse Trigger */}
        <div className={cn("flex items-center px-4 mb-8", isCollapsed ? "justify-center" : "justify-between")}>
          <Link
            href={dashboardHref}
            title="TeensHelpline"
            className="flex items-center gap-2.5 outline-none rounded-radius-sm focus-visible:ring-2 focus-visible:ring-aurora-sea shrink-0"
          >
            <Image
              src="/images/logo-v2.png"
              alt="TeensHelpline Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-radius-sm shrink-0"
            />
            {!isCollapsed && (
              <span className="font-fraunces text-[1.1875rem] font-semibold tracking-tight text-ink-900 dark:text-white truncate">
                TeensHelpline
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "p-2 rounded-radius-md text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea shrink-0",
              isCollapsed && "mt-4"
            )}
          >
            {isCollapsed ? <CaretRight weight="duotone" className="w-5 h-5" /> : <CaretLeft weight="duotone" className="w-5 h-5" />}
          </button>
        </div>

        {/* Primary Navigation List */}
        <div className={cn("flex-1 space-y-1", isCollapsed ? "px-3" : "px-4")}>
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-ink-300 mb-2 mt-4" aria-hidden="true">
              Menu
            </p>
          )}

          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Dashboard" && pathname.startsWith("/dashboard"));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                title={isCollapsed ? item.name : undefined}
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
                className={cn(
                  "relative flex items-center gap-3.5 py-2.5 rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                  isCollapsed ? "justify-center px-2" : "px-3.5",
                  isActive
                    ? "text-aurora-sea"
                    : "text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-indicator"
                    className="absolute inset-0 bg-aurora-sea/10 border border-aurora-sea/20 rounded-radius-md"
                    transition={easing.standard}
                  />
                )}
                {hoveredNav === item.name && !isActive && (
                  <motion.div
                    layoutId="desktop-nav-hover-pill"
                    className="absolute inset-0 bg-ink-100/80 dark:bg-night-800/80 rounded-radius-md"
                    initial={{ opacity: 0, scaleX: 0.95 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
                <Icon weight={isActive ? "fill" : "duotone"} className="w-5 h-5 relative z-10 shrink-0" aria-hidden="true" />
                {!isCollapsed && (
                  <span className={cn("text-type-body-md relative z-10 truncate", isActive ? "font-semibold" : "font-medium")}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Profile, Settings & Logout */}
        <div className={cn("space-y-1 mt-auto pt-4 border-t border-ink-300/10", isCollapsed ? "px-3" : "px-4")}>
          <Link
            href="/profile"
            title={isCollapsed ? "Profile" : undefined}
            onMouseEnter={() => setHoveredNav("profile")}
            onMouseLeave={() => setHoveredNav(null)}
            className={cn(
              "relative flex items-center gap-3.5 py-2.5 rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
              isCollapsed ? "justify-center px-2" : "px-3.5",
              pathname === "/profile"
                ? "text-aurora-sea bg-aurora-sea/10"
                : "text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white"
            )}
            aria-label="Profile"
          >
            {hoveredNav === "profile" && pathname !== "/profile" && (
              <motion.div
                layoutId="desktop-nav-hover-pill"
                className="absolute inset-0 bg-ink-100/80 dark:bg-night-800/80 rounded-radius-md"
                initial={{ opacity: 0, scaleX: 0.95 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.95 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />
            )}
            <UserCircle weight={pathname === "/profile" ? "fill" : "duotone"} className="w-5 h-5 shrink-0 relative z-10" aria-hidden="true" />
            {!isCollapsed && (
              <span className={cn("text-type-body-md truncate relative z-10", pathname === "/profile" ? "font-semibold" : "font-medium")}>
                Profile
              </span>
            )}
          </Link>

          <Link
            href="/settings"
            title={isCollapsed ? "Settings" : undefined}
            onMouseEnter={() => setHoveredNav("settings")}
            onMouseLeave={() => setHoveredNav(null)}
            className={cn(
              "relative flex items-center gap-3.5 py-2.5 rounded-radius-md transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
              isCollapsed ? "justify-center px-2" : "px-3.5",
              pathname === "/settings"
                ? "text-aurora-sea bg-aurora-sea/10"
                : "text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white"
            )}
            aria-label="Settings"
          >
            {hoveredNav === "settings" && pathname !== "/settings" && (
              <motion.div
                layoutId="desktop-nav-hover-pill"
                className="absolute inset-0 bg-ink-100/80 dark:bg-night-800/80 rounded-radius-md"
                initial={{ opacity: 0, scaleX: 0.95 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.95 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />
            )}
            <Gear weight={pathname === "/settings" ? "fill" : "duotone"} className="w-5 h-5 shrink-0 relative z-10" aria-hidden="true" />
            {!isCollapsed && (
              <span className={cn("text-type-body-md truncate relative z-10", pathname === "/settings" ? "font-semibold" : "font-medium")}>
                Settings
              </span>
            )}
          </Link>

          {/* User Profile Footer */}
          <div className={cn("pt-3 mt-2 border-t border-ink-300/10 flex items-center", isCollapsed ? "justify-center flex-col gap-2 px-1" : "justify-between px-2 gap-2")}>
            <div className={cn("flex items-center gap-2.5 min-w-0", isCollapsed && "justify-center")}>
              <div
                title={`${userAlias} (${roleLabel})`}
                className="w-8 h-8 rounded-radius-full bg-aurora-dusk/10 text-aurora-dusk flex items-center justify-center shrink-0"
              >
                <UserCircle weight="duotone" className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900 dark:text-white truncate">{userAlias}</p>
                  <p className="text-xs text-ink-400 truncate capitalize">{roleLabel}</p>
                </div>
              )}
            </div>

            <form action={signOutAction} className={cn(isCollapsed && "w-full flex justify-center")}>
              <button
                type="submit"
                title="Log out"
                aria-label="Log out of your account"
                className={cn(
                  "p-2 rounded-radius-md text-ink-600 dark:text-ink-300 hover:bg-signal-crisis/10 hover:text-signal-crisis transition-colors shrink-0",
                  isCollapsed ? "w-full flex justify-center" : ""
                )}
              >
                <SignOut weight="duotone" className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
