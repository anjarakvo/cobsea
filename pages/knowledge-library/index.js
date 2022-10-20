import Head from 'next/head'
import Image from 'next/image'
import { TopBar } from '..'

export default function KnowledgeLibrary() {
  return (
    <div>
      <Head>
        <title>COBSEA | Knowledge library</title>
      </Head>
      <div id="knowledge-library">
        <TopBar />
      </div>
    </div>
  )
}