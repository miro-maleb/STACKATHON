import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState } from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";

export default function (props) {
  const [newIngredient, setNewIngredient] = useState("");

  const { ingredients } = props;

  const handleClick = async () => {
    await axios.post("/api/ingredients", {
      newIngredient,
    });
  };
  const handleDelete = async (ingredientId) => {
    await axios.delete(`/api/ingredients/${ingredientId}`, {
      ingredientId,
    });
  };
  return (
    <div>
      <Container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width: 800,
          height: 300,
        }}
      >
        <Navbar />

        <input
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Button size="small" variant="outlined" onClick={handleClick}>
          Add Ingredient!
        </Button>
        <Typography variant="h3">Your Ingredients</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ingredients.map((ingredient) => {
            return (
              <Grid xs={3} item>
                <Typography variant="h5">{ingredient.name}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    handleDelete(ingredient.id);
                  }}
                >
                  X
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:3000/api/ingredients");
  const { data } = response;
  return {
    props: {
      ingredients: data,
    },
  };
}
