import Head from "next/head"
import { useEffect, useState, useCallback } from "react"

import Card from "@components/Card"
import Destination from "@components/Destination"
import SegmentManagement from "@components/SegmentManagement"
import Header from "@components/Structural/Header/Header"
import SyncManagement from "@components/SyncManagement"
import { embeddedDemoSourceLabel, usersInHighGrowthCitiesModelName } from "@utils/preset_source_destination"

export default function Index({
  sources,
  workspaceAccessToken,
  destinations,
  setDestinations,
  destinationConnectLinks,
  setDestinationConnectLinks,
  syncs,
  runsLoading,
  refetchSyncs,
  segments,
  refetchSegments,
  setSegments,
  runs,
  embedMode,
  devMode,
}) {
  const destinationForSync = (sync) => {
    return destinations.find((d) => d.id === sync.destination_attributes.connection_id)
  }

  const isFacebooksAudienceSync = (sync) => {
    return destinationForSync(sync).type === "facebook" && sync.destination_attributes.object === "customer"
  }

  const isGoogleAudienceSync = (sync) => {
    return (
      destinationForSync(sync).type === "google_ads" && sync.destination_attributes.object === "user_data"
    )
  }

  const googleAudienceSyncs = syncs.filter(isGoogleAudienceSync)
  const facebookAudienceSyncs = syncs.filter(isFacebooksAudienceSync)

  return (
    <>
      <Head>
        <title>Census Embedded Demo App</title>
      </Head>
      <Header title="Integrations / Ad Platforms" />
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col gap-8 overflow-y-auto px-8 py-6">
        <p>Create custom ad audiences to match the retailer segments that matter to your business.</p>
        <p>Step 1: Choose your ad platforms.</p>
        <Destination
          label="Google Ads"
          type="google_ads"
          iconClassName="fa-brands fa-google"
          workspaceAccessToken={workspaceAccessToken}
          destinations={destinations}
          setDestinations={setDestinations}
          destinationConnectLinks={destinationConnectLinks}
          setDestinationConnectLinks={setDestinationConnectLinks}
          syncs={syncs}
        />
        <Destination
          label="Facebook Ads"
          type="facebook"
          iconClassName="fa-brands fa-facebook"
          workspaceAccessToken={workspaceAccessToken}
          destinations={destinations}
          setDestinations={setDestinations}
          destinationConnectLinks={destinationConnectLinks}
          setDestinationConnectLinks={setDestinationConnectLinks}
          syncs={syncs}
        />
        <p className="mt-2">Step 2: Define your custom audience segments.</p>
        <Segment
          segments={segments}
          refetchSegments={refetchSegments}
          setSegments={setSegments}
          workspaceAccessToken={workspaceAccessToken}
          devMode={devMode}
          embedMode={embedMode}
        />
        <p className="mt-2">Step 3: Sync your custom audience segments to ad platforms.</p>
        <Sync
          destinations={destinations}
          sources={sources}
          facebookAudienceSyncs={facebookAudienceSyncs}
          googleAudienceSyncs={googleAudienceSyncs}
          runsLoading={runsLoading}
          refetchSyncs={refetchSyncs}
          runs={runs}
          workspaceAccessToken={workspaceAccessToken}
          devMode={devMode}
          embedMode={embedMode}
        />
      </div>
    </>
  )
}

function Segment({ segments, refetchSegments, workspaceAccessToken, devMode, embedMode }) {
  return (
    <Card className="flex flex-col gap-4" disabled>
      <SegmentManagement
        segments={segments}
        refetchSegments={refetchSegments}
        setSegments={() => {}}
        segmentManagementLinks={[]}
        refetchSegmentManagementLinks={() => {}}
        workspaceAccessToken={workspaceAccessToken}
        devMode={devMode}
        embedMode={embedMode}
        addNewSegmentText={"Create New Segment"}
      />
    </Card>
  )
}

