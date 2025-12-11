import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { InputField, TextAreaField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Spinner } from '../components/ui/Loader';
import { toast } from 'react-toastify';
import { required } from '../utils/validators';

export default function AddMeal() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [items, setItems] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!required(name)) newErrors.name = 'Meal name is required';
    if (!required(calories)) newErrors.calories = 'Calories are required';
    if (!required(items)) newErrors.items = 'Please list the meal items';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSaving(true);
      await api.post('/meals', {
        name,
        calories: Number(calories),
        items,
      });
      toast.success('Meal added');
      navigate('/meals');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save meal.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add meal"
        description="Log a meal with a clear calorie estimate so you can track your daily intake."
      />

      <form
        onSubmit={handleSubmit}
        className="glass-panel max-w-xl rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <InputField
          id="name"
          label="Meal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="High protein breakfast"
          error={errors.name}
        />
        <InputField
          id="calories"
          label="Calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="e.g., 520"
          error={errors.calories}
        />
        <TextAreaField
          id="items"
          label="Items"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Oats, eggs, milk..."
          error={errors.items}
          helperText="Separate food items with commas."
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving && <Spinner className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save meal'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/meals')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
