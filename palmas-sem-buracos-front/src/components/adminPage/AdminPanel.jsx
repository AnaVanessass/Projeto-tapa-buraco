import { useState } from 'react';
import './AdminPanel.css';
import { ComplaintsTable } from './components/ComplaintsTable';
import { ReportsDashboard } from './components/ReportsDashboard';
import { UsersManagement } from './components/UsersManagement';
import { AdminNavTabs } from './components/AdminNavTabs';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('chamados');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chamados':
        return <ComplaintsTable />;
      case 'relatorios':
        return <ReportsDashboard />;
      case 'usuarios':
        return <UsersManagement />;
      default:
        return <ComplaintsTable />;
    }
  };

  return (
    <div className="admin-page-container">
      <AdminNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="admin-main-content">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default AdminPanel;
