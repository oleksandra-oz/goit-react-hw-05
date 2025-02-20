import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      {/* Кнопка "Go Back", якщо є, звідки повертатись */}
      {location.state?.from && (
        <button onClick={() => navigate(location.state.from)}>Go Back</button>
      )}

      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { resetForm }) => {
          if (!values.query.trim()) {
            toast.error("Cannot be empty");
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
