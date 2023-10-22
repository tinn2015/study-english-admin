import { getLessonAnalyse } from '@/utils/request/lesson';
import { DualAxes, Pie } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

const LessonAnalysis: React.FC = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonsLevel, setLessonsLevel] = useState([]);
  useEffect(() => {
    getLessonAnalyse().then((res: any) => {
      console.log('getLessonAnalyse', res);
      setLessons(res.lessons);
      setLessonsLevel(res.lessonsLevel);
    });
  }, []);

  /**
   * 柱线混合图
   * @returns
   */
  const LessonsDualAxes = () => {
    const data = lessons.map((i: any) => {
      return {
        title: i.title,
        used: i.used,
        avgPercent: i.avgPercent,
      };
    });
    const config = {
      data: [data, data],
      xField: 'title',
      yField: ['used', 'avgPercent'],
      meta: {
        used: {
          alias: '使用量',
        },
        avgPercent: {
          alias: '完成度',
        },
      },
      xAxis: {
        label: {
          autoRotate: true,
          autoHide: false,
          autoEllipsis: false,
        },
      },
      geometryOptions: [
        {
          geometry: 'column',
        },
        {
          geometry: 'line',
          smooth: true,
          lineStyle: {
            lineWidth: 2,
          },
        },
      ],
    };
    return <DualAxes {...config} />;
  };

  /**
   * 饼图
   */
  const LessonsLevelPie = () => {
    const data = lessonsLevel.map((i: any) => {
      return {
        title: i.title,
        used: i.used,
      };
    });
    // const data = [
    //   {
    //     type: '分类一',
    //     value: 27,
    //   },
    //   {
    //     type: '分类二',
    //     value: 25,
    //   },
    //   {
    //     type: '分类三',
    //     value: 18,
    //   },
    //   {
    //     type: '分类四',
    //     value: 15,
    //   },
    //   {
    //     type: '分类五',
    //     value: 10,
    //   },
    //   {
    //     type: '其他',
    //     value: 5,
    //   },
    // ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'used',
      colorField: 'title',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        // content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };
  return (
    <div className="flex jc-c ai-c">
      <div>课程完成情况和使用了</div>
      <div style={{ width: '80%', margin: '20px auto' }}>
        <LessonsDualAxes></LessonsDualAxes>
      </div>
      <div>各课程的级别比例</div>
      <div style={{ width: '80%', margin: '20px auto' }}>
        <LessonsLevelPie></LessonsLevelPie>
      </div>
    </div>
  );
};
export default LessonAnalysis;
