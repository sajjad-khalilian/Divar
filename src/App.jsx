import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "components/layout/Layout";
import defaultOptions from "configs/reactQuery";
import Router from "router/Router";

function App() {

  const queryClient = new QueryClient({defaultOptions})
  
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router/>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
