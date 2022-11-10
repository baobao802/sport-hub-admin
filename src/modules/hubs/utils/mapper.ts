import type { Hub, HubResponse, Pitch } from '../types';

export function hubResponseMapper(res: any): HubResponse {
  if (!Array.isArray(res.items)) {
    return {
      items: [],
      meta: res.meta,
    };
  }

  return {
    items: res.items.map((item: any) => ({
      id: item.id,
      key: item.id,
      email: item.owner.email,
      name: item.name,
      telephone: item.owner.telephone,
      status: item.status,
    })),
    meta: res.meta,
  };
}

export function hubDetailsResponseMapper(res: any): Hub {
  return {
    id: res.id,
    name: res.name,
    picture: res.picture,
    address: {
      street: res.address.street,
      district: {
        id: res.address.district.id,
        name: res.address.district.name,
      },
    },
    pitches: res.pitches as Pitch[],
  };
}
