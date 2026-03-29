import { useState, useCallback, useRef, useMemo } from "react";

// ── Default 408 textbook structure ──────────────────────────────────
const DEFAULT_BOOKS = [
  {
    id: "ds", name: "数据结构",
    startDate: "", targetDate: "",
    chapters: [
      { id: "ds-1", name: "第1章 绪论", sections: [
        { id: "ds-1-1", name: "1.1 数据结构的基本概念", progress: 0 },
        { id: "ds-1-2", name: "1.2 算法和算法评价", progress: 0 },
      ]},
      { id: "ds-2", name: "第2章 线性表", sections: [
        { id: "ds-2-1", name: "2.1 线性表的定义和基本操作", progress: 0 },
        { id: "ds-2-2", name: "2.2 线性表的顺序表示", progress: 0 },
        { id: "ds-2-3", name: "2.3 线性表的链式表示", progress: 0 },
      ]},
      { id: "ds-3", name: "第3章 栈、队列和数组", sections: [
        { id: "ds-3-1", name: "3.1 栈", progress: 0 },
        { id: "ds-3-2", name: "3.2 队列", progress: 0 },
        { id: "ds-3-3", name: "3.3 栈和队列的应用", progress: 0 },
        { id: "ds-3-4", name: "3.4 数组和特殊矩阵", progress: 0 },
      ]},
      { id: "ds-4", name: "第4章 串", sections: [
        { id: "ds-4-1", name: "4.1 串的定义和实现", progress: 0 },
        { id: "ds-4-2", name: "4.2 串的模式匹配", progress: 0 },
      ]},
      { id: "ds-5", name: "第5章 树与二叉树", sections: [
        { id: "ds-5-1", name: "5.1 树的基本概念", progress: 0 },
        { id: "ds-5-2", name: "5.2 二叉树的概念", progress: 0 },
        { id: "ds-5-3", name: "5.3 二叉树的遍历和线索二叉树", progress: 0 },
        { id: "ds-5-4", name: "5.4 树、森林", progress: 0 },
        { id: "ds-5-5", name: "5.5 树与二叉树的应用", progress: 0 },
      ]},
      { id: "ds-6", name: "第6章 图", sections: [
        { id: "ds-6-1", name: "6.1 图的基本概念", progress: 0 },
        { id: "ds-6-2", name: "6.2 图的存储及基本操作", progress: 0 },
        { id: "ds-6-3", name: "6.3 图的遍历", progress: 0 },
        { id: "ds-6-4", name: "6.4 图的应用", progress: 0 },
      ]},
      { id: "ds-7", name: "第7章 查找", sections: [
        { id: "ds-7-1", name: "7.1 查找的基本概念", progress: 0 },
        { id: "ds-7-2", name: "7.2 顺序查找和折半查找", progress: 0 },
        { id: "ds-7-3", name: "7.3 树形查找", progress: 0 },
        { id: "ds-7-4", name: "7.4 B树和B+树", progress: 0 },
        { id: "ds-7-5", name: "7.5 散列表", progress: 0 },
      ]},
      { id: "ds-8", name: "第8章 排序", sections: [
        { id: "ds-8-1", name: "8.1 排序的基本概念", progress: 0 },
        { id: "ds-8-2", name: "8.2 插入排序", progress: 0 },
        { id: "ds-8-3", name: "8.3 交换排序", progress: 0 },
        { id: "ds-8-4", name: "8.4 选择排序", progress: 0 },
        { id: "ds-8-5", name: "8.5 归并排序和基数排序", progress: 0 },
        { id: "ds-8-6", name: "8.6 各种排序算法的比较", progress: 0 },
        { id: "ds-8-7", name: "8.7 外部排序", progress: 0 },
      ]},
    ],
  },
  {
    id: "co", name: "计算机组成原理",
    startDate: "", targetDate: "",
    chapters: [
      { id: "co-1", name: "第1章 计算机系统概述", sections: [
        { id: "co-1-1", name: "1.1 计算机发展历程", progress: 0 },
        { id: "co-1-2", name: "1.2 计算机系统层次结构", progress: 0 },
        { id: "co-1-3", name: "1.3 计算机性能指标", progress: 0 },
      ]},
      { id: "co-2", name: "第2章 数据的表示和运算", sections: [
        { id: "co-2-1", name: "2.1 数制与编码", progress: 0 },
        { id: "co-2-2", name: "2.2 定点数的表示和运算", progress: 0 },
        { id: "co-2-3", name: "2.3 浮点数的表示和运算", progress: 0 },
        { id: "co-2-4", name: "2.4 算术逻辑单元ALU", progress: 0 },
      ]},
      { id: "co-3", name: "第3章 存储系统", sections: [
        { id: "co-3-1", name: "3.1 存储器概述", progress: 0 },
        { id: "co-3-2", name: "3.2 主存储器", progress: 0 },
        { id: "co-3-3", name: "3.3 高速缓冲存储器", progress: 0 },
        { id: "co-3-4", name: "3.4 虚拟存储器", progress: 0 },
      ]},
      { id: "co-4", name: "第4章 指令系统", sections: [
        { id: "co-4-1", name: "4.1 指令格式", progress: 0 },
        { id: "co-4-2", name: "4.2 指令的寻址方式", progress: 0 },
        { id: "co-4-3", name: "4.3 CISC和RISC", progress: 0 },
      ]},
      { id: "co-5", name: "第5章 中央处理器", sections: [
        { id: "co-5-1", name: "5.1 CPU的功能和基本结构", progress: 0 },
        { id: "co-5-2", name: "5.2 指令执行过程", progress: 0 },
        { id: "co-5-3", name: "5.3 数据通路的功能和基本结构", progress: 0 },
        { id: "co-5-4", name: "5.4 控制器的功能和工作原理", progress: 0 },
        { id: "co-5-5", name: "5.5 指令流水线", progress: 0 },
      ]},
      { id: "co-6", name: "第6章 总线", sections: [
        { id: "co-6-1", name: "6.1 总线概述", progress: 0 },
        { id: "co-6-2", name: "6.2 总线仲裁", progress: 0 },
        { id: "co-6-3", name: "6.3 总线操作和定时", progress: 0 },
        { id: "co-6-4", name: "6.4 总线标准", progress: 0 },
      ]},
      { id: "co-7", name: "第7章 输入/输出系统", sections: [
        { id: "co-7-1", name: "7.1 I/O系统基本概念", progress: 0 },
        { id: "co-7-2", name: "7.2 I/O接口", progress: 0 },
        { id: "co-7-3", name: "7.3 I/O方式", progress: 0 },
      ]},
    ],
  },
  {
    id: "os", name: "操作系统",
    startDate: "", targetDate: "",
    chapters: [
      { id: "os-1", name: "第1章 计算机系统概述", sections: [
        { id: "os-1-1", name: "1.1 操作系统的基本概念", progress: 0 },
        { id: "os-1-2", name: "1.2 操作系统的发展与分类", progress: 0 },
        { id: "os-1-3", name: "1.3 操作系统的运行环境", progress: 0 },
        { id: "os-1-4", name: "1.4 操作系统的体系结构", progress: 0 },
      ]},
      { id: "os-2", name: "第2章 进程与线程", sections: [
        { id: "os-2-1", name: "2.1 进程与线程", progress: 0 },
        { id: "os-2-2", name: "2.2 处理机调度", progress: 0 },
        { id: "os-2-3", name: "2.3 同步与互斥", progress: 0 },
        { id: "os-2-4", name: "2.4 死锁", progress: 0 },
      ]},
      { id: "os-3", name: "第3章 内存管理", sections: [
        { id: "os-3-1", name: "3.1 内存管理概念", progress: 0 },
        { id: "os-3-2", name: "3.2 虚拟内存管理", progress: 0 },
      ]},
      { id: "os-4", name: "第4章 文件管理", sections: [
        { id: "os-4-1", name: "4.1 文件系统基础", progress: 0 },
        { id: "os-4-2", name: "4.2 文件系统实现", progress: 0 },
        { id: "os-4-3", name: "4.3 磁盘组织与管理", progress: 0 },
      ]},
      { id: "os-5", name: "第5章 输入/输出管理", sections: [
        { id: "os-5-1", name: "5.1 I/O管理概述", progress: 0 },
        { id: "os-5-2", name: "5.2 I/O核心子系统", progress: 0 },
      ]},
    ],
  },
  {
    id: "cn", name: "计算机网络",
    startDate: "", targetDate: "",
    chapters: [
      { id: "cn-1", name: "第1章 计算机网络体系结构", sections: [
        { id: "cn-1-1", name: "1.1 计算机网络概述", progress: 0 },
        { id: "cn-1-2", name: "1.2 计算机网络体系结构与参考模型", progress: 0 },
      ]},
      { id: "cn-2", name: "第2章 物理层", sections: [
        { id: "cn-2-1", name: "2.1 通信基础", progress: 0 },
        { id: "cn-2-2", name: "2.2 传输介质", progress: 0 },
        { id: "cn-2-3", name: "2.3 物理层设备", progress: 0 },
      ]},
      { id: "cn-3", name: "第3章 数据链路层", sections: [
        { id: "cn-3-1", name: "3.1 数据链路层的功能", progress: 0 },
        { id: "cn-3-2", name: "3.2 组帧", progress: 0 },
        { id: "cn-3-3", name: "3.3 差错控制", progress: 0 },
        { id: "cn-3-4", name: "3.4 流量控制与可靠传输", progress: 0 },
        { id: "cn-3-5", name: "3.5 介质访问控制", progress: 0 },
        { id: "cn-3-6", name: "3.6 局域网", progress: 0 },
        { id: "cn-3-7", name: "3.7 广域网", progress: 0 },
        { id: "cn-3-8", name: "3.8 数据链路层设备", progress: 0 },
      ]},
      { id: "cn-4", name: "第4章 网络层", sections: [
        { id: "cn-4-1", name: "4.1 网络层的功能", progress: 0 },
        { id: "cn-4-2", name: "4.2 路由算法", progress: 0 },
        { id: "cn-4-3", name: "4.3 IPv4", progress: 0 },
        { id: "cn-4-4", name: "4.4 IPv6", progress: 0 },
        { id: "cn-4-5", name: "4.5 路由协议", progress: 0 },
        { id: "cn-4-6", name: "4.6 IP组播", progress: 0 },
        { id: "cn-4-7", name: "4.7 移动IP", progress: 0 },
        { id: "cn-4-8", name: "4.8 网络层设备", progress: 0 },
      ]},
      { id: "cn-5", name: "第5章 传输层", sections: [
        { id: "cn-5-1", name: "5.1 传输层提供的服务", progress: 0 },
        { id: "cn-5-2", name: "5.2 UDP协议", progress: 0 },
        { id: "cn-5-3", name: "5.3 TCP协议", progress: 0 },
      ]},
      { id: "cn-6", name: "第6章 应用层", sections: [
        { id: "cn-6-1", name: "6.1 网络应用模型", progress: 0 },
        { id: "cn-6-2", name: "6.2 DNS系统", progress: 0 },
        { id: "cn-6-3", name: "6.3 FTP", progress: 0 },
        { id: "cn-6-4", name: "6.4 电子邮件", progress: 0 },
        { id: "cn-6-5", name: "6.5 万维网WWW", progress: 0 },
      ]},
    ],
  },
];

