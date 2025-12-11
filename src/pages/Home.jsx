import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiBarChart2, FiClock, FiList, FiArrowRight } from 'react-icons/fi';
import { api } from '../services/api';
import { Card, CardHeader, CardTitle, CardSubtitle, CardContent } from '../components/ui/Card';
import { PageHeader } from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { ListSkeleton } from '../components/ui/Loader';
import { toast } from 'react-toastify';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [wRes, mRes] = await Promise.all([
          api.get('/workouts'),
          api.get('/meals'),
        ]);
        setWorkouts(wRes.data || []);
        setMeals(mRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load overview data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const totalCalories = meals.reduce(
    (sum, m) => sum + Number(m.calories || 0),
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Today’s overview"
        description="Quick snapshot of your workouts and meals. Keep stacking those small wins everyday."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" as="a" href="#workouts">
              Jump to workouts
            </Button>
            <Link to="/workouts/add">
              <Button className="gap-2">
                <FiActivity className="h-4 w-4" />
                Plan workout
              </Button>
            </Link>
          </div>
        }
      />

      {/* Summary cards */}
      {loading ? (
        <ListSkeleton items={3} />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <div>
                <CardTitle>Total workouts</CardTitle>
                <CardSubtitle>Sessions you&apos;ve planned</CardSubtitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
                <FiActivity className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{totalWorkouts}</p>
              <p className="mt-1 text-xs text-muted">
                Aim for at least 3 per week to stay consistent.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div>
                <CardTitle>Total meals</CardTitle>
                <CardSubtitle>Logged meal plans</CardSubtitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <FiList className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{totalMeals}</p>
              <p className="mt-1 text-xs text-muted">
                Structure your day with balanced meals.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div>
                <CardTitle>Calories tracked</CardTitle>
                <CardSubtitle>From all planned meals</CardSubtitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <FiBarChart2 className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{totalCalories}</p>
              <p className="mt-1 text-xs text-muted">
                Use this to align your intake with your goals.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick access */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card id="workouts">
          <CardHeader>
            <div>
              <CardTitle>Next workout</CardTitle>
              <CardSubtitle>Stay ready for your next session</CardSubtitle>
            </div>
            <FiClock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            {workouts.length === 0 ? (
              <p className="text-sm text-muted">
                You haven&apos;t planned any workouts yet. Start by creating your
                first session.
              </p>
            ) : (
              <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-3 text-sm dark:border-slate-700 dark:bg-slateDark-800/70">
                <p className="font-medium text-slate-900 dark:text-slate-50">
                  {workouts[0].title}
                </p>
                <p className="mt-1 text-xs text-soft">
                  {workouts[0].duration} · {workouts[0].exercises}
                </p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/workouts">
                <Button variant="secondary" className="gap-1 text-xs sm:text-sm">
                  View all workouts
                  <FiArrowRight className="h-3 w-3" />
                </Button>
              </Link>
              <Link to="/workouts/add">
                <Button className="gap-1 text-xs sm:text-sm">
                  Plan new workout
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Meal planning</CardTitle>
              <CardSubtitle>Make nutrition work for you</CardSubtitle>
            </div>
          </CardHeader>
          <CardContent>
            {meals.length === 0 ? (
              <p className="text-sm text-muted">
                Plan your meals ahead to avoid last-minute decisions. Add a
                high-protein breakfast to get started.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {meals.slice(0, 3).map((m) => (
                  <li
                    key={m.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-2 dark:border-slate-700 dark:bg-slateDark-800/70"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-50">
                        {m.name}
                      </p>
                      <p className="text-xs text-soft">
                        {m.items}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                      {m.calories} kcal
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/meals">
                <Button variant="secondary" className="gap-1 text-xs sm:text-sm">
                  View all meals
                  <FiArrowRight className="h-3 w-3" />
                </Button>
              </Link>
              <Link to="/meals/add">
                <Button className="gap-1 text-xs sm:text-sm">
                  Log new meal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
