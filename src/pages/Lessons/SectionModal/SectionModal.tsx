import { sectionAdd } from '@/utils/request/lesson';
import { Card, Divider, Input, Modal, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  // lesson: LessonItem
  setOpen: (flag: boolean) => void;
  // sections: any[];
  lesson: {
    id: number;
    lessonId: number;
    sections: any[];
  };
}

const SectionModal: React.FC<Props> = ({ visible, setOpen, lesson }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(lesson.sections[0]?.id || 0);
  const [items, setItems] = useState(lesson.sections);
  const { TextArea } = Input;
  console.log('SectionModal sections', items);

  useMemo(() => {
    setItems(lesson.sections);
    setActiveTab(lesson.sections[0]?.id);
  }, [lesson]);

  const handleOk = () => {
    console.log('ok', lesson);
    setConfirmLoading(true);
    lesson.sections.forEach((section) => {
      if (section.contexts) {
        section.contexts = section.contexts.replace(/\n|\r\n/g, '#');
      }
    });
    sectionAdd({
      lessonId: lesson.lessonId,
      sections: lesson.sections,
    }).then(() => {
      setOpen(false);
      setConfirmLoading(false);
    });
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('onfinish', values);
  };

  const sentenceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const index = items.findIndex((i) => i.id === activeTab);
    if (index > -1) {
      items[index].contexts = event.target.value;
      setItems([...items]);
    }
  };

  const inputBlock = (section: any) => {
    console.log('inputBlock', section);
    return (
      <div>
        <TextArea rows={10} onChange={sentenceChange} value={section.contexts} />
      </div>
    );
  };

  const renderPreview = () => {
    const previewItem = items.find((i) => i.id === activeTab);
    if (previewItem) {
      const { contexts } = previewItem;
      const splits = contexts.replace(/\n|\r\n/g, '#').split('#');
      return splits.map((i, index) => <p key={`${index}`}>{i}</p>);
    }
  };

  return (
    <>
      <Modal
        title="章节编辑"
        open={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Tabs
            tabPosition="left"
            activeKey={activeTab}
            onTabClick={(id) => {
              setActiveTab(id);
              console.log('onTabClic', id);
            }}
            items={items.map((section, i) => {
              const { id, title } = section;
              return {
                label: `${title}`,
                key: id,
                children: inputBlock(section),
              };
            })}
          />
        </div>
        <Divider style={{ color: '#135200' }}>预览</Divider>
        <Card hoverable={true}>{renderPreview()}</Card>
      </Modal>
    </>
  );
};

export default SectionModal;
