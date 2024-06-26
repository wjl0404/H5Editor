import React from 'react'
import {defaultComponentStyle} from "src/utils/const";
import {addCmp} from "src/store/editStore";
import {isGraphComponent} from ".";
import leftSideStyles from "./leftSide.module.less";


const defaultStyle = {
  ...defaultComponentStyle,
  width: 120,
  height: 120,
  borderColor: "black",
  backgroundColor: "black",
};

const settings = [
  {
    key: "graph0",
    value: "",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
  },
  {
    key: "graph1",
    value: "",
    style: defaultStyle,
  },
  {
    key:"graph2",
    value:"",
    style:{
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
      borderRadius:'50%'
    }

  }
];

const ImgSider = () => {
  console.log("ImgSider render"); //sy-log
  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item) => (
          <li
            draggable={true}
            key={item.key}
            className={leftSideStyles.item}
            onClick={() => addCmp({...item, type: isGraphComponent})}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "drag-cmp",
                JSON.stringify({...item, type: isGraphComponent})
              );
            }}
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
              borderStyle: item.style.borderStyle,
              borderColor: item.style.borderColor,
              borderRadius:item.style.borderRadius
            }}></li>
        ))}
      </ul>
    </div>
  );
};

export default ImgSider;
