import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { Hole } from '@/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      const result = await db.insert(Hole).values({
        hole_id: data.Hole_ID,       // ← debe coincidir con el nombre del esquema
        logged_by: data.Logged_By,
        depth_from: data.Depth_From.toString(),
        alpha: data.alpha_num.toString(),
        beta: data.beta_num.toString(),
        structure_type: data.Structure_Type,
        texture_type: data.Texture_Type,
      }).returning();

      res.status(200).json(result[0]);

    } catch (error) {
      handleDrizzleError(error, res);
    }
  } else {
    res.status(405).end();
  }
}

// Manejador de errores específico para Drizzle
function handleDrizzleError(error: unknown, res: NextApiResponse) {
  console.error('Drizzle Error:', error);
  
  const errorResponse = {
    error: 'Database Error',
    message: 'Unknown error',
    code: 'UNKNOWN'
  };

  if (typeof error === 'object' && error !== null) {
    const drizzleError = error as { code?: string; message?: string };
    
    if (drizzleError.code === '23505') {
      errorResponse.message = 'Duplicate entry';
      errorResponse.code = 'DUPLICATE_ENTRY';
    } else if (drizzleError.code === '22P02') {
      errorResponse.message = 'Invalid data format';
      errorResponse.code = 'INVALID_FORMAT';
    } else if (drizzleError.message) {
      errorResponse.message = drizzleError.message;
    }
  }

  res.status(500).json(errorResponse);
}