
import { useState } from 'react';
import { TestSuiteCard } from './TestSuiteCard';
import { mockTestSuites } from '../data/mockData';
import { Play, RefreshCw } from 'lucide-react';
import { Button, T } from '@admiral-ds/react-ui';

export const TestExecutionTab = () => {
  const [runningSuites, setRunningSuites] = useState<Set<string>>(new Set());
  const [selectedSuites, setSelectedSuites] = useState<Set<string>>(new Set());

  const handleRunSuite = (suiteId: string) => {
    setRunningSuites(prev => new Set(prev).add(suiteId));
    
    console.log(`Running ${mockTestSuites.find(s => s.id === suiteId)?.name}...`);

    setTimeout(() => {
      setRunningSuites(prev => {
        const newSet = new Set(prev);
        newSet.delete(suiteId);
        return newSet;
      });
      
      console.log(`${mockTestSuites.find(s => s.id === suiteId)?.name} finished successfully!`);
    }, 5000);
  };

  const handleRunSelected = () => {
    if (selectedSuites.size === 0) {
      console.log("Please select at least one test suite to run.");
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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Play size={24} className="text-blue-600" />
          <T font="H3" color="#0066cc">Test Execution Center</T>
        </div>
        <T font="Body1" color="#666" className="mb-4">
          Select and run automated test suites. Monitor execution progress and view results in real-time.
        </T>
        <div className="flex gap-3">
          <Button
            appearance="primary"
            disabled={selectedSuites.size === 0}
            onClick={handleRunSelected}
            iconStart={<Play size={16} />}
          >
            Run Selected ({selectedSuites.size})
          </Button>
          <Button
            appearance="secondary"
            disabled={selectedSuites.size === 0}
            onClick={() => setSelectedSuites(new Set())}
            iconStart={<RefreshCw size={16} />}
          >
            Clear Selection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTestSuites.map((suite) => (
          <div key={suite.id} className="relative">
            <div className="absolute top-4 right-4 z-10">
              <input
                type="checkbox"
                checked={selectedSuites.has(suite.id)}
                onChange={() => toggleSuiteSelection(suite.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
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
