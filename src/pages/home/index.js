import { useState } from "react";
import {
  ButtonGroup,
  Card,
  CardHeader,
  Button,
  Grid,
  Item,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Link from "next/link";
import { createTheme } from "@mui/system";

export default function Home(props) {
  const [newCategory, setNewCategory] = useState("");
  const { categories } = props;

  const handleClick = async () => {
    await axios.post("/api/categories", {
      category: newCategory,
    });
  };

  const handleDelete = async (categoryId) => {
    await axios.delete(`/api/categories/${categoryId}`, {
      categoryId,
    });
  };

  if (categories.length > 0) {
    return (
      <>
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
          <Typography variant="h4">What are you hungry for?</Typography>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={8}
            spacing={{ xs: 4, md: 4 }}
            columns={12}
          >
            {categories.map((category) => (
              <Grid item xs={4}>
                <ButtonGroup>
                  <Link
                    key={category.id}
                    value={category.name}
                    href={{
                      pathname: `/new-recipe/${category.name}`,
                    }}
                  >
                    <Button variant="contained">{category.name}</Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleDelete(category.id);
                    }}
                  >
                    X
                  </Button>
                </ButtonGroup>
              </Grid>
            ))}
            <Grid item xs={12}>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button variant="contained" onClick={handleClick}>
                make new category
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else return null;
}
export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:3000/api/categories");
  const { data } = response;
  return {
    props: {
      categories: data,
    },
  };
}
