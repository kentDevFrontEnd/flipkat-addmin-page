import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { signup } from "../../redux/actions";
import InputField from "../UI/InputField";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("You need enter first name here"),
  lastName: Yup.string().required("You need enter last name here"),
  email: Yup.string().email().required("You need enter email here"),
  password: Yup.string().required("You need enter password here"),
  //   confirmPassword: Yup.string().required(
  //     "You need enter confirm password here"
  //   ),
});

function SignUp() {
  const { loading } = useSelector((state) => state.user);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmitForm = (values, resetForm) => {
    console.log(values);
    dispatch(signup(values));
    resetForm();
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={10} md={6} className="mx-auto">
          <Card>
            <CardBody>
              <h3 className="text-center text-capitalize">Sign up</h3>
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
                      <Row>
                        <Col md={6}>
                          <FastField
                            name="firstName"
                            component={InputField}
                            label="First Name"
                            type="text"
                          />
                        </Col>

                        <Col md={6}>
                          <FastField
                            name="lastName"
                            component={InputField}
                            label="Last Name"
                            type="text"
                          />
                        </Col>
                      </Row>
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

                      {/* <FastField
                        name="confirmPassword"
                        component={InputField}
                        label="Confirm password"
                        type="password"
                      /> */}

                      <Button
                        type="submit"
                        color="primary"
                        className="text-capitalize"
                        disabled={loading && true}
                      >
                        {loading && (
                          <Spinner as="span" animation="border" size="sm" />
                        )}
                        Sign up
                      </Button>
                      <h5 className="mt-3">
                        If you have an account? Please
                        <Link to="/signin"> Sign In.</Link>
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

export default SignUp;
