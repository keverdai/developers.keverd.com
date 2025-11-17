import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore - CSS modules are resolved by Docusaurus build tooling
import styles from './Chatbot.module.css';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

type Source = {
  index: number;
  text: string;
  score: string;
  metadata?: Record<string, unknown>;
};

type SourceGroup = {
  title: string;
  items: Source[];
};

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const CodeRenderer = ({ inline, className, children, ...props }: CodeProps) => {
  const text = String(children ?? '');

  if (inline) {
    return (
      <code className={styles.inlineCode} {...props}>
        {text}
      </code>
    );
  }

  return (
    <div className={styles.codeBlock}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={() => {
          if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => {
              /* ignore clipboard errors */
            });
          }
        }}
      >
        Copy
      </button>
      <pre>
        <code className={className} {...props}>
          {text}
        </code>
      </pre>
    </div>
  );
};

const markdownComponents: Components = {
  a: ({ node, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer" className={styles.link} />
  ),
  code: CodeRenderer,
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(
    () => !question.trim() || isLoading,
    [question, isLoading]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!question.trim()) return;

      setIsLoading(true);
      setError(null);

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        text: question.trim(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setQuestion('');

      const isLocalhost =
        typeof window !== 'undefined' &&
        window.location.hostname &&
        window.location.hostname.includes('localhost');
      const apiBase = isLocalhost
        ? 'http://localhost:4000/api/chat'
        : '/api/chat';
      try {
        const response = await fetch(apiBase, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage.text }),
        });

        if (!response.ok) {
          throw new Error('Unable to reach the AI assistant. Try again.');
        }

        const data = await response.json();
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: data.response || "I couldn't generate a response.",
        };

        setMessages((prev) => [...prev, assistantMessage]);
        const normalizedSources = Array.isArray(data.sources)
          ? data.sources.map((source: Source, index: number) => ({
              ...source,
              index: source.index ?? index + 1,
              score: source.score ?? 'N/A',
            }))
          : [];
        setSources(normalizedSources);
        setSourcesOpen(false);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [question]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
    setQuestion('');
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button className={styles.openerButton} onClick={handleToggle}>
        Ask AI Assistant
      </button>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div
            className={styles.modalPanel}
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <div className={styles.headerText}>
                <strong>Ask KeverdAI Assistant</strong>
                <div className={styles.headerSubtitle}>
                  Answers generated from the docs you&apos;re reading.
                </div>
              </div>
              <div className={styles.headerActions}>
                <span className={styles.modalBadge}>BETA</span>
                <button
                  onClick={handleClose}
                  className={styles.closeButton}
                  aria-label="Close AI assistant"
                >
                  ×
                </button>
              </div>
            </header>

            <div className={styles.modalBody}>
              {messages.length === 0 && !error && (
                <p className={styles.emptyState}>
                  Ask anything about the KeverdAI documentation. We&apos;ll pull
                  the most relevant sections and answer with citations.
                </p>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    styles.message,
                    message.role === 'user'
                      ? styles.messageUser
                      : styles.messageAssistant
                  )}
                >
                  <strong className={styles.messageLabel}>
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </strong>
                  {message.role === 'assistant' ? (
                    <div className={styles.messageContent}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className={styles.messageContentPlain}>
                      {message.text}
                    </span>
                  )}
                </div>
              ))}

              {error && <div className={styles.error}>{error}</div>}

              {sources.length > 0 && (
                <div className={styles.sources}>
                  <button
                    type="button"
                    className={styles.sourcesToggle}
                    onClick={() => setSourcesOpen((prev) => !prev)}
                    aria-expanded={sourcesOpen}
                  >
                    <span>Sources ({sources.length})</span>
                    <span className={styles.sourcesChevron}>
                      {sourcesOpen ? '−' : '+'}
                    </span>
                  </button>
                  {sourcesOpen && (
                    <ul className={styles.sourcesList}>
                      {sources.map((source) => (
                        <li key={source.index} className={styles.sourceItem}>
                          <strong>Doc {source.index}:</strong>{' '}
                          <span>{source.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask something about this documentation..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                className={styles.input}
              />
              <button
                type="submit"
                disabled={disabled}
                className={clsx(
                  styles.submitButton,
                  disabled && styles.submitButtonDisabled
                )}
              >
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
