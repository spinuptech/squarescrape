import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  name = "",
  checked = false,
  assetUrl = "",
  onChange = (e: ChangeEvent<HTMLInputElement>) => {},
  title = "",
}) => {
  const style = {
    container: {
      display: "flex",
      alignItems: "center",
    },
    image: {
      display: "block",
      width: "44px",
      height: "44px",
      backgroundImage: `url(${assetUrl}?format=1000w)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginLeft: "10px",
      marginRight: "10px",
      borderRadius: "3px",
    },
  };
  return (
    <label style={style.container}>
      <input
        type={type}
        title={title}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {assetUrl.length > 0 && <div style={style.image}></div>}
      {/* <div style={style.image}></div> */}
      {name}
    </label>
  );
};

Checkbox.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
