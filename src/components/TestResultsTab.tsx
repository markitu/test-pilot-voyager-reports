
import { useState } from 'react';
import { TestRunsList } from './TestRunsList';
import { TestStatsDashboard } from './TestStatsDashboard';
import { mockTestRuns, mockStatistics } from '../data/mockData';
import { Card } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { BarChart3, TrendingUp } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderCard = styled(Card)`
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
  border: 1px solid #4caf50;
  padding: 1.5rem;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #4caf50;
  margin: 0 0 0.5rem 0;
`;

const HeaderDescription = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const SectionCard = styled(Card)`
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const SectionDescription = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const TestResultsTab = () => {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const handleSelectRun = (runId: string) => {
    setSelectedRunId(runId);
    console.log('Selected test run:', runId);
  };

  return (
    <Container>
      <HeaderCard>
        <HeaderTitle>
          <BarChart3 size={24} />
          Test Results & Analytics
        </HeaderTitle>
        <HeaderDescription>
          Comprehensive view of test execution results, trends, and performance metrics.
        </HeaderDescription>
      </HeaderCard>

      <TestStatsDashboard statistics={mockStatistics} />

      <SectionCard>
        <SectionTitle>
          <TrendingUp size={20} />
          Recent Test Runs
        </SectionTitle>
        <SectionDescription>
          Click on any test run to view detailed results and execution logs.
        </SectionDescription>
        <TestRunsList runs={mockTestRuns} onSelectRun={handleSelectRun} />
      </SectionCard>
    </Container>
  );
};
