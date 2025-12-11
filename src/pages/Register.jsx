import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, minLength, required } from '../utils/validators';
import { InputField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { FiActivity, FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!required(name) || !minLength(name, 3)) {
      newErrors.name = 'Please enter your full name';
    }
    if (!required(email) || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!required(password) || !minLength(password, 6)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      await register({ name, email, password });
      toast.success('Account created! Welcome 🏋️‍♀️');
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 py-10">
      <div className="glass-panel relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800/60 px-6 py-8 shadow-soft sm:px-8">
        <div className="absolute -top-24 -right-16 h-44 w-44 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400">
              <FiActivity className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-50">
                Create your account
              </h1>
              <p className="text-xs text-slate-400">
                It only takes a minute to start planning your fitness journey.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="name"
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="John Doe"
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Choose a secure password"
            />

            <Button
              type="submit"
              className="mt-2 w-full gap-2"
              disabled={submitting}
            >
              <FiUserPlus className="h-4 w-4" />
              {submitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-300 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
