// The API sends "unknown" in lowercase; everything else is shown as it comes
export const statusLabel = (status) => (status === 'unknown' ? 'Unknown' : status)
