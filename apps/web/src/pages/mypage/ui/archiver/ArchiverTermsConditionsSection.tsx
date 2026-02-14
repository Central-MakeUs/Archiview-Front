import React from 'react';

const TERMS_ITEMS = [
  { label: '서비스 이용약관', key: 'service-terms' },
  { label: '위치 기반 서비스 이용약관', key: 'location-terms' },
  { label: '개인정보 처리 방침', key: 'privacy-policy' },
  { label: '오픈 라이선스', key: 'open-license' },
] as const;

interface IArchiverTermsConditionsSectionProps {
  onItemClick?: (key: string) => void;
}

export const ArchiverTermsConditionsSection = ({
  onItemClick,
}: IArchiverTermsConditionsSectionProps): React.ReactElement => {
  return (
    <section>
      <h2 className="heading-20-bold px-5 pb-2 pt-6 text-neutral-90">약관 및 정책</h2>

      {TERMS_ITEMS.map((item, index) => (
        <React.Fragment key={item.key}>
          <button
            type="button"
            onClick={() => onItemClick?.(item.key)}
            className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
          >
            {item.label}
          </button>

          {index < TERMS_ITEMS.length - 1 && (
            <div className="mx-5 border-b border-neutral-30" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};
