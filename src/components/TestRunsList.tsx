
import { Clock, CheckCircle, XCircle, SkipForward, Calendar } from 'lucide-react';
import { TestRun } from '../types/test';
import { Card, Badge, ProgressBar } from '@admiral-ds/react-ui';
import styled from 'styled-components';

interface TestRunsListProps {
  runs: TestRun[];
  onSelectRun: (runId: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RunCard = styled(Card)`
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StatusIndicator = styled.div<{ $status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$status) {
      case 'completed': return '#4caf50';
      case 'running': return '#2196f3';
      case 'failed': return '#f44336';
      default: return '#666';
    }
  }};
`;

const RunTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const StatValue = styled.span<{ $color: string }>`
  font-weight: 600;
  color: ${props => props.$color};
`;

const ProgressSection = styled.div`
  margin-top: 1rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ProgressLabel = styled.span`
  color: #666;
`;

const ProgressValue = styled.span`
  font-weight: 600;
  color: #333;
`;

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

  const getSuccessRate = (run: TestRun) => {
    return (run.passedTests / run.totalTests) * 100;
  };

  const getBadgeAppearance = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'running': return 'info';
      case 'failed': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <Container>
      {runs.map((run) => (
        <RunCard 
          key={run.id} 
          onClick={() => onSelectRun(run.id)}
        >
          <CardHeader>
            <TitleSection>
              <StatusIndicator $status={run.status} />
              <RunTitle>{run.suiteName}</RunTitle>
              <Badge appearance={getBadgeAppearance(run.status)}>
                {run.status}
              </Badge>
            </TitleSection>
            <DateSection>
              <Calendar size={16} />
              <span>{formatDate(run.startTime)}</span>
            </DateSection>
          </CardHeader>

          <StatsGrid>
            <StatItem>
              <CheckCircle size={16} style={{ color: '#4caf50' }} />
              <span>
                <StatValue $color="#4caf50">{run.passedTests}</StatValue> passed
              </span>
            </StatItem>
            <StatItem>
              <XCircle size={16} style={{ color: '#f44336' }} />
              <span>
                <StatValue $color="#f44336">{run.failedTests}</StatValue> failed
              </span>
            </StatItem>
            <StatItem>
              <SkipForward size={16} style={{ color: '#ff9800' }} />
              <span>
                <StatValue $color="#ff9800">{run.skippedTests}</StatValue> skipped
              </span>
            </StatItem>
            <StatItem>
              <Clock size={16} style={{ color: '#666' }} />
              <span>{formatDuration(run.duration)}</span>
            </StatItem>
          </StatsGrid>

          <ProgressSection>
            <ProgressHeader>
              <ProgressLabel>Success Rate</ProgressLabel>
              <ProgressValue>{getSuccessRate(run).toFixed(1)}%</ProgressValue>
            </ProgressHeader>
            <ProgressBar progress={getSuccessRate(run)} />
          </ProgressSection>
        </RunCard>
      ))}
    </Container>
  );
};
