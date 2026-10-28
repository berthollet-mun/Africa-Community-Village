/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/common/Toast';
import { PageProgressBar } from './components/common/PageProgressBar';
import { PageTransition } from './components/common/PageTransition';
import { GlobalPageLoader } from './components/common/Skeleton';
import { StartupLoader } from './components/common/StartupLoader';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { ApproachPage } from './components/pages/ApproachPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { DonatePage } from './components/pages/DonatePage';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { currentRoute, isAdminAuthenticated } = useApp();

  // If visiting any admin route, handle with isolated admin layout (never double headers)
  const isAdminRoute =
    currentRoute === '/admin' ||
    currentRoute === '/admin/login' ||
    currentRoute === '/admin/dashboard' ||
    currentRoute.startsWith('/admin/');

  if (isAdminRoute) {
    if (isAdminAuthenticated) {
      return (
        <div className="min-h-screen flex flex-col font-sans text-[#232826] bg-[#F3EDE1]">
          <PageProgressBar />
          <PageTransition key="admin-dashboard">
            <AdminDashboard />
          </PageTransition>
          <AdminLoginModal />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans text-[#232826] bg-[#232826] p-4 relative">
          <PageProgressBar />
          <AdminDashboard />
          <AdminLoginModal />
        </div>
      );
    }
  }

  // Route selector for public site
  const renderPage = () => {
    if (currentRoute === '/') {
      return <HomePage />;
    }
    if (currentRoute.startsWith('/about')) {
      return <AboutPage />;
    }
    if (currentRoute.startsWith('/programs')) {
      return <ProgramsPage />;
    }
    if (currentRoute === '/approach') {
      return <ApproachPage />;
    }
    if (currentRoute === '/blog') {
      return <BlogPage />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }
    if (currentRoute === '/donate') {
      return <DonatePage />;
    }
    // Fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#232826] bg-[#F3EDE1] selection:bg-[#EFA62B]/30 selection:text-[#690C07]">
      <PageProgressBar />
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <PageTransition key={currentRoute}>
            {renderPage()}
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <AdminLoginModal />
    </div>
  );
};

interface AppProps {
  initialRoute?: string;
}

export default function App({ initialRoute = '/' }: AppProps) {
  const [startupDone, setStartupDone] = React.useState(() => {
    // Show splash startup loader on session start
    return typeof window !== 'undefined' && sessionStorage.getItem('acv_startup_completed') === 'true';
  });

  const handleStartupComplete = () => {
    sessionStorage.setItem('acv_startup_completed', 'true');
    setStartupDone(true);
  };

  return (
    <AppProvider initialRoute={initialRoute}>
      <ToastProvider>
        {!startupDone && (
          <StartupLoader
            minDurationMs={1500}
            onComplete={handleStartupComplete}
          />
        )}
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}
