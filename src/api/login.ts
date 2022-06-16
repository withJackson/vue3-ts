import { getTAPI } from "./request";

export async function reasonList(data: any) {
  const response = await getTAPI({
    url: `/refund/reasonList?order_no=${data.order_no}&sku_id=${data.sku_id}&type_refund=${data.type_refund}&receipt_status=${data.receipt_status}`,
    data,
  });
  return response;
}
