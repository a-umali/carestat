import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

// Helper function to format date for SQL
const formatDateForSQL = (date: string) => {
  if (!date) return null;
  try {
    const parsedDate = new Date(date);
    // Format date to YYYY-MM-DD (MySQL DATE format)
    return parsedDate.toISOString().split('T')[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

// Handle PUT request to update patient data
export async function PUT(req: NextRequest) {
  try {
    // Extract id from the request URL path
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Get the last part of the URL path

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Ensure the ID is valid (e.g., it's a number or some expected format)
    if (isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const data = await req.json();
    console.log("Received Data for Update:", data);

    // Validate received data
    if (!data || !data.lastName || !data.firstName) {
      return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
    }

    const db = await pool.getConnection();
    try {
      const [result] = await db.execute(
        'UPDATE patients SET lastName = ?, firstName = ?, streetAddress = ?, city = ?, state = ?, zipCode = ?, dateOfBirth = ?, medicareId = ?, homePhone = ?, cellPhone = ?, religion = ?, maritalStatus = ?, occupation = ?, workNumber = ?, employerAddress = ? WHERE id = ?',
        [
          data.lastName,
          data.firstName,
          data.streetAddress,
          data.city,
          data.state,
          data.zipCode,
          formatDateForSQL(data.dateOfBirth), // Format the date here
          data.medicareId,
          data.homePhone,
          data.cellPhone,
          data.religion,
          data.maritalStatus,
          data.occupation,
          data.workNumber,
          data.employerAddress,
          id
        ]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "No data found for the provided ID" }, { status: 404 });
      }

      return NextResponse.json({ message: "Data updated successfully" });
    } catch (dbError) {
      console.error("Database error during update:", dbError);
      return NextResponse.json({ message: "Database error during update" }, { status: 500 });
    } finally {
      db.release(); // Ensure the connection is released even if an error occurs
    }

  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ message: "Error updating data" }, { status: 500 });
  }
}

// Handle DELETE request to delete patient data
export async function DELETE(req: NextRequest) {
  // The DELETE handler remains unchanged
}