const DEFAULT_THESIS = { currentWords: 0, targetWords: 30000, startDate: "", targetDate: "" };

const bookColors = ["red", "blue", "ice", "success"];

// ── Utilities ───────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

const calcChapterProgress = (ch) => {
  if (!ch.sections.length) return 0;
  return Math.round(ch.sections.reduce((s, sec) => s + sec.progress, 0) / ch.sections.length);
};

const calcBookProgress = (book) => {
  const allSections = book.chapters.flatMap((c) => c.sections);
  if (!allSections.length) return 0;
  return Math.round(allSections.reduce((s, sec) => s + sec.progress, 0) / allSections.length);
};

const calcTotalProgress = (books) => {
  const allSections = books.flatMap((b) => b.chapters.flatMap((c) => c.sections));
  if (!allSections.length) return 0;
  return Math.round(allSections.reduce((s, sec) => s + sec.progress, 0) / allSections.length);
};

const daysBetween = (a, b) => {
  const d1 = new Date(a), d2 = new Date(b);
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
};

const today = new Date().toISOString().slice(0, 10);

// ── Styles ──────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --navy: #0a1628;
  --navy-light: #111d33;
  --navy-mid: #162440;
  --navy-surface: #1a2d4a;
  --red: #e63946;
  --red-glow: #e6394640;
  --blue: #457b9d;
  --blue-bright: #5da4d6;
  --blue-glow: #457b9d40;
  --ice: #a8dadc;
  --cream: #f1faee;
  --text: #e8edf4;
  --text-dim: #8899b0;
  --text-muted: #4a5e78;
  --success: #2a9d8f;
  --amber: #e9c46a;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Noto Sans SC', sans-serif;
  background: var(--navy);
  color: var(--text);
  min-height: 100vh;
}

