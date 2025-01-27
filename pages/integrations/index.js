import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "@components/Button"
import Header from "@components/Structural/Header/Header"

export default function Index() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Integrations | Census Embedded Demo App</title>
      </Head>
      <Header title="Integrations" />
      <div className="flex h-full flex-col gap-6 px-8 py-6">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-5 rounded-lg bg-neutral-100 p-8">
          <div className="flex flex-col items-center gap-2 leading-none">
            <h3 className="text-xl font-bold text-neutral-700">Export</h3>
            <p className="text-neutral-500">
              Activate your data by{" "}
              <Link href="https://www.getcensus.com" target="_blank">
                syncing
              </Link>{" "}
              it to the tools you use every day. It&apos;s time to bring your revenue to the next level!
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              className="min-w-[300px] self-center"
              onClick={() => router.push("integrations/export-crm")}
            >
              Connect your CRM
              <i className="fa-solid fa-chevron-right ml-2 text-xs" />
            </Button>

            <Button
              onClick={() => router.push("integrations/export-ads")}
              className="min-w-[300px] self-center"
            >
              Connect your ad platforms
              <i className="fa-solid fa-chevron-right ml-2 text-xs" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
