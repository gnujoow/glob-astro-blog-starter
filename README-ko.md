# 🌐 Glob - 모던 블로그 스타터

*Read this in other languages: [English](README.md), [한국어](README-ko.md)*

Astro, React, shadcn/ui로 구축된 세심하게 제작된 블로그 스타터입니다. Glob은 성능, 아름다운 디자인, 개발자 경험을 결합했습니다.

## ✨ 특징

- **Material 3 Typography** major second 스케일 적용
- **shadcn/ui 컴포넌트** 다크/라이트 모드 지원
- **Astro Islands** 아키텍처와 선택적 하이드레이션
- **MDX 지원** React 컴포넌트 임베드 가능
- **자동 태그 시스템** 필터링 기능 포함
- **shadcn/ui MCP & Astro MCP** 통합

## 🚀 빠른 시작

```bash
git clone https://github.com/gnujoow/glob-astro-blog-template.git my-blog
cd my-blog && pnpm install && pnpm dev
```

또는 Astro CLI로:
```bash
pnpm create astro@latest my-blog -- --template gnujoow/glob-astro-blog-template
```

## 📝 포스트 작성

`src/content/blog/`에 `.mdx` 파일을 추가하세요:

```yaml
---
title: "포스트 제목"
description: "설명"
publishDate: "2024-01-15"
author: "작성자"
tags: ["astro", "web-dev"]
layout: "../../layouts/BlogLayout.astro"
---
```

MDX에서 React 컴포넌트 사용:
```mdx
import { Button } from "@/components/ui/button";

<Button>인터랙티브 콘텐츠</Button>
```

## 🎨 커스터마이징

### TweakCN으로 테마 설정
1. [tweakcn.com](https://tweakcn.com/) 방문
2. 색상, 폰트, 간격 커스터마이징
3. 생성된 CSS를 `src/styles/global.css`에 복사

### 타이포그래피 클래스
```css
.text-display-l, .text-display-m, .text-display-s    /* Display */
.text-headline-l, .text-headline-m, .text-headline-s  /* Headlines */
.text-title-l, .text-title-m, .text-title-s          /* Titles */
.text-body-l, .text-body-m, .text-body-s             /* Body */
.text-label-l, .text-label-m, .text-label-s          /* Labels */
```

### 컴포넌트 추가
```bash
pnpm dlx shadcn@latest add avatar badge dialog dropdown-menu
```

## 🚀 배포

원하는 정적 호스팅 플랫폼에 배포하세요. 플랫폼별 자세한 방법은 [Astro 배포 가이드](https://docs.astro.build/ko/guides/deploy/)를 참고하세요.

## 🛠️ 기술 스택

- **Astro** - 아일랜드 아키텍처 기반 정적 사이트 생성기
- **React** - 인터랙티브 컴포넌트
- **shadcn/ui** - 컴포넌트 라이브러리
- **Tailwind CSS v4** - CSS 변수 기반 스타일링
- **MDX** - React가 포함된 마크다운
- **TypeScript** - 타입 안전성

---

**❤️와 함께 제작 by [gnujoow](https://github.com/gnujoow)**