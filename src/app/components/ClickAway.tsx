import { cloneElement, ReactElement, useEffect, useRef } from "react"

export default function ClickAway({
  children,
  callback,
}: {
  children: ReactElement
  callback?: (...args: any) => void
}) {
  const child = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!child.current || typeof window === "undefined") return

    function handleMouse(e: MouseEvent) {
      if (child.current && child.current.contains(e.target as Node)) {
        if (callback) {
          callback(true)
        }
      } else {
        if (callback) {
          callback(false)
        }
      }
    }

    window.addEventListener("mousedown", handleMouse)

    return () => {
      window.removeEventListener("mousedown", handleMouse)
    }
  }, [callback])

  return cloneElement(children, {
    ...children.props,
    ref: child,
  })
}
