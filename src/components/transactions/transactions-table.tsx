import { CalendarIcon, DownloadIcon, FilterIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function TransactionTable() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="inflow">Inflow</SelectItem>
              <SelectItem value="outflow">Outflow</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-1 h-4 w-4" /> Date
          </Button>
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-1 h-4 w-4" /> Filters
          </Button>
          <Input placeholder="Search" className="h-8 w-[200px]" />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {/* Date Section: 21 August 2025 */}
      <div>
        <div className="text-muted-foreground mb-1 text-sm font-semibold">
          21 August 2025
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Streaming subsc...</TableCell>
              <TableCell>🛍️ Shopping</TableCell>
              <TableCell>Melanie Checking Acc...</TableCell>
              <TableCell>
                <Badge variant="outline">Pending</Badge>
              </TableCell>
              <TableCell className="font-semibold text-green-600">
                + $135.50
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Bank of America</TableCell>
              <TableCell>💰 Loan Payment</TableCell>
              <TableCell>Robinhood Account</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700">Completed</Badge>
              </TableCell>
              <TableCell className="font-semibold text-green-600">
                + $54.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-1 text-right font-semibold text-green-600">
          + $189.50
        </div>
      </div>

      {/* Date Section: 16 August 2025 */}
      <div>
        <div className="text-muted-foreground mb-1 text-sm font-semibold">
          16 August 2025
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Streaming subsc...</TableCell>
              <TableCell>🛍️ Shopping</TableCell>
              <TableCell>Melanie Checking Acc...</TableCell>
              <TableCell>
                <Badge variant="destructive">Rejected</Badge>
              </TableCell>
              <TableCell className="font-semibold text-red-600">
                - $34.60
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Bank of America</TableCell>
              <TableCell>💰 Loan Payment</TableCell>
              <TableCell>Robinhood Account</TableCell>
              <TableCell>
                <Badge className="bg-muted text-muted-foreground">
                  Cancelled
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-green-600">
                + $100.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="text-muted-foreground mt-1 text-right font-semibold">
          $0.00
        </div>
      </div>
    </div>
  );
}
