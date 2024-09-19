"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paper, Box, Typography, Grid, Button } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for Credentials Login
import LoadingOverlay from "../app/components/LoadingOverlay";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function HomePage() {
    const { data: session, status } = useSession(); // include status to handle loading state
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingStartTime, setLoadingStartTime] = useState(0);

    useEffect(() => {
        if (status === "loading") return; // Do not redirect during the loading phase

        if (session) {
            setLoading(true); // Show loading overlay
            setLoadingStartTime(Date.now()); // Record the start time

            const handleRedirect = async () => {
                try {
                    await router.push("/dashboard/my-page");
                } catch (error) {
                    console.error("Failed to redirect:", error);
                } finally {
                    // Ensure that loading is displayed for at least 2 seconds
                    const timeElapsed = Date.now() - loadingStartTime;
                    const minLoadingTime = 2000; // 2 seconds
                    const remainingTime = Math.max(minLoadingTime - timeElapsed, 0);
                    
                    setTimeout(() => setLoading(false), remainingTime);
                }
            };

            handleRedirect();
        }
    }, [session, status, router]);

    const handleGitHubLogin = async () => {
        setLoading(true); // Show loading overlay
        setLoadingStartTime(Date.now()); // Record the start time

        try {
            await signIn("github", { callbackUrl: "/dashboard" });
        } catch (error) {
            console.error("GitHub login failed:", error);
        } finally {
            // Ensure that loading is displayed for at least 2 seconds
            const timeElapsed = Date.now() - loadingStartTime;
            const minLoadingTime = 2000; // 2 seconds
            const remainingTime = Math.max(minLoadingTime - timeElapsed, 0);
            
            setTimeout(() => setLoading(false), remainingTime);
        }
    };

    const handleCredentialsLogin = async () => {
        setLoading(true); // Show loading overlay
        setLoadingStartTime(Date.now()); // Record the start time

        try {
            await signIn("credentials", { callbackUrl: "/dashboard" });
        } catch (error) {
            console.error("Credentials login failed:", error);
        } finally {
            // Ensure that loading is displayed for at least 2 seconds
            const timeElapsed = Date.now() - loadingStartTime;
            const minLoadingTime = 2000; // 2 seconds
            const remainingTime = Math.max(minLoadingTime - timeElapsed, 0);
            
            setTimeout(() => setLoading(false), remainingTime);
        }
    };

    const backgroundImage = "/images/newbg.png";

    return (
        <>
            {loading && <LoadingOverlay />}
            <Grid
                container
                spacing={2}
                sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center", // Center content vertically
                    justifyContent: "center",
                    minHeight: "100vh", // Ensure the container takes full viewport height
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    overflow: "hidden", // Prevent overflow issues
                }}
            >
                {/* Column with xs=8 */}
                <Grid
                    item
                    xs={12} sm={8} // Adjusted for responsiveness
                    sx={{
                        padding: 2,
                        display: "flex",
                        justifyContent: "center", // Center content horizontally
                    }}
                >
                    <Paper
                        sx={{
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            width: "100%", // Ensure full width
                            maxWidth: "800px", // Optional: set a max width for better layout control
                        }}
                    >
                        <Typography variant="h3" sx={{ mb: 2, color: 'black' }}>
                        Welcome to       
                        </Typography>
                            <Image 
                                src="/images/logo1.png" 
                                alt="Logo" 
                                width={300} // Adjust width as needed
                                height={150} // Adjust height as needed
                                style={{ marginLeft: '10px' }} // Optional: add some space between text and image
                            />
                        {/* FUTURE PLANS
                        <Box>
                            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                                <ForumIcon fontSize="large" sx={{ mr: 1 }} /> Communicate with your doctor
                            </Typography>
                            <Typography>Get answers to your medical questions from the comfort of your own home</Typography>
                        </Box> */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                                <FolderIcon fontSize="large" sx={{ mr: 1 }} /> Save your medical records
                            </Typography>
                            <Typography>No more waiting for a phone call or letter to view your results and your doctor's comments within days</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarMonthIcon fontSize="large" sx={{ mr: 1 }} /> Manage your appointments
                            </Typography>
                            <Typography>Schedule your next appointment, or view details of your past and upcoming appointments</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Column with xs=4 */}
                <Grid
                    item
                    xs={12} sm={4} // Adjusted for responsiveness
                    sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center", // Center content horizontally
                    }}
                >
                    <Paper
                        sx={{
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // Center content horizontally
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            width: "100%",
                            maxWidth: "400px", // Optional: set a max width for better layout control
                            textAlign: "center", // Center text in Paper
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>Login</Typography>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            sx={{ mb: 2 }}
                            onClick={handleGitHubLogin}
                            startIcon={<GitHubIcon />}
                        >
                            Login with GitHub
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="secondary"
                            onClick={handleCredentialsLogin}
                            startIcon={<AccountCircleIcon />}
                        >
                            Login with Credentials
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
