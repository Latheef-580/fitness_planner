import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader } from '../components/ui/PageHeader';
import { InputField, TextAreaField } from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Spinner } from '../components/ui/Loader';
import { toast } from 'react-toastify';
import { required } from '../utils/validators';

export default function EditMeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [items, setItems] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/meals/${id}`);
        const data = res.data;
        setName(data.name || '');
        setCalories(data.calories || '');
        setItems(data.items || '');
      } catch (err) {
        console.error(err);
        toast.error('Unable to load meal.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

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
      await api.put(`/meals/${id}`, {
        name,
        calories: Number(calories),
        items,
      });
      toast.success('Meal updated');
      navigate('/meals');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update meal.');
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
        title="Edit meal"
        description="Fine-tune the meal details and keep your tracking accurate."
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
          error={errors.name}
        />
        <InputField
          id="calories"
          label="Calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          error={errors.calories}
        />
        <TextAreaField
          id="items"
          label="Items"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          error={errors.items}
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving && <Spinner className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save changes'}
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
