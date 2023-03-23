import prisma from "../../../../prisma/prismaClientGen";

//find all ingredients
//api/ingredients
export default async function handler(req, res) {
  if (req.method === "GET") {
    const allIngredients = await prisma.ingredient.findMany();
    res.status(200).json(allIngredients);
  } else if (req.method === "POST") {
    const newIngredient = req.body.newIngredient;
    await prisma.ingredient.create({
      data: {
        name: newIngredient,
        user: {
          connect: {
            username: "miro",
          },
        },
      },
    });
    res.status(201).json(newIngredient);
  }
}
