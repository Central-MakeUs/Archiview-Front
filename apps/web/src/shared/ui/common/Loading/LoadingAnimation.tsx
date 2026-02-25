'use client';

interface ILoadingAnimationProps {
  size?: number;
  margin?: number;
  speed?: number;
}

/** 3개 점이 순차적으로 위로 튀어오르는 로딩 애니메이션 */
export const LoadingAnimation = ({
  size = 8,
  margin = 6,
  speed = 1.3,
}: ILoadingAnimationProps) => {
  const bounceDistance = 4; // 위아래 간격
  const cycleDuration = 0.9 / speed;
  const dotDuration = cycleDuration / 3;
  const staggerDelay = dotDuration;

  return (
    <>
      <style>{`
        @keyframes loading-dot-bounce {
          0% { transform: translateY(0); background-color: var(--color-primary-40); }
          8.33% { transform: translateY(-${bounceDistance}px); background-color: var(--color-primary-40); }
          16.67% { transform: translateY(0); background-color: var(--color-primary-40); }
          20% { background-color: var(--color-primary-20); }
          100% { transform: translateY(0); background-color: var(--color-primary-20); }
        }
      `}</style>
      <div
        className="loading-animation flex items-center justify-center"
        style={{ gap: margin }}
        role="status"
        aria-label="로딩 중"
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="loading-animation__dot rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: 'var(--color-primary-20)',
              animation: `loading-dot-bounce ${cycleDuration}s ease-in-out infinite`,
              animationDelay: `${index * staggerDelay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};
