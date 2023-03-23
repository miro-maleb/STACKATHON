import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function () {
  const router = useRouter();
  const { isReady } = router;
  const params = router.query;
  let posted = false;

  useEffect(() => {
    if (isReady) {
      const fetchRecipe = async () => {
        const body = {
          spice: params.params[0],
          temperature: params.params[1],
          complexity: params.params[2],
          country: params.params[3],
          type: params.params[4],
        };
        console.log("INSIDE FETCH RECIPE");
        const response = await axios.post("/api/openai", body);
        const data = JSON.parse(response.data);
        console.log("LOGGIN data", data);
        if (!posted) {
          await axios.post("/api/recipes", {
            data: {
              name: data.name,
              description: data.description,
              directions: data.instructions,
              username: "miro",
              ingredients: data.ingredients,
            },
          });
          posted = true;
        }
        router.replace("/recipes");
        return data;
      };
      fetchRecipe();
    }
  }, [isReady]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography>A robot is making your recipe...</Typography>
      <img src="https://www.food-management.com/sites/food-management.com/files/styles/article_featured_retina/public/robot-chef.jpg?itok=d2mp1s3Y"></img>
    </>
  );
}
