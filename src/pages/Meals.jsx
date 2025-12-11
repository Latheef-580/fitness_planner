import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiCoffee, FiPlus, FiTrash2 } from 'react-icons/fi';

import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardSubtitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ListSkeleton } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import { toast } from 'react-toastify';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchMeals = async () => {
    try {
      setError(null);
      const res = await api.get('/meals');
      setMeals(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load meals.');
      toast.error('Unable to load meals from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async () => {
    const id = deleteId;
    if (!id) return;
    try {
      await api.delete(`/meals/${id}`);
      setMeals((prev) => prev.filter((m) => m.id !== id));
      toast.success('Meal deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete meal.');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meals"
        description="Log meals and calories so your nutrition supports your training."
        actions={
          <Button className="gap-2" onClick={() => navigate('/meals/add')}>
            <FiPlus className="h-4 w-4" />
            Add meal
          </Button>
        }
      />

      {loading ? (
        <ListSkeleton items={3} />
      ) : error ? (
        <div className="glass-panel rounded-2xl p-4 text-sm text-rose-500">
          {error}
        </div>
      ) : meals.length === 0 ? (
        <EmptyState
          title="No meals logged"
          description="Start by adding a simple breakfast or post-workout meal. You can always refine later."
          ctaLabel="Add meal"
          onCta={() => navigate('/meals/add')}
          icon={FiLeaf}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {meals.map((m) => (
            <Card key={m.id} className="flex flex-col justify-between">
              <CardHeader>
                <div>
                  <CardTitle>{m.name}</CardTitle>
                  <CardSubtitle>{m.items}</CardSubtitle>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  {m.calories} kcal
                </span>
              </CardHeader>
              <CardContent>
                <div className="mt-2 flex justify-between gap-2">
                  <div className="flex gap-2">
                    <Link to={`/meals/edit/${m.id}`}>
                      <Button
                        variant="secondary"
                        className="gap-1 text-xs"
                        title="Edit meal"
                      >
                        <FiEdit2 className="h-3 w-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="gap-1 text-xs text-rose-500 hover:text-rose-600"
                      onClick={() => setDeleteId(m.id)}
                      title="Delete meal"
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
        title="Delete meal?"
        description="This action cannot be undone. The meal will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}
