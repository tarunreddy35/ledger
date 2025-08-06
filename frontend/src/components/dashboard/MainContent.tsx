import { DashboardContent } from "./content/DashboardContent";
import { LedgerEntriesPage } from "./content/LedgerEntriesPage";
import { BankStatementsPage } from "./content/BankStatementsPage";
import { ReconciliationPage } from "./content/ReconciliationPage";
import { EmailSyncPage } from "./content/EmailSyncPage";
import { SettingsPage } from "./content/SettingsPage";

interface MainContentProps {
  activeSection: string;
  sidebarOpen: boolean;
}

export const MainContent = ({ activeSection, sidebarOpen }: MainContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "ledger":
        return <LedgerEntriesPage />;
      case "bank":
        return <BankStatementsPage />;
      case "reconciliation":
        return <ReconciliationPage />;
      case "email":
        return <EmailSyncPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <main className="flex-1 bg-background min-h-[calc(100vh-4rem)] animate-fade-in">
      {renderContent()}
    </main>
  );
};