import { useEffect, useState } from "react";
import SortMenu from "../components/SortMenu";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.error("Viga andmete laadimisel:", err);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Move sort logic after filteredCountries
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortBy === "population") {
      return (b.population || 0) - (a.population || 0);
    } else if (sortBy === "area") {
      return (b.area || 0) - (a.area || 0);
    } else {
      return 0;
    }
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCountries = sortedCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, color: "primary.main" }}>
        Maailma Riigid
      </Typography>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortMenu sortBy={sortBy} setSortBy={setSortBy} />

      <Grid container spacing={3}>
        {currentCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.cca3}>
            <Link to={`/country/${country.name.common}`} style={{ textDecoration: "none" }}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <img
                    src={country.flags.svg}
                    alt={`Lipp: ${country.name.common}`}
                    style={{
                      width: "80px",
                      height: "auto",
                      marginBottom: "1rem",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                  <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Pealinn: {country.capital ? country.capital[0] : "Puudub"}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Container>
  );
}

export default HomePage;
