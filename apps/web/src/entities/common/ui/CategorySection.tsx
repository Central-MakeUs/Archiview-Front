'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/lib/i18n/navigation';

interface ICategoryItem {
  label: string;
  path: string;
  iconSrc: string;
}

const CATEGORY_DEFS = [
  {
    labelKey: 'nearby' as const,
    categoryId: 0,
    iconSrc: '/images/archiverHome/NearMyPlaceImage.svg',
  },
  {
    labelKey: 'korean' as const,
    categoryId: 1,
    iconSrc: '/images/archiverHome/KoreanImage.svg',
  },
  {
    labelKey: 'western' as const,
    categoryId: 2,
    iconSrc: '/images/archiverHome/AmericanImage.svg',
  },
  {
    labelKey: 'japanese' as const,
    categoryId: 3,
    iconSrc: '/images/archiverHome/JapaneseImage.svg',
  },
  {
    labelKey: 'cafe' as const,
    categoryId: 4,
    iconSrc: '/images/archiverHome/CafeImage.svg',
  },
  {
    labelKey: 'izakaya' as const,
    categoryId: 6,
    iconSrc: '/images/archiverHome/IzakayaImage.svg',
  },
  {
    labelKey: 'date' as const,
    categoryId: 5,
    iconSrc: '/images/archiverHome/DateImage.svg',
  },
  {
    labelKey: 'other' as const,
    categoryId: 7,
    iconSrc: '/images/archiverHome/OthersImage.svg',
  },
] as const;

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
  const t = useTranslations('archiverHome.categories');
  const categoryItems = useMemo<ICategoryItem[]>(
    () =>
      CATEGORY_DEFS.map((def) => ({
        label: t(def.labelKey),
        path: `/archiver/category?categoryId=${def.categoryId}`,
        iconSrc: def.iconSrc,
      })),
    [t],
  );
  const categoryRows = useMemo(
    () => [categoryItems.slice(0, 4), categoryItems.slice(4, 8)],
    [categoryItems],
  );

  const [isIconsReady, setIsIconsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const preloadPromises = categoryItems.map(
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

    Promise.all(preloadPromises)
      .then(() => {
        if (!cancelled) {
          setIsIconsReady(true);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [categoryItems]);

  return (
    <section className="py-8 px-5">
      <div className="flex flex-col gap-3">
        {!isIconsReady
          ? categoryRows.map((row, rowIndex) => (
              <div key={`row-skeleton-${rowIndex}`} className="flex items-center justify-between">
                {row.map((category) => (
                  <div
                    key={`${category.path}-skeleton`}
                    className="flex min-w-0 flex-1 basis-0 justify-center"
                  >
                    <div className="flex flex-col gap-1.5 items-center">
                      <div className="h-13 w-13 rounded-xl bg-primary-20 animate-pulse" />
                      <div className="h-3 w-8 rounded bg-neutral-20 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ))
          : categoryRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex items-center justify-between">
                {row.map((category) => (
                  <div
                    key={category.path}
                    className="flex min-w-0 flex-1 basis-0 justify-center"
                  >
                    <CategoryItem {...category} />
                  </div>
                ))}
              </div>
            ))}
      </div>
    </section>
  );
};

export const CategorySection = memo(CategorySectionComponent);
CategorySection.displayName = 'CategorySection';
