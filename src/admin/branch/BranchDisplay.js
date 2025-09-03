import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight:"100vh",
    background: "#f7f7f7",
  },
  box: {
    width: "auto",
    height: "auto",
    margin: "10px",
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

  const fetchAllBranch = async () => {
    var response = await getData("branch/fetch_all_branch");
    setBranchList(response.data);
  };

  useEffect(function () {
    fetchAllBranch();
  }, []);

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
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
        ]}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>{DisplayBranch()}</div>
    </div>
  );
}
