import React, { Component } from "react";
import { apiResponse } from "../assests/constants";
import _ from "lodash";
import DataTable from "../compontents/table";
import FiltersDropdown from "../compontents/filtersDropdown";
import SingleCheckboxFilter from "../compontents/singleCheckboxFilter";
import "react-picky/dist/picky.css";

function checkFilterType(delta, key) {
  switch (key) {
    case 0:
      return { filterWithJiraKeys: delta };
    case 1:
      return { filterWithAuthorKeys: delta };
    case 3:
      return { filterWithMerge: delta };
    default:
    // code block
  }
}

class CommiteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: apiResponse,
      filterWithJiraKeys: [],
      filterWithAuthorKeys: [],
      filterWithMerge: false,
      column: null,
      direction: null,
      filteredData: apiResponse
    };
  }

  componentWillMount() {
    this.setState({ data: apiResponse });

    //Use data from `this.props.location.state.payLoad` to get details about branches
    console.info("new data: ", this.props.location.state.payLoad);
  }

  filterData = () => {
    let filteredData = this.state.data
      .filter(item => {
        console.info("filter 1", item);

        return this.state.filterWithJiraKeys.length
          ? this.state.filterWithJiraKeys.includes(item.message.split(" ")[0])
          : true;
      })
      .filter(item => {
        console.info("filter 2", item);
        return this.state.filterWithAuthorKeys.length
          ? this.state.filterWithAuthorKeys.includes(item.authorName)
          : true;
      })
      .filter(item => {
        console.info("filter 3", item);
        return this.state.filterWithMerge
          ? item.message.split(" ")[0] === "Merge"
          : true;
      });

    this.state.filterWithJiraKeys ||
    this.state.filterWithAuthorKeys.length ||
    this.state.filterWithMerge
      ? this.setState({ filteredData })
      : this.setState({
          filteredData: this.state.data
        });
  };

  selectMultipleOption = (value, key) => {
    this.setState(checkFilterType(value, key), this.filterData);
  };

  getDropDownData = () => {
    let payload = {};
    let giraIds = [],
      authorNames = [],
      showMerged = false;
    for (const commit of this.state.data) {
      // ... do something for merge ...
      let firstWord = commit.message.split(" ")[0];
      if (firstWord === "Merge") {
        showMerged = true;
      } else {
        giraIds.push(firstWord);
      }
      authorNames.push(commit.authorName);
    }
    giraIds = _.uniq(giraIds);
    authorNames = _.uniq(authorNames);
    payload.giraIds = giraIds;
    payload.authorNames = authorNames;
    payload.showMerged = showMerged;
    return payload;
  };

  handleSort = clickedColumn => () => {
    const { column, filteredData, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        filteredData: _.sortBy(filteredData, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      filteredData: filteredData.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    let { giraIds, authorNames } = this.getDropDownData();
    let { column, filteredData, direction } = this.state;
    return (
      <div className="container">
        <div className="row">
          <FiltersDropdown
            value={this.state.filterWithJiraKeys}
            options={giraIds}
            onChange={this.selectMultipleOption}
            keyFilter={0}
            filterName="Jira Id"
          />
          <FiltersDropdown
            value={this.state.filterWithAuthorKeys}
            options={authorNames}
            onChange={this.selectMultipleOption}
            keyFilter={1}
            filterName="Author name"
          />
          <SingleCheckboxFilter
            onChange={this.selectMultipleOption}
            keyFilter={3}
            filterName="Merge"
          />
        </div>
        <DataTable
          column={column}
          data={filteredData}
          direction={direction}
          handleSort={this.handleSort}
        />
      </div>
    );
  }
}

export default CommiteView;
