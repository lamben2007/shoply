// src/app/cgv/page.tsx
export default function CGVPage() {
    return (
        <main className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales de Vente (CGV)</h1>
            <p className="italic text-gray-500 mb-8">
                Exemple fictif pour démonstration du site portfolio.
            </p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-primary-600 mb-1">1. Objet</h2>
                <p className="text-gray-700">
                    Les présentes conditions régissent les ventes de produits simulés sur le site de démonstration « Shoply ».
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-primary-600 mb-1">2. Produits</h2>
                <p className="text-gray-700">
                    Les produits présentés n’ont aucun caractère réel, il s’agit d’un site portfolio dédié à l’apprentissage et la présentation de compétences web.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-primary-600 mb-1">3. Commande &amp; Paiement</h2>
                <p className="text-gray-700">
                    Toute commande passée ne donne lieu à aucune expédition. Les paiements sont simulés et ne font l’objet d’aucun débit réel.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-primary-600 mb-1">4. Données personnelles</h2>
                <p className="text-gray-700">
                    Aucune donnée personnelle n’est conservée. Ce site n’a qu’un but éducatif et ne collecte pas d’informations à des fins commerciales.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-1">5. Droit applicable</h2>
                <p className="text-gray-700">
                    Ce site de démonstration n’a pas de valeur contractuelle réelle. Les présentes conditions sont présentées à titre illustratif.
                </p>
            </section>
        </main>
    );
}