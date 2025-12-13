import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, IconButton, TextField, InputAdornment, Pagination } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';

export default function Index({ products, filters }) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            destroy(route('admin.products.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePageChange = (event, value) => {
        router.get(products.path + '?page=' + value + (searchTerm ? '&search=' + searchTerm : ''));
    };

    return (
        <AdminLayout>
            <Head title="Produtos" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Produtos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    href={route('admin.products.create')}
                >
                    Novo Produto
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton type="submit" edge="end">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Paper>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de produtos">
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhum produto encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.data.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {product.image ? (
                                            <Box
                                                component="img"
                                                sx={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 1 }}
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        ) : (
                                            <Box sx={{ height: 50, width: 50, bgcolor: 'grey.300', borderRadius: 1 }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}
                                    </TableCell>
                                    <TableCell>{product.slug}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="edit"
                                            component={Link}
                                            href={route('admin.products.edit', product.id)}
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDelete(product.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination 
                        count={products.last_page} 
                        page={products.current_page} 
                        onChange={handlePageChange} 
                        color="primary" 
                    />
                </Box>
            </TableContainer>
        </AdminLayout>
    );
}
