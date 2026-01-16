import { z } from 'zod';

export const AddressSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Nom requis"),
  street: z.string().min(1, "Adresse requise"),
  city: z.string().min(1, "Ville requise"),
  zip: z.string().min(1, "Code postal requis"),
  country: z.string().min(1, "Pays requis"),
  complement: z.string().optional()
});

// Variante pour la création : sans l'id
export const CreateAddressSchema = AddressSchema.omit({ id: true });