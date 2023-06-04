import { Card, Divider, Input, Modal, Tabs } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  // lesson: LessonItem
  setOpen: (flag: boolean) => void;
  sections: any[];
}

const SectionModal: React.FC<Props> = ({ visible, setOpen, sections = [] }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(sections[0]?.id || 0);
  const [items, setItems] = useState(sections);
  const { TextArea } = Input;
  console.log('SectionModal sections', sections);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
    items[index].sentence = event.target.value;
    setItems([...items]);
  };

  const inputBlock = (section: any) => {
    console.log('inputBlock', section);
    return (
      <div>
        <TextArea rows={10} onChange={sentenceChange} value={section.sentence} />
      </div>
    );
  };

  const renderPreview = () => {
    const previewItem = items.find((i) => i.id === activeTab);
    const { sentence } = previewItem;
    const splits = sentence.split('#');
    return splits.map((i, index) => <p key={`${index}`}>{i}</p>);
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
            onTabClick={(id) => {
              setActiveTab(id);
              console.log('onTabClic', id);
            }}
            items={items.map((section, i) => {
              const { id } = section;
              return {
                label: `Tab ${id}`,
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
