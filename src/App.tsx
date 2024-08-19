import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import { ContractAppProvider } from './Context/Context'
import { ContractAppRouter } from './Router/AppRouter'

function App() {

  return (
    <NextUIProvider>
      <ContractAppProvider>
        <ContractAppRouter />
      </ContractAppProvider>
    </NextUIProvider>
  )
}

export default App
