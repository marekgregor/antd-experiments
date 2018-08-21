import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Modal, Button, Table } from "antd";
import { AutoSizer } from "react-virtualized";
import Measure from "react-measure";

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
}, {
  title: 'Address 2',
  dataIndex: 'address2',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address2: `A little bit longer and longer and longer and longer and longer adress for table - London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = {
    visible: false, columns, dimensions: {
      width: -1,
      height: -1
    }
  };

  render() {
    const { width, height } = this.state.dimensions;
    return (
      <div>
        <AutoSizer disableHeight>
          {
            ({ width, height }) => {
              console.log(`Available width: ${width}`);
              let columns = this.recalculateColumns(this.state.columns);
              return <Measure
                bounds scroll
                onResize={(contentRect) => {
                  this.setState({ dimensions: contentRect.bounds })
                  console.log(JSON.stringify(contentRect));
                }}>
                {({ measureRef }) =>
                  <div ref={measureRef}>
                    <Table columns={columns} dataSource={data}
                      pagination={{ pageSize: 10 }} />
                     {/*console.log(`Width: ${this.state.dimensions}`)*/}
                  </div>
                }
              </Measure>
            }
          }
        </AutoSizer>
      </div>
    );
  }

  recalculateColumns(columns) {
    return columns.map((c, columnIndex) => {
      return Object.assign({}, c,
        {
          render: (text, record, rowIndex) => {
            return `${text}`;
          }
        });
    });
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
