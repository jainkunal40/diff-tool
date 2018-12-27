import React from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Table } from "semantic-ui-react";
import "react-picky/dist/picky.css";

function DataTable(props) {
  let { column, data, direction } = props;

  return (
    <div className="row">
      <div className="col">
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Commit Id</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "authorName" ? direction : null}
                onClick={props.handleSort("authorName")}
              >
                Author
              </Table.HeaderCell>
              <Table.HeaderCell>Linked Jira</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(commit => (
              <Table.Row key={commit.commiteId}>
                <Table.Cell>{commit.commiteId}</Table.Cell>
                <Table.Cell>{commit.authorName}</Table.Cell>
                <Table.Cell>{commit.message}</Table.Cell>
                <Table.Cell>{commit.dae}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

DataTable.propTypes = {};

export default DataTable;
