import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
  Paper,
  List,
  ListItem,
  TextField,
  Drawer,
  Chip,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import { theme } from "../src/theme";
import {
  Globe as GlobeIcon,
  X as XIcon,
  DollarSign as DollarIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  List as ListIcon,
} from "react-feather";
import { FC, useState } from "react";
import { Reaction } from "./types";
import Webcam from "react-webcam";

function Welcome(props: any) {
  return <h1>Hello, {props.name}</h1>;
}

interface ProfileProps {
  isOpen: boolean;
  setOpen: any;
}

const Profile: FC<ProfileProps> = ({ isOpen, setOpen }) => {
  let getLocalStorage = () => {
    let local: string | null = localStorage.getItem("history");
    console.log("que surt", local);
    let history: Reaction[];

    if (local == null) history = [];
    else {
      history = JSON.parse(local);
    }

    return history.reverse();
  };

  const WebcamComponent = () => <Webcam />;

  const [privateKey, setPrivateKey] = useState<string>();

  const changePrivateKey = (event: any) => {
    setPrivateKey(event.target.value);
    localStorage.setItem("key", event.target.value);
  };

  function randomDate(start: Date, end: Date) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }


  return (
    <Drawer open={isOpen} anchor="right" onClose={() => setOpen(false)}>
      <Box sx={{ backgroundColor: "#e4f2ea" }}>
        <Box
          sx={{
            width: "30rem",
            backgroundColor: "#b3dfe3",
            borderRadius: "2rem",
          }}
        >
          <Box display="flex" position="relative" justifyContent={"center"}>
            <Typography variant="h4">Profile</Typography>
            <Box position="absolute" top="0" right="0">
              <Switch onClick={() => setOpen(false)}></Switch>
            </Box>
          </Box>
          <Box sx={{ textAlign: "left" }} mb={2}></Box>
          <Box display="flex" gap={2} justifyContent="center">
            <Stack direction="column" alignItems="center" gap={2}>
              <TextField
                id="filled-password-input"
                label="Private Key"
                type="password"
                autoComplete="current-password"
                value={privateKey}
                onChange={changePrivateKey}
                variant="filled"
              />

              <TextField
                id="outlined-read-only-input"
                defaultValue="0x4c2bcc7723988fca7aeabcbcd8630c1e94699d8e"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            gap={3}
            padding={1}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Button variant="outlined" startIcon={<ListIcon />}>
                <Typography variant="body1">History</Typography>
              </Button>
            </Stack>
            <Stack direction="column" alignItems="center" gap={1}>
              <Paper style={{ maxHeight: 200, width: 400, overflow: "auto" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ad Id</TableCell>
                        <TableCell align="right">Sentiment</TableCell>
                        <TableCell align="right">Second</TableCell>
                        <TableCell align="right">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getLocalStorage().map((row) => (
                        <TableRow
                          key={row.ad_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >

                          <TableCell align="right">{row.ad_id}</TableCell>
                          <TableCell align="right">{row.value.value}</TableCell>
                          <TableCell align="right">{row.ad_timestamp}</TableCell>
                          <TableCell align="right">{"May 5th, 2022"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </Box>

          <Box
            p={1}
            mt={3}
            mb={3}
            sx={{
              height: "7rem",
              backgroundColor: "#7aadff",
              borderRadius: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2">
              Reinventing the way of watching ads
            </Typography>
            <Button variant="outlined">
              <Typography> Watch ad</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Profile;
