import prisma from "../../../../prisma/prismaClientGen";
//api/users/#categoryId
export default async function handler(req, res) {
  const { categoryId } = req.query;
  if (req.method === "GET") {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });
    res.status(200).json(category);
  } else if (req.method === "DELETE") {
    const deleteCategory = await prisma.category.delete({
      where: {
        id: parseInt(categoryId),
      },
    });
    res.status(200).json(deleteCategory);
  }
}
