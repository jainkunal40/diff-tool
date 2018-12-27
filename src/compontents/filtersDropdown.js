import React from "react";
import PropTypes from "prop-types";
import Picky from "react-picky";

function FiltersDropdown(props) {
  let { value, options, onChange, filterName, keyFilter } = props;
  
  let callFilterwithFilterId = values => {
    onChange(values, keyFilter);
  };

  return (
    <div className="col-sm-3 my-5">
      <div className="row">
        <div className="col">
          <h6>{filterName}:</h6>
        </div>
      </div>
      <div className="row my-2">
        <div className="col">
          <Picky
            value={value}
            options={options}
            onChange={callFilterwithFilterId}
            open={false}
            valueKey={filterName}
            labelKey={filterName}
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
          />
        </div>
      </div>
    </div>
  );
}

FiltersDropdown.propTypes = {};

export default FiltersDropdown;
