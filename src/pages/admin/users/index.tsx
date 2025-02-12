import React from "react";
import withAuth from "@/components/WithAuth";
import UsersManagement from "@/components/admin/UsersManagement";

const UsersPage: React.FC = () => {
    return (
        <div>
            <UsersManagement />
        </div>
    );
};

export default withAuth(UsersPage);
