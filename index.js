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
  Toolbar
} from "@syncfusion/ej2-react-grids";
import { orderDetails, customerData } from "./data";
import { SampleBase } from "./sample-base";
export class ForeignKeyColumn extends SampleBase {
  constructor() {
    super(...arguments);
    this.toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
    this.validationRules = { required: true };
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
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
                dataSource={customerData}
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
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="150"
                editType="dropdownedit"
              />
            </ColumnsDirective>
            <Inject
              services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar]}
            />
          </GridComponent>
        </div>
      </div>
    );
  }
}

render(<ForeignKeyColumn />, document.getElementById("sample"));
