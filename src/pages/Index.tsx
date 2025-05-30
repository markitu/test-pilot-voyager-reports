
import { useState } from 'react';
import { TestExecutionTab } from '../components/TestExecutionTab';
import { TestResultsTab } from '../components/TestResultsTab';
import { Play, BarChart3, Settings, Bug } from 'lucide-react';
import { T } from '@admiral-ds/react-ui';

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
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Bug size={24} />
            </div>
            <div>
              <T font="Header/H4">AutoTest Manager</T>
              <T font="Body/BodyM">Automated testing dashboard inspired by Allure</T>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 transition-colors">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'execution' && <TestExecutionTab />}
        {activeTab === 'results' && <TestResultsTab />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <T font="Body/BodyM">AutoTest Manager - Powered by Admiral Design System</T>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
