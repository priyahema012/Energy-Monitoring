import React from "react";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Form } from "antd";
import classes from "./Filter.module.css";
import dayjs from "dayjs"; 
interface FilterProps {
  functioncall: (currentPage?: number, size?: number, search?: { fromDatetime: string; toDatetime: string }) => void;
}

const Filter = ({ functioncall }: FilterProps) => {
  const validationSchema = Yup.object({
    fromDatetime: Yup.date().required("From date is required"),
    toDatetime: Yup.date().required("To date is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      fromDatetime: null, 
      toDatetime: null,   
    },
    validationSchema: validationSchema,
    onSubmit: ({ fromDatetime, toDatetime }) => {
      functioncall(1, 10, {
        fromDatetime: fromDatetime ? dayjs(fromDatetime).format("YYYY-MM-DD HH:mm:ss") : "", 
        toDatetime: toDatetime ? dayjs(toDatetime).format("YYYY-MM-DD HH:mm:ss") : "",
      });
      console.log("Submitted values:", { fromDatetime, toDatetime });
    },
  });

  const handleReset = () => {
    formik.resetForm();
    functioncall(1, 10, { fromDatetime: "", toDatetime: "" });
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = formik;
  return (
    <div className={classes.filterContainer}>
      <Form onFinish={handleSubmit} className={classes.formContainer}>
        <div className={classes.formRow}>
          <Form.Item
            label={<span className={classes.formLabel}>From Date</span>}
            validateStatus={touched.fromDatetime && errors.fromDatetime ? "error" : ""}
            className={classes.formItem}
          >
            <DatePicker
              showTime
              name="fromDatetime"
              value={values.fromDatetime ? dayjs(values.fromDatetime) : null} 
              onChange={(date) => setFieldValue("fromDatetime", date)} 
              onBlur={() => setFieldTouched("fromDatetime", true)}
            />
          </Form.Item>

          <Form.Item
            label={<span className={classes.formLabel}>To Date</span>}
            validateStatus={touched.toDatetime && errors.toDatetime ? "error" : ""}
            className={classes.formItem}
          >
            <DatePicker
              showTime
              name="toDatetime"
              value={values.toDatetime ? dayjs(values.toDatetime) : null} 
              onChange={(date) => setFieldValue("toDatetime", date)} 
              onBlur={() => setFieldTouched("toDatetime", true)}
              disabledDate={(current) => {
                return current && values.fromDatetime ? current.isBefore(dayjs(values.fromDatetime)) : false; 
              }}
            />
          </Form.Item>

          <div className={classes.buttonContainer}>
            <Button type="primary" htmlType="submit" className={classes.submitButton}>
              Submit
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
