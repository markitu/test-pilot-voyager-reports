
import { Clock, CheckCircle, XCircle, SkipForward, Calendar } from 'lucide-react';
import { TestRun } from '../types/test';
import { T, Badge } from '@admiral-ds/react-ui';

interface TestRunsListProps {
  runs: TestRun[];
  onSelectRun: (runId: string) => void;
}

const statusColors = {
  completed: '#4caf50',
  running: '#2196f3',
  failed: '#f44336'
};

export const TestRunsList = ({ runs, onSelectRun }: TestRunsListProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getSuccessRate = (run: TestRun) => {
    return (run.passedTests / run.totalTests) * 100;
  };

  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <div 
          key={run.id}
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
          onClick={() => onSelectRun(run.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: statusColors[run.status] }}
              />
              <T font="Header/H5">{run.suiteName}</T>
              <Badge appearance={run.status === 'completed' ? 'success' : run.status === 'failed' ? 'error' : 'info'}>
                {run.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{formatDate(run.startTime)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm">
                <span className="font-semibold text-green-600">{run.passedTests}</span> passed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-red-600" />
              <span className="text-sm">
                <span className="font-semibold text-red-600">{run.failedTests}</span> failed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SkipForward size={16} className="text-orange-600" />
              <span className="text-sm">
                <span className="font-semibold text-orange-600">{run.skippedTests}</span> skipped
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-600" />
              <span className="text-sm">{formatDuration(run.duration)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <T font="Body/BodyM">Success Rate</T>
              <T font="Body/BodyM" className="font-semibold">{getSuccessRate(run).toFixed(1)}%</T>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getSuccessRate(run)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
