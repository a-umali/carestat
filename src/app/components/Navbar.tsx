"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { LetterAvatar } from "./LetterAvatar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const pages = [
  { title: "Home", href: "/dashboard" },
  { title: "Summary", href: "/summary" },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home page after sign out
  };

  const handleMouseOver = (event) => {
    event.currentTarget.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; // Light green
  };

  const handleMouseOut = (event) => {
    event.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        zIndex: 1200,
        padding: "12px 0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>

          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Link href="/dashboard" passHref legacyBehavior>
    <a>
      <img
        src="/images/logo1.png"
        alt="Logo"
        style={{
          height: 100,
          width: "auto",
          marginRight: "50px",
        }}
      />
    </a>
  </Link>
</Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Nav Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ padding: '12px', backgroundColor: 'rgba(0, 132, 255, 0.6)', borderRadius: '50%' }} // Set background color and border radius
>
                <MenuIcon fontSize="inherit" sx={{ fontSize: '3rem', color: 'black' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link href={page.href} passHref legacyBehavior>
                    <a style={{ color: "black", textDecoration: "none" }}>
                      {page.title}
                    </a>
                  </Link>
                </MenuItem>
              ))}
              {session && (
                <MenuItem onClick={() => {
                  handleCloseNavMenu();
                  handleSignOut();
                }}>
                  <span style={{ color: "black" }}>Sign Out</span>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              justifyContent: 'center',
              background: 'rgba(0, 132, 255, 0.6)',
              borderRadius: '16px',
              padding: '12px 24px',
            }}
          >
            {pages.map((page) => (
              <Link key={page.title} href={page.href} passHref legacyBehavior>
                <a
                  style={{
                    color: "black",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                    border: "2px solid black",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {page.title}
                </a>
              </Link>
            ))}
            {session && (
              <span
                onClick={handleSignOut}
                style={{
                  color: "black",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "none",
                  border: "2px solid black",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease, border-color 0.3s ease",
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                Sign Out
              </span>
            )}
          </Box>

          {/* User Avatar or Guest Label */}
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: 'auto' }}>
            {session && session.user ? (
              <LetterAvatar name={session.user.name || "User"} />
            ) : (
              <p style={{ color: "black", fontSize: "2rem", fontWeight: "bold", border: "2px solid black", padding: "4px 8px", borderRadius: "8px" }}>Guest</p>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
