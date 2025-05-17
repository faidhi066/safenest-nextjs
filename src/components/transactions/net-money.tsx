import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import {
  getCurrentMthNetCashFlowByUser,
  getCurrentMthTransactionsAmount,
  getPreviousMthTransactionsAmount,
} from "@/db/transactions";

export default async function NetMoney() {
  const session = await auth();

  if (!session?.user) return null;

  const netCashFlow = await getCurrentMthNetCashFlowByUser(
    parseInt(session.user.user_id)
  );
  const currentTransactionsCount = await getCurrentMthTransactionsAmount(
    parseInt(session.user.user_id)
  );
  const previousTransactionsCount = await getPreviousMthTransactionsAmount(
    parseInt(session.user.user_id)
  );
  return (
    <Card className="divide-border grid grid-rows-2 divide-y p-7">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-muted-foreground mb-1 text-sm font-medium">
          Net Money Flow
        </div>
        <div className="text-2xl font-bold text-green-500">
          + ${netCashFlow.toLocaleString()}
        </div>
        <div className="text-muted-foreground mt-1 text-xs">
          prev. month: <span className="font-semibold">+ $20,672</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-muted-foreground mb-1 text-sm font-medium">
          Transactions
        </div>
        <div className="text-foreground text-2xl font-bold">
          {currentTransactionsCount}
        </div>
        <div className="text-muted-foreground mt-1 text-xs">
          prev. month:{" "}
          <span className="font-semibold">{previousTransactionsCount}</span>
        </div>
      </div>
    </Card>
  );
}
