"use client";

import React, { useState } from "react";
import { TextField, Grid, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    medicareId: "",
    homePhone: "",
    cellPhone: "",
    religion: "",
    maritalStatus: "",
    occupation: "",
    workNumber: "",
    employerAddress: "",
    emergencyContacts: [
      { name: "", relationship: "", phone: "", cellPhone: "", address: "" },
    ],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      emergencyContacts: updatedContacts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Data saved successfully!");
        router.push("/summary");
      } else {
        const errorData = await response.json();
        console.error("Failed to save data:", errorData);
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving data.");
    }
  };

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom color='black'>
        Patient Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Personal Information Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Address Fields */}
          <Grid item xs={12}>
            <TextField
              name="streetAddress"
              label="Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              fullWidth
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="medicareId"
              label="Medicare ID"
              value={formData.medicareId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="homePhone"
              label="Home Phone"
              value={formData.homePhone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cellPhone"
              label="Cell Phone"
              value={formData.cellPhone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="religion"
              label="Religion"
              value={formData.religion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="maritalStatus"
              label="Marital Status"
              value={formData.maritalStatus}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="occupation"
              label="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="workNumber"
              label="Work Number"
              value={formData.workNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employerAddress"
              label="Employer Address"
              value={formData.employerAddress}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Emergency Contacts Section */}
        <Typography variant="h5" gutterBottom>
          Emergency Contacts
        </Typography>
        {formData.emergencyContacts.map((contact, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                value={contact.name}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="relationship"
                label="Relationship"
                value={contact.relationship}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Phone"
                value={contact.phone}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="cellPhone"
                label="Cell Phone"
                value={contact.cellPhone}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                value={contact.address}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default PatientForm;
