import React from "react";
import withAuth from "@/components/WithAuth";

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Dashboard content */}
        </div>
    );
};

export default withAuth(Dashboard);
