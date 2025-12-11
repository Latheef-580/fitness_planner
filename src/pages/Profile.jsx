import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardContent } from '../components/ui/Card';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Basic account details used across your Fitness Planner experience."
      />

      <Card className="max-w-xl">
        <CardContent>
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-50">
                {user.name}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-50">
                {user.email}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Member since</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-50">
                JSON-Server demo
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
