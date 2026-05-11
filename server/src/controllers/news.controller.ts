import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && category !== 'All') where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.news.count({ where }),
    ]);

    res.json({
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await prisma.news.findUnique({ where: { id: String(req.params.id) } });
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const imageUrl = req.file
      ? `${String(req.protocol)}://${String(req.get('host'))}/uploads/${req.file.filename}`
      : undefined;

    const news = await prisma.news.create({
      data: { title, content, category, imageUrl },
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create news' });
  }
};

export const updateNews = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const data: any = { title, content, category };
    if (req.file) {
      data.imageUrl = `${String(req.protocol)}://${String(req.get('host'))}/uploads/${req.file.filename}`;
    }
    const news = await prisma.news.update({ where: { id: String(req.params.id) }, data });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update news' });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    await prisma.news.delete({ where: { id: String(req.params.id) } });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};
