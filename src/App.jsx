import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import EditWorkout from './pages/EditWorkout';
import Meals from './pages/Meals';
import AddMeal from './pages/AddMeal';
import EditMeal from './pages/EditMeal';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* Dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/workouts"
            element={
              <PageTransition>
                <Workouts />
              </PageTransition>
            }
          />
          <Route
            path="/workouts/add"
            element={
              <PageTransition>
                <AddWorkout />
              </PageTransition>
            }
          />
          <Route
            path="/workouts/edit/:id"
            element={
              <PageTransition>
                <EditWorkout />
              </PageTransition>
            }
          />
          <Route
            path="/meals"
            element={
              <PageTransition>
                <Meals />
              </PageTransition>
            }
          />
          <Route
            path="/meals/add"
            element={
              <PageTransition>
                <AddMeal />
              </PageTransition>
            }
          />
          <Route
            path="/meals/edit/:id"
            element={
              <PageTransition>
                <EditMeal />
              </PageTransition>
            }
          />
          <Route
            path="/settings"
            element={
              <PageTransition>
                <Settings />
              </PageTransition>
            }
          />
          <Route
            path="/profile"
            element={
              <PageTransition>
                <Profile />
              </PageTransition>
            }
          />
        </Route>

        {/* Not found */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
