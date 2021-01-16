import { useLocation } from "react-router-dom";

export const useLocationQueryString = () =>
  new URLSearchParams(useLocation().search);
