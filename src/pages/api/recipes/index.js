import prisma from "../../../../prisma/prismaClientGen";

//find all recipes
//api/recipes
export default async function handler(req, res) {
  if (req.method === "GET") {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  } else if (req.method === "POST") {
    const newRecipe = req.body;
    console.log("req.body", req.body);
    await prisma.recipe.create(newRecipe);
    // const recipe = await prisma.recipe.findUnique({
    //   name: newRecipe.name,
    // });
    // console.log("queried the new recipe", recipe);
    console.log("LOGGING RES HERE", res);
    res.status(201).json(newRecipe);
  }
}
