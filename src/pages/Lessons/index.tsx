import request from '@/utils/request';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';

type RowItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  class: string;
  level: string;
  read: number;
  createTime: number;
};

const columns: ProColumns<RowItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '图片',
    dataIndex: 'img',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '分类',
    dataIndex: 'class',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '适用级别',
    dataIndex: 'level',
    copyable: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a key="editable">编辑</a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={() => action?.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //   ]}
      // />,
    ],
  },
];

const defaultData: RowItem[] = [
  {
    id: 1,
    title: '世界历史',
    desc: '介绍世界近代史',
    img: '',
    class: '历史',
    level: '中级',
    read: 12222,
    createTime: 1212121212,
  },
];

const getList = async (params: { page: number; size: number }) => {
  return request.getLessonList(params);
};

const Lesson: React.FC = () => {
  const [list, updateList] = useState<RowItem[]>([]);
  const [page, updatePage] = useState<number>(0);
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    request.getLessonList({ page, size: 10 }).then((res) => {
      console.log('getLessonList', res);
      updateList(res.lessons);
    });
  }, [page]);

  return (
    <PageContainer>
      <ProTable<RowItem>
        rowKey={'lessonId'}
        columns={columns}
        dataSource={list}
        actionRef={actionRef}
      ></ProTable>
    </PageContainer>
  );
};

export default Lesson;
