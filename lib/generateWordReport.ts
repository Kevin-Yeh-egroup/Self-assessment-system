import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';
import type { InventoryState } from '@/store/inventoryStore';

function toROCDate(date: Date): string {
  const rocYear = date.getFullYear() - 1911;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${rocYear}/${month}/${day}`;
}

function toROCDateCompact(date: Date): string {
  const rocYear = date.getFullYear() - 1911;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${rocYear}${month}${day}`;
}

function heading1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: 'D97706', space: 4 },
    },
  });
}

function heading2(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
  });
}

function body(text: string, bullet = false): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: text || '（未填寫）', size: 22 })],
    bullet: bullet ? { level: 0 } : undefined,
    spacing: { before: 60, after: 60 },
  });
}

function labelValue(label: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}：`, bold: true, size: 22 }),
      new TextRun({ text: value || '（未填寫）', size: 22 }),
    ],
    spacing: { before: 80, after: 80 },
  });
}

function divider(): Paragraph {
  return new Paragraph({
    text: '',
    spacing: { before: 100, after: 100 },
  });
}

export async function generateWordReport(state: InventoryState): Promise<void> {
  const {
    description,
    strengths,
    efforts,
    interests,
    interestTags,
    lastSchool,
    workExperiences,
    workSkills,
    trainings,
    certificates,
    majorTurning,
    helpingPeople,
    affirmations,
    difficulties,
    supportPeople,
    aiAnalysis,
    radarData,
  } = state;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: '微軟正黑體', size: 22 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1440, right: 1440 },
          },
        },
        children: [
          // ── 封面標題 ──
          new Paragraph({
            children: [
              new TextRun({
                text: '自我資源盤點報告',
                bold: true,
                size: 52,
                color: '92400E',
                font: '微軟正黑體',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 600, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'AI 個案能力地圖系統・財務健康版',
                size: 24,
                color: '78716C',
                font: '微軟正黑體',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `產生日期：民國 ${toROCDate(new Date())}`,
                size: 20,
                color: '78716C',
                font: '微軟正黑體',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),

          // ── 第一章：自我描述 ──
          heading1('一、自我描述'),
          heading2('自我介紹'),
          body(description),
          heading2('我的優勢'),
          body(strengths),
          heading2('我正在努力的方向'),
          body(efforts),
          divider(),

          // ── 第二章：興趣 ──
          heading1('二、興趣與熱情'),
          heading2('興趣描述'),
          body(interests),
          heading2('興趣標籤'),
          ...(interestTags.length > 0
            ? interestTags.map((tag) => body(`• ${tag}`))
            : [body('（未填寫）')]),
          divider(),

          // ── 第三章：學經歷 ──
          heading1('三、學習與工作經歷'),
          labelValue('最後就讀學校', lastSchool),

          ...(workExperiences.length > 0
            ? [
                heading2('工作經歷'),
                ...workExperiences.flatMap((exp) => [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${exp.period}　${exp.jobTitle}`, bold: true, size: 22 }),
                      new TextRun({ text: `　（${exp.duration}）`, size: 20, color: '666666' }),
                    ],
                    spacing: { before: 120, after: 40 },
                  }),
                  body(exp.jobContent),
                ]),
              ]
            : []),

          heading2('技能描述'),
          body(workSkills),

          ...(trainings.length > 0
            ? [
                heading2('訓練課程'),
                ...trainings.map((t) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${t.period}　${t.courseName}`, bold: true, size: 22 }),
                      new TextRun({
                        text: `　${t.institution}　${t.completionDate}${t.hasCertificate ? '　✓ 有結業證書' : ''}`,
                        size: 20,
                        color: '555555',
                      }),
                    ],
                    spacing: { before: 80, after: 80 },
                  })
                ),
              ]
            : []),

          ...(certificates.length > 0
            ? [
                heading2('證照'),
                ...certificates.map((c) =>
                  body(`• ${c.name}${c.year ? `（${c.year}）` : ''}`)
                ),
              ]
            : []),
          divider(),

          // ── 第四章：生命故事 ──
          heading1('四、生命故事'),
          heading2('重要的生命轉捩點'),
          body(majorTurning),
          heading2('曾經幫助過我的人'),
          body(helpingPeople),
          heading2('讓我感到被肯定的時刻'),
          body(affirmations),
          heading2('曾面對的困難'),
          body(difficulties),
          divider(),

          // ── 第五章：支持系統 ──
          heading1('五、支持系統'),
          ...(supportPeople.length > 0
            ? [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      tableHeader: true,
                      children: ['姓名', '關係', '單位', '可以協助的事', '類型'].map(
                        (text) =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [new TextRun({ text, bold: true, size: 20, color: 'FFFFFF' })],
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                            shading: { type: ShadingType.SOLID, color: 'D97706' },
                          })
                      ),
                    }),
                    ...supportPeople.map(
                      (p) =>
                        new TableRow({
                          children: [
                            p.name,
                            p.relationship,
                            p.unit || '—',
                            p.canHelp,
                            { family: '親人', work: '工作', friend: '朋友', professional: '專業' }[p.type] || p.type,
                          ].map(
                            (text) =>
                              new TableCell({
                                children: [
                                  new Paragraph({
                                    children: [new TextRun({ text, size: 20 })],
                                  }),
                                ],
                              })
                          ),
                        })
                    ),
                  ],
                }),
              ]
            : [body('（未填寫支持系統）')]),
          divider(),

          // ── 第六章：AI 分析 ──
          heading1('六、AI 能力分析'),
          heading2('個人特質'),
          body(aiAnalysis.personalTraits),
          heading2('興趣與動機'),
          body(aiAnalysis.interestsMotivation),
          heading2('工作技能'),
          body(aiAnalysis.workSkills),
          heading2('可用資源'),
          body(aiAnalysis.availableResources),
          heading2('支持系統分析'),
          body(aiAnalysis.supportSystem),
          divider(),

          // ── 第七章：能力雷達分數 ──
          heading1('七、能力雷達評分'),
          ...(radarData.length > 0
            ? radarData.map((item) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${item.label}：`, bold: true, size: 22 }),
                    new TextRun({ text: `${'★'.repeat(item.value)}${'☆'.repeat(10 - item.value)}　${item.value} / 10`, size: 22, color: 'D97706' }),
                  ],
                  spacing: { before: 80, after: 80 },
                })
              )
            : [body('（尚未完成 AI 分析）')]),
          divider(),

          // ── 頁尾 ──
          new Paragraph({
            children: [
              new TextRun({
                text: '本報告由「AI 個案能力地圖系統・財務健康版」自動產生，供個人與諮詢師討論使用。',
                size: 18,
                color: '9CA3AF',
                italics: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 600 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `自我資源盤點報告_${toROCDateCompact(new Date())}.docx`);
}
