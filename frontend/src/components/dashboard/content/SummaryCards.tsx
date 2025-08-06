import {
  CheckCircle,
  FileText,
  Building2,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

export const SummaryCards = () => {
  const { data, isLoading } = trpc.summary.getSummary.useQuery();



  if (isLoading || !data) {
    return <div>Loading summary...</div>;
  }

  const summaryData = [
    {
      title: "Total Matched",
      value: data.json.totalMatched.toLocaleString(),
      change: `${data.json.changeData.totalMatchedChange > 0 ? "+" : ""}${data.json.changeData.totalMatchedChange}%`,
      icon: CheckCircle,
      trend: data.json.changeData.totalMatchedChange >= 0 ? "up" : "down",
      color: "status-success",
    },
    {
      title: "Only in Ledger",
      value: data.json.onlyInLedger.toLocaleString(),
      change: `${data.json.changeData.onlyInLedgerChange > 0 ? "+" : ""}${data.json.changeData.onlyInLedgerChange}%`,
      icon: FileText,
      trend: data.json.changeData.onlyInLedgerChange >= 0 ? "up" : "down",
      color: "status-warning",
    },
    {
      title: "Only in Bank",
      value: data.json.onlyInBank.toLocaleString(),
      change: `${data.json.changeData.onlyInBankChange > 0 ? "+" : ""}${data.json.changeData.onlyInBankChange}%`,
      icon: Building2,
      trend: data.json.changeData.onlyInBankChange >= 0 ? "up" : "down",
      color: "status-error",
    },
    {
      title: "Match Rate",
      value: `${data.json.matchRate.toFixed(1)}%`,
      change: `${data.json.changeData.matchRateChange > 0 ? "+" : ""}${data.json.changeData.matchRateChange}%`,
      icon: TrendingUp,
      trend: data.json.changeData.matchRateChange >= 0 ? "up" : "down",
      color: "status-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item) => (
        <Card key={item.title} className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {item.value}
            </div>
            <p
              className={`text-xs mt-1 ${item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
            >
              {item.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
