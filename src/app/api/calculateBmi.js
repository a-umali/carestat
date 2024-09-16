export default function handler(req, res) {
    if (req.method === 'POST') {
      const { weight, height } = req.body;
  
      if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
      }
  
      const bmi = weight / (height * height);
      let category;
  
      if (bmi < 18.5) {
        
        category = 'Underweight';
      } else if (bmi < 25) {
        category = 'Healthy Weight';
      } else if (bmi < 30) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }
      console.log("aaaa");
      res.status(200).json({ bmi: parseFloat(bmi.toFixed(1)), category });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  