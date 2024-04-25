import { useRouter } from "next/router";

export default function ProductEdit() {
    const { query, back } = useRouter();
    const productId = query.id;

    return (
        <>
            <h1>Edição do produto</h1>
            <p>Id do produto: {productId}</p>

            <button onClick={() => back()}>Back</button>
        </>
    );
}
