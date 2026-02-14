import Image from 'next/image';

const CategoryItem = ({
  icon,
  label,
  path,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
}): React.ReactElement => {
  return (
    <div className="flex flex-col gap-1.5 items-center">
      <div className="h-13 w-13 rounded-xl flex items-center justify-center bg-primary-30">
        {icon}
      </div>
      <div className="body-12-medium">{label}</div>
    </div>
  );
};

export const CategorySection = (): React.ReactElement => {
  return (
    <section className="py-8 px-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <CategoryItem
            icon={
              <Image
                src="/images/archiverHome/NearMyPlaceImage.svg"
                alt="내주변"
                width={56}
                height={56}
              />
            }
            label="내주변"
            path="/"
          />
          <CategoryItem
            icon={
              <Image src="/images/archiverHome/KoreanImage.svg" alt="한식" width={56} height={56} />
            }
            label="한식"
            path="/"
          />
          <CategoryItem
            icon={
              <Image
                src="/images/archiverHome/AmericanImage.svg"
                alt="양식"
                width={56}
                height={56}
              />
            }
            label="양식"
            path="/"
          />
          <CategoryItem
            icon={
              <Image
                src="/images/archiverHome/JapaneseImage.svg"
                alt="일식"
                width={56}
                height={56}
              />
            }
            label="일식"
            path="/"
          />
        </div>
        <div className="flex items-center justify-between">
          <CategoryItem
            icon={
              <Image src="/images/archiverHome/CafeImage.svg" alt="햄버거" width={56} height={56} />
            }
            label="카페"
            path="/"
          />
          <CategoryItem
            icon={
              <Image
                src="/images/archiverHome/IzakayaImage.svg"
                alt="주점"
                width={56}
                height={56}
              />
            }
            label="이자카야"
            path="/"
          />
          <CategoryItem
            icon={
              <Image src="/images/archiverHome/DateImage.svg" alt="데이트" width={56} height={56} />
            }
            label="데이트"
            path="/"
          />
          <CategoryItem
            icon={
              <Image src="/images/archiverHome/OthersImage.svg" alt="기타" width={56} height={56} />
            }
            label="기타"
            path="/"
          />
        </div>
      </div>
    </section>
  );
};
