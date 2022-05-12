import * as ReactDOM from "react-dom";
import React, { StrictMode } from "react";
import Dashboard from "../components/dashboard";

import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
axios.defaults.baseURL = `https://job-portal-backend-naman.herokuapp.com/api/`;
// axios.defaults.baseURL = `http://localhost:8000/api/`;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
