import Head from "next/head"
import { useState } from "react"

import Button from "@components/Button"
import Card from "@components/Card"
import Destination from "@components/Destination"
import Header from "@components/Structural/Header/Header"
import { SyncStatus } from "@components/SyncStatus"
import Toggle from "@components/Toggle"

const accountDisplayMappings = ["Retailer type", "Annual revenue", "Local YoY growth"]
const contactDisplayMappings = ["Job title", "Years of experience", "Personal preferences"]

const config = [
  {
    label: "Salesforce",
    type: "salesforce",
    iconClassName: "fa-brands fa-salesforce",
    objects: [
      {
        label: "Account",
        fullName: "Account",
        sourceModelName: "retailers",
        primaryIdentifier: {
          from: "domain",
          to: "Domain__c",
        },
        displayMappings: accountDisplayMappings,
      },
      {
        label: "Contact",
        fullName: "Contact",
        sourceModelName: "retailer_contacts",
        primaryIdentifier: {
          from: "email",
          to: "Email",
        },
        displayMappings: contactDisplayMappings,
      },
    ],
  },
  {
    label: "HubSpot",
    type: "hubspot",
    iconClassName: "fa-brands fa-hubspot",
    objects: [
      {
        label: "Company",
        fullName: "company",
        sourceModelName: "retailers",
        primaryIdentifier: {
          from: "domain",
          to: "domain",
        },
        displayMappings: accountDisplayMappings,
      },
      {
        label: "Contact",
        fullName: "contact",
        sourceModelName: "retailer_contacts",
        primaryIdentifier: {
          from: "email",
          to: "email",
        },
        displayMappings: contactDisplayMappings,
      },
    ],
  },
]

export default function Index({
  workspaceAccessToken,
  destinations,
  setDestinations,
  destinationConnectLinks,
  setDestinationConnectLinks,
  syncs,
  setSyncs,
  runsLoading,
  runs,
}) {
  return (
    <>
      <Head>
        <title>Census Embedded Demo App</title>
      </Head>
      <Header title="Integrations / CRM" />
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col gap-8 overflow-y-auto px-8 py-6">
        <p className="text-neutral-500">
          Get access to relevant retailer and trend data right within your everyday sales tools.
        </p>
        <p>Step 1: Choose which CRM system you&apos;d like to keep in sync.</p>
        {config.map((destination) => (
          <Destination
            key={destination.type}
            label={destination.label}
            type={destination.type}
            iconClassName={destination.iconClassName}
            workspaceAccessToken={workspaceAccessToken}
            destinations={destinations}
            setDestinations={setDestinations}
            destinationConnectLinks={destinationConnectLinks}
            setDestinationConnectLinks={setDestinationConnectLinks}
            syncs={syncs}
          >
            <p>Step 2: Choose which destinations objects to sync.</p>
            <div className="flex flex-col gap-5">
              {destination.objects.map((object) => (
                <Object
                  key={object.fullName}
                  label={object.label}
                  fullName={object.fullName}
                  sourceModelName={object.sourceModelName}
                  primaryIdentifier={object.primaryIdentifier}
                  displayMappings={object.displayMappings}
                  destinationType={destination.type}
                  workspaceAccessToken={workspaceAccessToken}
                  destinations={destinations}
                  syncs={syncs}
                  setSyncs={setSyncs}
                  runsLoading={runsLoading}
                  runs={runs}
                />
              ))}
            </div>
          </Destination>
        ))}
      </div>
    </>
  )
}

function Object({
  label,
  fullName,
  sourceModelName,
  primaryIdentifier,
  displayMappings,
  destinationType,
  workspaceAccessToken,
  destinations,
  syncs,
  setSyncs,
  runsLoading,
  runs,
}) {
  const [loading, setLoading] = useState(false)
  const [disabledOverride, setDisabledOverride] = useState()
  const destination = destinations.find((item) => item.type === destinationType)
  const sync = syncs.find(
    (item) =>
      item.destination_attributes.connection_id === destination.id &&
      item.destination_attributes.object === fullName,
  )
  const run = runs.find((item) => item.sync_id === sync?.id)
  const running = run ? !run.completed_at : false
  const disabled = disabledOverride ?? sync?.paused ?? true
  return (
    <Card className="flex flex-col gap-4" disabled={disabled}>
      <h4 className="flex flex-row justify-between">
        <span className="font-medium">{label}</span>
        <Toggle
          checked={!disabled}
          disabled={loading || running}
          onChange={async () => {
            try {
              setLoading(true)
              if (!sync) {
                setDisabledOverride(false)
                const response = await fetch("/api/create_crm_sync", {
                  method: "POST",
                  headers: {
                    ["authorization"]: `Bearer ${workspaceAccessToken}`,
                    ["content-type"]: "application/json",
                  },
                  body: JSON.stringify({
                    destinationId: destination.id,
                    destinationObjectFullName: fullName,
                    sourceModelName,
                    primaryIdentifier,
                  }),
                })
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                const data = await response.json()
                setSyncs([...syncs, data])
              } else {
                setDisabledOverride(!sync.paused)
                const response = await fetch("/api/set_sync_paused", {
                  method: "POST",
                  headers: {
                    ["authorization"]: `Bearer ${workspaceAccessToken}`,
                    ["content-type"]: "application/json",
                  },
                  body: JSON.stringify({
                    id: sync.id,
                    paused: !sync.paused,
                  }),
                })
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                const data = await response.json()
                setSyncs(syncs.map((item) => (item.id === sync.id ? data : item)))
              }
            } finally {
              setLoading(false)
              setDisabledOverride()
            }
          }}
        />
      </h4>
      <p className="-mb-2 text-sm">These attributes will get synced...</p>
      <ul className="ml-6 flex grow list-disc flex-col gap-1 text-sm">
        {displayMappings.map((mapping) => (
          <li key={mapping}>{mapping}</li>
        ))}
      </ul>
      <div className="flex flex-row items-center justify-between gap-2">
        <SyncStatus
          syncsLoading={false}
          syncs={[sync].filter(Boolean)}
          runsLoading={runsLoading}
          runs={runs}
          showAge
        />
        <div className="flex flex-row gap-3">
          <Button
            className="text-sm"
            disabled={disabled || loading || running}
            onClick={async () => {
              try {
                setLoading(true)
                const response = await fetch("/api/trigger_sync_run", {
                  method: "POST",
                  headers: {
                    ["authorization"]: `Bearer ${workspaceAccessToken}`,
                    ["content-type"]: "application/json",
                  },
                  body: JSON.stringify({
                    syncId: sync.id,
                  }),
                })
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                setSyncs(
                  syncs.map((item) =>
                    item.id === sync.id ? { ...sync, updated_at: new Date().toISOString() } : item,
                  ),
                )

                // Wait for the run fetch loop to start before enabling the UI
                await new Promise((resolve) => setTimeout(resolve, 5000))
              } finally {
                setLoading(false)
              }
            }}
          >
            <i className="fa-solid fa-play mr-2" />
            Run now
          </Button>
          <Button className="text-sm" disabled={disabled || loading || running}>
            <i className="fa-solid fa-gear mr-2" />
            Configure
          </Button>
        </div>
      </div>
    </Card>
  )
}
