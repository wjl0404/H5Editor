import { defaultComponentStyle } from "src/utils/const";
import { isImgComponent } from ".";
import { addCmp } from "src/store/editStore";
import leftSideStyles from "./leftSide.module.less";

const defaultStyle = {
  ...defaultComponentStyle,
};

const url = "https://waterdrop-assets.oss-cn-guangzhou.aliyuncs.com/images/";


const settings = [
  {
    value: url + "Tom.jpg",
    style: defaultStyle
  }, {
    value: url + "Jerry.jpg",
    style: defaultStyle
  }]

const ImgSider = () => {
  console.log("ImgSider render"); //sy-log
  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item) => (
          <li
            draggable={true}
            key={item.value}
            className={leftSideStyles.item}
            onClick={() => addCmp({ ...item, type: isImgComponent })}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "drag-cmp",
                JSON.stringify({ ...item, type: isImgComponent })
              );
            }}>
            <img src={item.value} draggable={false} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImgSider;
