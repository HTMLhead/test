import AppLink from "@/components/ui/AppLink";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import "./HeroCarousel.css";

interface CarouselItem {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  backgroundImage: string;
}

interface Props {
  items: CarouselItem[];
}

const ROTATION_MS = 5000;
const DRAG_START_THRESHOLD = 8;
const DRAG_CHANGE_THRESHOLD = 56;

export default function HeroCarousel({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const activeIndexRef = useRef(0);
  const rotationIdRef = useRef<number | undefined>(undefined);
  const rotationStartedAtRef = useRef(0);
  const remainingRotationMsRef = useRef(ROTATION_MS);
  const isUserPausedRef = useRef(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const slideTrackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const dragStartXRef = useRef(0);
  const dragPointerIdRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);
  const suppressClickRef = useRef(false);

  const resetProgress = () => {
    setProgressKey((key) => key + 1);
  };

  const updateSlideOffset = (index: number) => {
    const slideContainer = slideContainerRef.current;
    const slideTrack = slideTrackRef.current;
    const activeSlide = slideRefs.current[index];

    if (!slideContainer || !slideTrack || !activeSlide) {
      setSlideOffset(0);
      return;
    }

    const lastSlide = slideRefs.current[items.length - 1];
    const trackContentWidth = lastSlide
      ? lastSlide.offsetLeft + lastSlide.offsetWidth
      : slideTrack.scrollWidth;
    const maxOffset = Math.max(
      trackContentWidth - slideContainer.clientWidth,
      0,
    );
    const targetOffset =
      index === items.length - 1
        ? Math.max(
            activeSlide.offsetLeft +
              activeSlide.offsetWidth -
              slideContainer.clientWidth,
            0,
          )
        : activeSlide.offsetLeft;

    setSlideOffset(Math.min(targetOffset, maxOffset));
  };

  const showSlide = (nextIndex: number, restartRotation = true) => {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), items.length - 1);
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
    updateSlideOffset(clampedIndex);
    resetProgress();

    if (restartRotation && !isUserPausedRef.current) {
      startRotation();
    } else if (restartRotation) {
      remainingRotationMsRef.current = ROTATION_MS;
    }
  };

  const startRotation = (duration = ROTATION_MS) => {
    window.clearTimeout(rotationIdRef.current);
    remainingRotationMsRef.current = duration;
    rotationStartedAtRef.current = performance.now();
    setIsPaused(false);

    if (items.length <= 1) return;

    rotationIdRef.current = window.setTimeout(() => {
      const nextIndex =
        activeIndexRef.current === items.length - 1
          ? 0
          : activeIndexRef.current + 1;
      showSlide(nextIndex, false);
      startRotation();
    }, duration);
  };

  const pauseRotation = () => {
    const elapsed = performance.now() - rotationStartedAtRef.current;
    remainingRotationMsRef.current = Math.max(
      remainingRotationMsRef.current - elapsed,
      0,
    );
    window.clearTimeout(rotationIdRef.current);
    setIsPaused(true);
  };

  const stopRotationByUser = () => {
    isUserPausedRef.current = true;
    setIsUserPaused(true);
    pauseRotation();
  };

  const toggleRotation = () => {
    if (isUserPaused) {
      isUserPausedRef.current = false;
      setIsUserPaused(false);
      startRotation(remainingRotationMsRef.current);
      return;
    }

    stopRotationByUser();
  };

  const handleCardClick = (index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    showSlide(index);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !event.isPrimary ||
      (event.target instanceof Element && event.target.closest("a"))
    )
      return;

    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    hasDraggedRef.current = false;
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - dragStartXRef.current;

    if (Math.abs(deltaX) > DRAG_START_THRESHOLD) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      const activeIndex = activeIndexRef.current;
      const isAtStart = activeIndex === 0 && deltaX > 0;
      const isAtEnd = activeIndex === items.length - 1 && deltaX < 0;
      const resistance = isAtStart || isAtEnd ? 0.32 : 1;
      setDragOffset(deltaX * resistance);
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - dragStartXRef.current;
    const shouldChangeSlide = Math.abs(deltaX) >= DRAG_CHANGE_THRESHOLD;
    const direction = deltaX < 0 ? 1 : -1;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragPointerIdRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (hasDraggedRef.current) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 120);
      if (shouldChangeSlide) {
        showSlide(activeIndexRef.current + direction);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateSlideOffset(activeIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    updateSlideOffset(0);
    startRotation();

    return () => {
      window.clearTimeout(rotationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`hero-carousel-client${isPaused ? " is-paused" : ""}${isDragging ? " is-dragging" : ""}`}
      data-slot="carousel"
      aria-label="주요 과정 배너"
      aria-roledescription="carousel"
      style={
        { "--hero-rotation-duration": `${ROTATION_MS}ms` } as CSSProperties
      }
    >
      <div
        className="hero-slide-container"
        data-slot="carousel-viewport"
        ref={slideContainerRef}
        aria-live="polite"
        style={
          {
            "--slide-offset": `-${slideOffset}px`,
            "--drag-offset": `${dragOffset}px`,
          } as CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className="hero-slide-track"
          data-slot="carousel-content"
          ref={slideTrackRef}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={item.title}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                className={`hero-slide-item${isActive ? " is-active" : ""}`}
                data-slot="carousel-item"
                aria-hidden={!isActive}
                aria-label={`${index + 1} / ${items.length}: ${item.title}`}
                aria-roledescription="slide"
                style={
                  { "--hero-card-image": item.backgroundImage } as CSSProperties
                }
                onClick={() => handleCardClick(index)}
              >
                <div className="hero-card-content">
                  <h2 className="typo-display-sm">{item.title}</h2>
                  <p className="typo-bold-lg">{item.description}</p>
                  <AppLink
                    className="hero-card-link typo-bold-md"
                    href={item.href}
                    tabIndex={isActive ? undefined : -1}
                  >
                    <span>{item.linkLabel}</span>
                    <span className="hero-card-link-icon" aria-hidden="true" />
                  </AppLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <nav className="hero-nav" aria-label="배너 위치">
        <button
          className="hero-rotation-toggle"
          type="button"
          aria-label={
            isUserPaused ? "배너 자동 재생 시작" : "배너 자동 재생 일시정지"
          }
          aria-pressed={isUserPaused}
          onClick={toggleRotation}
        >
          <span
            className={`hero-rotation-toggle-icon${isUserPaused ? " is-play" : " is-pause"}`}
            aria-hidden="true"
          />
        </button>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.title}
              className={`hero-dot${isActive ? " is-active" : ""}`}
              type="button"
              aria-label={`${item.title} 배너 보기`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => showSlide(index)}
            >
              {isActive && (
                <span key={progressKey} className="hero-dot-progress" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
