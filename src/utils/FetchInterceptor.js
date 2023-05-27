import { useMsgModal } from "../contexts/ModalContext";
import { useEffect } from "react";
import { loadingAnim } from "../components/widgets/Spinner";

const originalFetch = window.fetch;

const interceptFetch = async (resource, config, msgModal) => {
  // Request interceptor here
  if (config !== undefined && config.hasOwnProperty("headers"))
  {
    if (config.headers["loadingAnim"] !== "false") loadingAnim.show(); //!

  }

  if (!window.navigator.onLine) {
    msgModal.set({
      type: "error",
      title: "Error",
      message: "No internet connection",
      isVisible: true
    });
    msgModal.show();
  }

  const response = await originalFetch(resource, config);
  // Response interceptor here

  if (!response.ok || response.status === 400 || response.status === 500) {
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
  });
};

const FetchInterceptor = () => {
  useFetchInterceptor();
  return null;
};

export default FetchInterceptor;
