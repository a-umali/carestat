import type { NextApiRequest, NextApiResponse } from 'next';

// let patientData = null; // Temporary storage (use a database in production)



// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     // Return stored patient data
//     res.status(200).json(patientData || {});
//   } else if (req.method === 'POST') {
//     // Save patient data
//     patientData = req.body;
//     res.status(200).json({ message: 'Data saved successfully!' });
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// Dummy data for demonstration; replace with actual database or data source
const patientData = {
  lastName: "Doe",
  firstName: "John",
  streetAddress: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
  dateOfBirth: "1990-01-01",
  emergencyContacts: [
    {
      name: "Jane Doe",
      relationship: "Sister",
      phone: "555-1234",
      cellPhone: "555-5678",
      address: "456 Elm St",
    },
  ],
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Send the dummy data as a response
    res.status(200).json(patientData);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

