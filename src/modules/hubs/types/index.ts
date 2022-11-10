import { Address } from 'src/types';

export enum PitchType {
  FIVE_A_SIDE = '5A_SIDE',
  SEVEN_A_SIDE = '7A_SIDE',
  ELEVEN_A_SIDE = '11A_SIDE',
}

export type Pitch = {
  id: number;
  name: string;
  type: PitchType;
  cost: {
    time: string;
    value: number;
  };
};

export type Hub = {
  id: React.Key;
  name: string;
  picture?: string;
  address: Omit<Address, 'id'>;
  pitches: Pitch[];
};

export type HubResponse = {
  items: Hub[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export enum HubStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export type RequestParams = {
  search?: string;
  status?: HubStatus;
  page?: number;
};

export type FilterParams = {
  search?: string;
  status?: HubStatus;
};
