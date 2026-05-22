# 创始人单独介绍页面 - 产品需求文档

## Overview
- **Summary**: 为创始人模块新增创始人单独介绍页面，并在团队卡片上添加点击跳转功能
- **Purpose**: 让用户能够通过点击创始人卡片进入详细的个人介绍页面，展示创始人的完整履历信息
- **Target Users**: 访问网站的客户、合作伙伴、求职者等

## Goals
- 为两位创始人（徐中信、陈紫怡）创建单独的介绍页面
- 在团队成员卡片上添加点击跳转功能
- 展示创始人的详细履历信息（基于简历内容）

## Non-Goals (Out of Scope)
- 不修改其他团队成员的展示方式（非创始人保持现有卡片展示）
- 不添加其他新功能或页面

## Background & Context
- 当前团队页面位于 `/company/leadership/`，展示所有团队成员卡片
- 团队成员数据存储在 `lib/data/team.ts` 中
- PersonCard 组件当前仅展示信息，无跳转功能

## Functional Requirements
- **FR-1**: 创建创始人单独介绍页面，路径格式为 `/company/leadership/{slug}/`
- **FR-2**: 修改 PersonCard 组件，为创始人添加可点击跳转效果
- **FR-3**: 创始人介绍页面展示详细履历信息（教育背景、项目经历、工作经历、技能等）

## Non-Functional Requirements
- **NFR-1**: 页面设计风格与现有网站保持一致
- **NFR-2**: 响应式设计，支持移动端和桌面端

## Constraints
- **Technical**: Next.js 框架，使用现有组件和样式系统
- **Dependencies**: 基于现有的 team.ts 数据结构

## Assumptions
- 创始人定义为 title 为"创始人"的团队成员
- 简历内容已准备好，可直接用于页面展示

## Acceptance Criteria

### AC-1: 创始人卡片可点击
- **Given**: 用户在团队页面或关于页面看到创始人卡片
- **When**: 用户点击卡片
- **Then**: 跳转到该创始人的单独介绍页面
- **Verification**: `programmatic`

### AC-2: 创始人单独介绍页面存在
- **Given**: 用户访问 `/company/leadership/xu-zhongxin/` 或 `/company/leadership/chen-ziyi/`
- **When**: 页面加载完成
- **Then**: 显示该创始人的详细信息页面
- **Verification**: `programmatic`

### AC-3: 页面展示详细履历
- **Given**: 用户进入创始人介绍页面
- **When**: 页面渲染完成
- **Then**: 显示教育背景、项目经历、工作经历、技能等内容
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要为其他团队成员也创建单独页面？