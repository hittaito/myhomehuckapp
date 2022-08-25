import { NextApiRequest, NextApiResponse } from 'next';
import { isMetrics, isRange, rangeMap, timedbQuery } from '../../../lib/timedb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.slug;

  if (typeof q === 'string' || q.length !== 2) {
    res.status(404).json({ error: 'invalid route' });
    return;
  }
  const metrics = q[0];
  if (!isMetrics(metrics)) {
    res.status(404).json({ error: 'invalid route' });
    return;
  }

  const range = q[1];
  if (!isRange(range)) {
    res.status(404).json({ error: 'invalid route' });
    return;
  }

  const data = await timedbQuery(range, metrics);

  res.status(200).json(data);
};
