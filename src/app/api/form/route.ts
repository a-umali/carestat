// app/api/form/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "../../lib/db";

// Handle POST request to save data
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received Data:", data);

    // Save data to the database
    const db = await pool.getConnection();
    await db.execute(
      'INSERT INTO patients (lastName, firstName, streetAddress, city, state, zipCode, dateOfBirth) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.lastName,
        data.firstName,
        data.streetAddress,
        data.city,
        data.state,
        data.zipCode,
        formattedDateOfBirth,
        data.medicareId,
        data.homePhone,
        data.cellPhone,
        data.religion,
        data.maritalStatus,
        data.occupation,
        data.workNumber,
        data.employerAddress
      ]
    );

    db.release(); // Release the connection back to the pool
    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}

// Handle GET request to fetch data
export async function GET(req: NextRequest) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query('SELECT * FROM patients ORDER BY id DESC'); // Fetch all records

    db.release(); // Release the connection back to the pool

    if (rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}
