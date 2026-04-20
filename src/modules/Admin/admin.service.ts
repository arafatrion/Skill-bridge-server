import { prisma } from "../../lib/prisma";

const getAdminStatsFromDB = async () => {
  const totalUsers = await prisma.user.count();
  const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
  const totalTutors = await prisma.user.count({ where: { role: 'TUTOR' } });
  const totalBookings = await prisma.booking.count();
  const pendingTutors = await prisma.user.count({
    where: {
      role: "TUTOR",
      status: "active",
    },
  });

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return {
    totalUsers,
    totalStudents,
    totalTutors,
    totalBookings,
    totalRevenue: 0,
    pendingTutors,
    recentUsers,
  };
};

const updateUserStatusInDB = async (id: string, status: string) => {
  const result = await prisma.user.update({
    where: { id },
    data: { status },
  });
  return result;
};

export const AdminService = {
  getAdminStatsFromDB,
  updateUserStatusInDB,
};