import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PageTransition from "../components/layout/PageTransition";
import PageLoader from "../components/ui/PageLoader";

// Route-based code splitting
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const TeamPage = lazy(() => import("../pages/TeamPage"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const EventsPage = lazy(() => import("../pages/EventsPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));


const AppRoutes = () => {
  const location = useLocation();

  return (
    // mode="wait" ensures the exit animation completes before the next page enters
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/team" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <TeamPage />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/events" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <EventsPage />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            </PageTransition>
          } 
        />
        {/* 404 Wildcard Route */}
        <Route 
          path="*" 
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;