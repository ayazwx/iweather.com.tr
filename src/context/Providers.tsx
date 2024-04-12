"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DataProvider from "./DataProvider";
import { ThemeProvider } from "next-themes";
import { FirebaseProvider } from "./FirebaseContext";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <FirebaseProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </FirebaseProvider>
      </DataProvider>
    </QueryClientProvider>
  );
};

export default Providers;
