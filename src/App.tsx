import './App.css'
import { ContractAppProvider } from './Context/Context'
import { ContractAppRouter } from './Router/AppRouter'

function App() {

  return (
    <ContractAppProvider>
      <ContractAppRouter />
    </ContractAppProvider>
  )
}

export default App
