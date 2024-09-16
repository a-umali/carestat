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
  { title: "Home", href: "/" },
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

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0,70,255,0.9)", // Solid background color
        zIndex: 1200, // Ensure the navbar is on top of other content
        boxShadow: 'none', // Remove any default shadow
        padding: '0 16px', // Add some padding to the sides
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section (visible on all screen sizes) */}
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref legacyBehavior>
              <a>
                <img
                  src="/images/logo1.png"
                  alt="Logo"
                  style={{ height: 70, width: 'auto', display: 'block' }}
                />
              </a>
            </Link>
          </Box>

          {/* Mobile Menu Icon (visible on small screens) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Nav Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link href={page.href} passHref legacyBehavior>
                    <a style={{ color: "inherit", textDecoration: "none", padding: "8px" }}>
                      {page.title}
                    </a>
                  </Link>
                </MenuItem>
              ))}
              {session && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleSignOut();
                  }}
                >
                  <span style={{ color: "inherit", textDecoration: "none", padding: "8px" }}>
                    Sign Out
                  </span>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo Section (hidden on small screens) */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, alignItems: "center" }}>
            <Link href="/" passHref legacyBehavior>
              <a>
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  style={{ height: 40, width: 'auto', display: 'block' }}
                />
              </a>
            </Link>
          </Box>

          {/* Navigation Links (visible on medium and larger screens) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {pages.map((page) => (
              <Link key={page.title} href={page.href} passHref legacyBehavior>
                <a style={{ color: "black", display: "block", margin: "0 16px", textDecoration: "none" }}>
                  {page.title}
                </a>
              </Link>
            ))}
            {session && (
              <span
                onClick={handleSignOut}
                style={{ color: "black", display: "block", margin: "0 16px", cursor: "pointer" }}
              >
                Sign Out
              </span>
            )}
          </Box>

          {/* User Avatar or Guest Label */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {session && session.user ? (
              <LetterAvatar name={session.user.name || "User"} />
            ) : (
              <p style={{ color: "black" }}>Guest</p>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
