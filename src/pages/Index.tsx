
import { useState } from 'react';
import { TestExecutionTab } from '../components/TestExecutionTab';
import { TestResultsTab } from '../components/TestResultsTab';
import { Button, Header, Tabs, TabContent } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { Play, BarChart3, Settings, Bug } from 'lucide-react';

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
          <Button variant="secondary" dimension="m">
            <Settings size={16} />
            Settings
          </Button>
        </HeaderContent>
      </HeaderContainer>

      <Tabs
        activeTab={activeTab}
        onActivateTab={(tabId) => setActiveTab(tabId as 'execution' | 'results')}
        style={{ background: 'white', borderBottom: '1px solid #e5e5e5' }}
      >
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabContent
              key={tab.id}
              tabId={tab.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.5rem'
              }}
            >
              <IconComponent size={18} />
              <span>{tab.label}</span>
            </TabContent>
          );
        })}
      </Tabs>

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
