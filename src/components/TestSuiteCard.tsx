
import { Play, Clock, FileCheck, AlertCircle } from 'lucide-react';
import { TestSuite } from '../types/test';
import { Button, Card, Badge } from '@admiral-ds/react-ui';
import styled from 'styled-components';

interface TestSuiteCardProps {
  suite: TestSuite;
  onRun: (suiteId: string) => void;
  isRunning?: boolean;
}

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border-left: 4px solid #0066cc;
  transition: all 0.2s ease;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconContainer = styled.div<{ $category: string }>`
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  background-color: ${props => {
    switch (props.$category) {
      case 'regression': return '#2196f3';
      case 'smoke': return '#4caf50';
      case 'hotfix': return '#f44336';
      case 'integration': return '#9c27b0';
      case 'unit': return '#ff9800';
      default: return '#666';
    }
  }};
`;

const TitleText = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.25rem 0;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0 0 1rem 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const categoryColors = {
  regression: '#2196f3',
  smoke: '#4caf50',
  hotfix: '#f44336',
  integration: '#9c27b0',
  unit: '#ff9800'
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
    <StyledCard>
      <CardHeader>
        <TitleSection>
          <IconContainer $category={suite.category}>
            <CategoryIcon size={20} />
          </IconContainer>
          <TitleText>
            <h3>{suite.name}</h3>
            <Badge appearance="neutral" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
              {suite.category}
            </Badge>
          </TitleText>
        </TitleSection>
      </CardHeader>
      
      <Description>
        {suite.description}
      </Description>
      
      <StatsContainer>
        <StatItem>
          <FileCheck size={16} />
          <span>{suite.testCount} tests</span>
        </StatItem>
        <StatItem>
          <Clock size={16} />
          <span>~{formatDuration(suite.estimatedDuration)}</span>
        </StatItem>
      </StatsContainer>
      
      <Button 
        onClick={() => onRun(suite.id)}
        disabled={isRunning}
        variant="primary"
        dimension="m"
        style={{ width: '100%' }}
      >
        {isRunning ? (
          <>
            <LoadingSpinner />
            Running...
          </>
        ) : (
          <>
            <Play size={16} />
            Run Tests
          </>
        )}
      </Button>
    </StyledCard>
  );
};
