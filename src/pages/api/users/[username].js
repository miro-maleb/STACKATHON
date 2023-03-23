import prisma from "../../../../prisma/prismaClientGen";
//api/users/#userId
export default async function handler(req, res) {
  const { username } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  res.status(200).json(user);
}
