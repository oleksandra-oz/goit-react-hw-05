import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const notify = () => toast.error("Cannot be empty");

  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { resetForm }) => {
          if (!values.query.trim()) {
            notify();
            return;
          }
          onSubmit(values.query.trim());
          resetForm();
        }}
      >
        <Form>
          <Field name="query" placeholder="Enter movie title..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
