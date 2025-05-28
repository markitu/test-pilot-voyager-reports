
import { useState } from 'react';
import { TestRunsList } from './TestRunsList';
import { TestStatsDashboard } from './TestStatsDashboard';
import { mockTestRuns, mockStatistics } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

export const TestResultsTab = () => {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const handleSelectRun = (runId: string) => {
    setSelectedRunId(runId);
    console.log('Selected test run:', runId);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-green-600" size={24} />
            Test Results & Analytics
          </CardTitle>
          <CardDescription>
            Comprehensive view of test execution results, trends, and performance metrics.
          </CardDescription>
        </CardHeader>
      </Card>

      <TestStatsDashboard statistics={mockStatistics} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Recent Test Runs
          </CardTitle>
          <CardDescription>
            Click on any test run to view detailed results and execution logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TestRunsList runs={mockTestRuns} onSelectRun={handleSelectRun} />
        </CardContent>
      </Card>
    </div>
  );
};
