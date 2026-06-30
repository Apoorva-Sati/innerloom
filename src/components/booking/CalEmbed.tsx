"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"

interface CalEmbedProps {
  calLink: string
  namespace: string
  className?: string
}

export function CalEmbed({ calLink, namespace, className }: CalEmbedProps) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        hideEventTypeDetails: false,
      })
    })()
  }, [namespace])

  return (
    <div
    >
      <Cal
        namespace={namespace}
        calLink={calLink}
        className={`w-full h-full min-h-125 ${className ?? ""}`}
      />
    </div>
  )
}