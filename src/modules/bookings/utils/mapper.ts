import { Booking, BookingResponse } from '../types';

export function bookingsResponseMapper(res: any): BookingResponse {
  if (!Array.isArray(res.items)) {
    return {
      items: [],
      meta: res.meta,
    };
  }
  return {
    items: res.items.map(
      (item: any): Booking => ({
        ...item,
        customer: {
          id: item.customerInfo.id,
          fullName: `${item.customerInfo.givenName} ${item.customerInfo.familyName}`,
          telephone: item.customerInfo.telephone,
          email: item.customerInfo.email,
        },
      }),
    ),
    meta: res.meta,
  };
}
