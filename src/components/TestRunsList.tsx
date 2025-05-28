
import { Clock, CheckCircle, XCircle, SkipForward, Calendar } from 'lucide-react';
import { TestRun } from '../types/test';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TestRunsListProps {
  runs: TestRun[];
  onSelectRun: (runId: string) => void;
}

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSuccessRate = (run: TestRun) => {
    return (run.passedTests / run.totalTests) * 100;
  };

  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <Card 
          key={run.id} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectRun(run.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(run.status)}`} />
                <CardTitle className="text-lg">{run.suiteName}</CardTitle>
                <Badge variant={run.status === 'completed' ? 'default' : 'secondary'}>
                  {run.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>{formatDate(run.startTime)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm">
                  <span className="font-semibold text-green-600">{run.passedTests}</span> passed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle size={16} className="text-red-500" />
                <span className="text-sm">
                  <span className="font-semibold text-red-600">{run.failedTests}</span> failed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SkipForward size={16} className="text-yellow-500" />
                <span className="text-sm">
                  <span className="font-semibold text-yellow-600">{run.skippedTests}</span> skipped
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm">{formatDuration(run.duration)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span className="font-semibold">{getSuccessRate(run).toFixed(1)}%</span>
              </div>
              <Progress value={getSuccessRate(run)} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
