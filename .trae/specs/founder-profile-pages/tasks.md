# 创始人单独介绍页面 - 实施计划

## [x] Task 1: 更新 TeamMember 类型定义，添加创始人履历字段
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `lib/data/types.ts` 中扩展 TeamMember 类型，添加教育背景、项目经历、工作经历、技能等字段
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-1.1: 类型定义能够正确编译
  - `human-judgement` TR-1.2: 字段定义合理，涵盖简历中的主要内容

## [x] Task 2: 更新 team.ts 数据，添加创始人详细履历
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 更新 `lib/data/team.ts` 中两位创始人的数据，添加详细履历信息
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: 数据文件能够正确编译
  - `human-judgement` TR-2.2: 履历信息完整，与简历内容一致

## [x] Task 3: 修改 PersonCard 组件，添加点击跳转功能
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 修改 `components/sections/person-card.tsx`，为创始人卡片添加点击跳转链接
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-3.1: 组件能够正确编译
  - `human-judgement` TR-3.2: 创始人卡片有可点击效果，非创始人卡片保持原样

## [x] Task 4: 创建创始人单独介绍页面路由
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 创建 `app/company/[slug]/page.tsx` 页面，展示创始人详细信息
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `programmatic` TR-4.1: 页面能够正确构建和访问
  - `human-judgement` TR-4.2: 页面布局美观，信息展示清晰

## [x] Task 5: 更新 leadership 路由配置
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 确保 `/company/leadership/{slug}/` 路由正确指向创始人页面
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-5.1: 路由能够正确工作，访问 `/company/leadership/xu-zhongxin/` 显示对应页面