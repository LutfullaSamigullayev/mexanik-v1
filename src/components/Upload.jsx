import React, { useEffect } from "react";
// import { UploadOutlined } from "@ant-design/icons";
// import { Button, message, Upload } from "antd";
import * as XLSX from "xlsx";
import { Axios } from "../lib/axios";

import { useSelector } from "react-redux";

export const UploadFile = () => {
  const filial = useSelector((state) => state.filial);

  // -----------  Data start ------------------
  const [data, setData] = React.useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  console.log(data);
  // -----------  Data end ------------------

  // -----------  Axios start ------------------

  useEffect(() => {
    if (data) {
      data.forEach((machine) => {
        Axios.post("/sewing-machines", {
          ...machine,
          line: 0,
          location: filial,
          checked: false,
          from: filial,
          to: filial,
        });
      });
    }
  }, [data]);
  // -----------  Axios end ------------------

  return (
    // <Upload
    //   name="file"
    //   action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    //   headers={{
    //     authorization: "authorization-text",
    //   }}
    //   onChange={handleFileUpload}
    // >
    //   <Button icon={<UploadOutlined />}>Click to Upload</Button>
    // </Upload>
    <input type="file" onChange={handleFileUpload} />
  );
};