function Sync({
  sources,
  destinations,
  facebookAudienceSyncs,
  googleAudienceSyncs,
  refetchSyncs,
  runsLoading,
  runs,
  workspaceAccessToken,
  devMode,
  embedMode,
}) {
  const [presetModel, setPresetModel] = useState(null)
  const [presetSource, setPresetSource] = useState(null)
  const [googleAdsDestination, setGoogleAdsDestination] = useState(null)
  const [facebookAdsDestination, setFacebookAdsDestination] = useState(null)

  const prefillAndHideSource = useCallback(
    async (sourceId) => {
      try {
        const apiResponse = await fetch(`/api/list_models_for_source?sourceId=${sourceId}`, {
          method: "GET",
          headers: {
            ["authorization"]: `Bearer ${workspaceAccessToken}`,
          },
        })
        const models = await apiResponse.json()
        setPresetModel(models.find((m) => m.name === usersInHighGrowthCitiesModelName))
      } catch (error) {
        // do nothing, we will display the source selector if models couldn't be fetched
      }
    },
    [workspaceAccessToken],
  )

  useEffect(() => {
    const source = sources.find((s) => s.label === embeddedDemoSourceLabel)
    if (source?.id) {
      prefillAndHideSource(source.id)
    }
    setPresetSource(source)
  }, [sources, workspaceAccessToken, prefillAndHideSource])

  useEffect(() => {
    setGoogleAdsDestination(destinations.find((d) => d.type === "google_ads"))
    setFacebookAdsDestination(destinations.find((d) => d.type === "facebook"))
  }, [destinations])

  const presetSourceAndDestination = (destination, edit = false) => {
    if (!presetSource?.id || !presetModel?.id || !destination?.id) return ""

    let queryParams = `&source_hidden=true&destination_hidden=true`

    if (!edit) {
      queryParams += `&source_connection_id=${presetSource.id}&model_id=${presetModel.id}&destination_connection_id=${destination.id}`

      if (destination.type === "facebook") {
        queryParams += "&destination_object_name=customer"
      } else if (destination.type === "google_ads") {
        queryParams += "&destination_object_name=user_data"
      }
    }

    return queryParams
  }

  return (
    <Card className="flex flex-col gap-4" disabled>
      <Card>
        <DestinationLabel label={"Google Ads"} />
        <SyncManagement
          sourceId={null}
          refetchSyncs={refetchSyncs}
          syncManagementLinks={[]}
          refetchSyncManagementLinks={() => {}}
          workspaceAccessToken={workspaceAccessToken}
          syncs={googleAudienceSyncs}
          setSyncs={() => {}}
          runsLoading={runsLoading}
          runs={runs}
          devMode={devMode}
          embedMode={embedMode}
          addNewSyncText={"Sync segment to Google Ads"}
          useCase={"export"}
          createSyncLinkQueryParams={presetSourceAndDestination(googleAdsDestination)}
          editSyncLinkQueryParams={presetSourceAndDestination(googleAdsDestination, true)}
        />
      </Card>
      <Card>
        <DestinationLabel label={"Facebook"} />
        <SyncManagement
          sourceId={null}
          refetchSyncs={refetchSyncs}
          syncManagementLinks={[]}
          refetchSyncManagementLinks={() => {}}
          workspaceAccessToken={workspaceAccessToken}
          syncs={facebookAudienceSyncs}
          setSyncs={() => {}}
          runsLoading={runsLoading}
          runs={runs}
          devMode={devMode}
          embedMode={embedMode}
          addNewSyncText={"Sync segment to Facebook"}
          useCase={"export"}
          createSyncLinkQueryParams={presetSourceAndDestination(facebookAdsDestination)}
          editSyncLinkQueryParams={presetSourceAndDestination(facebookAdsDestination, true)}
        />
      </Card>
    </Card>
  )
}

function DestinationLabel({ label }) {
  return (
    <h3 className="mb-2 flex flex-row justify-between">
      <span className="flex flex-row items-center gap-2 text-lg font-medium text-neutral-500 data-[enabled]:text-emerald-900">
        {label}
      </span>
    </h3>
  )
}
