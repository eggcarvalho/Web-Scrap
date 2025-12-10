import {
    Box,
    Card,
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import AccessTimeIconOutlined from "@mui/icons-material/AccessTime";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { grey } from "@mui/material/colors";
import TextfieldMaskedComponent from "../../Components/TextfieldMaskedComponent";
import useCheckout from "./useCheckout";

function Form({ product }) {
    document.title = "Safe Payment";
    const { time } = useCheckout();
    return (
        <>
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
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Grid container marginTop={5} gap={2}>
                                <Grid size={12}>
                                    <TextField
                                        label="Full name"
                                        required
                                        fullWidth
                                        variant="outlined"
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
                                        id=""
                                        type="email"
                                        required
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
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
                        </form>
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
                                    label="Credit card number"
                                    required
                                    mask="0000 0000 0000 0000"
                                />
                                <Grid container marginTop={2}>
                                    <Grid size={6} paddingRight={1}>
                                        <TextField
                                            label="Month"
                                            required
                                            fullWidth
                                            select
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "0.8rem",
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
                                                            .padStart(2, "0")}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid size={6} paddingLeft={1}>
                                        <TextField
                                            label="Year"
                                            required
                                            fullWidth
                                            select
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "0.8rem",
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
                                <Grid container marginTop={2} marginBottom={5}>
                                    <Grid size={12}>
                                        <TextField
                                            id=""
                                            required
                                            label="CVV"
                                            fullWidth
                                            variant="outlined"
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
                                            We protect your payment data with
                                            encryption to ensure bank-level
                                            security.
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        height: 60,
                                        borderRadius: 5,
                                    }}
                                >
                                    PAY (${product.price.toFixed(2)})
                                </Button>
                            </Card>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Form;
