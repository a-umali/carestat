import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

// Handle PUT request to update a provider
export async function PUT(req: NextRequest) {
    try {
      const { id, name, title, specialty, imageUrl } = await req.json();
  
      if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
      }
  
      const db = await pool.getConnection();
      const [result] = await db.execute(
        'UPDATE careteam SET name = ?, title = ?, specialty = ?, imageUrl = ? WHERE id = ?',
        [name, title, specialty, imageUrl, id]
      );
  
      db.release(); // Release the connection back to the pool
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'No data found for the provided ID' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Provider updated successfully' });
    } catch (error) {
      console.error('Error updating provider:', error);
      return NextResponse.json({ message: 'Error updating provider' }, { status: 500 });
    }
  }
  
  // Handle DELETE request to remove a provider
  export async function DELETE(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop(); // Get the last part of the URL path
  
      if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
      }
  
      if (isNaN(Number(id))) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }
  
      const db = await pool.getConnection();
      const [result] = await db.execute('DELETE FROM careteam WHERE id = ?', [id]);
  
      db.release(); // Release the connection back to the pool
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'No data found for the provided ID' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Provider deleted successfully' });
    } catch (error) {
      console.error('Error deleting provider:', error);
      return NextResponse.json({ message: 'Error deleting provider' }, { status: 500 });
    }
  }
  