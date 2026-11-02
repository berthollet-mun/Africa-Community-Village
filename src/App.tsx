/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/common/Toast';
import { PageProgressBar } from './components/common/PageProgressBar';
import { PageTransition } from './components/common/PageTransition';
import { RouteContentSkeleton } from './components/common/Skeleton';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AnimatePresence } from 'motion/react';
import { MotionSystem } from './components/motion/MotionSystem';

const HomePage = lazy(() =>
  import('./components/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const AboutPage = lazy(() =>
  import('./components/pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const ProgramsPage = lazy(() =>
  import('./components/pages/ProgramsPage').then((module) => ({ default: module.ProgramsPage }))
);
const ApproachPage = lazy(() =>
  import('./components/pages/ApproachPage').then((module) => ({ default: module.ApproachPage }))
);
const BlogPage = lazy(() =>
  import('./components/pages/BlogPage').then((module) => ({ default: module.BlogPage }))
);
const ContactPage = lazy(() =>
  import('./components/pages/ContactPage').then((module) => ({ default: module.ContactPage }))
);
const DonatePage = lazy(() =>
  import('./components/pages/DonatePage').then((module) => ({ default: module.DonatePage }))
);
const DonateSuccessPage = lazy(() =>
  import('./components/pages/DonateSuccessPage').then((module) => ({ default: module.DonateSuccessPage }))
);
const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard }))
);

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
          <Suspense fallback={<RouteContentSkeleton route={currentRoute} />}>
            <PageTransition key="admin-dashboard">
              <AdminDashboard />
            </PageTransition>
          </Suspense>
          <AdminLoginModal />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans text-[#232826] bg-[#232826] p-4 relative">
          <PageProgressBar />
          <Suspense fallback={<RouteContentSkeleton route={currentRoute} />}>
            <AdminDashboard />
          </Suspense>
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
    if (currentRoute === '/donate/success') {
      return <DonateSuccessPage />;
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
        <Suspense fallback={<RouteContentSkeleton route={currentRoute} />}>
          <AnimatePresence mode="sync" initial={false}>
            <PageTransition key={currentRoute}>
              {renderPage()}
            </PageTransition>
          </AnimatePresence>
        </Suspense>
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
  return (
    <AppProvider initialRoute={initialRoute}>
      <ToastProvider>
        <MotionSystem>
          <AppContent />
        </MotionSystem>
      </ToastProvider>
    </AppProvider>
  );
}
