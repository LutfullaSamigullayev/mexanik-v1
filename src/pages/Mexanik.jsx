import { Button, Table } from "antd";
import { useSelector } from "react-redux";
import { Axios } from "../lib/axios";
import { useEffect, useState } from "react";

const Mexanik = () => {
  // -----------  Data start ------------------

  const [users, setUsers] = useState([]);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  const filial = useSelector((state) => state.filial);

  // -----------  Redux end ------------------

  // -----------  Axios start ------------------

  async function getUsers() {
    let url = `/users?location=${filial}`;
    const res = await Axios.get(url);
    setUsers(res.data);
  }

  // -----------  Axios end ------------------

  const columns = [
    {
      title: "№",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Ism Familyasi",
      dataIndex: "name",
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: "Login",
      dataIndex: "login",
    },
    {
      title: "Parol",
      // dataIndex: "password",
      render: () => "****",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    // {
    //   title: "Action",
    //   render: (item) => (
    //     <>
    //       <Button>edit</Button>
    //       <Button>delete</Button>
    //     </>
    //   ),
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    getUsers();
    console.log(users);
  }, [filial]);

  return (
    <Table
      columns={columns}
      dataSource={users.map((item) => ({ ...item, key: item.id }))}
      onChange={onChange}
    />
  );
};

export default Mexanik;
