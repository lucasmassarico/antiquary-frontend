import React from "react";
import withAuth from "@/components/WithAuth";
import CategoriesManagement from "@/components/admin/CategoriesManagement";

const CategoriesPage: React.FC = () => {
    return (
        <div>
            <CategoriesManagement />
        </div>
    );
};

export default withAuth(CategoriesPage);
