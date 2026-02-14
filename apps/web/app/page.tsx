'use client';

import React from 'react';
import { LoginPage } from '@/pages/login';

export default function Page(): React.ReactElement {
  return (
    <main className="flex min-h-dvh justify-center">
      <div className="flex w-full flex-col">
        <LoginPage />
      </div>
      {/* <div className="w-full max-w-sm space-y-3">
        <h1 className="heading-20-bold text-neutral-90">역할 선택</h1>
        <p className="body-14-regular text-neutral-60">
          개발용 런처 페이지입니다. 역할별 홈으로 이동합니다.
        </p>

        <button
          type="button"
          onClick={() => router.push('/archiver/home')}
          className="w-full rounded-default bg-neutral-90 py-3 text-white body-16-semibold"
        >
          아카이버로 이동
        </button>

        <button
          type="button"
          onClick={() => router.push('/editor/home')}
          className="w-full rounded-default border border-neutral-30 py-3 text-neutral-90 body-16-semibold"
        >
          에디터로 이동
        </button>
      </div> */}
    </main>
  );
}
