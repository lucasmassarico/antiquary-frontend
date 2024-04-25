import { useRouter } from "next/router";

export default function ProductDetails() {
    const { query, push } = useRouter();
    const productId = query.id;

    return (
        <>
            <h1>Detalhes do produto</h1>
            <p>Id do produto: {productId}</p>

            <button onClick={() => push(`/product/${productId}/edit`)}>
                Edit
            </button>
        </>
    );
}
