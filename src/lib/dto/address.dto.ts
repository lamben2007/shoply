
export type Address = {
    id: string;
    profileId: string | null;
    name: string;
    street: string;
    zip: string;
    city: string;
    country: string;
    complement?: string | null;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
};

export type AddressResponse = Address

export type CreateAddressDto = Omit<Address, 'id' | 'isDefaultShipping' | 'isDefaultBilling' | 'profileId'>