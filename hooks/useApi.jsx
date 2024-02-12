import { useEffect } from "react";

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get(endpoint).then((resp) => setData(resp));
  };

  return [data, setData, refreshData];
};
export default useApi;
