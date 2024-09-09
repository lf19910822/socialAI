import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = ["Create", "Collection"];

function ResponsiveAppBar(props) {
  const { isLoggedIn, handleLogout } = props;

  const [anchorElNav, setAnchorElNav] = useState(null); // anchorElNav 在hamburger图标下面显示。。。，缩放时用
  const navigate = useNavigate(); // 把url进行转变

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page) => {
    // Navigate function to handle page redirection
    navigate(`/${page.toLowerCase()}`); // 放入url
    handleCloseNavMenu();
  };

  return (
    <AppBar // 背景设置
      position="static"
      style={{ background: "black", top: 0, position: "fixed", zIndex: 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon
            sx={{
              // material ui 加入自己的CSS，就叫sx
              display: {
                xs: isLoggedIn ? "none" : "flex",
                md: "flex",
              },
              mr: 1, // margin right
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/" // 点击后返回 home page
            sx={{
              mr: 2,
              display: { xs: isLoggedIn ? "none" : "flex", md: "flex" },
              fontFamily: "monospace",  // 字体
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none", // 不加下划线
            }}
          >
            Social AI
          </Typography>

          {isLoggedIn && ( // 如果 isLoggedIn 为否，后面不看
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton // 以下 flexbox内容
                  size="large"
                  aria-label="account of current user"
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
                  onClose={handleCloseNavMenu}  // 点击menu外侧的任何地方则 onClose
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {/* navigation in mobile view */}
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={() => handleNavigate(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* navigation in desktop view */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleNavigate(page)}
                    sx={{ my: 2, color: "white", display: "block" }} // my：marginY
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  Log out
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
