import { SummaryCards } from "./SummaryCards";
import { LedgerTable } from "./LedgerTable";
import { CSVUploadArea } from "./CSVUploadArea";
import { ReconciliationTabs } from "./ReconciliationTabs";
import { trpc } from '@/lib/trpc';


export const DashboardContent = () => {

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your ledger reconciliation system
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Ledger Entries - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <LedgerTable />
        </div>

        {/* CSV Upload Area */}
        <div className="space-y-6">
          <CSVUploadArea />
        </div>
      </div>

      {/* Reconciliation Results */}
      <ReconciliationTabs />
    </div>
  );
};