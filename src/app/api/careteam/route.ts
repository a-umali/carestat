import { NextRequest, NextResponse } from 'next/server';
import pool from '../../lib/db';

// Handle POST request to add a new provider
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, title, specialty, imageUrl } = data;

    const db = await pool.getConnection();
    await db.execute(
      'INSERT INTO careteam (name, title, specialty, imageUrl) VALUES (?, ?, ?, ?)',
      [name, title, specialty, imageUrl]
    );
    db.release(); // Release the connection back to the pool

    return NextResponse.json({ message: 'Provider added successfully' });
  } catch (error) {
    console.error('Error adding provider:', error);
    return NextResponse.json({ message: 'Error adding provider' }, { status: 500 });
  }
}

// Handle GET request to fetch all providers
export async function GET(req: NextRequest) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query('SELECT * FROM careteam ORDER BY id DESC'); // Fetch all records
    db.release(); // Release the connection back to the pool

    if (rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json({ message: 'Error fetching providers' }, { status: 500 });
  }
}
