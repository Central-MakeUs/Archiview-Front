import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
