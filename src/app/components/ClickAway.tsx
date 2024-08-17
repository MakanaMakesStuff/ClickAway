import { cloneElement, ReactElement, useEffect, useRef } from "react"

/**
 * Detects when a user clicks away from the target element
 * @param children - The target of our swipes
 * @param callback - The function called after each click event
 * @returns
 */
export default function ClickAway({
  children,
  callback,
}: {
  children: ReactElement
  callback?: (inside: boolean) => void
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
