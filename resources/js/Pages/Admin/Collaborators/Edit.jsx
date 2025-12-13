import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Typography, Paper, Box, TextField, Button } from '@mui/material';

export default function Edit({ collaborator }) {
    const { data, setData, put, processing, errors } = useForm({
        name: collaborator.name,
        email: collaborator.email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.collaborators.update', collaborator.id));
    };

    return (
        <AdminLayout>
            <Head title="Editar Colaborador" />
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                <Paper sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Editar Colaborador
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome Completo"
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
                            id="email"
                            label="Endereço de Email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Nova Senha (deixe em branco para manter)"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password_confirmation"
                            label="Confirmar Nova Senha"
                            type="password"
                            id="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
                        />
                        
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                                component={Link}
                                href={route('admin.collaborators.index')}
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
                                {processing ? 'Salvar Alterações' : 'Salvar'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </AdminLayout>
    );
}
