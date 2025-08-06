import { CheckCircle, FileText, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const matchedTransactions = [
  { id: "TXN001", date: "2024-01-15", description: "Office Supplies", amount: -245.99, confidence: 98 },
  { id: "TXN003", date: "2024-01-14", description: "Software Subscription", amount: -99.99, confidence: 100 },
  { id: "TXN005", date: "2024-01-12", description: "Product Sales", amount: 1200.50, confidence: 95 },
];

const ledgerOnlyTransactions = [
  { id: "TXN002", date: "2024-01-14", description: "Client Payment - ABC Corp", amount: 2500.00 },
  { id: "TXN004", date: "2024-01-13", description: "Freelancer Payment", amount: -800.00 },
];

const bankOnlyTransactions = [
  { id: "BANK001", date: "2024-01-15", description: "ATM Withdrawal", amount: -100.00 },
  { id: "BANK002", date: "2024-01-13", description: "Interest Payment", amount: 5.23 },
];

const formatAmount = (amount: number) => {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return amount < 0 ? `-${formatted}` : formatted;
};

export const ReconciliationTabs = () => {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          🔍 Reconciliation Results
        </CardTitle>
        <CardDescription>
          Compare transactions between ledger and bank statements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="matched" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="matched" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Matched ({matchedTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="ledger-only" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Only in Ledger ({ledgerOnlyTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="bank-only" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Only in Bank ({bankOnlyTransactions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matched" className="mt-6">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchedTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/25">
                      <TableCell className="font-mono text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell className={`text-right font-mono ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={transaction.confidence >= 98 ? 'status-success' : 'status-warning'}
                        >
                          {transaction.confidence}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="ledger-only" className="mt-6">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledgerOnlyTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/25">
                      <TableCell className="font-mono text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell className={`text-right font-mono ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="status-warning">
                          🧾 Ledger
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="bank-only" className="mt-6">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bankOnlyTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/25">
                      <TableCell className="font-mono text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell className={`text-right font-mono ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="status-error">
                          🏦 Bank
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};