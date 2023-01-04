import React from "react";
import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
    // CUSTOM
    const [values, setValues] = useSearch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`/products/search/${values.keyword}`)
            // setResults(data)
            setValues({...values, results: data})
            navigate("/search")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <React.Fragment>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="search"
          style={{ borderRadius: "0px" }}
          className="form-control"
          placeholder="Search"
          onChange={e => setValues({...values, keyword: e.target.value}) }
          value={values.keyword}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ borderRadius: "0px" }}
        >
          Search
        </button>
      </form>
    </React.Fragment>
  );
};

export default Search;
