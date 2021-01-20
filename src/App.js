import './App.css'
import SearchUser from './components/SearchUser'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'

const appToken = process.env.REACT_APP_GITHUB_TOKEN

const authorization = `Bearer ${appToken}`

const link = new createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization,
  },
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div className="content">
          <SearchUser />
        </div>
      </ApolloProvider>
    </div>
  )
}

export default App
