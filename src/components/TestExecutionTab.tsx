
import { useState } from 'react';
import { TestSuiteCard } from './TestSuiteCard';
import { mockTestSuites } from '../data/mockData';
import styled from 'styled-components';
import { Play, RefreshCw } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderCard = styled.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border: 1px solid #0066cc;
  border-radius: 8px;
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

const Button = styled.button<{ $variant?: 'primary' | 'secondary'; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: #0066cc;
    border-color: #0066cc;
    color: white;
    
    &:hover:not(:disabled) {
      background: #0052a3;
      border-color: #0052a3;
    }
  ` : `
    background: white;
    border-color: #e5e5e5;
    color: #666;
    
    &:hover:not(:disabled) {
      background: #f8f9fa;
      border-color: #0066cc;
      color: #0066cc;
    }
  `}
  
  ${props => props.$disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}
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

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #0066cc;
  cursor: pointer;
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
          <Play size={24} />
          Test Execution Center
        </HeaderTitle>
        <HeaderDescription>
          Select and run automated test suites. Monitor execution progress and view results in real-time.
        </HeaderDescription>
        <ButtonGroup>
          <Button 
            $variant="primary"
            $disabled={selectedSuites.size === 0}
            onClick={handleRunSelected}
          >
            <Play size={16} />
            Run Selected ({selectedSuites.size})
          </Button>
          <Button 
            $variant="secondary"
            $disabled={selectedSuites.size === 0}
            onClick={() => setSelectedSuites(new Set())}
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
              <Checkbox
                type="checkbox"
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
