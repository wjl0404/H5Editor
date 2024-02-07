import useEditStore, { updateAssemblyCmpsByDistance } from "src/store/editStore";
import styles from "./index.module.less";
import {throttle} from 'lodash'

export default function EditBox() {
  const [cmps, assembly] = useEditStore((state) => [
    state.canvas.cmps,
    state.assembly,
  ]);

  const onMouseDownOfCmp = (e:any) =>{
    let startX=e.pageX;
    let startY=e.pageY;
    // 移动
    const move=throttle((e)=>{
      const x=e.pageX;
      const y=e.pageY;
      // 根据移动修改组件属性
      const distX=x-startX;
      const distY=y-startY;
      updateAssemblyCmpsByDistance({top:distY,left:distX})
      // 更新起点
      startX=x;
      startY=y;
    },10);

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  const size = assembly.size;
  if (size === 0) {
    return null;
  }

  let top = 9999,
    left = 9999,
    bottom = -9999,
    right = -9999;

  assembly.forEach((index) => {
    const cmp = cmps[index];
    top = Math.min(top, cmp.style.top);
    left = Math.min(left, cmp.style.left);

    bottom = Math.max(bottom, cmp.style.top + cmp.style.height);
    right = Math.max(right, cmp.style.left + cmp.style.width);
  });

  let width = right - left + 8;
  let height = bottom - top + 8;

  top -= 4;
  left -= 4;

  return (
    <div
      className={styles.main}
      style={{
        zIndex: 99999,
        top,
        left,
        width,
        height,
      }}
      onMouseDown={onMouseDownOfCmp}></div>
  );
}
