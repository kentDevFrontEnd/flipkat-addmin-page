import React from "react";
import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import * as Yup from "yup";
import InputField from "../utils/InputField";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("The field need enter email"),
  password: Yup.string().required("The field need enter password"),
});

function SignIn() {
  const handleSubmitForm = (values, resetForm) => {
    console.log(values);

    resetForm();
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={10} md={8} className="mx-auto">
          <Card>
            <CardBody>
              <h3 className="text-center text-capitalize">Sign in</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmitForm(values, resetForm)
                }
              >
                {(props) => {
                  return (
                    <Form>
                      <FastField
                        name="email"
                        component={InputField}
                        label="email"
                        type="email"
                      />

                      <FastField
                        name="password"
                        component={InputField}
                        label="Password"
                        type="password"
                      />

                      <Button
                        type="submit"
                        color="info"
                        className="text-capitalize"
                      >
                        Sign In
                      </Button>
                      <h5 className="mt-3">
                        If you don't have an account? Please
                        <Link to="/signup"> Sign Up.</Link>
                      </h5>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;