import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Table } from "antd";
import Measure from "react-measure";

import "antd/dist/antd.css";
import "./style.css";

const columnsDefinition = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 100,
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Address 2',
  dataIndex: 'address2',
}, {
  title: 'Address 3',
  dataIndex: 'address3',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address2: `Second line of address no. ${i}`,
    address3: `Third line of address no. ${i}`,
  });
}
/**
 * Initial example of naive responsive antd table implementation, similar to Datatables component (https://datatables.net/)
 * Columns which will not have enough spacewill be wrapped in expandable part of table.
 * 
 */
class ResponsiveTableExample extends React.Component {
  state = {
    /* manages visibility of table during resize operations, in order to suspend screen flickering */
    visible: false,
    /* current visible columns */
    columns: columnsDefinition,
    /* columns hidden in expandable part */
    hiddenColumns: [],
  };

  constructor() {
    super();
    this.renderExpandRow = this.renderExpandRow.bind(this);
  }

  render() {
    let expandedRowRender = undefined;
    if (this.state.hiddenColumns.length > 0) {
      expandedRowRender = this.renderExpandRow;
    }
    return (
      <div>
        <h4>Please resize window to see columns hiding (to expandable space)</h4>
        <Measure
          scroll bounds
          onResize={(contentRect) => {
            this.recalculateColumns(contentRect.bounds.width, contentRect.scroll.width);
          }}>
          {({ measureRef, measure, contentRect }) => {
            // storing measure method reference for use in recalculateColumns()
            this.measure = measure;
            return (<div ref={measureRef} style={{ visibility: this.state.visible ? undefined : "hidden" }}>
              <Table columns={this.state.columns} dataSource={data}
                rowClassName={() => "responsive-row"}
                pagination={{ defaultPageSize: 5 }} expandedRowRender={expandedRowRender} />
            </div>);
          }}
        </Measure>
      </div>
    );
  }

  recalculateColumns(availableWidth, tableWidth) {
    // console.log(`availableWidth: ${availableWidth} tableWidth: ${tableWidth}`);
    if (availableWidth < tableWidth) {
      // if available space is lesser than real table width => remove last column
      const columns = this.state.columns.slice();
      const columnToHide = columns.pop();
      const hiddenColumns = this.state.hiddenColumns.slice();
      hiddenColumns.splice(0, 0, columnToHide);
      this.setState({ columns, hiddenColumns, visible: false }, () => {
        if (this.measure) {
          // call remeasurement of table asynchrounously
          setTimeout(this.measure, 1);
        }
      });
      this.lastAvailableWidth = availableWidth;
    } else if (this.lastAvailableWidth && this.lastAvailableWidth < availableWidth
      && this.state.hiddenColumns.length > 0) {
      // if available space is growing and there at least one hidden column => reset column visibility
      this.setState({ columns: columnsDefinition, hiddenColumns: [], visible: false }, () => {
        if (this.measure) {
          // call remeasurement of table asynchrounously
          setTimeout(this.measure, 1);
        }
      });
    } else {
      // show table if recalculation is finalized
      this.setState({ visible: true });
    }
  }

  // definition of table columns in expanded space
  expandedTableColumns = [{ title: 'Column', dataIndex: 'columnName' },
  { title: 'Value', dataIndex: 'value' }];

  /**
   * rendering method for expanding space
   */
  renderExpandRow(record, index, indent, expanded) {
    if (expanded) {
      const data = this.state.hiddenColumns.map(
        c => {
          const data = { columnName: c.title, value: record[c.dataIndex] };
          return data;
        });
      return <Table
        columns={this.expandedTableColumns}
        dataSource={data} pagination={false} showHeader={false} />
    }
  }
}

ReactDOM.render(<ResponsiveTableExample />, document.getElementById("root"));
