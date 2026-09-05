import React from 'react'

// No dedicated header here on purpose: ConditionalHeader (root layout) already
// hides the main site header for every /uiux/* route, and each uiux page
// brings its own Navbar component — same as the source UIUX page.
export default function UiUxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
