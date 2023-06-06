import request from '@/utils/request';
import { getLessonDetail } from '@/utils/request/lesson';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import LessonModal from './LessonModal/LessonModal';
import SectionModal from './SectionModal/SectionModal';

type RowItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  class: string;
  level: string;
  read: number;
  lessonId: number;
  createTime: number;
};

const Lesson: React.FC = () => {
  const [list, updateList] = useState<RowItem[]>([]);
  const [page, updatePage] = useState<number>(0);
  const [lessonModalVisible, setLessonModalVisible] = useState<boolean>(false);
  const [sectionModalVisible, setSectionModalVisible] = useState<boolean>(false);
  const [currentSections, setCurrentSections] = useState<{ title: string; descript: string }[]>([]);
  const [currentLesson, setCurrentLesson] = useState<{
    id: number;
    lessonId: number;
    sections: any[];
  }>({
    id: 0,
    lessonId: 0,
    sections: [],
  });
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    request.getLessonList({ page, size: 10 }).then((res) => {
      console.log('getLessonList', res);
      updateList(res.lessons);
    });
  }, [page]);

  const deleteLesson = (lesson: RowItem) => {
    console.log('deleteLesson', lesson);
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
      width: 80,
    },
    {
      title: '适用级别',
      dataIndex: 'level',
      copyable: true,
      ellipsis: true,
      valueType: 'select',
      width: 80,
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
      title: '已读数',
      dataIndex: 'read',
      copyable: true,
      ellipsis: true,
      width: 80,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="editable">编辑</a>,
        <a
          onClick={() => {
            getLessonDetail(record.lessonId).then((res) => {
              // setCurrentSections([...res.sections])
              setCurrentLesson(res);
              console.log('setCurrentSections', currentSections);
              setSectionModalVisible(true);
            });
          }}
          key="view"
        >
          章节管理
        </a>,
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => {
            deleteLesson(record);
          }}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <Button danger size="small">
            删除
          </Button>
        </Popconfirm>,
        // <a rel="noopener noreferrer" style={{color: '#cf1322'}} key="delete">
        //   删除
        // </a>,
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

  const sections = [
    {
      title: '学英语1',
      sentence: 'aaa1#bbb1#ccc1#ddd1#',
      id: 1,
    },
    {
      title: '学英语2',
      sentence: 'aaa2#bb2b#ccc2#ddd2#',
      id: 2,
    },
    {
      title: '学英语3',
      sentence: 'aaa3#bbb3#ccc3#ddd3#',
      id: 3,
    },
    {
      title: '学英语4',
      sentence: 'aaa4#bbb4#ccc4#ddd4#',
      id: 4,
    },
  ];

  return (
    <PageContainer>
      {list.length && (
        <ProTable<RowItem>
          rowKey="lessonId"
          columns={columns}
          dataSource={list}
          actionRef={actionRef}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setLessonModalVisible(true);
              }}
              type="primary"
            >
              新建
            </Button>,
          ]}
        ></ProTable>
      )}
      <LessonModal visible={lessonModalVisible} setOpen={setLessonModalVisible}></LessonModal>
      {currentLesson.sections.length && (
        <SectionModal
          visible={sectionModalVisible}
          setOpen={setSectionModalVisible}
          // sections={currentSections}
          lesson={currentLesson}
        ></SectionModal>
      )}
    </PageContainer>
  );
};

export default Lesson;
