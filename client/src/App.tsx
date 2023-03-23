import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import "./App.scss";

function App() {

  const clients = new ApolloClient({
    uri: "http://localhost:3300/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={clients}>
        <BrowserRouter>
         <AppRouter />
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
