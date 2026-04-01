import { prisma } from "../config/prisma";

export const createSessionService = async (data: any) => {
  const { screenId, storeId } = data;

  const session = await prisma.session.create({
    data: {
      screenId,
      storeId,
      userId: "",
    },
  });

  return session;
};

export const registerUserService = async (data: any) => {
  const { name, phone, gender, sizes, sessionId } = data;

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      gender,
      sizes: {
        create: {
          topSize: sizes?.top,
          bottomSize: sizes?.bottom,
          shoeSize: sizes?.shoe,
        },
      },
    },
  });

  await prisma.session.update({
    where: { id: sessionId },
    data: {
      userId: user.id,
    },
  });

  return user;
};

export const getCurrentUserService = async (sessionId: string) => {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: {
        include: {
          sizes: true,
        },
      },
    },
  });
};
