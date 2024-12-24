import { OrdersResponse, OrderSummary } from '@/types/orders.type';
import { parseISO, format, isSameWeek } from "date-fns";

export const SalesPerDay = (orders: OrdersResponse["data"]["orders"]) => {
  const thisWeekOrders = orders.filter((order: OrderSummary) =>
    isSameWeek(parseISO(order.createdAt), new Date(), { weekStartsOn: 1 })
  );

  const salesByDay: Record<string, number> = {};

  thisWeekOrders.forEach((order: OrderSummary) => {
    const date = format(parseISO(order.createdAt), "yyyy-MM-dd");
    if (!salesByDay[date]) {
      salesByDay[date] = 0;
    }
    salesByDay[date] += order.totalPrice;
  });

  return salesByDay;
};

export const DeliveryStatus = (orders: OrdersResponse["data"]["orders"]) => {
  const delivered = orders.filter(order => order.deliveryStatus).length;
  const notDelivered = orders.length - delivered;

  return [
    { label: "Delivered", value: delivered },
    { label: "Not Delivered", value: notDelivered },
  ];
};
