import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#fff",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  box: {
    width: 600,
    height: 300,
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
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

export default function CategoryInterface() {
  var classes = useStyle();
  const [branchId, setBranchId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState({
    bytes: "",
    fileName: burger,
  });
  const handleChange = (e) => {
    setCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
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
          <Grid size={12}>
            <div style={{ padding: "0px 5px" }}>
              <TextField label="Branch Name" fullWidth />
            </div>
          </Grid>
          <Grid size={12}>
            <div style={{ padding: "0px 5px" }}>
              <TextField label="Category Name" fullWidth />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ padding: "0px 5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                variant="contained"
              >
                Category Icon
                <input onChange={handleChange} type="file" hidden multiple />
              </Button>
            </div>
          </Grid>
          <Grid size={6} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "0px 5px" }}>
              <img src={categoryIcon.fileName} style={{ width: 40 }} />
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ padding: "0px 5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ padding: "0px 5px" }}>
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
