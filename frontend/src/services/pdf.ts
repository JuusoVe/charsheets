import { pdf } from '@react-pdf/renderer'
import PDFMerger from 'pdf-merger-js'

export const downloadPDF = (pdfBlob: Blob, fileName: string) => {
  const url = URL.createObjectURL(pdfBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const createPDFBlobFromUrl = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from ${url}: ${response.statusText}`)
    }

    const pdfBlob = await response.blob()

    if (pdfBlob.type !== 'application/pdf') {
      throw new Error(`The fetched file is not a PDF.`)
    }

    return pdfBlob
  } catch (error) {
    console.error('Error creating PDF Blob from URL:', error)
    throw error
  }
}
