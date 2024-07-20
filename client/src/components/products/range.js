import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  Button,
} from "@mui/material";

const RangeFilter = (props) => {
  const [open, setOpen] = useState(props.initState);

  const handleCollapseOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: { min: 0, max: 6000 },
    validationSchema: Yup.object({
      min: Yup.number().min(0, "The minimum is 0"),
      max: Yup.number().max(6000, "The max is 6000"),
    }),
    onSubmit: (values) => {
      props.handleRange([values.min, values.max]);
    },
  });
  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title} className="collapse_title" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            <form className="range_form" onSubmit={formik.handleSubmit}>
              <div className="range_inputs">
                <div>
                  <TextField
                    placeholder="Min"
                    name="min"
                    variant="outlined"
                    type="number"
                    {...formik.getFieldProps("min")}
                    {...errorHelper(formik, "min")}
                  />
                </div>
                <div>
                  <TextField
                    placeholder="Max"
                    name="max"
                    variant="outlined"
                    type="number"
                    {...formik.getFieldProps("max")}
                    {...errorHelper(formik, "max")}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="small"
              >
                Search
              </Button>
            </form>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default RangeFilter;
