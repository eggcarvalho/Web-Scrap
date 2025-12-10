import { Box, Card, Grid, Typography } from "@mui/material";
import { pink, red } from "@mui/material/colors";
import AccessTimeIconOutlined from "@mui/icons-material/AccessTime";

function Form() {
    document.title = "Safe Payment";
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
                            00:00
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
                <Grid size={{ md: 4 }} paddingTop={5}>
                    <Card
                        sx={{
                            borderRadius: 10,
                            padding: 5,
                            minHeight: "500px",
                        }}
                    >
                        teste
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Form;
