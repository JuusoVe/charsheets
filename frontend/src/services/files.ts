import { useState } from 'react'
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  StorageReference,
} from 'firebase/storage'
import { storage } from './firebase'

interface FileData {
  name: string
  url: string
}

const useFiles = (path: string) => {
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState<boolean>(false)

  const fetchFiles = async () => {
    if (hasFetched) return
    setLoading(true)
    setError(null)

    try {
      const storageRef: StorageReference = ref(storage, path)
      const result = await listAll(storageRef)

      const filePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        return { name: itemRef.name, url }
      })

      const filesList = await Promise.all(filePromises)
      setFiles(filesList)
      setHasFetched(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (fileName: string) => {
    setLoading(true)
    setError(null)

    try {
      const fileRef = ref(storage, `${path}/${fileName}`)
      await deleteObject(fileRef)
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileName),
      )
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getFileUrl = async (fileName: string): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const fileRef = ref(storage, `${path}/${fileName}`)
      const url = await getDownloadURL(fileRef)
      return url
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { files, loading, error, fetchFiles, deleteFile, getFileUrl }
}

export default useFiles
