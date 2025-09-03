import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { getDate, getTime, postData } from "../../services/FetchNodeServices";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#fff",
    justifyContent: "center",
    width: "100%",
    height: "auto",
  },
  box: {
    width: 800,
    height: "auto",
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: "5px",
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function BranchInterface() {
  var classes = useStyle();
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [latlong, setLatlong] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [error, setError] = useState({});

  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validation = () => {
    var isError = false;
    if (branchName.length == 0) {
      setError((prev) => ({
        ...prev,
        branchName: "Pls Input Branch Name....",
      }));
      isError = true;
    }
    if (address.length == 0) {
      setError((prev) => ({
        ...prev,
        address: "Pls Input Address....",
      }));
      isError = true;
    }
    if (latlong.length == 0) {
      setError((prev) => ({
        ...prev,
        latlong: "Pls Input Latlong....",
      }));
      isError = true;
    }
    if (state.length == 0) {
      setError((prev) => ({
        ...prev,
        state: "Pls Input State....",
      }));
      isError = true;
    }
    if (city.length == 0) {
      setError((prev) => ({
        ...prev,
        city: "Pls Input City....",
      }));
      isError = true;
    }
    if (emailId.length == 0) {
      setError((prev) => ({
        ...prev,
        emailId: "Pls Input Email Id....",
      }));
      isError = true;
    }
    if (contactNumber.length == 0) {
      setError((prev) => ({
        ...prev,
        contactNumber: "Pls Input Contact Number....",
      }));
      isError = true;
    }
    if (contactPerson.length == 0) {
      setError((prev) => ({
        ...prev,
        contactPerson: "Pls Input Contact Person....",
      }));
      isError = true;
    }

    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var body = {
        branchname: branchName,
        address: address,
        latlong: latlong,
        state: state,
        city: city,
        emailid: emailId,
        contactnumber: contactNumber,
        contactperson: contactPerson,
        createddate: getDate(),
        createdtime: getTime(),
        userid: "xxxxx",
      };

      var response = await postData("branch/submit_branch", body);
      alert(response.status);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.titleStyle}>HungerBuddy</div>
                <div className={classes.subTitleStyle}>New Food Category</div>
              </div>
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingLeft: "5px" }}>
              <TextField
                label="Branch Name"
                fullWidth
                onChange={(e) => setBranchName(e.target.value)}
                helperText={error?.branchName}
                error={error?.branchName}
                onFocus={() => handleError("branchName", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingRight: "5px" }}>
              <TextField
                label="Address"
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                helperText={error?.address}
                error={error?.address}
                onFocus={() => handleError("address", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingLeft: "5px" }}>
              <TextField
                label="Latlong"
                fullWidth
                onChange={(e) => setLatlong(e.target.value)}
                helperText={error?.latlong}
                error={error?.latlong}
                onFocus={() => handleError("latlong", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingRight: "5px" }}>
              <TextField
                label="State"
                fullWidth
                onChange={(e) => setState(e.target.value)}
                helperText={error?.state}
                error={error?.state}
                onFocus={() => handleError("state", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingLeft: "5px" }}>
              <TextField
                label="City"
                fullWidth
                onChange={(e) => setCity(e.target.value)}
                helperText={error?.city}
                error={error?.city}
                onFocus={() => handleError("city", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingRight: "5px" }}>
              <TextField
                label="Email Id"
                fullWidth
                onChange={(e) => setEmailId(e.target.value)}
                helperText={error?.emailId}
                error={error?.emailId}
                onFocus={() => handleError("emailId", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingLeft: "5px" }}>
              <TextField
                label="Contact Number"
                fullWidth
                onChange={(e) => setContactNumber(e.target.value)}
                helperText={error?.contactNumber}
                error={error?.contactNumber}
                onFocus={() => handleError("contactNumber", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingRight: "5px" }}>
              <TextField
                label="Contact Person"
                fullWidth
                onChange={(e) => setContactPerson(e.target.value)}
                helperText={error?.contactPerson}
                error={error?.contactPerson}
                onFocus={() => handleError("contactPerson", null)}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingLeft: "5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                fullWidth
                variant="contained"
                onClick={handleClick}
              >
                Save
              </Button>
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ paddingRight: "5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                fullWidth
                variant="contained"
              >
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
