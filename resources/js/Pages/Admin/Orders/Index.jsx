import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Chip, MenuItem, Select, FormControl, Pagination } from '@mui/material';

const statusColors = {
    created: 'grey',
    pending: 'warning',
    paid: 'info',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'error',
};

const statusLabels = {
    created: 'Criado',
    pending: 'Pendente',
    paid: 'Pago',
    shipped: 'Enviado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
};

export default function Index({ orders }) {
    
    const handleStatusChange = (orderId, newStatus) => {
        router.put(route('admin.orders.update', orderId), {
            status: newStatus
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handlePageChange = (event, value) => {
        router.get(orders.path + '?page=' + value);
    };


    return (
        <AdminLayout>
            <Head title="Pedidos" />
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Pedidos
                </Typography>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de pedidos">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhum pedido encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.data.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {order.product && order.product.image && (
                                                <Box
                                                    component="img"
                                                    sx={{ height: 40, width: 40, objectFit: 'cover', borderRadius: 1 }}
                                                    src={order.product.image}
                                                    alt={order.product.name}
                                                />
                                            )}
                                            <Typography variant="body2">
                                                {order.product ? order.product.name : 'Produto Removido'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                         <Box>
                                            <Typography variant="body2">{order.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                                            <Select
                                                value={order.status || 'pending'}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                disableUnderline
                                                sx={{ 
                                                    '& .MuiSelect-select': { 
                                                        py: 0.5, 
                                                        px: 1, 
                                                        borderRadius: 1,
                                                        backgroundColor: (theme) => {
                                                            const color = statusColors[order.status] || 'grey';
                                                            return theme.palette[color]?.main || theme.palette.grey[500];
                                                        },
                                                        color: '#fff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    },
                                                    '& .MuiSvgIcon-root': { color: 'inherit' }
                                                }}
                                            >
                                                {Object.keys(statusLabels).map((status) => (
                                                    <MenuItem key={status} value={status}>
                                                        {statusLabels[status]}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                 <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination 
                        count={orders.last_page} 
                        page={orders.current_page} 
                        onChange={handlePageChange} 
                        color="primary" 
                    />
                </Box>
            </TableContainer>
        </AdminLayout>
    );
}
