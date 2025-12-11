import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, required } from '../utils/validators';
import { InputField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { BrandMark } from '../components/ui/BrandMark';
import { FiCheckCircle, FiLock, FiMail, FiShield, FiTrendingUp } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('demo@fitness.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const featureBullets = [
    {
      icon: FiTrendingUp,
      title: 'Adaptive workouts',
      desc: 'Daily plans adjust with your performance and recovery.',
    },
    {
      icon: FiShield,
      title: 'Secure progress',
      desc: 'Bank-grade security keeps your history safe and synced.',
    },
    {
      icon: FiCheckCircle,
      title: 'Actionable nudges',
      desc: 'Smart reminders keep streaks alive without being noisy.',
    },
  ];

  const highlightStats = [
    { value: '18k+', label: 'Athletes onboard' },
    { value: '124', label: 'Day streak record' },
    { value: '92%', label: 'Goal completion' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!required(email) || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!required(password)) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      await login({ email, password });
      toast.success('Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-slateDark-900">
      <div
        className="absolute inset-0 bg-gradient-to-b from-slateDark-900 via-slateDark-800 to-slate-950"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-primary-500/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-8 sm:p-12 shadow-2xl shadow-primary-900/20 backdrop-blur-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-primary-200">
              <BrandMark orientation="horizontal" size="sm" />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                Trusted by coaches
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome back, athlete.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300">
              Sync your workouts, meals, and recovery insights in one calm
              dashboard. Everything is ready exactly where you left it —
              progress, streaks, coaching nudges, and more.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {highlightStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-slate-200"
                >
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4">
              {featureBullets.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 text-slate-200"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-sm text-slate-300">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
              <p className="font-semibold text-white">Pro tip</p>
              <p className="mt-2 text-slate-300">
                Demo credentials are already filled in. Tweak them or create
                your own account to keep personal data separate.
              </p>
            </div>
          </section>

          <section className="glass-panel relative rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                  Sign in
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Ready when you are
                </h2>
                <p className="text-sm text-slate-400">
                  Log in to resume planning, tracking, and hitting micro-goals.
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                Secure
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <p className="flex items-center gap-2 text-xs text-slate-400">
                  <FiMail className="h-3.5 w-3.5" />
                  <span>We use this to sync your reports & recovery tips.</span>
                </p>
              </div>

              <div className="space-y-2">
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Enter your password"
                />
                <p className="flex items-center gap-2 text-xs text-slate-400">
                  <FiLock className="h-3.5 w-3.5" />
                  <span>Minimum 8 characters — encryption is always on.</span>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 rounded-2xl py-3 text-base shadow-lg shadow-primary-900/30 transition hover:-translate-y-0.5"
                disabled={submitting}
              >
                {submitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-primary-200 hover:text-primary-100 hover:underline"
                >
                  Create one in seconds
                </Link>
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FiShield className="h-3.5 w-3.5" />
                <span>Multi-device sync, MFA ready, and privacy-first.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}