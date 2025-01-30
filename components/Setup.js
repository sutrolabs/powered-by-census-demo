import Head from "next/head"

import TokenEntry from "@components/TokenEntry"

export function Setup({ workspaceAccessToken, setWorkspaceAccessToken }) {
  return (
    <>
      <Head>
        <title>API Setup</title>
      </Head>
      <div className="grid min-h-screen place-items-center bg-neutral-100 p-8">
        <div className="flex max-w-xl flex-col gap-6 rounded-md border  border-neutral-200 bg-white px-10 py-8">
          <h1 className="text-2xl font-bold leading-none">Welcome to the Census Embedded Demo</h1>
          <p className="text-lg leading-normal">
            Welcome! This demo app shows how your customer can use Census Embedded to import data from their
            source to your desination and export data from your destination to their CRM and ad tools.
          </p>
          <TokenEntry
            workspaceAccessToken={workspaceAccessToken}
            setWorkspaceAccessToken={setWorkspaceAccessToken}
          />
        </div>
      </div>
    </>
  )
}
