import Navbar from "../../components/Navbar";
import axios from "axios";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";

export default function (props) {
  const { recipes } = props;

  const handleDelete = async (recipeId) => {
    await axios.delete(`/api/recipes/${recipeId}`, {
      recipeId,
    });
  };
  return (
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
      <Typography variant="h3">Your Recipes</Typography>
      {recipes.map((recipe) => {
        return (
          <div>
            <Link href={`/recipes/${recipe.id}`}>
              <Button size="small" variant="outlined">
                {recipe.name}
              </Button>
            </Link>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                handleDelete(recipe.id);
              }}
            >
              X
            </Button>
            <div>
              <Typography>{recipe.description}</Typography>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:3000/api/recipes");
  const { data } = response;
  return {
    props: {
      recipes: data,
    },
  };
}
