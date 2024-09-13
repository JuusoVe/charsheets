import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

interface PDFPreviewProps {
  pdfBlob: Blob | null
}

const PDFPreviewComponent: React.FC<PDFPreviewProps> = ({ pdfBlob }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob)
      setPdfUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [pdfBlob])

  if (!pdfUrl) return null

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Box>
        <div
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: 'fit-content',
          }}>
          <Viewer fileUrl={pdfUrl} />
        </div>
      </Box>
    </Worker>
  )
}

export const PDFPreview = React.memo(PDFPreviewComponent)
