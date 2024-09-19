import { NextRequest, NextResponse } from "next/server";

// api/bmi
export async function POST(req: NextRequest) {
    // Parse the JSON body
    const { weight, height } = await req.json();

    // Validate inputs
    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    let category: string;

    // Determine the category
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Healthy Weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Return the response
    return NextResponse.json({ bmi: parseFloat(bmi.toFixed(1)), category }, { status: 200 });
}
