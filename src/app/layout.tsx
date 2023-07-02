import './globals.css'
import { Inter } from 'next/font/google'
import ReactQueryProvider from './ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ReactQueryProvider>
	<html lang="en" data-theme="dark">
	  <head>
	    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
	  </head>
	  <body className={'bg-black/20'}>{children}</body>
	</html>
      </ReactQueryProvider>
  )
}
