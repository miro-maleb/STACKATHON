import prisma from "../../../../prisma/prismaClientGen";
//api/users/#ingredientId
export default async function handler(req, res) {
  const { ingredientId } = req.query;

  if (req.method === "GET") {
    const ingredient = await prisma.ingredient.findUnique({
      where: {
        id: parseInt(ingredientId),
      },
    });
    res.status(200).json(ingredient);
  } else if (req.method === "DELETE") {
    const deleteIngredient = await prisma.ingredient.delete({
      where: {
        id: parseInt(ingredientId),
      },
    });
    res.status(200).json(deleteIngredient);
  }
}
