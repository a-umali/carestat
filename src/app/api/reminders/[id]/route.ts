import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

// Handle POST request to add a new reminder
export async function POST(req: NextRequest) {
  try {
    const { date, content } = await req.json();

    if (!date || !content) {
      return NextResponse.json({ message: 'Date and content are required' }, { status: 400 });
    }

    const db = await pool.getConnection();
    await db.execute(
      'INSERT INTO reminders (date, content) VALUES (?, ?)',
      [date, content]
    );
    db.release();

    return NextResponse.json({ message: 'Reminder added successfully' });
  } catch (error) {
    console.error('Error adding reminder:', error);
    return NextResponse.json({ message: 'Error adding reminder' }, { status: 500 });
  }
}

// Handle GET request to fetch all reminders
export async function GET(req: NextRequest) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query('SELECT * FROM reminders ORDER BY date DESC');
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json({ message: 'Error fetching reminders' }, { status: 500 });
  }
}

// Handle DELETE request to remove a reminder
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const db = await pool.getConnection();
    const [result] = await db.execute('DELETE FROM reminders WHERE id = ?', [id]);
    db.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No reminder found for the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return NextResponse.json({ message: 'Error deleting reminder' }, { status: 500 });
  }
}

// Handle PUT request to update a reminder
export async function PUT(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    if (!id || !content) {
      return NextResponse.json({ message: 'ID and content are required' }, { status: 400 });
    }

    if (isNaN(Number(id))) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const db = await pool.getConnection();
    const [result] = await db.execute('UPDATE reminders SET content = ? WHERE id = ?', [content, id]);
    db.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No reminder found for the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reminder updated successfully' });
  } catch (error) {
    console.error('Error updating reminder:', error);
    return NextResponse.json({ message: 'Error updating reminder' }, { status: 500 });
  }
}
