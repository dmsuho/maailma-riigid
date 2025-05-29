// This component is the search input for filtering countries

import { TextField } from "@mui/material";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Otsi riiki..."
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
}

export default SearchBar;
