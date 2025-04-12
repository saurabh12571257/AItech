const {useState} = require("react");    

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fn = async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
        return response;
      } catch (error) {
        setError(error);
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    return {data, error, loading, fn, setData};
};

export default useFetch;