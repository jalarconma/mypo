import styles from './Header.module.scss';

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import {
  loggedInNavModules, loggedInUserModules,
  loggedOutNavModules, loggedOutUserModules, logginModule
} from '../../../modules';

import { UserAuthService } from '../../../authentication/interfaces/user-auth.interface';
import { useUserAuthService } from '../../../authentication/hooks/use-user-auth-service';
import { AppRouteProps } from '../../../core/interfaces/app-route-props';

const Header = () => {
  const userAuthService: UserAuthService = useUserAuthService();
  const [modules, setModules] = React.useState<AppRouteProps[]>([]);
  const [settings, setSettings] = React.useState<AppRouteProps[]>([]);

  React.useEffect(() => {
    console.log('user is logged in?', userAuthService.isLoggedIn);
    if (userAuthService.isLoggedIn) {
      setModules(loggedInNavModules);
      setSettings(loggedInUserModules);
    } else {
      setModules(loggedOutNavModules);
      setSettings(loggedOutUserModules)
    }
  }, [userAuthService.currentUser]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className={styles['App-header']}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          { userAuthService.isLoggedIn ?
            (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {modules.map((module) => (
                    <MenuItem key={module.name} onClick={handleCloseNavMenu} className={styles['App-header_menu-item']}>
                      <Typography textAlign="center">
                        <Link to={module.routeProps.path}>{module.name}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : null
          }

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {modules.map((module) => (
              <Button
                key={module.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={module.routeProps.path}>{module.name}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
              !userAuthService.isLoggedIn ?
                (<Button
                  className={styles['App-header_loggin-button']}
                >
                  <Link to={logginModule.routeProps.path}>{logginModule.name}</Link>
                </Button>) :
                (
                  <>

                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={handleCloseUserMenu} className={styles['App-header_menu-item']}>
                          <Typography textAlign="center">
                            <Link to={setting.routeProps.path}>{setting.name}</Link>
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header