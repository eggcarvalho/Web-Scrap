import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Typography, Paper, Grid } from '@mui/material';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Bem-vindo ao Painel Administrativo
                        </Typography>
                        <Typography component="p" variant="body1">
                            Aqui você poderá gerenciar o conteúdo do seu site.
                        </Typography>
                    </Paper>
                </Grid>
                {/* Adicionar mais widgets/cards aqui futuramente */}
            </Grid>
        </AdminLayout>
    );
}
