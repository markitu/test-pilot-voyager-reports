
import { useState } from 'react';
import { TestSuiteCard } from './TestSuiteCard';
import { mockTestSuites } from '../data/mockData';
import { TestSuite } from '../types/test';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TestExecutionTab = () => {
  const [runningSuites, setRunningSuites] = useState<Set<string>>(new Set());
  const [selectedSuites, setSelectedSuites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleRunSuite = (suiteId: string) => {
    setRunningSuites(prev => new Set(prev).add(suiteId));
    
    toast({
      title: "Test Suite Started",
      description: `Running ${mockTestSuites.find(s => s.id === suiteId)?.name}...`,
    });

    // Simulate test execution
    setTimeout(() => {
      setRunningSuites(prev => {
        const newSet = new Set(prev);
        newSet.delete(suiteId);
        return newSet;
      });
      
      toast({
        title: "Test Suite Completed",
        description: `${mockTestSuites.find(s => s.id === suiteId)?.name} finished successfully!`,
      });
    }, 5000);
  };

  const handleRunSelected = () => {
    if (selectedSuites.size === 0) {
      toast({
        title: "No suites selected",
        description: "Please select at least one test suite to run.",
        variant: "destructive"
      });
      return;
    }

    selectedSuites.forEach(suiteId => {
      handleRunSuite(suiteId);
    });
    setSelectedSuites(new Set());
  };

  const toggleSuiteSelection = (suiteId: string) => {
    setSelectedSuites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(suiteId)) {
        newSet.delete(suiteId);
      } else {
        newSet.add(suiteId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="text-blue-600" size={24} />
            Test Execution Center
          </CardTitle>
          <CardDescription>
            Select and run automated test suites. Monitor execution progress and view results in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={handleRunSelected}
              disabled={selectedSuites.size === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play size={16} className="mr-2" />
              Run Selected ({selectedSuites.size})
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSelectedSuites(new Set())}
              disabled={selectedSuites.size === 0}
            >
              <RefreshCw size={16} className="mr-2" />
              Clear Selection
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTestSuites.map((suite) => (
          <div key={suite.id} className="relative">
            <div 
              className={`absolute top-4 right-4 z-10 w-5 h-5 border-2 rounded cursor-pointer transition-colors ${
                selectedSuites.has(suite.id) 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSuiteSelection(suite.id);
              }}
            >
              {selectedSuites.has(suite.id) && (
                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              )}
            </div>
            <TestSuiteCard
              suite={suite}
              onRun={handleRunSuite}
              isRunning={runningSuites.has(suite.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
