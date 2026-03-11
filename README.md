# 아카이뷰 (ArchiveView)

<div>
  <a href="">
    <img align="left" width="146" height="146" alt="아카이뷰" src="https://github.com/user-attachments/assets/23b1f259-6bc4-4cfc-87b2-5e5cd24650f7" />
  </a>
  <p>
    <b>아카이뷰</b>는 <i>'인스타그램 속 정보를 제대로 활용하고 있지 못하는 것 같다'</i> 라는 생각에서 시작된 서비스예요.<br><br>
    관심 있는 정보가 있을 때마다 인스타그램 저장 기능을 활용하여 저장하거나, 친구에게 DM으로 보내두는데 항상 그 정보가 필요할 때면, 어디에 파묻혀 있는지 도저히 찾을 수 없더라고요.<br><br>
    정보의 호수인 인스타그램을 잘 활용하지 못하고 있다는 점을 발견하고 아카이뷰를 기획하게 됐어요. 단순히 <i>'인스타그램 속 정보를 잘 활용하고 싶다'</i> 라는 생각 하나로요!
  </p>
</div>
<br clear="left"/>

## 🔗 다운로드

|                                                                                                                                                                                                                                  |                                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| [![App Store](https://img.shields.io/badge/App%20Store-Download-black?style=flat&logo=apple&logoColor=white)](https://apps.apple.com/kr/app/%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B7%B0/id6757837238) **앱스토어**                                 | 아이폰 유저라면 앱스토어에서 [아카이뷰](https://apps.apple.com/kr/app/%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B7%B0/id6757837238)를 다운로드해 보세요!           |
| [![Google Play](https://img.shields.io/badge/Google%20Play-Get%20it%20on%20Play-3DDC84?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.archiview.app&pcampaignid=web_share) **플레이스토어** | 안드로이드 유저라면 플레이스토어에서 [아카이뷰](https://play.google.com/store/apps/details?id=com.archiview.app&pcampaignid=web_share)를 다운로드해 보세요! |
| [![Web](https://img.shields.io/badge/Web-Open-000000?logo=globe&logoColor=white)](https://archiview.vercel.app) **웹**                                                                                                           | 앱 설치 없이 [웹](https://archiview.vercel.app)에서 바로 이용할 수도 있어요!                                                                           |

## 📌 목차

1. [다운로드](#-다운로드)
2. [프로젝트 아키텍처](#-프로젝트-아키텍처)
3. [팀원 소개](#-팀원-소개)
4. [Tech Stack](#-tech-stack)

## 🧱 프로젝트 아키텍처

본 프로젝트는 **Feature-Sliced Design(FSD)** 아키텍처를 적용하여 구조화되어 있습니다. FSD는 확장 가능하고 유지보수가 용이한 프론트엔드 아키텍처 방법론으로, 레이어별로 명확한 책임을 분리합니다.

### 폴더 구조
```
archiview-front/
├── apps/
│   ├── app/                    # React Native (Expo) 모바일 앱
│   │   ├── app/                # Expo Router 페이지
│   │   ├── bridge/             # WebView 브릿지
│   │   └── components/
│   │
│   └── web/                    # Next.js 웹 앱
│       ├── app/                # Next.js App Router (라우팅)
│       └── src/
│           ├── app/            # 앱 초기화, 레이아웃, 프로바이더
│           ├── pages/          # 페이지 단위 UI (FSD: Pages)
│           ├── widgets/        # 독립적 UI 블록 (FSD: Widgets)
│           ├── features/       # 사용자 시나리오 (FSD: Features)
│           ├── entities/       # 비즈니스 엔티티 (FSD: Entities)
│           └── shared/         # 공유 리소스 (FSD: Shared)
│
├── packages/
│   ├── webview-bridge-contract/  # 앱-웹 브릿지 계약
│   └── eslint/                   # 공유 ESLint 설정
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🙋 팀원 소개

|                                             |                                                         |                                     |        |        |
| ------------------------------------------- | ------------------------------------------------------- | ----------------------------------- | ------ | ------ |
| 김용희                                      | 박민준                                                  | 오원택                              | 박은지 | 김하정 |
| Frontend                                    | Frontend                                                | Server                              | Design | PM     |
| [Github](https://github.com/kimyounghee425) | [Github](https://github.com/MinjoonHK?tab=repositories) | [Github](https://github.com/51taek) |        |        |

## ⚙️ Tech Stack

| 역할                     | 종류                                                                                                                                                                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo / Workspace** | <img src="https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white" />                                                                                                                                                                                       |
| **Framework**            | <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" />                                                                                                                                                                               |
| **Library**              | <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" />                                                                                                                                                                                     |
| **Programming Language** | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />                                                                                                                                                                           |
| **Data Fetching / HTTP** | <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat&logo=tanstack&logoColor=white" /> <img src="https://img.shields.io/badge/ky-HTTP%20Client-000000?style=flat" />                                                                                         |
| **Styling**              | <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white" />                                                                                                                                                                      |
| **MCP**                  | <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" /> <img src="https://img.shields.io/badge/context7-000000?style=flat" /> <img src="https://img.shields.io/badge/Figma%20MCP-F24E1E?style=flat&logo=figma&logoColor=white" /> |
| **Linting / Formatting** | <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black" />                                                                               |
| **CI / Deployment (CD)** | <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" />                                                                                                                                                                                   |
