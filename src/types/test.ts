
export interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCount: number;
  estimatedDuration: number;
  category: 'regression' | 'smoke' | 'hotfix' | 'integration' | 'unit';
}

export interface TestResult {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'skipped' | 'running';
  duration: number;
  startTime: Date;
  endTime?: Date;
  errorMessage?: string;
  stackTrace?: string;
}

export interface TestRun {
  id: string;
  suiteId: string;
  suiteName: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  duration: number;
  results: TestResult[];
}

export interface TestStatistics {
  totalRuns: number;
  successRate: number;
  averageDuration: number;
  testsOverTime: Array<{
    date: string;
    passed: number;
    failed: number;
    total: number;
  }>;
}
