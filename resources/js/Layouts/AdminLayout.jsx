import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Logout as LogoutIcon, Group as GroupIcon, Inventory as InventoryIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link, usePage, router } from '@inertiajs/react';

const drawerWidth = 240;

export default function AdminLayout({ children }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton 
                        component={Link} 
                        href="/admin" 
                        selected={url === '/admin'}
                    >
                        <ListItemIcon>
                            <DashboardIcon color={url === '/admin' ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton 
                        component={Link} 
                        href="/admin/collaborators" 
                        selected={url.startsWith('/admin/collaborators')}
                    >
                        <ListItemIcon>
                            <GroupIcon color={url.startsWith('/admin/collaborators') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Colaboradores" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton 
                        component={Link} 
                        href={route('admin.products.index')}
                        selected={url.startsWith('/admin/products')}
                    >
                        <ListItemIcon>
                            <InventoryIcon color={url.startsWith('/admin/products') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton 
                        component={Link} 
                        href={route('admin.orders.index')}
                        selected={url.startsWith('/admin/orders')}
                    >
                        <ListItemIcon>
                            <ShoppingCartIcon color={url.startsWith('/admin/orders') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Pedidos" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Área Administrativa
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Sair</Button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
