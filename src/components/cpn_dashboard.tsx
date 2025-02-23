"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { redirect } from 'next/navigation'
import { getModelList, getStateList } from '@/app/(dashboard-chats)/handleApi';
import { useDashboardContext } from '@/app/(dashboard-chats)/DashboardContext';

const drawerDestopWidth = 320;
const drawerMobileWidth = 260;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
});

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100vh",
  zIndex: 10,
  marginLeft: `-${drawerDestopWidth}px`,
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
        width: `calc(100% - ${drawerDestopWidth}px)`,
        marginLeft: `${drawerDestopWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down('lg')]: {
          marginLeft: 0,
          width: '100%',
          zIndex: 5,
        },
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
  const { model, setModel } = useDashboardContext();
  const [modelList, setModelList] = React.useState<Model[]>([]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleSelectModel = (name: string) => {
    setModel(name);
  };

  React.useEffect(() => {
    async function fetchModelList() {
      const modelList = await getModelList();
      setModelList(modelList);
      if (modelList.length > 0) {
        setModel(modelList[0].name); // Sửa ở đây: chỉ lấy name
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
              { mr: 0 },
              open && {
                [theme.breakpoints.up('lg')]: {
                  display: 'none',
                },
              },
            ]}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          <IconButton
            color="inherit"
            sx={[
              {
                mr: 0,
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              },
              open && {
                [theme.breakpoints.up('lg')]: {
                  display: 'none',
                },
              },
            ]}
            onClick={() => redirect("/dashboard")}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </span>
        <List sx={{ fontSize: 34, fontWeight: 700 }}>
          <ListItemButton
            aria-label="models"
            aria-controls="menu-models"
            aria-haspopup="true"
            onClick={handleModels}
            color="inherit"
          >
            <ListItemText primary={model} />
            {anchorModels ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
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
                width: drawerDestopWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerDestopWidth,
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
                    {name === model && <CheckCircleIcon fontSize="small" />}
                  </div>
                </span>
              ))}
            </MenuItem>
          </Menu>
        </List>
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
  );
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
  const { newStateId } = useDashboardContext();
  React.useEffect(() => {
    async function fetchStateList() {
      const stateList = await getStateList();
      setStateList(stateList)
    }
    fetchStateList();
  }, [newStateId]);

  return (
    <Drawer
      sx={{
        width: drawerDestopWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerDestopWidth,
          [theme.breakpoints.down('sm')]: {
            width: drawerMobileWidth,
          },
          boxSizing: 'border-box',
        },
      }}
      className='flex flex-col z-50 fixed lg:static  '
      variant="persistent"
      anchor="left"
      open={open}
    >
      {/* Header cố định */}
      <DrawerHeader className="flex justify-between w-full ">
        <IconButton className='min-h-16' onClick={handleDrawerClose}>
          <MenuOpenIcon fontSize="large" />
        </IconButton>
        <span>
          <IconButton>
            <SearchIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => redirect("/dashboard")}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </span>
      </DrawerHeader>
      <div className="border-t-gray-400 border-t-[1px]">
        <h3 className="m-2 text-2xl font-bold ">Chat History</h3>

      </div>
      {/* Phần nội dung cuộn được */}
      <div className='flex-1 overflow-y-auto'>
        <List disablePadding>
          {stateList.map(({ id, titile }, index) => (
            <ListItem
              className="group hover:bg-gray-200 hover:rounded-xl relative"
              key={`titile_${index}`}
              disablePadding
            >
              <ListItemButton className="flex items-center" onClick={() => redirect(`/chats/${id}`)}>
                <div className=" flex-grow pl-1">
                  <span className="text-sm block overflow-hidden whitespace-nowrap">
                    {titile}
                  </span>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent group-hover:hidden"></div>
                </div>
                <IconButton className='absolute left-0'>
                  <MoreVertIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}
