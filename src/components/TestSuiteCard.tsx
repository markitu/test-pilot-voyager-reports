
import { Play, Clock, FileCheck, AlertCircle } from 'lucide-react';
import { TestSuite } from '../types/test';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestSuiteCardProps {
  suite: TestSuite;
  onRun: (suiteId: string) => void;
  isRunning?: boolean;
}

const categoryColors = {
  regression: 'bg-blue-500',
  smoke: 'bg-green-500',
  hotfix: 'bg-red-500',
  integration: 'bg-purple-500',
  unit: 'bg-yellow-500'
};

const categoryIcons = {
  regression: FileCheck,
  smoke: Play,
  hotfix: AlertCircle,
  integration: Clock,
  unit: FileCheck
};

export const TestSuiteCard = ({ suite, onRun, isRunning = false }: TestSuiteCardProps) => {
  const CategoryIcon = categoryIcons[suite.category];
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${categoryColors[suite.category]} text-white`}>
              <CategoryIcon size={20} />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{suite.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {suite.category.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-gray-600 mt-2">
          {suite.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FileCheck size={16} />
              <span>{suite.testCount} tests</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>~{formatDuration(suite.estimatedDuration)}</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => onRun(suite.id)}
          disabled={isRunning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Run Tests
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
