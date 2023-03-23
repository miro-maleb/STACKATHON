import prisma from "../../../../prisma/prismaClientGen";

//find all categories
//api/categories
export default async function handler(req, res) {
  if (req.method === "GET") {
    const allCategories = await prisma.category.findMany();
    res.status(200).json(allCategories);
  } else if (req.method === "POST") {
    const category = req.body.category;
    const newCategory = {
      name: category,
      user: {
        connect: {
          username: "miro",
        },
      },
    };
    await prisma.category.create({
      data: newCategory,
    });
    res.status(201).json(newCategory);
  }
}
