import fetchApi from './fetchApi';
export default apiConfig => {
  let { path, param, dataType, type } = apiConfig;
  return fetchApi(path, param, dataType).then(
    res => ({
      res,
      type,
      dataType
    }),
    err => {
      console.log(err);
    }
  );
};
