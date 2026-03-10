import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { fetchTitles } from '../services/scraper';

const router = Router();

router.get('/I/want/title', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryKeys = Object.keys(req.query);

    if (!req.query.address) {
      return next(createError(400, 'address query parameter is required'));
    }

    if (queryKeys.length > 1) {
      return next(createError(400, 'Only the "address" query parameter is allowed'));
    }

    const addressParam = req.query.address as string | string[];
    const urls: string[] = Array.isArray(addressParam)
      ? addressParam.flatMap((u) => u.split(','))
      : addressParam.split(',');

    const trimmed = urls.map((u) => u.trim()).filter(Boolean);

    if (trimmed.length === 0) {
      return next(createError(400, 'No valid URLs provided'));
    }

    const results = await fetchTitles(trimmed);
    res.render('index', { title: 'Page Titles', urls: results });
  } catch (error) {
    next(error);
  }
});

export default router;
