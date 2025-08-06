import { MoreHorizontal, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { trpc } from "@/lib/trpc"; // ✅ your TRPC client 

export const LedgerTable = () => {
  const { data: entries = [], isLoading } = trpc.ledger.getAll.useQuery();
  const utils = trpc.useUtils();
  const deleteLedger = trpc.ledger.delete.useMutation({
    onSuccess: () => {
      utils.ledger.getAll.invalidate(); // Refetch updated list
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      alert("Delete failed: " + error.message); // Optional toast
    },
  });



  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return amount < 0 ? `-${formatted}` : formatted;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      matched: "status-success",
      unmatched: "status-error",
      pending: "status-warning",
    };

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="card-elevated">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">📋 Recent Ledger Entries</CardTitle>
          <CardDescription>
            Latest transactions from your ledger and bank statements
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                entries.json?.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(entry.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{entry.description}</TableCell>
                    <TableCell className={`text-right font-mono ${entry.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {formatAmount(parseFloat(entry.amount))}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.source}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteLedger.mutate(entry.id)} className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
