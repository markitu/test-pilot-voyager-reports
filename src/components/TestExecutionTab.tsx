
import { useState } from 'react';
import { TestSuiteCard } from './TestSuiteCard';
import { mockTestSuites } from '../data/mockData';
import { Button, Card, CheckboxField } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { Play, RefreshCw } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderCard = styled(Card)`
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border: 1px solid #0066cc;
  padding: 1.5rem;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0066cc;
  margin: 0 0 0.5rem 0;
`;

const HeaderDescription = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SuitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const SuiteCardWrapper = styled.div`
  position: relative;
`;

const SelectionCheckbox = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
`;

export const TestExecutionTab = () => {
  const [runningSuites, setRunningSuites] = useState<Set<string>>(new Set());
  const [selectedSuites, setSelectedSuites] = useState<Set<string>>(new Set());

  const handleRunSuite = (suiteId: string) => {
    setRunningSuites(prev => new Set(prev).add(suiteId));
    
    console.log(`Running ${mockTestSuites.find(s => s.id === suiteId)?.name}...`);

    // Simulate test execution
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
    <Container>
      <HeaderCard>
        <HeaderTitle>
          <Play className="text-blue-600" size={24} />
          Test Execution Center
        </HeaderTitle>
        <HeaderDescription>
          Select and run automated test suites. Monitor execution progress and view results in real-time.
        </HeaderDescription>
        <ButtonGroup>
          <Button 
            onClick={handleRunSelected}
            disabled={selectedSuites.size === 0}
            variant="primary"
            dimension="m"
          >
            <Play size={16} />
            Run Selected ({selectedSuites.size})
          </Button>
          <Button 
            variant="secondary"
            dimension="m"
            onClick={() => setSelectedSuites(new Set())}
            disabled={selectedSuites.size === 0}
          >
            <RefreshCw size={16} />
            Clear Selection
          </Button>
        </ButtonGroup>
      </HeaderCard>

      <SuitesGrid>
        {mockTestSuites.map((suite) => (
          <SuiteCardWrapper key={suite.id}>
            <SelectionCheckbox>
              <CheckboxField
                checked={selectedSuites.has(suite.id)}
                onChange={() => toggleSuiteSelection(suite.id)}
              />
            </SelectionCheckbox>
            <TestSuiteCard
              suite={suite}
              onRun={handleRunSuite}
              isRunning={runningSuites.has(suite.id)}
            />
          </SuiteCardWrapper>
        ))}
      </SuitesGrid>
    </Container>
  );
};
