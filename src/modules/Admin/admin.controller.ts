import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";

const getAdminStats = async (req: Request, res: Response) => {
  try {
  
    const totalUsers = await prisma.user.count();
    
    const totalStudents = await prisma.user.count({ 
      where: { role: 'STUDENT' } 
    });
    
    const totalTutors = await prisma.user.count({ 
      where: { role: 'TUTOR' } 
    });

    
    const totalBookings = await prisma.booking.count();

   
    const activeTutors = await prisma.user.count({
      where: {
        role: "TUTOR",
        status: "active"
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
        status: true
      }
    });


    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin statistics fetched successfully',
      data: {
        totalUsers,
        totalStudents,
        totalTutors,
        totalBookings,
        totalRevenue: 0, 
        pendingTutors: activeTutors,
        recentUsers,
      },
    });
  } catch (error: any) {
  
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await prisma.user.update({
      where: { id : id as string },
      data: { status }
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `User status updated to ${status} successfully`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
    });
  }
};

export const AdminController = {
  getAdminStats,
  updateUserStatus,
};