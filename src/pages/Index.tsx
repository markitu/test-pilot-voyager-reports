
import { useState } from 'react';
import { TestExecutionTab } from '../components/TestExecutionTab';
import { TestResultsTab } from '../components/TestResultsTab';
import styled from 'styled-components';
import { Play, BarChart3, Settings, Bug } from 'lucide-react';

// Using custom components since Admiral UI structure is different
const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeaderContainer = styled.div`
  background: white;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  padding: 0.5rem;
  background-color: #0066cc;
  border-radius: 8px;
  color: white;
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  p {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
  }
`;

const TabsContainer = styled.div`
  background: white;
  border-bottom: 1px solid #e5e5e5;
`;

const TabsList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: ${props => props.$active ? '#f8f9fa' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#0066cc' : 'transparent'};
  color: ${props => props.$active ? '#0066cc' : '#666'};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: #0066cc;
  }
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    color: #333;
  }
`;

const Footer = styled.footer`
  background: white;
  border-top: 1px solid #e5e5e5;
  margin-top: 3rem;
  padding: 1.5rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #666;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

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
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <LogoSection>
            <LogoIcon>
              <Bug size={24} />
            </LogoIcon>
            <LogoText>
              <h1>AutoTest Manager</h1>
              <p>Automated testing dashboard inspired by Allure</p>
            </LogoText>
          </LogoSection>
          <SettingsButton>
            <Settings size={16} />
            Settings
          </SettingsButton>
        </HeaderContent>
      </HeaderContainer>

      <TabsContainer>
        <TabsList>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabButton
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
              </TabButton>
            );
          })}
        </TabsList>
      </TabsContainer>

      <MainContent>
        {activeTab === 'execution' && <TestExecutionTab />}
        {activeTab === 'results' && <TestResultsTab />}
      </MainContent>

      <Footer>
        <FooterContent>
          <p>AutoTest Manager - Powered by Admiral Design System</p>
          <FooterRight>
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </FooterRight>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Index;
