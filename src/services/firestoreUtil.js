
export function snapshotToArray(snapshot) {
  return snapshot.docs().map(doc => doc.data());
}