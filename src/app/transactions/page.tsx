import { SiteHeader } from "@/components/home/site-header";
import { SectionCardsTransactions } from "@/components/transactions/section-cards";
import TransactionCard from "@/components/transactions/transactions-card";
import { TrxTable } from "@/components/transactions/transactions-table-1";

export default function TransactionsPage() {
  return (
    <>
      <SiteHeader
        title="Transactions"
        navItems={["All Transactions", "Recurring", "Rules"]}
      />
      <h1 className="p-4 lg:px-6">
        Your spending at a glance. Track your priorities, spending breakdown,
        and monitor your overall financial health.
      </h1>
      <div className="flex flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCardsTransactions />
            <TrxTable />
          </div>
        </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="py-4 md:gap-6 md:py-6">
            <TransactionCard />
          </div>
        </div>
      </div>
    </>
  );
}
