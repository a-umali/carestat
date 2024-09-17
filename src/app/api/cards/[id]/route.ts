import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const db = await pool.getConnection();
    const [result] = await db.execute('DELETE FROM cards WHERE id = ?', [id]);
    db.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No card found for the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json({ message: 'Error deleting card' }, { status: 500 });
  }
}