import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Typography, Slider, Select, MenuItem, Button } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function () {
  const router = useRouter();
  const { params } = router.query;

  const [spice, setSpice] = useState("1");
  const [temperature, setTemperature] = useState("hot");
  const [complexity, setComplexity] = useState("1");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("dinner");

  useEffect(() => {
    if (params) {
      setCountry(params[0]);
    }
  }, []);

  const handleSubmit = () => {
    console.log("generating your recipe!");
    router.replace(
      // `/generate/${spice}/${temperature}/${complexity}/${country}/${type}`
      "/home"
    );
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width: 800,
          height: 300,
        }}
      >
        <Navbar className="justify-center" />
        <div>
          <label>
            <Typography>How Spicy Do You Want It? 1-5</Typography>
            <input onChange={(e) => setSpice(e.target.value)} value={spice} />
            <Slider
              size="small"
              onChange={(e) => setSpice(e.target.value)}
              value={spice}
              step={1}
              marks
              min={0}
              max={5}
            />
          </label>
        </div>

        <div>
          <label>
            <Typography>Do you want a hot dish or a cold dish?</Typography>
            <input
              onChange={(e) => setTemperature(e.target.value)}
              value={temperature}
            />
            <Select
              size="small"
              value={temperature}
              label="Hot/Cold"
              onChange={(e) => setTemperature(e.target.value)}
            >
              <MenuItem value={"hot"}>HOT</MenuItem>
              <MenuItem value={"cold"}>COLD</MenuItem>
            </Select>
          </label>
        </div>
        <div>
          <label>
            <Typography>
              How complex of a dish are you looking for? 1-5
            </Typography>
            <input
              onChange={(e) => setComplexity(e.target.value)}
              value={complexity}
            />

            <Slider
              size="small"
              onChange={(e) => setComplexity(e.target.value)}
              value={complexity}
              step={1}
              marks
              min={0}
              max={5}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography>Choose a country of origin</Typography>
            <input
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </label>
        </div>
        <div>
          <label>
            <Typography>Is this for breakfast, lunch, or dinner?</Typography>
            <input onChange={(e) => setType(e.target.value)} value={type} />
            <Select
              size="small"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"breakfast"}>Breakfast</MenuItem>
              <MenuItem value={"lunch"}>Lunch</MenuItem>
              <MenuItem value={"dinner"}>Dinner</MenuItem>
            </Select>
          </label>
        </div>
        <Button
          variant="contained"
          onClick={() =>
            router.replace(
              `/generate/${spice}/${temperature}/${complexity}/${country}/${type}`
            )
          }
          type={"submit"}
        >
          Cook Something Up!
        </Button>
      </Container>
    </>
  );
}
