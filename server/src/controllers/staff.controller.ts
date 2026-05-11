import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStaff = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const search = String(req.query.search || '');
    const departmentId = String(req.query.departmentId || '');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (departmentId) where.departmentId = departmentId;
    if (search) {
      where.OR = [
        { user: { firstName: { contains: search } } },
        { user: { lastName: { contains: search } } },
        { title: { contains: search } },
      ];
    }

    const [staff, total] = await Promise.all([
      prisma.staffMember.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          department: { select: { id: true, name: true } },
        },
        orderBy: { user: { firstName: 'asc' } },
      }),
      prisma.staffMember.count({ where }),
    ]);

    res.json({
      data: staff,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch staff' });
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staffMember.findUnique({
      where: { id: String(req.params.id) },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        department: true,
        papers: { take: 5, orderBy: { publishedAt: 'desc' } },
        courses: { take: 5 },
      },
    });
    if (!staff) return res.status(404).json({ message: 'Staff member not found' });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch staff member' });
  }
};
