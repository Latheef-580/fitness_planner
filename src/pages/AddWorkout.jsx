import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { InputField, TextAreaField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Spinner } from '../components/ui/Loader';
import { toast } from 'react-toastify';
import { required } from '../utils/validators';

export default function AddWorkout() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

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
      await api.post('/workouts', { title, duration, exercises });
      toast.success('Workout added');
      navigate('/workouts');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save workout.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add workout"
        description="Create a structured workout with a clear duration and a list of exercises."
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
          placeholder="Full body strength"
          error={errors.title}
        />
        <InputField
          id="duration"
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 45 mins"
          error={errors.duration}
        />
        <TextAreaField
          id="exercises"
          label="Exercises"
          value={exercises}
          onChange={(e) => setExercises(e.target.value)}
          placeholder="Squats, bench press, deadlift..."
          error={errors.exercises}
          helperText="Separate exercises with commas."
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving && <Spinner className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save workout'}
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
