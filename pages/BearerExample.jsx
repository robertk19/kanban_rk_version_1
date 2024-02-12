import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const BearerExample = (props) => {
  const { bearer } = props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    const requestOptions = {
      headers: {
        Authorization: bearer,
      },
    };
    axios
      .get("http://localhost:8088/usermanager/example", requestOptions)
      .then((response) => setMessage(response.data));
  }, []);

  return (
    <>
      <h1>Bearer Example</h1>
      <p>Bearer: {bearer}</p>
      <p>Message: {message}</p>
    </>
  );
};
export default BearerExample;
