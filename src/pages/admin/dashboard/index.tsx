import React from "react";
import withAuth from "@/components/WithAuth";
import Dashboard from "@/components/admin/Dashboard";

const DashboardPage: React.FC = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default withAuth(DashboardPage);
