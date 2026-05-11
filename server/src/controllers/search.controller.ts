import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const globalSearch = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const searchTerm = q.trim();

    const [news, research, staff] = await Promise.all([
      prisma.news.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { content: { contains: searchTerm } },
          ],
        },
        take: 5,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.researchPaper.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { abstract: { contains: searchTerm } },
            { authors: { contains: searchTerm } },
          ],
        },
        take: 5,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.staffMember.findMany({
        where: {
          OR: [
            { user: { firstName: { contains: searchTerm } } },
            { user: { lastName: { contains: searchTerm } } },
            { title: { contains: searchTerm } },
          ],
        },
        take: 5,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          department: { select: { name: true } },
        },
      }),
    ]);

    const total = news.length + research.length + staff.length;

    res.json({ query: searchTerm, total, results: { news, research, staff } });
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
};
