import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { style as common } from "../styles/common";

export const UrlForm = (props: any) => {
  const { onSubmit } = props;
  const [urls, setUrls] = useState([
    "https://themill.church/announcements",
    "https://themill.church/events",
  ]);

  const style = {
    container: {
      ...common.row,
      background: "rgba(0,0,0,0.05)",
    },
    form: {
      ...common.form,
    },
    row: {
      display: "flex",
      marginBottom: "20px",
      justifyContent: "space-between",
    },
    input: {
      width: "320px",
    },
    inputButton: {
      fontSize: "20px",
    },
    button: {
      ...common.button,
      marginBottom: "10px",
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(urls);
  };

  const handleSetUrls = (value: string, index: number) => {
    const values = [...urls];
    values[index] = value;
    setUrls([...values]);
  };

  const handleDeleteUrl = (index: number) => {
    const values = [...urls];
    values.splice(index, 1);
    setUrls([...values]);
  };

  const handleAddUrl = () => {
    setUrls([...urls, ""]);
  };

  return (
    <div style={style.container}>
      <form onSubmit={handleSubmit} style={style.form}>
        <h2>Step 1: Enter Feed Url(s)</h2>
        {urls.map((item, index) => {
          return (
            <div key={index} style={style.row}>
              <TextField
                label="Feed Url"
                variant="outlined"
                value={item}
                onChange={(e) => handleSetUrls(e.target.value, index)}
                style={style.input}
              />
              <Button
                onClick={(e) => handleDeleteUrl(index)}
                style={style.inputButton}
              >
                🗑
              </Button>
            </div>
          );
        })}

        <Button onClick={() => handleAddUrl()} style={style.button}>
          Add Url
        </Button>
        <br />
        <Button type="submit" style={style.button}>
          Submit
        </Button>
      </form>
    </div>
  );
};
