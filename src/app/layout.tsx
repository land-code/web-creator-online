import './globals.css'

import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Web creator - A simple block web creator',
  description: 'Create your own website with a simple block editor. No coding required. Just drag and drop blocks and customize them to your needs.'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col'>
        <Header />
        {children}
      </body>
    </html>
  )
}