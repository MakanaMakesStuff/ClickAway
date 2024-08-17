import { ReactNode, useCallback, useEffect, useRef } from "react"

type Directions = "left" | "right" | "up" | "down"
export default function SwipeAway({
  children,
  callback,
  threshold = 100,
  useWindow = false,
  direction = ["left"],
  className,
}: {
  children: ReactNode
  callback?: () => any
  threshold?: number
  useWindow?: boolean
  direction?: Directions[]
  className?: string
}) {
  const swipeArea = useCallback((el: HTMLDivElement) => {
    if (useWindow || !el) return

    let pos = 0
    let triggered = false

    function start(e: TouchEvent) {
      pos =
        e.touches?.[0]?.[
          direction.includes("right") || direction.includes("left")
            ? "clientX"
            : "clientY"
        ]
    }

    function move(e: TouchEvent) {
      if (direction.includes("left")) {
        if (!triggered) {
          triggered = pos - e.touches?.[0]?.clientX >= threshold
        }
      }

      if (direction.includes("right")) {
        if (!triggered) {
          triggered = e.touches?.[0]?.clientX - pos >= threshold
        }
      }

      if (direction.includes("up")) {
        if (!triggered) {
          triggered = pos - e.touches?.[0]?.clientY >= threshold
        }
      }

      if (direction.includes("down")) {
        if (!triggered) {
          triggered = e.touches?.[0]?.clientY - pos >= threshold
        }
      }
    }

    function end(e: TouchEvent) {
      if (triggered) {
        pos = 0
        triggered = false
        if (callback) callback()
      }
    }

    el.addEventListener("touchstart", start)

    el.addEventListener("touchmove", move)

    el.addEventListener("touchend", end)

    return () => {
      el.removeEventListener("touchstart", start)

      el.removeEventListener("touchmove", move)

      el.removeEventListener("touchend", end)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window == "undefined" || !useWindow) return

    let pos = 0
    let triggered = false

    function start(e: TouchEvent) {
      pos =
        e.touches?.[0]?.[
          direction.includes("right") || direction.includes("left")
            ? "clientX"
            : "clientY"
        ]
    }

    function move(e: TouchEvent) {
      if (direction.includes("left")) {
        if (!triggered) {
          triggered = pos - e.touches?.[0]?.clientX >= threshold
        }
      }

      if (direction.includes("right")) {
        if (!triggered) {
          triggered = e.touches?.[0]?.clientX - pos >= threshold
        }
      }

      if (direction.includes("up")) {
        if (!triggered) {
          triggered = pos - e.touches?.[0]?.clientY >= threshold
        }
      }

      if (direction.includes("down")) {
        if (!triggered) {
          triggered = e.touches?.[0]?.clientY - pos >= threshold
        }
      }
    }

    function end(e: TouchEvent) {
      if (triggered) {
        pos = 0
        triggered = false
        if (callback) callback()
      }
    }

    window.addEventListener("touchstart", start)

    window.addEventListener("touchmove", move)

    window.addEventListener("touchend", end)

    return () => {
      window.removeEventListener("touchstart", start)

      window.removeEventListener("touchmove", move)

      window.removeEventListener("touchend", end)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useWindow])

  return useWindow ? (
    <>{children}</>
  ) : (
    <div ref={swipeArea} className={className ?? ""}>
      {children}
    </div>
  )
}
