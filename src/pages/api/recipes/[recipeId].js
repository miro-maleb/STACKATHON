import prisma from "../../../../prisma/prismaClientGen";
//api/users/#recipeId
export default async function handler(req, res) {
  const { recipeId } = req.query;

  if (req.method === "GET") {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(recipeId),
      },
    });
    res.status(200).json(recipe);
  } else if (req.method === "DELETE") {
    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(recipeId),
      },
    });
    res.status(200).json(deleteRecipe);
  }
}