.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.header {
  text-align: center;
  padding: 32px 0 28px;
  border-bottom: 1px solid var(--navy-mid);
  margin-bottom: 28px;
}
.header h1 {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(135deg, var(--red) 0%, var(--blue-bright) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.header-sub {
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 6px;
  font-weight: 300;
}

.toolbar {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.btn {
  font-family: 'Noto Sans SC', sans-serif;
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid var(--navy-mid);
  background: var(--navy-light);
  color: var(--text-dim);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn:hover { background: var(--navy-mid); color: var(--text); border-color: var(--blue); }
.btn-red { border-color: var(--red); color: var(--red); }
.btn-red:hover { background: var(--red); color: #fff; }
.btn-sm { padding: 4px 12px; font-size: 12px; }

.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 32px;
}
.overview-card {
  background: var(--navy-light);
  border: 1px solid var(--navy-mid);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: border-color 0.3s;
}
.overview-card:hover { border-color: var(--blue); }
.overview-card.total-card {
  border-color: var(--red);
  background: linear-gradient(135deg, var(--navy-light) 0%, #1a1428 100%);
}
.oc-label {
  font-size: 12px;
  color: var(--text-dim);
  margin-bottom: 8px;
  font-weight: 500;
}
.oc-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 600;
}
.oc-value.red { color: var(--red); }
.oc-value.blue { color: var(--blue-bright); }
.oc-value.ice { color: var(--ice); }
.oc-value.success { color: var(--success); }

.progress-bar {
  height: 4px;
  background: var(--navy-mid);
  border-radius: 2px;
  overflow: hidden;
  transition: height 0.2s;
}
.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}
.progress-fill.red { background: var(--red); }
.progress-fill.blue { background: var(--blue-bright); }
.progress-fill.ice { background: var(--ice); }
.progress-fill.success { background: var(--success); }

.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--navy-mid);
  padding-bottom: 0;
}
.tab {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  border: none;
  background: none;
  font-family: 'Noto Sans SC', sans-serif;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 0.2s;
}
.tab:hover { color: var(--text-dim); }
.tab.active { color: var(--text); border-bottom-color: var(--red); }

.book-panel {
  background: var(--navy-light);
  border: 1px solid var(--navy-mid);
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: border-color 0.3s;
}
.book-panel:hover { border-color: var(--navy-surface); }
.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  cursor: pointer;
  user-select: none;
}
.book-title { font-size: 16px; font-weight: 700; }
.book-meta { display: flex; align-items: center; gap: 12px; }
.book-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 600;
}
.arrow {
  font-size: 10px;
  color: var(--text-muted);
  transition: transform 0.2s;
  display: inline-block;
}
.arrow.open { transform: rotate(90deg); }

