import React from "react";
import withAuth from "@/components/WithAuth";
import SoldProductsManagement from "@/components/admin/SoldProductManagement";

const SoldProductsPage: React.FC = () => {
    return (
        <div>
            <SoldProductsManagement />
        </div>
    );
};

export default withAuth(SoldProductsPage);
