import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStats = async (_req: Request, res: Response) => {
  try {
    const [
      totalStudents,
      totalStaff,
      totalNews,
      totalResearch,
      totalDepartments,
      recentNews,
      usersByRole,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.staffMember.count(),
      prisma.news.count(),
      prisma.researchPaper.count(),
      prisma.department.count(),
      prisma.news.findMany({
        take: 6,
        orderBy: { publishedAt: 'desc' },
        select: { category: true, publishedAt: true, title: true },
      }),
      prisma.user.groupBy({ by: ['role'], _count: { role: true } }),
    ]);

    // Build monthly publication data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyNews = await prisma.news.findMany({
      where: { publishedAt: { gte: sixMonthsAgo } },
      select: { publishedAt: true },
    });

    const monthlyData: Record<string, number> = {};
    monthlyNews.forEach((n) => {
      const key = n.publishedAt.toISOString().substring(0, 7); // YYYY-MM
      monthlyData[key] = (monthlyData[key] || 0) + 1;
    });

    res.json({
      totalStudents,
      totalStaff,
      totalNews,
      totalResearch,
      totalDepartments,
      recentActivity: recentNews,
      usersByRole: usersByRole.map((r) => ({ role: r.role, count: r._count.role })),
      monthlyPublications: Object.entries(monthlyData).map(([month, count]) => ({
        month,
        count,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};
