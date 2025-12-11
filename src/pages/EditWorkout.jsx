import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { InputField, TextAreaField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Spinner } from '../components/ui/Loader';
import { toast } from 'react-toastify';
import { required } from '../utils/validators';

export default function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/workouts/${id}`);
        const data = res.data;
        setTitle(data.title || '');
        setDuration(data.duration || '');
        setExercises(data.exercises || '');
      } catch (err) {
        console.error(err);
        toast.error('Unable to load workout.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!required(title)) newErrors.title = 'Title is required';
    if (!required(duration)) newErrors.duration = 'Duration is required';
    if (!required(exercises)) newErrors.exercises = 'Please list the exercises';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSaving(true);
      await api.put(`/workouts/${id}`, { title, duration, exercises });
      toast.success('Workout updated');
      navigate('/workouts');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update workout.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit workout"
        description="Adjust the details of your workout. Small tweaks can make a big difference."
      />

      <form
        onSubmit={handleSubmit}
        className="glass-panel max-w-xl rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <InputField
          id="title"
          label="Workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />
        <InputField
          id="duration"
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          error={errors.duration}
        />
        <TextAreaField
          id="exercises"
          label="Exercises"
          value={exercises}
          onChange={(e) => setExercises(e.target.value)}
          error={errors.exercises}
          helperText="Separate exercises with commas."
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving && <Spinner className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/workouts')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
