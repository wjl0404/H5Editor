import React, { KeyboardEvent } from "react";
import styles from "./index.module.less";
import Canvas from "./Canvas";
import {setAllCmpsSelected, setCmpSelected} from "src/store/editStore";

export default function Center() {
  const keyDown = (e:any) => {
    if (e) {
      switch (e.code) {
        case "KeyA":
          setAllCmpsSelected();
          return;
      }
    }
  };
  return (
    <div
      id="center"
      className={styles.main}
      tabIndex={0}
      onClick={(e) => {
        if ((e.target as Element)?.id === "center") {
          setCmpSelected(-1);
          
        }
      }}
      onKeyDown={keyDown}>
      <Canvas />
    </div>
  );
}
