import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useState } from "react";
import { useEffect } from "react";

import { deleteSelectedClass, readClassRows } from "../../utils";
import { Loader } from "../Loader";
import { AddNewClass } from "./AddNewClass";

const columns = [
  { field: "id", headerName: "Class Id", width: 250 ,  headerClassName: 'text-primary',},
  { field: "class", headerName: "Class Name", width: 150,headerClassName: 'text-primary' },
];

export const AdminClass = () => {
  const [rows, setRows] = useState([]);
  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    readClassRows(setRows);
  }, [loading]);

  const handleDelete = async () => {
    setLoading(true);
    await deleteSelectedClass(selection)
    setLoading(false);
  };
  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <Box sx={{ height: 400, maxWidth: "500px" ,background:'#f8f9fa',borderRadius:'10px'}}>
          {rows && (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{pagination: {paginationModel: {pageSize: 5}}}}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(id) => setSelection(id)}
            />
          )}
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            delete selected classes
          </button>
        </Box>
        <AddNewClass/>
      </Box>

      {loading && <Loader />}
    </div>
  );
};
