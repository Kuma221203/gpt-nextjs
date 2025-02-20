"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { redirect } from 'next/navigation'
import {getModelList, getStateList} from '@/app/(dashboard-chats)/handleApi';

const drawerWidth = 320;

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100vh",
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));


interface NavigationProps {
  open: boolean;
  handleDrawerOpen: () => void;
  logout: () => void;
}

type Model = {
  name: string;
  description: string;
};

export function NavigationDashboardLayout({ open, handleDrawerOpen, logout }: NavigationProps) {
  const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null);
  const [anchorModels, setAnchorModels] = React.useState<null | HTMLElement>(null);
  const [model, setModel] = React.useState<Model | null>(null);
  const [modelList, setModelList] = React.useState<Model[]>([])
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleSelectModel = (name: string) => {
    setModel({
      name: name || "Unknown",
      description: "No description available",
    });
  };

  React.useEffect(() => {
    async function fetchModelList() {
      const modelList = await getModelList();
      setModelList(modelList);
      if (modelList.length > 0) {
        setModel(modelList[0]);
      }
    }
    fetchModelList();
  }, []);


  const handleClose = () => {
    setAnchorUser(null);
  };

  const handleModels = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorModels(event.currentTarget);
  };

  const handleCloseModels = () => {
    setAnchorModels(null);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar className='flex justify-between '>
        <span>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 0,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          <IconButton
            color="inherit"
            sx={[
              {
                mr: 0,
              },
              open && { display: 'none' },
            ]}
            onClick={() => redirect("/dashboard")}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </span>
        {/* --------------------------------------- */}
        <List sx={{ fontSize: 34, fontWeight: 700 }}>
          <ListItemButton
            aria-label="models"
            aria-controls="menu-models"
            aria-haspopup="true"
            onClick={handleModels}
            color="inherit"
          >
            <ListItemText primary={model?.name}
            />
            {anchorModels ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton >
          <Menu
            id="menu-models"
            anchorEl={anchorModels}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(anchorModels)}
            onClose={handleCloseModels}
          >
            <MenuItem
              onClick={handleCloseModels}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
                display: 'flex',
                flexDirection: "column",
              }}
            >
              {modelList?.map(({ name, description }, index) => (
                <span className='w-full' key={index}>
                  <div className='flex justify-between items-center'>
                    <ListItemButton onClick={() => handleSelectModel(name)}>
                      <ListItemText primary={name} secondary={description} />
                    </ListItemButton>
                    {name === model?.name && <CheckCircleIcon fontSize="small" />}
                  </div>
                </span>
              ))}
            </MenuItem>
          </Menu>
        </List>
        {/* --------------------------------------- */}
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon fontSize='large' />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorUser)}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem
              onClick={async () => {
                logout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

type State = {
  id: string,
  titile: string,
}

export function SidebarDashboardLayout({ open, handleDrawerClose }: SidebarProps) {
  const [stateList, setStateList] = React.useState<State[]>([]) 

  React.useEffect(() => {
    async function fetchStateList() {
      const stateList = await getStateList();
      setStateList(stateList)
    }
    fetchStateList();
  }, []);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        height: "100%"
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <MenuOpenIcon fontSize='large' />
        </IconButton>
        <span>
          <IconButton>
            <SearchIcon fontSize='large' />
          </IconButton>
          <IconButton
            onClick={() => redirect("/dashboard")}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </span>
      </DrawerHeader>

      <Divider />

      <List disablePadding>
        <h3 className='m-2 text-2xl font-bold'>Chats</h3>
        {stateList.map(({ id, titile}, index) => (
          <ListItem key={`titile_${index}`} disablePadding>
            <ListItemButton onClick={() => redirect(`/chats/${id}`)}>
              <span className='text-sm flex-grow items-center pl-2'>{titile}</span>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
