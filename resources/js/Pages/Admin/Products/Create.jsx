import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Typography, Paper, Box, TextField, Button, Alert } from '@mui/material';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        link: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Novo Produto" />
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <Paper sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Cadastrar Novo Produto
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome do Produto"
                            name="name"
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Preço (R$)"
                            name="price"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            error={!!errors.price}
                            helperText={errors.price}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Descrição"
                            name="description"
                            multiline
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={!!errors.description}
                            helperText={errors.description}
                        />

                         <TextField
                            margin="normal"
                            fullWidth
                            id="link"
                            label="Link Externo (Opcional)"
                            name="link"
                            value={data.link}
                            onChange={(e) => setData('link', e.target.value)}
                            error={!!errors.link}
                            helperText={errors.link}
                        />

                        <Box sx={{ mt: 2, mb: 1 }}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload de Imagem
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                            </Button>
                            {data.image && (
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    Arquivo selecionado: {data.image.name}
                                </Typography>
                            )}
                            {errors.image && (
                                <Typography variant="caption" color="error" display="block">
                                    {errors.image}
                                </Typography>
                            )}
                        </Box>
                        
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                                component={Link}
                                href={route('admin.products.index')}
                                variant="outlined"
                                color="inherit"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                            >
                                {processing ? 'Salvando...' : 'Salvar Produto'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </AdminLayout>
    );
}
