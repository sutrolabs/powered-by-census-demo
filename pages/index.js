import dynamic from "next/dynamic"
import Head from "next/head"
import { useSessionStorage } from "usehooks-ts"

import DataLink from "@components/DataLink"
import Footer from "@components/Footer"
import Header from "@components/Header"
import Sidebar from "@components/Sidebar"
import TokenEntry from "@components/TokenEntry"
import WorkspaceSelect from "@components/WorkspaceSelect"

function Index() {
  const [personalAccessToken, setPersonalAccessToken] = useSessionStorage(
    "census-personal-access-token",
    null,
  )
  const [workspaceId, setWorkspaceId] = useSessionStorage("census-workspace-id", null)

  return (
    <>
      <Head>
        <title>Market Data Inc.</title>
      </Head>

      <Header
        loggedIn={!!(personalAccessToken && workspaceId)}
        onLogOut={() => {
          setPersonalAccessToken(null)
          setWorkspaceId(null)
        }}
      />

      {!personalAccessToken ? (
        <TokenEntry setPersonalAccessToken={setPersonalAccessToken} />
      ) : !workspaceId ? (
        <WorkspaceSelect
          personalAccessToken={personalAccessToken}
          setWorkspaceId={setWorkspaceId}
          onBack={() => {
            setPersonalAccessToken(null)
          }}
        />
      ) : (
        <>
          <Sidebar />
          <DataLink personalAccessToken={personalAccessToken} workspaceId={workspaceId} />
        </>
      )}
      <Footer />
    </>
  )
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
})
