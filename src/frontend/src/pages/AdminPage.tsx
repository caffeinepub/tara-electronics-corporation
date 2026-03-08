import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InboxIcon, MessageSquare, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useAllEnquiries, useAllOrders } from "../hooks/useQueries";

function formatTimestamp(timestamp: bigint): string {
  // ICP timestamps are in nanoseconds
  const ms = Number(timestamp / BigInt(1_000_000));
  if (ms === 0) return "—";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ms));
  } catch {
    return "—";
  }
}

export function AdminPage() {
  const { data: orders, isLoading: ordersLoading } = useAllOrders();
  const { data: enquiries, isLoading: enquiriesLoading } = useAllEnquiries();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12" style={{ background: "oklch(0.18 0.06 255)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{
                background: "oklch(0.78 0.18 65 / 0.2)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              Admin Panel
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
              Dashboard
            </h1>
            <p className="text-white/60">
              View all orders and enquiries received.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-card rounded-xl border border-border p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.22 0.065 255 / 0.1)" }}
                >
                  <ShoppingBag
                    className="w-5 h-5"
                    style={{ color: "oklch(0.22 0.065 255)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-2xl font-black font-display"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    {ordersLoading ? "—" : (orders?.length ?? 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Orders
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.78 0.18 65 / 0.1)" }}
                >
                  <MessageSquare
                    className="w-5 h-5"
                    style={{ color: "oklch(0.78 0.18 65)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-2xl font-black font-display"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    {enquiriesLoading ? "—" : (enquiries?.length ?? 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Enquiries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="orders">
            <TabsList className="mb-6">
              <TabsTrigger
                value="orders"
                data-ocid="admin.orders_tab"
                className="gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Orders
              </TabsTrigger>
              <TabsTrigger
                value="enquiries"
                data-ocid="admin.enquiries_tab"
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Enquiries
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              {ordersLoading && (
                <div data-ocid="admin.loading_state" className="space-y-3">
                  {["o1", "o2", "o3", "o4", "o5"].map((sk) => (
                    <Skeleton key={sk} className="h-14 w-full rounded-lg" />
                  ))}
                </div>
              )}

              {!ordersLoading && (!orders || orders.length === 0) && (
                <div
                  data-ocid="admin.empty_state"
                  className="text-center py-16"
                >
                  <Package className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-display font-bold text-lg mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Orders will appear here once customers place them.
                  </p>
                </div>
              )}

              {!ordersLoading && orders && orders.length > 0 && (
                <div
                  data-ocid="admin.orders_table"
                  className="rounded-xl border border-border overflow-hidden"
                >
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: "oklch(0.97 0.01 255)" }}>
                        <TableHead className="font-bold text-xs">
                          Order ID
                        </TableHead>
                        <TableHead className="font-bold text-xs">
                          Customer
                        </TableHead>
                        <TableHead className="font-bold text-xs">
                          Phone
                        </TableHead>
                        <TableHead className="font-bold text-xs hidden md:table-cell">
                          Address
                        </TableHead>
                        <TableHead className="font-bold text-xs">
                          Items
                        </TableHead>
                        <TableHead className="font-bold text-xs hidden lg:table-cell">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow
                          key={order.id.toString()}
                          data-ocid={`admin.orders.row.${index + 1}`}
                        >
                          <TableCell>
                            <span className="font-mono text-xs font-semibold">
                              #{order.id.toString()}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            {order.customerInfo.name}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {order.customerInfo.phone}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground hidden md:table-cell max-w-xs truncate">
                            {order.customerInfo.address}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {order.items.length} item
                              {order.items.length !== 1 ? "s" : ""}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                            {formatTimestamp(order.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Enquiries Tab */}
            <TabsContent value="enquiries">
              {enquiriesLoading && (
                <div data-ocid="admin.loading_state" className="space-y-3">
                  {["e1", "e2", "e3", "e4", "e5"].map((sk) => (
                    <Skeleton key={sk} className="h-14 w-full rounded-lg" />
                  ))}
                </div>
              )}

              {!enquiriesLoading && (!enquiries || enquiries.length === 0) && (
                <div
                  data-ocid="admin.empty_state"
                  className="text-center py-16"
                >
                  <InboxIcon className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-display font-bold text-lg mb-2">
                    No Enquiries Yet
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Customer enquiries will appear here.
                  </p>
                </div>
              )}

              {!enquiriesLoading && enquiries && enquiries.length > 0 && (
                <div
                  data-ocid="admin.enquiries_table"
                  className="rounded-xl border border-border overflow-hidden"
                >
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: "oklch(0.97 0.01 255)" }}>
                        <TableHead className="font-bold text-xs">ID</TableHead>
                        <TableHead className="font-bold text-xs">
                          Name
                        </TableHead>
                        <TableHead className="font-bold text-xs">
                          Phone
                        </TableHead>
                        <TableHead className="font-bold text-xs hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="font-bold text-xs">
                          Message
                        </TableHead>
                        <TableHead className="font-bold text-xs hidden lg:table-cell">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiries.map((enquiry, index) => (
                        <TableRow
                          key={enquiry.id.toString()}
                          data-ocid={`admin.enquiries.row.${index + 1}`}
                        >
                          <TableCell>
                            <span className="font-mono text-xs font-semibold">
                              #{enquiry.id.toString()}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            {enquiry.name}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {enquiry.phone}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                            {enquiry.email}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-xs">
                            <span className="line-clamp-2">
                              {enquiry.message}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                            {formatTimestamp(enquiry.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
