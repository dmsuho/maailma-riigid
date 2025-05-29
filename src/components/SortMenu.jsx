import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function SortMenu({ sortBy, setSortBy }) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id="sort-label">Sorteeri</InputLabel>
      <Select
        labelId="sort-label"
        value={sortBy}
        label="Sorteeri"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <MenuItem value="name">Nime järgi (A-Z)</MenuItem>
        <MenuItem value="population">Rahvaarvu järgi (suurim)</MenuItem>
        <MenuItem value="area">Pindala järgi (suurim)</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortMenu;
