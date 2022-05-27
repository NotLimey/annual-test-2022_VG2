import { DefaultHelmet } from "@limeyfy/react-seo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import useTheme from "./hooks/useTheme";
import "./index.css";
const env = import.meta.env;

export const BaseUrl = env.DEV
  ? "https://localhost:5001"
  : "https://api.limeyfy.no";
let container: null | Element | DocumentFragment = null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

axios.defaults.baseURL = BaseUrl;

document.addEventListener('DOMContentLoaded', function (event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container)
    root.render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="dark:bg-stone-900 w-full min-h-screen dark:text-white">
            <App />
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    );
  }
});
