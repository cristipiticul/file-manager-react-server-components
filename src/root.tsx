import { LoginPage } from '@/components/LoginPage.tsx'
import { Dashboard } from '@/components/Dashboard.tsx'
import { Provider as ChakraProvider } from '@/components/ui/provider.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

export function Root(props: { url: URL }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>File Manager</title>
      </head>
      <body>
        <App {...props} />
      </body>
    </html>
  )
}

function App(props: { url: URL }) {
  // Simple app routing, based on path
  const pathname = props.url.pathname

  return (
    <div id="root">
      <ChakraProvider>
        {pathname === '/login' ? <LoginPage /> : pathname === '/dashboard' ? <Dashboard /> : <div>Error</div>}
        <Toaster />
      </ChakraProvider>
    </div>
  )
}
