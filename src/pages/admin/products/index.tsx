import React from "react";
import withAuth from "@/components/WithAuth"; // HOC for authentication
import ProductsManagement from "@/components/admin/ProductsManagement";

const ProductsAdminPage: React.FC = () => {
    return (
        <div>
            <ProductsManagement />
        </div>
    );
};

export default withAuth(ProductsAdminPage);
