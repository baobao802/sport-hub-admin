import { Pitch } from 'src/modules/hubs/types';
import { UserInfo } from 'src/types';

export enum BookingStatus {
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

export type Booking = {
  id: number;
  pitch: Omit<Pitch, 'cost'>;
  createdAt: string;
  deletedAt: string;
  time: string;
  cost: number;
  customer: UserInfo;
  status: BookingStatus;
  date: string;
};

export type BookingResponse = {
  items: Booking[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export type FilterParams = {
  search?: string;
  date?: string;
  status?: BookingStatus;
};

export type RequestParams = FilterParams & {
  page?: number;
};