.book-body { padding: 0 18px 12px; }

.chapter { margin-bottom: 8px; }
.chapter-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
}
.chapter-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dim);
}
.chapter-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--text-muted);
}
.sections { padding-left: 8px; margin-bottom: 8px; }

.section-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px solid #ffffff06;
}
.section-name {
  flex: 1;
  font-size: 13px;
  color: var(--text-dim);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slider-wrap {
  width: 140px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 4px;
  background: var(--navy-mid);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--blue-bright);
  border: 2px solid var(--navy);
  cursor: pointer;
  transition: transform 0.15s;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  background: var(--ice);
}
input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--blue-bright);
  border: 2px solid var(--navy);
  cursor: pointer;
}
.slider-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  width: 32px;
  text-align: right;
}

/* Auto-fill indicator */
.section-row.auto-filled .section-name {
  color: var(--text-muted);
}
.section-row.auto-filled .slider-val {
  color: var(--success);
}
.auto-fill-hint {
  font-size: 11px;
  color: var(--text-muted);
  padding: 6px 0 2px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.auto-fill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  opacity: 0.6;
}

.thesis-panel {
  background: var(--navy-light);
  border: 1px solid var(--navy-mid);
  border-radius: 10px;
  padding: 24px;
}
.thesis-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}
.thesis-inputs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.thesis-field label {
  display: block;
  font-size: 12px;
  color: var(--text-dim);
  margin-bottom: 6px;
}
.thesis-field input {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  padding: 8px 12px;
  border: 1px solid var(--navy-mid);
  border-radius: 6px;
  background: var(--navy);
  color: var(--text);
  width: 160px;
  outline: none;
  transition: border-color 0.2s;
}
.thesis-field input:focus { border-color: var(--blue); }
.thesis-big-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  margin: 16px 0;
}
.thesis-bar {
  height: 12px;
  background: var(--navy-mid);
  border-radius: 6px;
  overflow: hidden;
}
.thesis-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--blue-bright));
  border-radius: 6px;
  transition: width 0.4s ease;
}
.thesis-info {
  font-size: 13px;
  color: var(--text-dim);
  text-align: center;
  margin-top: 12px;
}

