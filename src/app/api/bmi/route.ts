// // api/bmi/route.ts
// import { NextRequest, NextResponse } from "next/server";

// // api/bmi
// export async function POST(req: NextRequest, res: NextResponse) {
//     const dataInBody = await req.json();
//     console.log(dataInBody);
//     return NextResponse.json(dataInBody);
//     /* if (req.method === 'POST') {
//         const { weight, height } = req.body;
    
//         if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
//           return res.status(400).json({ error: 'Invalid input' });
//         }
    
//         const bmi = weight / (height * height);
//         let category;
    
//         if (bmi < 18.5) {
          
//           category = 'Underweight';
//         } else if (bmi < 25) {
//           category = 'Healthy Weight';
//         } else if (bmi < 30) {
//           category = 'Overweight';
//         } else {
//           category = 'Obesity';
//         }
//         console.log("aaaa");
//         res.status(200).json({ bmi: parseFloat(bmi.toFixed(1)), category });
//       } else {
//         // Handle any other HTTP method
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//       } 
// }

// api/bmi/route.ts
import { NextRequest, NextResponse } from "next/server";

// api/bmi
export async function POST(req: NextRequest) {
    // Parse the JSON body
    const { weight, height } = await req.json();

    // Validate inputs
    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Calculate BMI
    const bmi = weight / (height * height);
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
