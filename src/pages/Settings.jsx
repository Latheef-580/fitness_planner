import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardContent, CardTitle, CardSubtitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Personalize how Fitness Planner looks and feels."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardSubtitle>
                  Switch between light and dark themes.
                </CardSubtitle>
              </div>
              <Button
                variant="secondary"
                className="gap-2"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <>
                    <FiSun className="h-4 w-4" />
                    Light mode
                  </>
                ) : (
                  <>
                    <FiMoon className="h-4 w-4" />
                    Dark mode
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
