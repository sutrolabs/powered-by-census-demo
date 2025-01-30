import Head from "next/head"

import Source from "@components/Source"
import Header from "@components/Structural/Header/Header"

export default function ImportDataset({
  workspaceAccessToken,
  dd,
  sources,
  setSources,
  destinations,
  refetchSyncs,
  refetchSources,
  sourceConnectLinks,
  refetchSourceConnectLinks,
  sourceEmbedLinks,
  syncManagementLinks,
  refetchSyncManagementLinks,
  syncs,
  setSyncs,
  runsLoading,
  runs,
  embedMode,
  devMode,
}) {
  return (
    <>
      <Head>
        <title>Census Embedded Demo App</title>
      </Head>
      <Header title="Data Management" />
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col gap-8 px-8 py-6">
        <p className="text-neutral-500">
          <b>Note to customer:</b> On this page, the end user (your customer) can connect their source to your
          destination.
        </p>
        <p>Step 1: Connect your data source</p>
        <Source
          label="Redshift"
          type="redshift"
          iconClassName="fa-brands fa-aws"
          workspaceAccessToken={workspaceAccessToken}
          sources={sources}
          destinations={destinations}
          setSources={setSources}
          refetchSources={refetchSources}
          refetchSourceConnectLinks={refetchSourceConnectLinks}
          sourceConnectLinks={sourceConnectLinks}
          sourceEmbedLinks={sourceEmbedLinks}
          embedMode={embedMode}
          devMode={devMode}
          syncManagementLinks={syncManagementLinks}
          refetchSyncManagementLinks={refetchSyncManagementLinks}
          syncs={syncs}
          setSyncs={setSyncs}
          refetchSyncs={refetchSyncs}
          runsLoading={runsLoading}
          runs={runs}
        />
        <Source
          label="BigQuery"
          type="big_query"
          iconClassName="fa-brands fa-google"
          workspaceAccessToken={workspaceAccessToken}
          sources={sources}
          destinations={destinations}
          setSources={setSources}
          refetchSources={refetchSources}
          sourceConnectLinks={sourceConnectLinks}
          refetchSourceConnectLinks={refetchSourceConnectLinks}
          sourceEmbedLinks={sourceEmbedLinks}
          embedMode={embedMode}
          devMode={devMode}
          syncManagementLinks={syncManagementLinks}
          refetchSyncManagementLinks={refetchSyncManagementLinks}
          syncs={syncs}
          setSyncs={setSyncs}
          refetchSyncs={refetchSyncs}
          runsLoading={runsLoading}
          runs={runs}
        />
        <Source
          label="GoogleSheets"
          type="google_sheets"
          iconClassName="fa-brands fa-google"
          workspaceAccessToken={workspaceAccessToken}
          sources={sources}
          destinations={destinations}
          setSources={setSources}
          refetchSources={refetchSources}
          sourceConnectLinks={sourceConnectLinks}
          refetchSourceConnectLinks={refetchSourceConnectLinks}
          sourceEmbedLinks={sourceEmbedLinks}
          embedMode={embedMode}
          devMode={devMode}
          syncManagementLinks={syncManagementLinks}
          refetchSyncManagementLinks={refetchSyncManagementLinks}
          syncs={syncs}
          setSyncs={setSyncs}
          refetchSyncs={refetchSyncs}
          runsLoading={runsLoading}
          runs={runs}
        />
        <Source
          label="Snowflake"
          type="snowflake"
          iconClassName="fa-solid fa-snowflake"
          workspaceAccessToken={workspaceAccessToken}
          sources={sources}
          destinations={destinations}
          setSources={setSources}
          refetchSources={refetchSources}
          sourceConnectLinks={sourceConnectLinks}
          refetchSourceConnectLinks={refetchSourceConnectLinks}
          sourceEmbedLinks={sourceEmbedLinks}
          embedMode={embedMode}
          devMode={devMode}
          syncManagementLinks={syncManagementLinks}
          refetchSyncManagementLinks={refetchSyncManagementLinks}
          syncs={syncs}
          setSyncs={setSyncs}
          refetchSyncs={refetchSyncs}
          runsLoading={runsLoading}
          runs={runs}
        />
      </div>
    </>
  )
}
