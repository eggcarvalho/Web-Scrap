import {
    Box,
    Card,
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    Dialog,
    DialogContent,
    CircularProgress,
} from "@mui/material";
import AccessTimeIconOutlined from "@mui/icons-material/AccessTime";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Importei o ícone de sucesso
import { grey, green } from "@mui/material/colors"; // Importei a cor verde
import TextfieldMaskedComponent from "../../Components/TextfieldMaskedComponent";
import useCheckout from "./useCheckout";
import "toastify-js/src/toastify.css";

function Form({ product }) {
    document.title = product.name + " - Checkout";
    const { time, form, setForm, handleSubmit, processing, thankYou } =
        useCheckout(product.id);

    // 2. TELA DE AGRADECIMENTO (Substitui o formulário se thankYou for true)
    if (thankYou) {
        return (
            <Grid
                container
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
            >
                <Grid size={{ md: 6, lg: 4 }} padding={2}>
                    <Card
                        sx={{
                            borderRadius: 10,
                            padding: 5,
                            textAlign: "center",
                            boxShadow: 3,
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            marginBottom={3}
                        >
                            <CheckCircleOutlineIcon
                                sx={{ fontSize: 100, color: green[500] }}
                            />
                        </Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Thank You!
                        </Typography>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            gutterBottom
                        >
                            Your order has been placed successfully.
                        </Typography>
                        <Typography variant="body1" marginTop={2}>
                            You purchased: <strong>{product.name}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                marginTop: 4,
                                borderRadius: 5,
                                height: 50,
                            }}
                            onClick={() => window.location.reload()} // Exemplo de ação para resetar ou voltar
                        >
                            Back to Home
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            {/* 1. MODAL DE PROCESSAMENTO */}
            <Dialog
                open={processing}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "white",
                        borderRadius: 5,
                        padding: 4,
                        boxShadow: 5,
                    }}
                >
                    <CircularProgress size={60} thickness={4} />
                    <Typography
                        variant="h6"
                        marginTop={3}
                        fontWeight={"bold"}
                        color="textSecondary"
                    >
                        Processing...
                    </Typography>
                    <Typography variant="body2" color="initial">
                        Do not close this window or navigate away, or the
                        process may be interrupted.
                    </Typography>
                </DialogContent>
            </Dialog>

            {/* RESTANTE DO FORMULÁRIO ORIGINAL */}
            <Grid container>
                <Grid size={{ sm: 12 }}>
                    <Box
                        bgcolor={"rgb(234 56 76)"}
                        height={96}
                        display={"flex"}
                        alignContent={"center"}
                        justifyContent={"center"}
                        gap={2}
                    >
                        <Typography
                            variant="h3"
                            color="white"
                            display={"flex"}
                            alignItems={"center"}
                        >
                            {time}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="white"
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                        >
                            <AccessTimeIconOutlined sx={{ fontSize: 32 }} />
                            PROMOTION TODAY ONLY
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container display={"flex"} justifyContent={"center"}>
                <Grid size={{ md: 8, lg: 4 }} paddingTop={2}>
                    <Card
                        sx={{
                            borderRadius: 10,
                            padding: 5,
                            minHeight: "500px",
                        }}
                    >
                        <Grid container gap={2}>
                            <Grid size={{ sm: 2 }}>
                                <img
                                    src={product.image}
                                    style={{ width: "100%" }}
                                    alt={product.name}
                                />
                            </Grid>
                            <Grid size={{ sm: 8 }}>
                                <Typography
                                    variant="h6"
                                    color="initial"
                                    fontWeight={"bold"}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="success"
                                    fontWeight={"bold"}
                                >
                                    Total: $ {product.price.toFixed(2)} USD
                                </Typography>
                                <Typography variant="body2" color="initial">
                                    {product.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={handleSubmit}>
                            <Grid container marginTop={5} gap={2}>
                                <Grid size={12}>
                                    <TextField
                                        label="Full name"
                                        error={form.name.error}
                                        helperText={form.name.message}
                                        fullWidth
                                        variant="outlined"
                                        value={form.name.value}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: {
                                                    error: false,
                                                    value: e.target.value,
                                                    message: "",
                                                },
                                            })
                                        }
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.8rem",
                                                color: "hsl(222 47% 11%))",
                                                "& fieldset": {
                                                    border: "1px solid rgb(228, 228, 231);",
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        error={form.email.error}
                                        helperText={form.email.message}
                                        type="email"
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        value={form.email.value}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: {
                                                    error: false,
                                                    value: e.target.value,
                                                    message: "",
                                                },
                                            })
                                        }
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.8rem",
                                                color: "hsl(222 47% 11%))",
                                                "& fieldset": {
                                                    border: "1px solid rgb(228, 228, 231);",
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Box marginTop={2}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        height: 50,
                                        width: 120,
                                        display: "flex",
                                        gap: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CreditCardOutlinedIcon />
                                    Card
                                </Button>
                            </Box>
                            <Box marginTop={2}>
                                <Card
                                    sx={{
                                        padding: 3,
                                        borderRadius: 5,
                                        bgcolor: grey[50],
                                    }}
                                >
                                    <TextfieldMaskedComponent
                                        error={form.card.number.error}
                                        helperText={form.card.number.message}
                                        label="Credit card number"
                                        mask="0000 0000 0000 0000"
                                        value={form.card.number.value}
                                        onchange={(value) =>
                                            setForm({
                                                ...form,
                                                card: {
                                                    ...form.card,
                                                    number: {
                                                        value,
                                                        error: false,
                                                        message: "",
                                                    },
                                                },
                                            })
                                        }
                                    />

                                    <Grid container marginTop={2}>
                                        <Grid size={6} paddingRight={1}>
                                            <TextField
                                                error={
                                                    form.card.expiration.month
                                                        .error
                                                }
                                                helperText={
                                                    form.card.expiration.month
                                                        .message
                                                }
                                                label="Month"
                                                fullWidth
                                                select
                                                variant="outlined"
                                                value={
                                                    form.card.expiration.month
                                                        .value
                                                }
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        card: {
                                                            ...form.card,
                                                            expiration: {
                                                                ...form.card
                                                                    .expiration,
                                                                month: {
                                                                    error: false,
                                                                    value: e
                                                                        .target
                                                                        .value,
                                                                    message: "",
                                                                },
                                                            },
                                                        },
                                                    })
                                                }
                                                sx={{
                                                    "& .MuiOutlinedInput-root":
                                                        {
                                                            borderRadius:
                                                                "0.8rem",
                                                            color: "hsl(222 47% 11%))",
                                                            "& fieldset": {
                                                                border: "1px solid rgb(228, 228, 231);",
                                                            },
                                                        },
                                                }}
                                            >
                                                {Array.from(
                                                    { length: 12 },
                                                    (_, i) => (
                                                        <MenuItem
                                                            key={i + 1}
                                                            value={i + 1}
                                                        >
                                                            {(i + 1)
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </TextField>
                                        </Grid>
                                        <Grid size={6} paddingLeft={1}>
                                            <TextField
                                                error={
                                                    form.card.expiration.year
                                                        .error
                                                }
                                                helperText={
                                                    form.card.expiration.year
                                                        .message
                                                }
                                                label="Year"
                                                fullWidth
                                                select
                                                variant="outlined"
                                                value={
                                                    form.card.expiration.year
                                                        .value
                                                }
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        card: {
                                                            ...form.card,
                                                            expiration: {
                                                                ...form.card
                                                                    .expiration,
                                                                year: {
                                                                    error: false,
                                                                    value: e
                                                                        .target
                                                                        .value,
                                                                    message: "",
                                                                },
                                                            },
                                                        },
                                                    })
                                                }
                                                sx={{
                                                    "& .MuiOutlinedInput-root":
                                                        {
                                                            borderRadius:
                                                                "0.8rem",
                                                            color: "hsl(222 47% 11%))",
                                                            "& fieldset": {
                                                                border: "1px solid rgb(228, 228, 231);",
                                                            },
                                                        },
                                                }}
                                            >
                                                {Array.from(
                                                    { length: 10 },
                                                    (_, i) => (
                                                        <MenuItem
                                                            key={
                                                                i +
                                                                new Date().getFullYear()
                                                            }
                                                            value={
                                                                i +
                                                                new Date().getFullYear()
                                                            }
                                                        >
                                                            {(
                                                                i +
                                                                new Date().getFullYear()
                                                            ).toString()}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        marginTop={2}
                                        marginBottom={5}
                                    >
                                        <Grid size={12}>
                                            <TextField
                                                error={form.card.cvv.error}
                                                helperText={
                                                    form.card.cvv.message
                                                }
                                                id=""
                                                label="CVV"
                                                fullWidth
                                                value={form.card.cvv.value}
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        card: {
                                                            ...form.card,
                                                            cvv: {
                                                                error: false,
                                                                value: e.target
                                                                    .value,
                                                                message: "",
                                                            },
                                                        },
                                                    });
                                                }}
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root":
                                                        {
                                                            borderRadius:
                                                                "0.8rem",
                                                            color: "hsl(222 47% 11%))",
                                                            "& fieldset": {
                                                                border: "1px solid rgb(228, 228, 231);",
                                                            },
                                                        },
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="rgb(107 114 128 / 0.8)"
                                                display={"flex"}
                                                alignItems={"center"}
                                                gap={1}
                                                marginTop={2}
                                                fontSize={13}
                                            >
                                                <ShieldOutlinedIcon />
                                                We protect your payment data
                                                with encryption to ensure
                                                bank-level security.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        disabled={processing} // Desabilita o botão enquanto processa
                                        sx={{
                                            height: 60,
                                            borderRadius: 5,
                                        }}
                                    >
                                        PAY (${product.price.toFixed(2)})
                                    </Button>
                                </Card>
                            </Box>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Form;
