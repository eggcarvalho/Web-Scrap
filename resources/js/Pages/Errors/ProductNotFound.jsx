import { Box, Typography, Button } from "@mui/material";

export default function ProductNotFound() {
    document.title = "Product not found.";
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                textAlign: "center",
                p: 2,
            }}
        >
            <Typography variant="h2" fontWeight="bold">
                404
            </Typography>
            <Typography variant="h5">URL not found</Typography>
            <Typography variant="body1" sx={{ maxWidth: 400 }}>
                It seems you opened a door that doesn’t exist. Let’s guide you
                back to safety.
            </Typography>

            <Button variant="contained" sx={{ mt: 2 }}>
                Go to Home
            </Button>
        </Box>
    );
}
