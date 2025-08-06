import { useState } from "react";
import { Mail, RefreshCw, CheckCircle, AlertCircle, Calendar, DollarSign, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockReceipts = [
  {
    id: 1,
    subject: "Your Amazon Order Receipt",
    date: "2024-01-15",
    amount: 156.78,
    vendor: "Amazon",
    status: "processed",
    confidence: 95,
  },
  {
    id: 2,
    subject: "Uber Receipt - Thank you for riding",
    date: "2024-01-14",
    amount: 23.45,
    vendor: "Uber",
    status: "processed",
    confidence: 98,
  },
  {
    id: 3,
    subject: "Office Depot - Receipt",
    date: "2024-01-12",
    amount: 89.99,
    vendor: "Office Depot",
    status: "pending",
    confidence: 87,
  },
  {
    id: 4,
    subject: "Starbucks Receipt",
    date: "2024-01-11",
    amount: 5.67,
    vendor: "Starbucks",
    status: "failed",
    confidence: 45,
  },
];

export const EmailSyncPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");

  const handleConnect = () => {
    setIsConnected(true);
    setSyncStatus("success");
  };

  const handleSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("success");
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      processed: "status-success",
      pending: "status-warning",
      failed: "status-error",
    };
    return variants[status] || "status-success";
  };

  const getStatusIcon = () => {
    switch (syncStatus) {
      case "syncing":
        return <RefreshCw className="h-4 w-4 animate-spin" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case "syncing":
        return "Syncing...";
      case "success":
        return "Last sync: 2 minutes ago";
      case "error":
        return "Sync failed";
      default:
        return "Ready to sync";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Email Sync</h2>
        <p className="text-muted-foreground">
          Connect your inbox to automatically extract receipt data
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="text-center py-6">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Connect Your Inbox
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Securely connect your email to automatically scan for receipts
                </p>
                <Button 
                  className="gradient-primary text-white shadow-[var(--shadow-glow)]"
                  onClick={handleConnect}
                >
                  Connect Inbox
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Gmail Connected</p>
                    <p className="text-sm text-muted-foreground">user@gmail.com</p>
                  </div>
                  <Badge className="status-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span className="text-sm text-muted-foreground">
                      {getSyncStatusText()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSync}
                    disabled={syncStatus === "syncing"}
                  >
                    {syncStatus === "syncing" ? "Syncing..." : "Retry"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Sync Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">127</div>
                <div className="text-sm text-muted-foreground">Total Receipts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">119</div>
                <div className="text-sm text-muted-foreground">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">6</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">2</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parsed Receipts */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Receipts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReceipts.map((receipt) => (
                <TableRow key={receipt.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-xs truncate">
                    {receipt.subject}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Date(receipt.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-mono font-semibold text-green-600">
                    ${receipt.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {receipt.vendor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(receipt.status)}>
                      {receipt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            receipt.confidence >= 90 ? 'bg-green-500' :
                            receipt.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${receipt.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {receipt.confidence}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};