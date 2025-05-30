
import { Play, Clock, FileCheck, AlertCircle } from 'lucide-react';
import { TestSuite } from '../types/test';
import { Button, T, Badge } from '@admiral-ds/react-ui';

interface TestSuiteCardProps {
  suite: TestSuite;
  onRun: (suiteId: string) => void;
  isRunning?: boolean;
}

const categoryIcons = {
  regression: FileCheck,
  smoke: Play,
  hotfix: AlertCircle,
  integration: Clock,
  unit: FileCheck
};

const categoryColors = {
  regression: '#2196f3',
  smoke: '#4caf50',
  hotfix: '#f44336',
  integration: '#9c27b0',
  unit: '#ff9800'
};

export const TestSuiteCard = ({ suite, onRun, isRunning = false }: TestSuiteCardProps) => {
  const CategoryIcon = categoryIcons[suite.category];
  const categoryColor = categoryColors[suite.category];
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-white rounded-lg p-6 border-l-4 shadow-sm hover:shadow-md transition-shadow h-full"
         style={{ borderLeftColor: categoryColor }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg text-white"
            style={{ backgroundColor: categoryColor }}
          >
            <CategoryIcon size={20} />
          </div>
          <div>
            <T font="H5" color="#333" className="mb-1">{suite.name}</T>
            <Badge appearance="info">
              {suite.category}
            </Badge>
          </div>
        </div>
      </div>
      
      <T font="Body2" color="#666" className="mb-4">
        {suite.description}
      </T>
      
      <div className="flex gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FileCheck size={16} />
          <span>{suite.testCount} tests</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>~{formatDuration(suite.estimatedDuration)}</span>
        </div>
      </div>
      
      <Button
        appearance="primary"
        disabled={isRunning}
        onClick={() => onRun(suite.id)}
        iconStart={isRunning ? undefined : <Play size={16} />}
        className="w-full"
      >
        {isRunning ? 'Running...' : 'Run Tests'}
      </Button>
    </div>
  );
};
