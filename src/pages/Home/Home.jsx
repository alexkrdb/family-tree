import { Button, Typography } from "@mui/material";
import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="Home">
      <div className="background-section">
        <Typography
          variant="h3"
          color="white"
          fontWeight="500"
          style={{
            zIndex: "2",
            backgroundColor: "#00000090",
            padding: "2rem",
            width: "80%",
            borderRadius: "20px",
          }}
        >
          Witaj na platformie do tworzenia drzew genealogicznych!
        </Typography>

        <img src="/images/background.jpg" alt="Background" />
      </div>
      <div className="content-section">
        <div className="text-section">
          <Typography variant="h4" color="black">
            Tworzenie Drzewa Genealogicznego
          </Typography>
          <Typography variant="body1" color="black">
            Możesz z łatwością tworzyć drzewo genealogiczne, dodając informacje
            o przodkach, przeglądając historie rodzinne i odkrywając
            skomplikowane relacje.
          </Typography>
        </div>
        <img src="/images/Familyphotosinframes.jpg" alt="Family" width="95%" />
      </div>
      <div className="content-section">
        <img src="/images/7495.jpg" alt="Man with Laptop" width="40%" />
        <div className="text-section">
          <Typography variant="h4" color="black">
            Komunikacja z Rodziną
          </Typography>
          <Typography variant="body1" color="black">
            Łącz się ze swoją rodziną na naszym dedykowanym portalu. Dziel się
            wiadomościami, zdjęciami i wspomnieniami z bliskimi, niezależnie od
            tego, gdzie się znajdują.
          </Typography>
        </div>
      </div>
      <div className="content-section">
        <div className="text-section">
          <Typography variant="h4" color="black">
            Tworzenie Wspomnień
          </Typography>
          <Typography variant="body1" color="black">
            Dzięki naszej funkcji tworzenia postów możesz udostępniać swoje
            najważniejsze wspomnienia i wydarzenia z rodziną.
          </Typography>
        </div>
        <img src="/images/family.jpg" alt="Family" width="90%" />
      </div>
      <div className="last-section">
        <Typography variant="body1">
          Odkryj historię i twórz wspomnienia! Dołącz do genealogicznej
          przygody na naszej platformie!
        </Typography>

        <Link to="/login">
          <Button variant="contained" >Zarejestruj się</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
