"use client"
import { useState } from "react"
import ClickAway from "./components/ClickAway"
import styles from "./page.module.scss"
import SwipeAway from "./components/SwipeAway"

export default function Home() {
  const [selected, setSelected] = useState(false)
  const [swiped, setSwipe] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      <ClickAway callback={setSelected}>
        <div className={`${styles.clickMe} ${selected ? styles.selected : ""}`}>
          <h2 className={styles.label}>
            Click {selected ? <>Away</> : <>Me</>}
          </h2>
        </div>
      </ClickAway>

      <SwipeAway
        direction={["right"]}
        callback={() => setSwipe(true)}
        className={`${styles.swipeMe} ${swiped ? styles?.swiped : ""}`}
      >
        <h2 className={styles.label}>
          {swiped ? (
            <>Swiped</>
          ) : (
            <>
              Swipe Right <br /> (Open inspector and emulate touch screen)
            </>
          )}
        </h2>
      </SwipeAway>
    </main>
  )
}
