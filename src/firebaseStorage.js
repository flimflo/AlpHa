import { storage } from 'firebase'

const storageInstance = storage()
const storageRef = storageInstance.ref()

export function uploadFile(file, path) {
  const fileRef = storageRef.child(path)

  return fileRef.put(file, {
    contentType: file.type,
    contentDisposition: "attachment; filename=" + file.name,
  })
}

export function getStoragePath(path) {
  return storageRef
    .child(path)
    .getDownloadURL()
}

export function openStoragePath(path) {
  return storageRef
    .child(path)
    .getDownloadURL()
    .then(url => window.open(url, '_'))
}