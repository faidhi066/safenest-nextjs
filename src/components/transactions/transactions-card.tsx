import Image from "next/image";

import { CheckCircle, CheckCircle2Icon, Edit, ShoppingBag } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function TransactionCard() {
  return (
    <Card className="mx-auto h-full w-full max-w-md p-4 shadow-md">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-green-600 text-green-600">
          <CheckCircle2Icon className="size-4" />
          Completed
        </Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <CheckCircle className="size-4" />
            Review
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="size-4" />
            Edit
          </Button>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="text-muted-foreground text-sm">
          23 August 2025, 3:23 PM
        </div>

        <div className="mt-2 flex items-center gap-3">
          <Image
            src="/boa.png"
            alt="Bank of America"
            className="h-6 w-6"
            width={60}
            height={60}
          />
          <div>
            <div className="text-lg font-semibold">Bank of America</div>
            <div className="text-muted-foreground text-sm">
              3758 S Figueroa St, Los Angeles
            </div>
          </div>
          <div className="ml-auto text-lg font-bold text-red-600">
            - $137.99
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 text-sm">
            <ShoppingBag className="size-4" />
            Shopping
          </div>
          <div className="text-muted-foreground mt-2">
            Melanie Checking Account
          </div>
        </div>

        <Input className="mt-3" placeholder="Add a note for your reference" />

        <Button variant="ghost" className="text-muted-foreground mt-2 text-sm">
          See More
        </Button>

        <div className="text-muted-foreground mt-3 flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 text-sm">
          <span>Upload receipt</span>
        </div>

        <Separator className="my-4" />

        <div className="text-sm">
          <div className="mb-2">
            <strong>Original Bank Description</strong>
            <br />
            BTX 455009 BANK TRANSFER TO SHEMUS
          </div>
          <div className="mb-2">
            <strong>Transaction Type</strong>
            <br />
            Online Payment
          </div>
          <div className="mb-2">
            <strong>Tags</strong>
            <br />
            <div className="mt-1 flex gap-2">
              <Badge variant="secondary">#JBtrip</Badge>
              <Badge variant="secondary">#makan2</Badge>
              <Button size="sm" variant="ghost" className="px-2 text-xs">
                + Add tag
              </Button>
            </div>
          </div>
          <div className="mb-2">
            <strong>Split</strong>
            <br />
            <div className="mt-1 flex gap-2">
              {["JC", "MI", "KR"].map((initials) => (
                <Avatar key={initials} className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-lg font-bold"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted text-muted-foreground mt-4 flex h-28 items-center justify-center rounded-md text-sm">
          [placeholder map]
        </div>
      </CardContent>
    </Card>
  );
}
