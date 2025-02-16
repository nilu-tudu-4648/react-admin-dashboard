import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";

const apiMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }

    const {
      // url,
      // method,
      // data,
      // headers = {},
      onSuccess,
      onStart,
      onError,
    } = action.payload;

    // Dispatch onStart action if provided
    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    try {
      // Fetch token from AsyncStorage
     const response ={
        data:'Data'
      }
      //  await axios.request({
      //   // baseURL: baseUrl,
      //   url,
      //   method,
      //   data,
      //   headers: {
      //     ...headers,
      //     // Authorization: `Bearer ${userToken}`,
      //   },
      // });
      // Dispatch general success action
      dispatch(apiCallSuccess(response.data));

      // Dispatch specific success action if provided
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      // Dispatch general error action
      dispatch(apiCallFailed(errorMessage));

      // Dispatch specific error action if provided
      if (onError) {
        dispatch({ type: onError, payload: errorMessage });
      }
    }
  };

export default apiMiddleware;
