import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Button } from "semantic-ui-react";
import "./style/home.scss";
import { repos } from "../assests/constants";
import {branchservice} from "../services/getBranches";

class Home extends Component {
  state = {};

  handleRepoChange = (event, { value }) => {
    console.info("handleRepo: ", value);
    branchservice(value).then(response =>  this.setState({ branches: response }));
  };

  handleBranchChange = (value, id) => {
    id === 1
      ? this.setState({ branchOne: value })
      : this.setState({ branchTwo: value });
  };

  isButtonDisabled = () => {
    let { branchOne, branchTwo } = this.state;
    return !branchOne || !branchTwo || branchOne === branchTwo;
  };

  handleButtonClick = () => {
    let { branchOne, branchTwo } = this.state;
    let payLoad = { branchOne, branchTwo };
    console.info(payLoad);
    this.props.history.push({
      pathname: "/commiteView",
      state: { payLoad }
    });
  };

  render() {
    let details;

    if (this.state.branches) {
      details = (
        <div>
          <div className="row my-3">
            <div className="col-sm-6">
              <Dropdown
                placeholder="Select Branch 1"
                search
                selection
                options={this.state.branches}
                onChange={(event, { value }) => {
                  this.handleBranchChange(value, 1);
                }}
              />
            </div>
            <div className="col-sm-6">
              <Dropdown
                placeholder="Select Branch 2"
                search
                selection
                options={this.state.branches}
                onChange={(event, { value }) => {
                  this.handleBranchChange(value, 2);
                }}
              />
            </div>
          </div>
          <div>
            <Button
              disabled={this.isButtonDisabled()}
              positive
              onClick={this.handleButtonClick}
            >
              Get Difference
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="home-container">
        <h5>Select Branch</h5>
        <Dropdown
          placeholder="Select Repositorie"
          fluid
          search
          selection
          options={repos}
          onChange={this.handleRepoChange}
        />

        {details}
      </div>
    );
  }
}

export default Home;
