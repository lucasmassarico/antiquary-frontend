import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cookies = require("js-cookie");

const withAuth = (WrappedComponent: React.FC) => {
    const AuthenticatedComponent: React.FC = (props) => {
        const router = useRouter();
        const [verified, setVerified] = useState(false);

        useEffect(() => {
            const token = Cookies.get("token");
            if (!token) {
                router.replace("/login");
            } else {
                setVerified(true);
            }
        }, []);

        if (!verified) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
