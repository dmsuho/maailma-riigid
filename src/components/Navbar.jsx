import { AppBar, Toolbar, Typography, Switch, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ mode, setMode }) {
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          🌍 Maailma Riigid
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">{mode === "light" ? "Light" : "Dark"}</Typography>
          <Switch checked={mode === "dark"} onChange={toggleMode} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
