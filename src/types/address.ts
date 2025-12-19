// src/types/address.ts
export interface Address {
  id: string;
  profileId: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  complement?: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}