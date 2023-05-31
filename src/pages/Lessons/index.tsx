import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { request } from 'umi';

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

const Lesson: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<RowItem>
        columns={columns}
        defaultData={defaultData}
        request={async () => {
          const list = await request('http://www.baidu.com', {
            params: {
              name: 11,
            },
            method: 'POST',
          });
          return {};
        }}
      ></ProTable>
    </PageContainer>
  );
};

export default Lesson;
