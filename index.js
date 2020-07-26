import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Filter,
  Inject,
  Edit,
  Sort,
  ForeignKey,
  Toolbar,
  Reorder,
  Resize
} from "@syncfusion/ej2-react-grids";
import { orderDetails, customerData } from "./data";
import { SampleBase } from "./sample-base";

const newCustomerData = [
  {
    CustomerID: "XXX",
    ContactName: "Foo"
  },
  {
    CustomerID: "YYY",
    ContactName: "Bar"
  },
  {
    CustomerID: "ZZZ",
    ContactName: "Baz"
  }
];

export class ForeignKeyColumn extends SampleBase {
  constructor() {
    super(...arguments);
    this.toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
    this.validationRules = { required: true };

    this.state = {
      customerData
    };
  }

  reloadCustomerData = () => {
      this.setState({
        customerData: newCustomerData
      });
  }

  render() {
    return (
      <div className="control-pane">
        <button onClick={this.reloadCustomerData}>Reload customer data</button>
        <div className="control-section">
          <GridComponent
            allowReordering={true}
            allowResizing={true}
            dataSource={orderDetails}
            allowPaging={true}
            ref={grid => (this.gridInstance = grid)}
            allowFiltering={true}
            allowSorting={true}
            editSettings={{
              allowEditing: true,
              allowDeleting: true,
              allowAdding: true
            }}
            filterSettings={{ type: "Menu" }}
            toolbar={this.toolbarOptions}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="120"
                textAlign="Right"
                validationRules={this.validationRules}
                isPrimaryKey={true}
              />

              <ColumnDirective
                field="CustomerID"
                headerText="Customer Name"
                width="150"
                validationRules={this.validationRules}
                foreignKeyValue="ContactName"
                foreignKeyField="CustomerID"
                dataSource={this.state.customerData}
              />
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                width="100"
                format="C2"
                textAlign="Right"
                editType="numericedit"
              />

              <ColumnDirective
                field="ShipName"
                headerText="Ship Name"
                width="170"
              />
            </ColumnsDirective>
            <Inject
              services={[
                Filter,
                Page,
                Edit,
                Sort,
                ForeignKey,
                Toolbar,
                Reorder,
                Resize
              ]}
            />
          </GridComponent>
        </div>
      </div>
    );
  }
}

render(<ForeignKeyColumn />, document.getElementById("sample"));
