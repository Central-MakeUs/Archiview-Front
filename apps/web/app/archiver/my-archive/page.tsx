import { SsgoiTransition } from '@ssgoi/react';

import { MyArchiverPage, metadata } from '@/pages/archiver/my-archive';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/archiver/my-archive">
      <MyArchiverPage />
    </SsgoiTransition>
  );
}
