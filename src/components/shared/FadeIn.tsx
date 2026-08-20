'use client'

import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

const directionStyles: Record<NonNullable<FadeInProps['direction']>, string> = {
  up:    'translate-y-6',
  down:  '-translate-y-6',
  left:  'translate-x-6',
  right: '-translate-x-6',
  none:  '',
}

/**
 * Lightweight fade-in using IntersectionObserver + CSS transitions.
 * Replaces framer-motion to eliminate the ~75 KB bundle cost.
 * Respects prefers-reduced-motion via CSS media query.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip animation entirely when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '-50px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const translateClass = directionStyles[direction]
  const delayStyle = delay ? { transitionDelay: `${delay}s` } : undefined

  return (
    <div
      ref={ref}
      className={[
        'transition-[opacity,transform] duration-600 ease-out',
        'opacity-0',
        translateClass,
        'motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0',
        'data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0 data-[visible=true]:translate-y-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={delayStyle}
    >
      {children}
    </div>
  )
}