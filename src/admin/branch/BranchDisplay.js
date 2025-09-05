import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, serverURL, getDate ,getTime, postData, } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import {IconButton, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";


const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight:"100%",
  },
  box: {
    width: "auto",
    height: "auto",
    padding: "10px",
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: "24px",
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

export default function BranchDisplay() {
  const classes = useStyle();
  const [branchList, setBranchList] = useState([]);
  const [open, setOpen] = useState(false);

// ------------------------------------Branch View-------------------------------------------

  const [branchId, setBranchId] = useState("");
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
      if (response.status) {
              Swal.fire({
                position: "bottom",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
              });
            } else {
              Swal.fire({
                position: "bottom",
                icon: "error",
                title: response.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
              });
            }
    }
  };

  const showBranchInterface = () => {
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
                value={branchName}
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
                value={address}
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
                value={latlong}
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
                value={state}
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
                value={city}
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
                value={emailId}
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
                value={contactNumber}
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
                value={contactPerson}
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

// ------------------------------------Branch View-------------------------------------------


  const fetchAllBranch = async () => {
    var response = await getData("branch/fetch_all_branch");
    setBranchList(response.data);
  };

  useEffect(function () {
    fetchAllBranch();
  }, []);

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <IconButton
            onClick={handleCloseDialog}
            style={{
              marginLeft: "auto",
              display: "flex",
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent>{showBranchInterface()}</DialogContent>
        </Dialog>
      </div>
    );
  }

  const handleOpenDialog = (rowData) => {
    setBranchId(rowData.branchid);
    setBranchName(rowData.branchname);
    setAddress(rowData.address);
    setLatlong(rowData.latlong);
    setCity(rowData.city);
    setState(rowData.state);
    setEmailId(rowData.emailid);
    setContactNumber(rowData.contactnumber);
    setContactPerson(rowData.contactperson);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const DisplayBranch = () => {
    return (
      <MaterialTable
        title="List of branches"
        columns={[
          { title: "Branch Name", field: "branchname" },
          { title: "Address", field: "address" },
          { title: "Latlong", field: "latlong" },
          { title: "City", field: "city" },
          { title: "State", field: "state" },
          { title: "Email Id", field: "emailid" },
          { title: "Contact Number", field: "contactnumber" },
          { title: "Contact Person", field: "contactperson" },
        ]}
        data={branchList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpenDialog(rowData),
          },
        ]}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>{DisplayBranch()}</div>
      {showDialog()}
    </div>
  );
}
