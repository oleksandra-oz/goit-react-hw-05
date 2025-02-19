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
        onSubmit={(values) => {
          if (!values.query.trim()) {
            notify();
            return;
          }
          onSubmit(values.query.trim());
        }}
      >
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
