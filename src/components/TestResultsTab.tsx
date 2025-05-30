
import { useState } from 'react';
import { TestRunsList } from './TestRunsList';
import { TestStatsDashboard } from './TestStatsDashboard';
import { mockTestRuns, mockStatistics } from '../data/mockData';
import { BarChart3, TrendingUp } from 'lucide-react';
import { T } from '@admiral-ds/react-ui';

export const TestResultsTab = () => {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const handleSelectRun = (runId: string) => {
    setSelectedRunId(runId);
    console.log('Selected test run:', runId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={24} className="text-green-600" />
          <T font="Header/H3">Test Results & Analytics</T>
        </div>
        <T font="Body/BodyM">
          Comprehensive view of test execution results, trends, and performance metrics.
        </T>
      </div>

      <TestStatsDashboard statistics={mockStatistics} />

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={20} className="text-blue-600" />
          <T font="Header/H4">Recent Test Runs</T>
        </div>
        <T font="Body/BodyM" className="mb-4">
          Click on any test run to view detailed results and execution logs.
        </T>
        <TestRunsList runs={mockTestRuns} onSelectRun={handleSelectRun} />
      </div>
    </div>
  );
};
