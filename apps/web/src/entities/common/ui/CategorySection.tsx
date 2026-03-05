'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';

interface ICategoryItem {
  label: string;
  path: string;
  iconSrc: string;
}

const CATEGORY_ITEMS: ICategoryItem[] = [
  {
    label: '내주변',
    path: '/archiver/category?categoryId=0',
    iconSrc: '/images/archiverHome/NearMyPlaceImage.svg',
  },
  {
    label: '한식',
    path: '/archiver/category?categoryId=1',
    iconSrc: '/images/archiverHome/KoreanImage.svg',
  },
  {
    label: '양식',
    path: '/archiver/category?categoryId=2',
    iconSrc: '/images/archiverHome/AmericanImage.svg',
  },
  {
    label: '일식',
    path: '/archiver/category?categoryId=3',
    iconSrc: '/images/archiverHome/JapaneseImage.svg',
  },
  {
    label: '카페',
    path: '/archiver/category?categoryId=4',
    iconSrc: '/images/archiverHome/CafeImage.svg',
  },
  {
    label: '이자카야',
    path: '/archiver/category?categoryId=6',
    iconSrc: '/images/archiverHome/IzakayaImage.svg',
  },
  {
    label: '데이트',
    path: '/archiver/category?categoryId=5',
    iconSrc: '/images/archiverHome/DateImage.svg',
  },
  {
    label: '기타',
    path: '/archiver/category?categoryId=7',
    iconSrc: '/images/archiverHome/OthersImage.svg',
  },
];

const CATEGORY_ROWS = [CATEGORY_ITEMS.slice(0, 4), CATEGORY_ITEMS.slice(4, 8)];

const CategoryItem = memo(({ iconSrc, label, path }: ICategoryItem): React.ReactElement => {
  return (
    <Link href={path} className="flex flex-col gap-1.5 items-center">
      <div className="h-13 w-13 rounded-xl flex items-center justify-center bg-primary-30">
        <img src={iconSrc} alt={label} width={56} height={56} decoding="async" />
      </div>
      <div className="body-12-medium">{label}</div>
    </Link>
  );
});

CategoryItem.displayName = 'CategoryItem';

const CategorySectionComponent = (): React.ReactElement => {
  const [isIconsReady, setIsIconsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const preloadPromises = CATEGORY_ITEMS.map(
      (category) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();

          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = category.iconSrc;

          if (image.complete) {
            resolve();
          }
        }),
    );

    void Promise.all(preloadPromises).then(() => {
      if (!cancelled) {
        setIsIconsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-8 px-5">
      <div className="flex flex-col gap-3">
        {!isIconsReady
          ? CATEGORY_ROWS.map((row, rowIndex) => (
              <div key={`row-skeleton-${rowIndex}`} className="flex items-center justify-between">
                {row.map((category) => (
                  <div
                    key={`${category.path}-skeleton`}
                    className="flex flex-col gap-1.5 items-center"
                  >
                    <div className="h-13 w-13 rounded-xl bg-primary-20 animate-pulse" />
                    <div className="h-3 w-8 rounded bg-neutral-20 animate-pulse" />
                  </div>
                ))}
              </div>
            ))
          : CATEGORY_ROWS.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex items-center justify-between">
                {row.map((category) => (
                  <CategoryItem key={category.path} {...category} />
                ))}
              </div>
            ))}
      </div>
    </section>
  );
};

export const CategorySection = memo(CategorySectionComponent);
CategorySection.displayName = 'CategorySection';