.schedule-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  flex-wrap: wrap;
}
.date-input {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid var(--navy-mid);
  border-radius: 4px;
  background: var(--navy);
  color: var(--text-dim);
  outline: none;
  width: 130px;
}
.date-input:focus { border-color: var(--blue); }
.date-label {
  font-size: 11px;
  color: var(--text-muted);
}
.daily-hint {
  font-size: 12px;
  color: var(--text-dim);
  margin-left: auto;
}
.daily-hint.warn { color: var(--red); }
.daily-hint.ok { color: var(--success); }

.edit-section { margin-bottom: 12px; }
.edit-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
}
.edit-input {
  flex: 1;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  padding: 6px 10px;
  border: 1px solid var(--navy-mid);
  border-radius: 4px;
  background: var(--navy);
  color: var(--text);
  outline: none;
}
.edit-input:focus { border-color: var(--blue); }
.del-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s;
}
.del-btn:hover { color: var(--red); background: var(--red-glow); }
.add-row { padding: 4px 0; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: var(--navy-light);
  border: 1px solid var(--navy-mid);
  border-radius: 12px;
  padding: 28px;
  max-width: 400px;
  width: 90%;
}
.modal h3 { margin-bottom: 12px; font-size: 16px; }
.modal p { font-size: 14px; color: var(--text-dim); margin-bottom: 20px; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

@media (max-width: 600px) {
  .overview { grid-template-columns: repeat(2, 1fr); }
  .section-row { flex-wrap: wrap; gap: 4px; }
  .slider-wrap { width: 100%; }
  input[type="range"] { flex: 1; }
  .thesis-inputs { flex-direction: column; }
  .schedule-bar { gap: 6px; }
  .date-input { width: 110px; font-size: 11px; }
  .daily-hint { font-size: 11px; flex-wrap: wrap; }
}
`;

// ── Components ──────────────────────────────────────────────────────

function ProgressBar({ pct, color, height }) {
  return (
    <div className="progress-bar" style={height ? { height } : {}}>
      <div
        className={`progress-fill ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

function SectionRow({ section, onChange, isAutoFilled }) {
  return (
    <div className={`section-row ${isAutoFilled ? "auto-filled" : ""}`}>
      <span className="section-name" title={section.name}>{section.name}</span>
      <div className="slider-wrap">
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={section.progress}
          onChange={(e) => onChange(section.id, Number(e.target.value))}
        />
        <span className="slider-val">{section.progress}%</span>
      </div>
    </div>
  );
}

function ChapterBlock({ chapter, onSectionChange, autoFilledIds }) {
  const [open, setOpen] = useState(false);
  const pct = calcChapterProgress(chapter);
  return (
    <div className="chapter">
      <div className="chapter-head" onClick={() => setOpen(!open)}>
        <span className="chapter-name">
          <span className={`arrow ${open ? "open" : ""}`}>▶</span>{" "}
          {chapter.name}
        </span>
        <span className="chapter-pct">{pct}%</span>
      </div>
      {open && (
        <div className="sections">
          {chapter.sections.map((sec) => (
            <SectionRow
              key={sec.id}
              section={sec}
              onChange={onSectionChange}
              isAutoFilled={autoFilledIds.has(sec.id)}
            />
          ))}
        </div>
      )}
      <ProgressBar pct={pct} color="blue" />
    </div>
  );
}

function BookPanel({ book, colorIdx, onSectionChange, onDateChange }) {
  const [open, setOpen] = useState(false);
  const pct = calcBookProgress(book);
  const color = bookColors[colorIdx % bookColors.length];

  // Find the last section with progress > 0 to determine auto-filled sections
  const allSections = book.chapters.flatMap((c) => c.sections);
  const autoFilledIds = useMemo(() => {
    const ids = new Set();
    // Find the last section that has any progress
    let lastActiveIdx = -1;
    for (let i = allSections.length - 1; i >= 0; i--) {
      if (allSections[i].progress > 0) {
        lastActiveIdx = i;
        break;
      }
    }
    // Mark sections before it that are at 100% as auto-filled
    for (let i = 0; i < lastActiveIdx; i++) {
      if (allSections[i].progress === 100) {
        ids.add(allSections[i].id);
      }
    }
    return ids;
  }, [allSections]);

  // Schedule calculation
  const remainingSections = allSections.reduce((s, sec) => s + (100 - sec.progress) / 100, 0);
  const daysLeft = book.targetDate ? daysBetween(today, book.targetDate) : null;
  const dailySections = daysLeft && daysLeft > 0 ? (remainingSections / daysLeft).toFixed(1) : null;

  return (
    <div className="book-panel">
      <div className="book-header" onClick={() => setOpen(!open)}>
        <span className="book-title">{book.name}</span>
        <div className="book-meta">
          <span className="book-pct" style={{ color: `var(--${color === "ice" ? "ice" : color === "success" ? "success" : color === "red" ? "red" : "blue-bright"})` }}>
            {pct}%
          </span>
          <span className={`arrow ${open ? "open" : ""}`}>▶</span>
        </div>
      </div>
      {open && (
        <div className="book-body">
          <div className="auto-fill-hint">
            <span className="auto-fill-dot" />
            链表模式：拖动进度时，前面的小节自动填满
          </div>
          {book.chapters.map((ch) => (
            <ChapterBlock
              key={ch.id}
              chapter={ch}
              onSectionChange={onSectionChange}
              autoFilledIds={autoFilledIds}
            />
          ))}
        </div>
      )}
      <div className="schedule-bar">
        <span className="date-label">开始</span>
        <input
          type="date"
          className="date-input"
          value={book.startDate || ""}
          onChange={(e) => { e.stopPropagation(); onDateChange(book.id, "startDate", e.target.value); }}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="date-label">目标</span>
        <input
          type="date"
          className="date-input"
          value={book.targetDate || ""}
          onChange={(e) => { e.stopPropagation(); onDateChange(book.id, "targetDate", e.target.value); }}
          onClick={(e) => e.stopPropagation()}
        />
        {daysLeft !== null && (
          <span className={`daily-hint ${daysLeft <= 0 ? "warn" : dailySections > 2 ? "warn" : "ok"}`}>
            {daysLeft <= 0
              ? "已超期！"
              : `剩${daysLeft}天，约${dailySections}节/天`
            }
          </span>
        )}
      </div>
      <div style={{ padding: "0 18px 12px" }}>
        <ProgressBar pct={pct} color={color} />
      </div>
    </div>
  );
}

function EditPanel({ books, setBooks }) {
  const [editingBook, setEditingBook] = useState(null);

  const updateBookName = (bookId, name) => {
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, name } : b)));
  };
  const addChapter = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, chapters: [...b.chapters, { id: uid(), name: "新章节", sections: [] }] }
          : b
      )
    );
  };
  const deleteChapter = (bookId, chId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, chapters: b.chapters.filter((c) => c.id !== chId) } : b
      )
    );
  };
  const updateChapterName = (bookId, chId, name) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, chapters: b.chapters.map((c) => (c.id === chId ? { ...c, name } : c)) }
          : b
      )
    );
  };
  const addSection = (bookId, chId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              chapters: b.chapters.map((c) =>
                c.id === chId
                  ? { ...c, sections: [...c.sections, { id: uid(), name: "新小节", progress: 0 }] }
                  : c
              ),
            }
          : b
      )
    );
  };
  const deleteSection = (bookId, chId, secId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              chapters: b.chapters.map((c) =>
                c.id === chId ? { ...c, sections: c.sections.filter((s) => s.id !== secId) } : c
              ),
            }
          : b
      )
    );
  };
  const updateSectionName = (bookId, chId, secId, name) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              chapters: b.chapters.map((c) =>
                c.id === chId
                  ? { ...c, sections: c.sections.map((s) => (s.id === secId ? { ...s, name } : s)) }
                  : c
              ),
            }
          : b
      )
    );
  };
  const addBook = () => {
    setBooks((prev) => [...prev, { id: uid(), name: "新教材", startDate: "", targetDate: "", chapters: [] }]);
  };
  const deleteBook = (bookId) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <div>
      {books.map((book) => (
        <div key={book.id} className="book-panel" style={{ marginBottom: 12 }}>
          <div style={{ padding: "12px 16px" }}>
            <input
              className="edit-input"
              value={book.name}
              onChange={(e) => updateBookName(book.id, e.target.value)}
              style={{ fontWeight: 700, fontSize: 15, width: "100%", marginBottom: 8 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-sm" onClick={() => setEditingBook(editingBook === book.id ? null : book.id)}>
                {editingBook === book.id ? "收起" : "编辑章节"}
              </button>
              <button className="btn btn-sm btn-red" onClick={() => deleteBook(book.id)}>删除教材</button>
            </div>
          </div>
          {editingBook === book.id && (
            <div style={{ padding: "0 16px 16px" }}>
              {book.chapters.map((ch) => (
                <div key={ch.id} className="edit-section">
                  <div className="edit-row">
                    <input
                      className="edit-input"
                      value={ch.name}
                      onChange={(e) => updateChapterName(book.id, ch.id, e.target.value)}
                      style={{ fontWeight: 600 }}
                    />
                    <button className="del-btn" onClick={() => deleteChapter(book.id, ch.id)}>✕</button>
                  </div>
                  {ch.sections.map((sec) => (
                    <div key={sec.id} className="edit-row" style={{ paddingLeft: 16 }}>
                      <input
                        className="edit-input"
                        value={sec.name}
                        onChange={(e) => updateSectionName(book.id, ch.id, sec.id, e.target.value)}
                      />
                      <button className="del-btn" onClick={() => deleteSection(book.id, ch.id, sec.id)}>✕</button>
                    </div>
                  ))}
                  <div className="add-row" style={{ paddingLeft: 16 }}>
                    <button className="btn btn-sm" onClick={() => addSection(book.id, ch.id)}>+ 小节</button>
                  </div>
                </div>
              ))}
              <div className="add-row">
                <button className="btn btn-sm" onClick={() => addChapter(book.id)}>+ 章节</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{ padding: "12px 0" }}>
        <button className="btn" onClick={addBook}>+ 添加教材</button>
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────
export default function ProgressTracker() {
  const [books, setBooks] = useState(() => JSON.parse(JSON.stringify(DEFAULT_BOOKS)));
  const [thesis, setThesis] = useState({ ...DEFAULT_THESIS });
  const [tab, setTab] = useState("overview");
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef(null);

  // ★ 核心改动：链表模式 — 拖动某节时，前面的节自动填满100%
  const handleSectionChange = useCallback((sectionId, value) => {
    setBooks((prev) =>
      prev.map((book) => {
        // 先看这个 section 是否属于这本书
        const allSections = book.chapters.flatMap((c) => c.sections);
        const targetIndex = allSections.findIndex((s) => s.id === sectionId);

        if (targetIndex === -1) return book; // 不在这本书里，不动

        // 收集所有排在目标前面的 section id
        const autoFillIds = new Set(
          allSections.slice(0, targetIndex).map((s) => s.id)
        );

        return {
          ...book,
          chapters: book.chapters.map((ch) => ({
            ...ch,
            sections: ch.sections.map((sec) => {
              if (sec.id === sectionId) return { ...sec, progress: value };
              if (value > 0 && autoFillIds.has(sec.id)) return { ...sec, progress: 100 };
              return sec;
            }),
          })),
        };
      })
    );
  }, []);

  const handleBookDateChange = useCallback((bookId, field, value) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, [field]: value } : book))
    );
  }, []);

  const totalPct = useMemo(() => calcTotalProgress(books), [books]);
  const thesisPct = thesis.targetWords > 0
    ? Math.min(100, Math.round((thesis.currentWords / thesis.targetWords) * 100))
    : 0;

  // Schedule for thesis
  const thesisDaysLeft = thesis.targetDate ? daysBetween(today, thesis.targetDate) : null;
  const thesisRemainingWords = Math.max(0, thesis.targetWords - thesis.currentWords);
  const thesisDailyWords = thesisDaysLeft && thesisDaysLeft > 0 ? Math.ceil(thesisRemainingWords / thesisDaysLeft) : null;

  const handleExport = () => {
    const data = { version: 2, exportedAt: new Date().toISOString(), books, thesis };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `408-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.books) setBooks(data.books);
        if (data.thesis) setThesis(data.thesis);
      } catch (err) {
        alert("导入失败：文件格式不正确");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    setBooks(JSON.parse(JSON.stringify(DEFAULT_BOOKS)));
    setThesis({ ...DEFAULT_THESIS });
    setShowResetModal(false);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="header">
          <h1>408 · 进度追踪</h1>
          <div className="header-sub">数据结构 · 组成原理 · 操作系统 · 计算机网络 · 毕业论文</div>
        </div>

        <div className="toolbar">
          <button className="btn" onClick={handleExport}>导出 JSON</button>
          <button className="btn" onClick={() => fileInputRef.current?.click()}>导入 JSON</button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
          <button className="btn btn-red" onClick={() => setShowResetModal(true)}>重置</button>
        </div>

        <div className="overview">
          <div className="overview-card total-card">
            <div className="oc-label">408 总进度</div>
            <div className="oc-value red">{totalPct}%</div>
          </div>
          {books.map((book, i) => (
            <div className="overview-card" key={book.id}>
              <div className="oc-label">{book.name}</div>
              <div className={`oc-value ${bookColors[i % bookColors.length]}`}>{calcBookProgress(book)}%</div>
            </div>
          ))}
          <div className="overview-card">
            <div className="oc-label">毕业论文</div>
            <div className={`oc-value ${thesisPct >= 80 ? "success" : thesisPct >= 40 ? "blue" : "red"}`}>{thesisPct}%</div>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>学习进度</button>
          <button className={`tab ${tab === "thesis" ? "active" : ""}`} onClick={() => setTab("thesis")}>毕业论文</button>
          <button className={`tab ${tab === "edit" ? "active" : ""}`} onClick={() => setTab("edit")}>编辑结构</button>
        </div>

        {tab === "overview" && (
          <div>
            {books.map((book, i) => (
              <BookPanel
                key={book.id}
                book={book}
                colorIdx={i}
                onSectionChange={handleSectionChange}
                onDateChange={handleBookDateChange}
              />
            ))}
          </div>
        )}

        {tab === "thesis" && (
          <div className="thesis-panel">
            <div className="thesis-title">毕业论文进度</div>
            <div className="thesis-inputs">
              <div className="thesis-field">
                <label>当前字数</label>
                <input
                  type="number"
                  min="0"
                  value={thesis.currentWords}
                  onChange={(e) => setThesis((t) => ({ ...t, currentWords: Math.max(0, Number(e.target.value)) }))}
                />
              </div>
              <div className="thesis-field">
                <label>目标字数</label>
                <input
                  type="number"
                  min="1"
                  value={thesis.targetWords}
                  onChange={(e) => setThesis((t) => ({ ...t, targetWords: Math.max(1, Number(e.target.value)) }))}
                />
              </div>
              <div className="thesis-field">
                <label>开始日期</label>
                <input
                  type="date"
                  className="date-input"
                  style={{ fontSize: 16, padding: "8px 12px", width: 160 }}
                  value={thesis.startDate || ""}
                  onChange={(e) => setThesis((t) => ({ ...t, startDate: e.target.value }))}
                />
              </div>
              <div className="thesis-field">
                <label>目标日期</label>
                <input
                  type="date"
                  className="date-input"
                  style={{ fontSize: 16, padding: "8px 12px", width: 160 }}
                  value={thesis.targetDate || ""}
                  onChange={(e) => setThesis((t) => ({ ...t, targetDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="thesis-big-pct" style={{
              color: thesisPct >= 80 ? "var(--success)" : thesisPct >= 40 ? "var(--blue-bright)" : "var(--red)"
            }}>
              {thesisPct}%
            </div>
            <div className="thesis-bar">
              <div className="thesis-fill" style={{ width: `${thesisPct}%` }} />
            </div>
            <div className="thesis-info">
              {thesis.currentWords.toLocaleString()} / {thesis.targetWords.toLocaleString()} 字
              {thesis.targetWords > thesis.currentWords && (
                <span>　·　还差 {(thesis.targetWords - thesis.currentWords).toLocaleString()} 字</span>
              )}
            </div>
            {thesisDaysLeft !== null && (
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <span className={`daily-hint ${thesisDaysLeft <= 0 ? "warn" : thesisDailyWords > 1500 ? "warn" : "ok"}`}>
                  {thesisDaysLeft <= 0
                    ? "已超期！"
                    : `剩${thesisDaysLeft}天，约${thesisDailyWords.toLocaleString()}字/天`
                  }
                </span>
              </div>
            )}
          </div>
        )}

        {tab === "edit" && <EditPanel books={books} setBooks={setBooks} />}

        {showResetModal && (
          <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>确认重置？</h3>
              <p>这将清除所有进度数据，恢复到默认状态。此操作不可撤销。建议先导出备份。</p>
              <div className="modal-actions">
                <button className="btn" onClick={() => setShowResetModal(false)}>取消</button>
                <button className="btn btn-red" onClick={handleReset}>确认重置</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
