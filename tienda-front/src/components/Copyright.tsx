import { Link, Typography, TypographyProps } from "@mui/material";

type CopyrightProps = TypographyProps;

const Copyright = (props: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/kelz95/pineapple-repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pineapple Supermarket
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
