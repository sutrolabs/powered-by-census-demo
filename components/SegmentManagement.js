import React, { useState } from "react"

import Button from "@components/Button"
import RequestTooltip from "@components/RequestTooltip"
import SegmentCreationWizard from "@components/SegmentCreationWizard"
import { SegmentObject } from "@components/SegmentObject"
import { useSegmentManagementLink } from "@hooks/use-segment-management-link"
import { censusBaseUrl } from "@utils/url"

export default function SegmentManagement({
  segmentManagementLinks,
  refetchSegmentManagementLinks,
  workspaceAccessToken,
  segments,
  setSegments,
  refetchSegments,
  devMode,
  embedMode,
  addNewSegmentText,
}) {
  const [showCreateSegmentWizard, setShowCreateSegmentWizard] = useState(false)
  const [segmentManagementLink, resetSegmentManagementLink] = useSegmentManagementLink(
    segmentManagementLinks,
    refetchSegmentManagementLinks,
    workspaceAccessToken,
  )
  const createLink = segmentManagementLink?.uri

  const CENSUS_API_SEGMENT_MANAGEMENT_LINK = `${censusBaseUrl}/api/v1/segment_management_links`
  const CENSUS_API_DOCS_SEGMENT_MANAGEMENT_LINK =
    "https://developers.getcensus.com/api-reference/segment-management-links/create-a-new-segment-management-link"

  const initiateSegmentWizardFlow = () => {
    if (embedMode) {
      setShowCreateSegmentWizard(true)
    } else {
      window.location.href = createLink
    }
  }

  return (
    <>
      <p className="text-emerald-400"></p>
      <div className="flex flex-col gap-5">
        {segments
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((segment) => (
            <SegmentObject
              key={segment.id}
              segment={segment}
              refetchSegments={refetchSegments}
              workspaceAccessToken={workspaceAccessToken}
              setSegments={setSegments}
              devMode={devMode}
              embedMode={embedMode}
            />
          ))}
        {showCreateSegmentWizard ? (
          <SegmentCreationWizard
            setSegments={setSegments}
            refetchSegments={refetchSegments}
            resetSegmentManagementLink={resetSegmentManagementLink}
            setShowCreateSegmentWizard={setShowCreateSegmentWizard}
            connectLink={createLink}
          />
        ) : (
          <Button
            className="flex items-center justify-center rounded-md border border-emerald-500/40 bg-neutral-50  px-5 py-8 text-xl
              shadow-sm"
            onClick={initiateSegmentWizardFlow}
          >
            <span id={"create-segment"}>
              <i className="fa-solid fa-plus mr-4" />
              {addNewSegmentText}
            </span>
          </Button>
        )}
      </div>

      <RequestTooltip
        anchorSelect={"#create-segment"}
        url={CENSUS_API_SEGMENT_MANAGEMENT_LINK}
        method="POST"
        devMode={devMode}
        headers={
          <pre>
            {JSON.stringify(
              {
                ["authorization"]: "Bearer <workspaceAccessToken>",
                ["content-type"]: "application/json",
              },
              null,
              2,
            )}
          </pre>
        }
        body={
          !embedMode && (
            <pre>
              {JSON.stringify(
                {
                  redirect_uri: window.location.href,
                },
                null,
                2,
              )}
            </pre>
          )
        }
        link={CENSUS_API_DOCS_SEGMENT_MANAGEMENT_LINK}
      />
    </>
  )
}
