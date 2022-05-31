import axios from "axios";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import FullscreenLoader from "./components/loaders/FullscreenLoader";
import "./index.css";
const env = (import.meta as any).env;

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
        <React.Suspense fallback={<FullscreenLoader text="Loading website..." />}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <div className="dark:bg-stone-900 w-full min-h-screen dark:text-white">
              <App />
            </div>
          </QueryClientProvider>
        </React.Suspense>
    );
  }
});
