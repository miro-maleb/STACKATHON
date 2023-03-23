import Navbar from "../../components/Navbar";
import axios from "axios";
import {
  ListItemButton,
  Container,
  Typography,
  List,
  ListItem,
} from "@mui/material";
export default function (props) {
  const { singleRecipe } = props;
  const directions = singleRecipe.directions;
  const ingredients = singleRecipe.ingredients;
  console.log("SINGLE RECIPE HERE", singleRecipe.ingredients);
  let directionsArr = [];
  for (let step in directions) {
    directionsArr.push(directions[step]);
  }

  let ingredientsArr = [];
  for (let step in ingredients) {
    ingredientsArr.push(ingredients[step]);
  }

  return (
    <Container>
      <Navbar />
      <Typography variant="h3">{singleRecipe.name}</Typography>
      <Typography variant="body1">{singleRecipe.description}</Typography>
      <Typography variant="h5">Ingredients:</Typography>
      <List>
        {ingredientsArr.map((ingredient) => {
          return <ListItem>{ingredient.name}</ListItem>;
        })}
      </List>
      <Typography variant="h5">Directions:</Typography>
      <List>
        {directionsArr.map((step) => (
          <ListItem primary="checkbox">{step}</ListItem>
        ))}
      </List>
    </Container>
  );
}

export async function getStaticPaths() {
  const response = await axios.get(`http://127.0.0.1:3000/api/recipes`);
  const { data } = response;
  const paths = data.map((recipe) => {
    return {
      params: { recipeId: `${recipe.id}` },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { recipeId } = params;
  const response = await axios.get(
    `http://127.0.0.1:3000/api/recipes/${recipeId}`
  );
  const { data } = response;
  return {
    props: {
      singleRecipe: data,
    },
  };
}
