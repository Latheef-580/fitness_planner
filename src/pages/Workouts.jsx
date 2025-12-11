import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiActivity, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardSubtitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ListSkeleton } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import { toast } from 'react-toastify';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      setError(null);
      const res = await api.get('/workouts');
      setWorkouts(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load workouts.');
      toast.error('Unable to load workouts from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async () => {
    const id = deleteId;
    if (!id) return;
    try {
      await api.delete(`/workouts/${id}`);
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
      toast.success('Workout deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete workout.');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workouts"
        description="Plan structured workout sessions and keep them all in one clean dashboard."
        actions={
          <Button className="gap-2" onClick={() => navigate('/workouts/add')}>
            <FiPlus className="h-4 w-4" />
            Add workout
          </Button>
        }
      />

      {loading ? (
        <ListSkeleton items={3} />
      ) : error ? (
        <div className="glass-panel rounded-2xl p-4 text-sm text-rose-500">
          {error}
        </div>
      ) : workouts.length === 0 ? (
        <EmptyState
          title="No workouts yet"
          description="Start by creating your first session. Keep it simple and build consistency over time."
          ctaLabel="Create workout"
          onCta={() => navigate('/workouts/add')}
          icon={FiActivity}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workouts.map((w) => (
            <Card key={w.id} className="flex flex-col justify-between">
              <CardHeader>
                <div>
                  <CardTitle>{w.title}</CardTitle>
                  <CardSubtitle>{w.duration}</CardSubtitle>
                </div>
                <span className="rounded-full bg-primary-500/10 px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400">
                  Workout
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {w.exercises}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Link to={`/workouts/edit/${w.id}`}>
                      <Button
                        variant="secondary"
                        className="gap-1 text-xs"
                        title="Edit workout"
                      >
                        <FiEdit2 className="h-3 w-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="gap-1 text-xs text-rose-500 hover:text-rose-600"
                      onClick={() => setDeleteId(w.id)}
                      title="Delete workout"
                    >
                      <FiTrash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={deleteId != null}
        title="Delete workout?"
        description="This action cannot be undone. The workout will be permanently removed from your planner."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}








