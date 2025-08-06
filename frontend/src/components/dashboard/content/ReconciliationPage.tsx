import { useState } from "react";
import { CheckCircle, FileText, Building2, Settings, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const matchedTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Office Supplies Purchase",
    amount: -156.78,
    confidence: 98,
  },
  {
    id: 2,
    date: "2024-01-14",
    description: "Client Payment Received",
    amount: 2500.00,
    confidence: 95,
  },
  {
    id: 3,
    date: "2024-01-12",
    description: "Software Subscription",
    amount: -99.00,
    confidence: 100,
  },
];

const ledgerOnly = [
  {
    id: 4,
    date: "2024-01-18",
    description: "Consulting Fee",
    amount: 1200.00,
    vendor: "Tech Corp",
  },
  {
    id: 5,
    date: "2024-01-16",
    description: "Travel Expense",
    amount: -340.50,
    vendor: "Airlines Inc",
  },
];

const bankOnly = [
  {
    id: 6,
    date: "2024-01-17",
    description: "ATM WITHDRAWAL",
    amount: -200.00,
    location: "MAIN ST BRANCH",
  },
  {
    id: 7,
    date: "2024-01-13",
    description: "INTEREST PAYMENT",
    amount: 15.33,
    location: "AUTOMATIC",
  },
];

export const ReconciliationPage = () => {
  const [showDetails, setShowDetails] = useState(true);

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 95) return "status-success";
    if (confidence >= 80) return "status-warning";
    return "status-error";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Reconciliation</h2>
          <p className="text-muted-foreground">
            Compare ledger entries with bank statements
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-details"
              checked={showDetails}
              onCheckedChange={setShowDetails}
            />
            <Label htmlFor="show-details" className="flex items-center gap-2">
              {showDetails ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {showDetails ? "Show Details" : "Show Confidence"}
            </Label>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Reconcile Settings
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Match Rate</p>
                <p className="text-2xl font-bold text-green-600">94.8%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unmatched</p>
                <p className="text-2xl font-bold text-yellow-600">4</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Discrepancies</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <Building2 className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matched Transactions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Matched Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-3 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  {showDetails ? (
                    <span className={`text-sm font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  ) : (
                    <Badge className={getConfidenceBadge(transaction.confidence)}>
                      {transaction.confidence}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Only in Ledger */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-600">
              <FileText className="h-5 w-5" />
              Only in Ledger
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ledgerOnly.map((transaction) => (
              <div
                key={transaction.id}
                className="p-3 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-950/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <span className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.vendor}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Only in Bank Statement */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-600">
              <Building2 className="h-5 w-5" />
              Only in Bank Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bankOnly.map((transaction) => (
              <div
                key={transaction.id}
                className="p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <span className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.location}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button className="gradient-primary text-white shadow-[var(--shadow-glow)]">
          Auto-Match Similar
        </Button>
        <Button variant="outline">
          Manual Match
        </Button>
        <Button variant="outline">
          Export Report
        </Button>
      </div>
    </div>
  );
};