import { useEffect, useState } from "react";
import { Typography, Paper, Grid, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const PatientSummary = () => {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/api/patient");
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    router.push("/patient-form"); // Redirect to the PatientForm page
  };

  if (!formData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: 5 }} justifyContent={"center"}>
      <Paper
        sx={{
          width: "80%",
          maxWidth: "800px",
          boxShadow: 24,
          padding: 3,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Patient Summary
        </Typography>
        <Typography variant="h5">Last Name: {formData.lastName}</Typography>
        <Typography variant="h5">First Name: {formData.firstName}</Typography>
        {/* Add more fields as needed */}
        <Typography variant="h6">Address: {formData.streetAddress}</Typography>
        <Typography variant="h6">City: {formData.city}</Typography>
        <Typography variant="h6">State: {formData.state}</Typography>
        <Typography variant="h6">Zip Code: {formData.zipCode}</Typography>
        <Typography variant="h6">Date of Birth: {formData.dateOfBirth}</Typography>
        {/* Display emergency contacts if present */}
        {formData.emergencyContacts && formData.emergencyContacts.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom>
              Emergency Contacts
            </Typography>
            {formData.emergencyContacts.map((contact, index) => (
              <Paper key={index} sx={{ padding: 2, margin: 1, width: "100%" }}>
                <Typography variant="h6">Name: {contact.name}</Typography>
                <Typography variant="h6">Relationship: {contact.relationship}</Typography>
                <Typography variant="h6">Phone: {contact.phone}</Typography>
                <Typography variant="h6">Cell Phone: {contact.cellPhone}</Typography>
                <Typography variant="h6">Address: {contact.address}</Typography>
              </Paper>
            ))}
          </>
        )}
        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginTop: 2 }}>
          Edit
        </Button>
      </Paper>
    </Grid>
  );
};

export default PatientSummary;
