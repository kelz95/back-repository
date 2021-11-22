import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LanguageSwitcher from "#root/components/LanguageSwitcher";
import { useTypeSafeTranslation } from "#root/lib/hooks/useTypeSafeTranslation";

const NotFoundPage = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <Box
      id="notfound"
      sx={{
        position: "relative",
        height: "100vh",
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        paddingTop="2rem"
        paddingRight="2rem"
      >
        <div />
        <LanguageSwitcher logoColor="inherit" />
      </Stack>
      <Box
        className="notfound"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "520px",
          width: "100%",
          lineHeight: "1.4",
          textAlign: "center",
        }}
      >
        <Box
          className="notfound-404"
          height={{ xs: "162px", sm: "200px", md: "240px" }}
          sx={{
            position: "relative",
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontFamily: "'Cabin', sans-serif",
              position: "relative",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#262626",
              margin: "0px",
              letterSpacing: "3px",
              paddingLeft: "6px",
            }}
          >
            {t("pages.notFound.notFound")}
          </Typography>
          <Typography
            component="h1"
            fontSize={{ xs: "162px", sm: "200px", md: "252px" }}
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 900,
              margin: "0px",
              color: "#262626",
              textTransform: "uppercase",
              letterSpacing: "-40px",
              marginLeft: "-20px",
            }}
          >
            <Box component="span" sx={{ textShadow: "-8px 0px 0px #fff" }}>
              4
            </Box>
            <Box component="span" sx={{ textShadow: "-8px 0px 0px #fff" }}>
              0
            </Box>
            <Box component="span" sx={{ textShadow: "-8px 0px 0px #fff" }}>
              4
            </Box>
          </Typography>
        </Box>
        <Typography
          component="h2"
          fontSize={{ xs: "16px", sm: "20px" }}
          sx={{
            fontFamily: "'Cabin', sans-serif",
            // fontSize: "20px",
            fontWeight: 400,
            textTransform: "uppercase",
            color: "#000",
            marginTop: "0px",
            marginBottom: "25px",
          }}
        >
          {" "}
          {t("pages.notFound.message")}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mt: 3, mb: 2, alignItems: "center", justifyContent: "center" }}
        >
          {" "}
          {t("pages.notFound.return")}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
