import { useMsgModal } from "../contexts/ModalContext";
import { useEffect } from "react";
import { loadingAnim } from "../components/widgets/Spinner";

const originalFetch = window.fetch;

const interceptFetch = async (resource, config, msgModal) => {
  // request interceptor here
  if (config.headers["loadingAnim"] !== "false") loadingAnim.show();

  if (!window.navigator.onLine)
  {
    msgModal.set({
        type: "error",
        title: "Error",
        message: "No internet connection",
        isVisible: true
    });
    msgModal.show();
  }
//   const response = 
  const response = await originalFetch(resource, config);
  // response interceptor here

  if (!response.ok || response.statuscode === 400 || response.statuscode === 500)
  {
    msgModal.set({
        type: "error",
        title: "Error",
        message: "Failed fetching data",
        isVisible: true
    });
    msgModal.show();
}
    loadingAnim.hide();

  return response;
};

const useFetchInterceptor = () => {
  const { msgModal } = useMsgModal();

  useEffect(() => {
    window.fetch = (...args) => interceptFetch(...args, msgModal);

    return () => {
      window.fetch = originalFetch;
    };
  }, []);
};

const FetchInterceptor = () => {
  useFetchInterceptor();

};

export default FetchInterceptor;
