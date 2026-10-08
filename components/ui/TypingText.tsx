'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
  words: string[];
  className?: string;
}

/**
 * Cycles through words with a type-then-delete effect. Pure timers, no deps,
 * so it stays light. Falls back to the first word if the list is empty.
 */
export function TypingText({ words, className }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    // Pause at the full word, then start deleting.
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(hold);
    }
    // Once emptied, advance to the next word.
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const step = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? 45 : 85,
    );
    return () => clearTimeout(step);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent align-middle" style={{ height: '1em' }} aria-hidden="true" />
    </span>
  );
}
