import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
	Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { DataUnionClient } from "@dataunions/client";
import Webcam from "react-webcam";

import { theme } from "../src/theme";

import {
  Globe as GlobeIcon,
  X as XIcon,
  DollarSign as DollarIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  List as ListIcon,
} from "react-feather";
import { Reaction } from "./types";
import Profile from "./Profile";

const App = (props: any) => {
  const StreamrClient = require("streamr-client");

  const [watchingAd, setWatchingAd] = useState<boolean>(false);

  const [revenue, setRevenue] = useState<string>("0.445");
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const ADMIN_PRIVATE_KEY =
    "23037ea63234ab7aed71a1497e129d701ab663bdb95039741989a7dae2babf56";
  const STREAM_ID = "0xe8633daae271a55c382827f4bba0ac95429ad3a9/addFeedStream";
  const THIS_PRIVATE_KEY =
    "eb450f34736cecf4d79372a82cead6706de9605a97a89606b7e54b477f33c088";
  const DATA_UNION_CONTRACT_ADDRESS =
    "0xcb0cdc7010ee6853b29b6dbf953033d6a8291b44";
  const DU_SECRET = "3c2c8390-10d9-422c-b787-3596c86faaeb";

  const streamr = new StreamrClient({
    auth: {
      privateKey: ADMIN_PRIVATE_KEY,
    },
  });

  streamr.getAddress().then((addr: string) => {
    console.log("addr" + addr);
  });

  const THIS_PUBLIC_ADDRESS = "0x4c2bcc7723988FCa7AEABcBCD8630c1e94699D8E";
  let addToLocalStorage = (publishedData: Reaction) => {
    let local: string | null = localStorage.getItem("history");
    let soFar: Reaction[];
    if (local == null) soFar = [];
    else {
      soFar = JSON.parse(local);
    }

    if (soFar.length == 0) {
      localStorage.setItem("history", JSON.stringify([publishedData]));
    } else {
      soFar.push(publishedData);

      localStorage.setItem("history", JSON.stringify(soFar));
    }
    console.log(getLocalStorage());
  };


  let getLocalStorage = () => {
    let local: string | null = localStorage.getItem("history");
    let history: Reaction[];

    if (local == null) history = [];
    else {
      history = JSON.parse(local);
    }

    return history.reverse();
  };


  // Publish messages to a stream
  let publish = async () => {
    const mockyp: Reaction = require("./result.json");
    console.log("publishing");
    streamr
      .publish(STREAM_ID, {
        data: mockyp,
      })
      .then(() => {
        addToLocalStorage(mockyp);
      });
  };

  const suscribe = () => {
    streamr.subscribe(STREAM_ID, (msg: any) => {
      console.log("incoming msg");
      console.log(msg);
    });
  };

  let DU: any;

  if (localStorage.getItem("key") && localStorage.getItem("key") != "") {
    DU = new DataUnionClient({
      auth: {
        privateKey: THIS_PRIVATE_KEY,
      },
      chain: "polygon",
    });
  } else {
  }

  // -------- ADMIN ONLY FUNCTIONS --------

  // -------- MEMBER FUNCTION --------

  // your members can now join like this
  // store the shared secret in an environment variable
  let dataUnion: any;
  let getMemberDetails = async () => {
    dataUnion = await DU.getDataUnion(DATA_UNION_CONTRACT_ADDRESS);
  };
  getMemberDetails();

  let joinDataUnion = async () => {
    const memberDetails = await dataUnion.join({
      secret: DU_SECRET,
    });
    console.log(memberDetails);
  };

  let generateMocks = () => {};
  const withdrawal = async () => {
    const tx = await dataUnion.withdrawAll();
    console.log("el witzaw", tx);
  };

  let refreshAndGetEarnigns = async () => {
    let dataUnion: any;
    dataUnion = await DU.getDataUnion(DATA_UNION_CONTRACT_ADDRESS);

    console.log("que passa");
    const tx = await dataUnion.refreshRevenue();

    /*
	const amountWithdrawable = await dataUnion.getWithdrawableEarnings(
		THIS_PUBLIC_ADDRESS
    );

    console.log(amountWithdrawable.toString());
	*/
    let formatted = null; // amountWithdrawable.toString()/(10**18)
    formatted = "0.4450000000000004";
    setRevenue(Number.parseFloat(formatted.toString()).toFixed(4));
  };

  useEffect(() => {
    refreshAndGetEarnigns();
  }, []);

  const watchAd = () => {
    console.log("watching");
    return (
      <Webcam
        audio={false}
        height={1}
        screenshotFormat="image/jpeg"
        width={1}
        videoConstraints={videoConstraints}
      />
    );
  };

  const theresMetaMask = () => {
	if (!(window as any).ethereum){
		return (
			<Alert severity="error">No MetaMask addon found</Alert>
		)
	}
  }

  const theresPrivateKey = () => {
	if (!localStorage.getItem("key") || localStorage.getItem("key") == "") {
		return (
			<Alert severity="error">No private key found</Alert>
		)
	}
  }

  return (
    <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" gap={3}>

          <Box>
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${"IXUEH32TeQU"}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Box>

          <Box sx={{ backgroundColor: "#e4f2ea" }}>
            <Box
              sx={{
                width: "30rem",
                backgroundColor: "#b3dfe3",
                borderRadius: "2rem",
              }}
            >	
              <Box display="flex" position="relative" justifyContent={"center"}>
                <Typography variant="h3">FEEDO</Typography>
                <Typography sx={{ fontSize: "10px" }}>1.0.1</Typography>
                <Box position="absolute" top="0" right="0">
                  <Switch></Switch>
                </Box>
              </Box>
			  <Box>
			  {theresMetaMask()}
			  {theresPrivateKey()}
			  </Box>
              <Box sx={{ textAlign: "left" }} mb={2}></Box>
              <Box display="flex" gap={2} justifyContent="center">
                <Card sx={{ minWidth: 30, boxShadow: 5 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h5"
                    >
                      34
                    </Typography>
                    <Typography component="div">Ads seen</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 30 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    {revenue && (
                      <Box>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          variant="h5"
                        >
                          {revenue} DATA
                        </Typography>
                        <Button onClick={withdrawal}>
                          <Typography>Withdrawal</Typography>
                        </Button>
                      </Box>
                    )}
                    {!revenue && <CircularProgress></CircularProgress>}
                  </CardContent>
                </Card>
              </Box>
              <Box
                display="flex"
                flexDirection={"column"}
                gap={3}
                padding={1}
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DollarIcon />}
                    onClick={publish}
                  >
                    <Typography variant="body1">Wallet</Typography>
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<UserIcon />}
                    onClick={() => setDrawerOpen(true)}
                  >
                    <Typography variant="body1">Profile</Typography>
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Button variant="outlined" startIcon={<SettingsIcon />}>
                    <Typography variant="body1" onClick={joinDataUnion}>
                      Options
                    </Typography>
                  </Button>
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
                <Button variant="outlined" onClick={() => setWatchingAd(true)}>
                  <Typography> Watch ad</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Profile isOpen={drawerOpen} setOpen={setDrawerOpen}></Profile>
        {watchingAd && (
          <Webcam
            audio={false}
            height={1}
            screenshotFormat="image/jpeg"
            width={1}
            videoConstraints={videoConstraints}
          />
        )}
    </ThemeProvider>
  );
};

export default App;
