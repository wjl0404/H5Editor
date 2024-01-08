import useEditStore from "src/store/editStore";
import styles from "./index.module.less";

export default function Canvas() {
  const {canvas} = useEditStore();

  const {cmps} = canvas;

  return (
    <div id="canvas" style={canvas.style} className={styles.main}>
      {cmps.map((item) => (
        <div key={item.key}>{item.value}</div>
      ))}
    </div>
  );
}
