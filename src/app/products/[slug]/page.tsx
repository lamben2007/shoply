import { supabase } from '@/lib/supabaseClient';
// import Image from 'next/image';
import { notFound } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore';
import ProductDetailsClient from './ProductDetailsClient';

type Params = Promise<{ slug: string }>



type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
};



export default async function Page(props: {
    params: Params
}) {
    const params = await props.params
    const slug = params.slug


    // Récupérer le produit par slug
    const { data, error } = await supabase
        .from('products')
        .select('*')          
        .eq('slug', slug)
        .limit(1)
        .single<Product>();  

    if (error || !data) {
        return notFound();
    }

     return <ProductDetailsClient product={data} />;
}