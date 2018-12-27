import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "semantic-ui-react";

function SingleCheckboxFilter(props) {
  let { onChange, filterName, keyFilter } = props;

  let callFilterwithFilterId = (event, { checked }) => {
    console.info("check box: ", checked);
    onChange(checked, keyFilter);
  };

  return (
    <div className="col-sm-3 my-auto">
      <div className="row">
        <div className="col" style={{ height: "0px" }}>
          <Checkbox label={filterName} onChange={callFilterwithFilterId} />
        </div>
      </div>
    </div>
  );
}

SingleCheckboxFilter.propTypes = {};

export default SingleCheckboxFilter;
