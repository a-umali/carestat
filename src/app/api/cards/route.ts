import { NextRequest, NextResponse } from 'next/server';
import pool from '../../lib/db';

// Helper function to format date
const formatDate = (date: string): string => {
  // Convert to YYYY-MM-DD format
  return new Date(date).toISOString().split('T')[0];
}

// Handle POST request to add a new card
export async function POST(req: NextRequest) {
  try {
    const { title, date, description } = await req.json();

    // Validate input
    if (!title || !date || !description) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const formattedDate = formatDate(date);

    const db = await pool.getConnection();
    await db.execute(
      'INSERT INTO cards (title, date, description) VALUES (?, ?, ?)',
      [title, formattedDate, description]
    );
    db.release(); // Release the connection back to the pool

    return NextResponse.json({ message: 'Card added successfully' });
  } catch (error) {
    console.error('Error adding card:', error);
    return NextResponse.json({ message: 'Error adding card' }, { status: 500 });
  }
}

// Handle GET request to fetch all cards
export async function GET(req: NextRequest) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query('SELECT * FROM cards ORDER BY id DESC'); // Fetch all records
    db.release(); // Release the connection back to the pool

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ message: 'Error fetching cards' }, { status: 500 });
  }
}

// Handle PUT request to update a card
export async function PUT(req: NextRequest) {
  try {
    const { id, title, date, description } = await req.json();

    // Validate input
    if (!id || !title || !date || !description) {
      return NextResponse.json({ message: 'ID, title, date, and description are required' }, { status: 400 });
    }

    const formattedDate = formatDate(date);

    const db = await pool.getConnection();
    const [result] = await db.execute(
      'UPDATE cards SET title = ?, date = ?, description = ? WHERE id = ?',
      [title, formattedDate, description, id]
    );
    db.release(); // Release the connection back to the pool

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No card found for the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Card updated successfully' });
  } catch (error) {
    console.error('Error updating card:', error);
    return NextResponse.json({ message: 'Error updating card' }, { status: 500 });
  }
}

// // Handle DELETE request to remove a card
// export async function DELETE(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const id = url.pathname.split('/').pop(); // Get the last part of the URL path

//     // Validate ID
//     if (!id || isNaN(Number(id))) {
//       return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
//     }

//     const db = await pool.getConnection();
//     const [result] = await db.execute('DELETE FROM cards WHERE id = ?', [id]);
//     db.release(); // Release the connection back to the pool

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: 'No card found for the provided ID' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Card deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting card:', error);
//     return NextResponse.json({ message: 'Error deleting card' }, { status: 500 });
//   }
// }
