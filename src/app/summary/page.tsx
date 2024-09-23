"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Typography, Paper, Grid, Button, TextField } from "@mui/material";
import Navbar from "../components/Navbar";

const SummaryPage = () => {
  const { data: session, status } = useSession();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editPatient, setEditPatient] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/form");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    if (!session) signIn(); // Redirect to sign-in if not authenticated
  }, [session, status]);


  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditClick = (patient: any) => {
    setEditPatient(patient);
    setFormData({ ...patient });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/form/${editPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
  
      const updatedPatient = await response.json();
      console.log("Updated Patient:", updatedPatient);
      setPatients(patients.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient));
      setEditPatient(null);
    } catch (error) {
      console.error("Error in handleSave:", error);
      setError(error.message || "An error occurred while updating data.");
    }
  };
  

  const handleCancel = () => {
    setEditPatient(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/form/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      setError(error.message || "An error occurred while deleting data.");
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  if (patients.length === 0) {
    return <Typography variant="h6">No data available</Typography>;
  }

  return (
    
    <Grid
    container
    spacing={2}
    style={{
      backgroundImage: `url('/images/newbg.png')`,
      backgroundSize: 'auto',
      backgroundRepeat: 'repeat',
      minHeight: '100vh',
      paddingTop: '64px',
      boxSizing: 'border-box',
    }}
  >

    <Grid container spacing={3} sx={{ padding: 5, marginTop: '80px' }} justifyContent={"center"}>
    <Navbar></Navbar>
      {editPatient ? (
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, boxShadow: 3 }}>
            <Typography variant="h5">Edit Patient</Typography>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Initial"
              name="initial"
              value={formData.initial || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Street Address"
              name="streetAddress"
              value={formData.streetAddress || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Medicare ID"
              name="medicareId"
              value={formData.medicareId || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Home Phone"
              name="homePhone"
              value={formData.homePhone || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cell Phone"
              name="cellPhone"
              value={formData.cellPhone || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Religion"
              name="religion"
              value={formData.religion || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Occupation"
              name="occupation"
              value={formData.occupation || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Work Number"
              name="workNumber"
              value={formData.workNumber || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employer Address"
              name="employerAddress"
              value={formData.employerAddress || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ marginTop: 2, marginLeft: 1 }}>
              Cancel
            </Button>
          </Paper>
        </Grid>
      ) : (
        patients.map((patient: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={patient.id}>
            <Paper sx={{ padding: 3, boxShadow: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h5" gutterBottom>
                Patient {index + 1}
              </Typography>
              <Typography variant="h6">Last Name: {patient.lastName || "N/A"}</Typography>
              <Typography variant="h6">First Name: {patient.firstName || "N/A"}</Typography>
              <Typography variant="h6">Initial: {patient.initial || "N/A"}</Typography>
              <Typography variant="h6">Street Address: {patient.streetAddress || "N/A"}</Typography>
              <Typography variant="h6">City: {patient.city || "N/A"}</Typography>
              <Typography variant="h6">State: {patient.state || "N/A"}</Typography>
              <Typography variant="h6">Zip Code: {patient.zipCode || "N/A"}</Typography>
              <Typography variant="h6">Date of Birth: {formatDate(patient.dateOfBirth) || "N/A"}</Typography>
              <Typography variant="h6">Medicare ID: {patient.medicareId || "N/A"}</Typography>
              <Typography variant="h6">Home Phone: {patient.homePhone || "N/A"}</Typography>
              <Typography variant="h6">Cell Phone: {patient.cellPhone || "N/A"}</Typography>
              <Typography variant="h6">Religion: {patient.religion || "N/A"}</Typography>
              <Typography variant="h6">Marital Status: {patient.maritalStatus || "N/A"}</Typography>
              <Typography variant="h6">Occupation: {patient.occupation || "N/A"}</Typography>
              <Typography variant="h6">Work Number: {patient.workNumber || "N/A"}</Typography>
              <Typography variant="h6">Employer Address: {patient.employerAddress || "N/A"}</Typography>

              {patient.emergencyContacts && patient.emergencyContacts.length > 0 && (
                <>
                  <Typography variant="h5" gutterBottom>
                    Emergency Contacts
                  </Typography>
                  {patient.emergencyContacts.map((contact: any, contactIndex: number) => (
                    <Paper key={contactIndex} sx={{ padding: 2, margin: 1, width: "100%" }}>
                      <Typography variant="h6">Name: {contact.name || "N/A"}</Typography>
                      <Typography variant="h6">Relationship: {contact.relationship || "N/A"}</Typography>
                      <Typography variant="h6">Phone: {contact.phone || "N/A"}</Typography>
                      <Typography variant="h6">Cell Phone: {contact.cellPhone || "N/A"}</Typography>
                      <Typography variant="h6">Address: {contact.address || "N/A"}</Typography>
                    </Paper>
                  ))}
                </>
              )}

              <Button variant="contained" color="primary" onClick={() => handleEditClick(patient)} sx={{ marginTop: 2 }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(patient.id)} sx={{ marginTop: 2, marginLeft: 1 }}>
                Delete
              </Button>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
    </Grid>
  );
};

export default SummaryPage;
