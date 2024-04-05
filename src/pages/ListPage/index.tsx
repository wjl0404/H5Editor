import { Card, Divider, Table, Space, Button, Modal, message } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "src/request/axios";
import { deleteCanvasByIdEnd, getCanvasListEnd, publishEnd, saveCanvasEnd, unpublishEnd } from "src/request/end";
import useUserStore from "src/store/userStore";

interface ListItem {
  id: number;
  type: string; // 页面、模板页面
  title: string;
  content: string;
  publish: boolean;
}
export default function ListPage() {
  const [list, setList] = useState([]);
  const isLogin = useUserStore((state) => state.isLogin);

  const fresh = async () => {
    if (!isLogin) {
      return;
    }
    const res: any = await Axios.get(getCanvasListEnd);
    let data = res?.content || [];
    setList(data);

  };

  const delConfirm = async (id: number) => {
    Modal.confirm({
      title: "删除",
      content: "您确定要删除吗？",
      onOk: async () => {
        await Axios.post(deleteCanvasByIdEnd, { id });
        message.success("删除成功");
        fresh();
      },
    });
  };

  const publish = async (id: number) => {
    const res = await Axios.post(publishEnd, {
      id:`${id}`,
    });
    if (res) {
      message.success("发布成功");
      fresh();
    }
  };

  const unpublish = async (id: number) => {
    const res = await Axios.post(unpublishEnd, {
      id:`${id}`,
    });
    if (res) {
      message.success("下架成功");
      fresh();
    }
  };

  const saveItem = async (item: ListItem) => {
    const res = await Axios.post(saveCanvasEnd, {
      id: null,
      type: item.type,
      title: item.title + " 副本",
      content: item.content,
    });
    if (res) {
      message.success("复制成功");
      fresh();
    }
  };
  const saveAsTpl = async (item: ListItem) => {
    const res = await Axios.post(saveCanvasEnd, {
      id: null,
      type: "template",
      title: item.title + " 模板",
      content: item.content,
    });

    if (res) {
      message.success("保存模板成功");
      fresh();
    }
  };

  useEffect(() => {
    fresh();
  }, [isLogin]);

  const editUrl = (item: ListItem) => `/?id=${item.id}&type=${item.type}`;
  const columns = [
    {
      title: "id",
      key: "id",
      render: (item: ListItem) => {
        return <Link to={editUrl(item)}>{item.id}</Link>;
      },
    },
    {
      title: "标题",
      key: "title",
      render: (item: ListItem) => {
        const title = item.title || "未命名";
        return <Link to={editUrl(item)}>{title}</Link>;
      },
    },

    {
      title: "类型",
      key: "type",
      render: (item: ListItem) => {
        const typeDesc = item.type === "content" ? "页面" : "模板页";
        return <div className="red">{typeDesc}</div>;
      },
    },

    {
      title: "动作",
      key: "action",
      render: (item: ListItem) => {
        const { id } = item;
        return (
          <Space size="middle">
            {/* 这里应该是发布之后才可以查看 */}
            {item.type === "content" && (
              <>
                {item.publish === false ? (
                  <>
                    <a
                      target="_blank"
                      href={
                        "http://190.92.232.153:5001?id=" + id + "&preview"
                      }>
                      线下预览查看（切移动端）
                    </a>
                    <Button onClick={() => publish(id)}>发布</Button>
                  </>
                ) : (
                  <>
                    <a
                      target="_blank"
                      href={"http://190.92.232.153:5001?id=" + id}>
                      线上查看（切移动端）
                    </a>
                    <Button onClick={() => unpublish(id)}>下架</Button>
                  </>
                )}
              </>
            )}

            <Link to={editUrl(item)}>编辑</Link>

            {/* 复制 */}
            <Button onClick={() => saveItem(item)}>复制</Button>
            {/* 页面可转为模板 */}
            {item.type == "content" && (
              <Button onClick={() => saveAsTpl(item)}>保存为模板</Button>
            )}
            <Button onClick={() => delConfirm(id)}>删除</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Card>
      <Link to="/">新增</Link>
      <Divider />

      <Table
        columns={columns}
        dataSource={list}
        rowKey={(record: ListItem) => record.id}
      />
    </Card>
  );
}
