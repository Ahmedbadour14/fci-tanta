import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getResearch = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const search = req.query.search as string;
    const dept = req.query.dept as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { abstract: { contains: search } },
        { authors: { contains: search } },
      ];
    }
    if (dept && dept !== 'All') {
      where.staff = { department: { name: { contains: dept } } };
    }

    const [papers, total] = await Promise.all([
      prisma.researchPaper.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: { staff: { include: { department: true } } },
      }),
      prisma.researchPaper.count({ where }),
    ]);

    res.json({
      data: papers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch research papers' });
  }
};

export const createResearch = async (req: Request, res: Response) => {
  try {
    const { title, abstract, authors, publishedAt, url, staffId } = req.body;
    const paper = await prisma.researchPaper.create({
      data: { title, abstract, authors, publishedAt: new Date(publishedAt), url, staffId },
    });
    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create research paper' });
  }
};

export const updateResearch = async (req: Request, res: Response) => {
  try {
    const { title, abstract, authors, publishedAt, url } = req.body;
    const paper = await prisma.researchPaper.update({
      where: { id: req.params.id },
      data: { title, abstract, authors, publishedAt: new Date(publishedAt), url },
    });
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update research paper' });
  }
};

export const deleteResearch = async (req: Request, res: Response) => {
  try {
    await prisma.researchPaper.delete({ where: { id: req.params.id } });
    res.json({ message: 'Research paper deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete research paper' });
  }
};
