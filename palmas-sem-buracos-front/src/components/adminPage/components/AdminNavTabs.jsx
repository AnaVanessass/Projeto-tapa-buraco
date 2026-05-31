export function AdminNavTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'chamados', label: 'Chamados' },
    { id: 'relatorios', label: 'Relatórios' },
    { id: 'usuarios', label: 'Usuários' }
  ];

  return (
    <nav className="admin-nav-tabs">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`admin-tab-btn ${activeTab === tab.id ? 'admin-tab-btn-active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
