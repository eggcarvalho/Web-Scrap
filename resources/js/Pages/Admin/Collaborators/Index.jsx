import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

export default function Index({ collaborators }) {
    const { auth } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este colaborador?')) {
            destroy(route('admin.collaborators.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Colaboradores" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Colaboradores
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    href={route('admin.collaborators.create')}
                >
                    Novo Colaborador
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de colaboradores">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Data Criação</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collaborators.map((collaborator) => (
                            <TableRow
                                key={collaborator.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {collaborator.id}
                                </TableCell>
                                <TableCell>{collaborator.name}</TableCell>
                                <TableCell>{collaborator.email}</TableCell>
                                <TableCell>{new Date(collaborator.created_at).toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title={collaborator.id === auth.user.id ? "Você não pode se excluir" : "Excluir"}>
                                        <span>
                                            <IconButton
                                                aria-label="edit"
                                                component={Link}
                                                href={route('admin.collaborators.edit', collaborator.id)}
                                                color="primary"
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDelete(collaborator.id)}
                                                disabled={collaborator.id === auth.user.id}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
