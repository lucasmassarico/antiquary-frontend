// ProfileMenu.tsx
import { useState } from "react";
import {
    Menu,
    MenuItem,
    IconButton,
    Divider,
    ListItemIcon,
} from "@mui/material";
import {
    AccountCircle,
    BarChart,
    Category,
    ExitToApp,
    Storefront,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove("token");
        window.dispatchEvent(new Event("logout"));
        handleClose();
        router.push("/");
    };

    return (
        <>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
                style={{
                    padding: "0",
                    marginRight: "2.25rem",
                }}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => router.push("/admin/dashboard")}>
                    <ListItemIcon>
                        <BarChart fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={() => router.push("/admin/products")}>
                    <ListItemIcon>
                        <Storefront fontSize="small" />
                    </ListItemIcon>
                    Produtos
                </MenuItem>
                <MenuItem onClick={() => router.push("/admin/categories")}>
                    <ListItemIcon>
                        <Category fontSize="small" />
                    </ListItemIcon>
                    Categorias
                </MenuItem>
                <Divider /> {/* Barra separadora */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;
