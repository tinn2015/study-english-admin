import { sectionAdd } from '@/utils/request/lesson';
import { Card, Input, Modal, Tabs } from 'antd';
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

const TranslateModal: React.FC<Props> = ({ visible, setOpen, lesson }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(lesson.sections[0]?.id || 0);
  const [items, setItems] = useState(lesson.sections);
  const { TextArea } = Input;

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
    return (
      <div>
        <TextArea rows={10} onChange={sentenceChange} disabled value={section.contexts} />
      </div>
    );
  };

  /**
   * 修改翻译
   */
  const translateChange = (sentence: any, index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('修改翻译', e, sentence, lesson, items);
      const _index = items[index].sentences.findIndex((i: any) => i.text === sentence.text);
      if (_index > -1) {
        items[index].sentences[_index].translation = e.target.value;
        setItems([...items]);
      }
    };
  };

  const renderSentences = () => {
    const previewItem = items.find((i, index) => i.id === activeTab);
    if (previewItem) {
      const { sentences } = previewItem;
      return sentences.map((sentence: any, index: number) => {
        return (
          <div key={sentence.text} style={{ marginBottom: '20px' }}>
            <div className="sentence">
              {index + 1}. {sentence.text}
            </div>
            <div className="sentence-translate" style={{ marginTop: '10px' }}>
              <Input
                onChange={translateChange(sentence, index)}
                defaultValue={sentence.translation}
              ></Input>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <Modal
        title="译文编辑"
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
        <Card style={{ marginTop: '20px', maxHeight: '500px', overflow: 'auto' }} hoverable={true}>
          {renderSentences()}
        </Card>
      </Modal>
    </>
  );
};

export default TranslateModal;
