export type PaymentMethod = "card" | "paypal" | "wire";

export type PaymentInfo = {
    method: PaymentMethod;
    cardDetails?: {
        name: string;
        number: string;
        expiry: string;
        cvv: string;
    };
    paypalUser?: string;
};