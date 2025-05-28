
import { TestSuite, TestRun, TestResult, TestStatistics } from '../types/test';

export const mockTestSuites: TestSuite[] = [
  {
    id: 'regression',
    name: 'Regression Tests',
    description: 'Comprehensive regression testing suite covering core functionality',
    testCount: 245,
    estimatedDuration: 1800, // 30 minutes
    category: 'regression'
  },
  {
    id: 'smoke',
    name: 'Smoke Tests',
    description: 'Quick smoke tests for basic functionality verification',
    testCount: 45,
    estimatedDuration: 300, // 5 minutes
    category: 'smoke'
  },
  {
    id: 'hotfix',
    name: 'Hotfix Tests',
    description: 'Critical path tests for hotfix validation',
    testCount: 12,
    estimatedDuration: 120, // 2 minutes
    category: 'hotfix'
  },
  {
    id: 'integration',
    name: 'Integration Tests',
    description: 'API and service integration testing',
    testCount: 89,
    estimatedDuration: 900, // 15 minutes
    category: 'integration'
  }
];

export const mockTestRuns: TestRun[] = [
  {
    id: 'run-1',
    suiteId: 'regression',
    suiteName: 'Regression Tests',
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() - 1800000),
    status: 'completed',
    totalTests: 245,
    passedTests: 240,
    failedTests: 3,
    skippedTests: 2,
    duration: 1800,
    results: []
  },
  {
    id: 'run-2',
    suiteId: 'smoke',
    suiteName: 'Smoke Tests',
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() - 6900000),
    status: 'completed',
    totalTests: 45,
    passedTests: 45,
    failedTests: 0,
    skippedTests: 0,
    duration: 300,
    results: []
  }
];

export const mockStatistics: TestStatistics = {
  totalRuns: 156,
  successRate: 94.2,
  averageDuration: 847,
  testsOverTime: [
    { date: '2024-05-21', passed: 290, failed: 15, total: 305 },
    { date: '2024-05-22', passed: 285, failed: 20, total: 305 },
    { date: '2024-05-23', passed: 298, failed: 7, total: 305 },
    { date: '2024-05-24', passed: 302, failed: 3, total: 305 },
    { date: '2024-05-25', passed: 295, failed: 10, total: 305 },
    { date: '2024-05-26', passed: 300, failed: 5, total: 305 },
    { date: '2024-05-27', passed: 303, failed: 2, total: 305 }
  ]
};
