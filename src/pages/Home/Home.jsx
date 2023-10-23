//import './Home.css';
import { Button, Typography } from "@mui/material";

function Home() {
  return (
    <div
      className="Home"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/grandma-grandson-hugging-after-social-distancing-design-space_53876-97130.jpg?w=1380&t=st=1697553759~exp=1697554359~hmac=b846c3d579b530e2182eb16e67b7ea7db81171ab4d414cfc0dd0d07adb0546f1)",
          height: "600px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", 
        }}
      >
        <div
        style={{
          maxWidth: "45%",
        }}
        >
        <Typography variant="h4" color="black">
        Witaj na naszej platformie do tworzenia drzew genealogicznych!
        </Typography>
        </div>

      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" color="black">
            Tworzenie Drzewa Genealogicznego
          </Typography>
          <Typography variant="body1" color="black">
            Z naszą platformą możesz z łatwością rozpocząć tworzenie swojego
            drzewa genealogicznego. Dodawaj informacje o swoich przodkach,
            przeglądaj historie rodzinne i odkrywaj skomplikowane relacje
            rodzinne. Poznaj swoje korzenie i stwórz piękne drzewo
            genealogiczne, które przekazasz przyszłym pokoleniom.
          </Typography>
        </div>
        <img
          src="https://img.freepik.com/free-vector/family-photos-frames-illustration_74855-15402.jpg?w=1060&t=st=1697547013~exp=1697547613~hmac=4af8ac320ca441aa66aee32a3b02fe07874c5e56f95a9df9b78b34b5f9843cd0"
          width="95%"
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          backgroundColor: "#eaf3fa",
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/human-hand-holding-mobile-phone-with-text-messages_74855-6531.jpg?size=626&ext=jpg&ga=GA1.1.1747624908.1671567632"
          width="60%"
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" color="black">
            Komunikacja z Rodziną
          </Typography>
          <Typography variant="body1" color="black">
            Łącz się ze swoją rodziną na naszym dedykowanym portalu. Dziel się
            wiadomościami, zdjęciami i wspomnieniami z bliskimi, niezależnie od
            tego, gdzie się znajdują. Nasza platforma umożliwia ci utrzymanie
            silnych więzi rodzinnych.
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" color="black">
            Tworzenie Wspomnień
          </Typography>
          <Typography variant="body1" color="black">
            Dzięki naszej funkcji tworzenia postów możesz udostępniać swoje
            najważniejsze wspomnienia i wydarzenia z rodziną i przyjaciółmi.
            Zapisuj historie, dodawaj zdjęcia i komentuj wpisy innych członków
            rodziny, aby budować spersonalizowany chronologiczny zapis swojego
            życia.
          </Typography>
        </div>
        <img
          src="https://img.freepik.com/free-vector/family-meeting-grandparents-country-house-excited-children-parents-visiting-grandmother-grandfather-boy-running-granny-vector-illustration-happy-family-love-parenting_74855-8358.jpg?size=626&ext=jpg&ga=GA1.1.1747624908.1671567632"
          width="90%"
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          height: "200px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        <Typography variant="body1">
          Tylko kilka kroków dzieli Cię od odkrywania swojej historii i
          tworzenia wyjątkowych wspomnień. Dołącz już dziś i zacznij swoją
          genealogiczną i rodzinna przygodę na naszej platformie!
        </Typography>

        <div>
          <Button variant="contained">Zacznij</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
