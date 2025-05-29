import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Andmete laadimise viga:", err);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!country) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Riiki ei leitud</Typography>
      </Container>
    );
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "Puudub";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "Puudub";

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {country.name.common}
          </Typography>
          <img
            src={country.flags.svg}
            alt={`Lipp: ${country.name.common}`}
            style={{ width: "200px", marginBottom: "1rem" }}
          />
          <Typography><strong>Pealinn:</strong> {country.capital?.[0] || "Puudub"}</Typography>
          <Typography><strong>Rahvaarv:</strong> {country.population.toLocaleString()}</Typography>
          <Typography><strong>Pindala:</strong> {country.area.toLocaleString()} km²</Typography>
          <Typography><strong>Keeled:</strong> {languages}</Typography>
          <Typography><strong>Valuutad:</strong> {currencies}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CountryDetails;
