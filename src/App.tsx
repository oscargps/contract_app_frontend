import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import { ContractAppProvider } from './Context/Context'
import { ContractAppRouter } from './Router/AppRouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query-client';

function App() {

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ContractAppProvider>
          <ContractAppRouter />
        </ContractAppProvider>
      </QueryClientProvider>
    </NextUIProvider>
  )
}

export default App
