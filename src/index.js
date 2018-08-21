import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Modal, Button, Table } from "antd";
import "antd/dist/antd.css";
import "./style.css";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 150,
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = { visible: false };
  
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} 
        scroll={{x: true}} />, 
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
