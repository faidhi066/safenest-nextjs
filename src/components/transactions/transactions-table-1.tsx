import { z } from "zod";

import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSchemaedExpensesByUser } from "@/db/transactions";

export const schema = z.object({
  id: z.number(),
  transactionName: z.string(),
  category: z.string(),
  amount: z.string(),
});

export async function TrxTable() {
  const session = await auth();

  if (!session?.user) return null;

  const data: z.infer<typeof schema>[] = await getSchemaedExpensesByUser(
    parseInt(session.user.user_id)
  );

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.transactionName}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-1.5"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${item.amount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
