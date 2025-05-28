
import { useState } from 'react';
import { TestExecutionTab } from '../components/TestExecutionTab';
import { TestResultsTab } from '../components/TestResultsTab';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, BarChart3, Settings, Bug } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'execution' | 'results'>('execution');

  const tabs = [
    {
      id: 'execution' as const,
      label: 'Test Execution',
      icon: Play,
      description: 'Run and manage test suites'
    },
    {
      id: 'results' as const,
      label: 'Results & Analytics',
      icon: BarChart3,
      description: 'View results and performance metrics'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bug className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AutoTest Manager</h1>
                <p className="text-sm text-gray-600">Automated testing dashboard inspired by Allure</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent size={18} />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'execution' && <TestExecutionTab />}
        {activeTab === 'results' && <TestResultsTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              AutoTest Manager - Powered by Admiral Design System
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
