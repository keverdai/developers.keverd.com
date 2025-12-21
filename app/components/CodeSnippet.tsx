"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  autoType?: boolean;
  className?: string;
}

// Escape HTML entities - must escape & first to avoid double-escaping
function escapeHtml(text: string): string {
  // First escape & to prevent double-escaping of existing entities
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Simple syntax highlighting function
function highlightCode(code: string, language: string): string {
  // For XML/HTML, escape first then highlight
  if (language === "xml" || language === "html") {
    const escaped = escapeHtml(code);
    return escaped
      .replace(/(&lt;)([\w-]+)/g, '<span class="text-keverd-blue">$1$2</span>')
      .replace(/(\/?)(&gt;)/g, '<span class="text-keverd-blue">$1$2</span>')
      .replace(/([\w-]+)(=)(&quot;[^&]*&quot;|&#039;[^&]*&#039;)/g, '<span class="text-keverd-clay">$1</span>$2<span class="text-keverd-gold">$3</span>')
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-500">$1</span>');
  }
  
  // For other languages, highlight first on original code, then escape
  let highlighted = code;
  
  if (language === "javascript" || language === "typescript") {
    // Match strings with original quotes before escaping
    highlighted = code
      .replace(/\b(import|export|from|const|let|var|function|async|await|return|if|else|for|while|class|extends|implements|interface|type|enum|namespace|declare|module|default|new|this|super|try|catch|finally|throw|typeof|instanceof|in|of|as|is|void|null|undefined|true|false)\b/g, '<KEYWORD>$1</KEYWORD>')
      .replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<STRING>$&</STRING>')
      .replace(/(\/\/.*$)/gm, '<COMMENT>$1</COMMENT>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<COMMENT>$1</COMMENT>')
      .replace(/\b(\d+\.?\d*)\b/g, '<NUMBER>$1</NUMBER>');
  } else if (language === "kotlin") {
    highlighted = code
      .replace(/\b(val|var|fun|class|object|interface|enum|data|sealed|when|if|else|for|while|return|try|catch|finally|throw|import|package|as|is|in|out|reified|inline|noinline|crossinline|const|lateinit|companion|init|constructor|super|this|null|true|false|Unit|String|Int|Long|Double|Float|Boolean|Byte|Short|Char|Array|List|Map|Set|Pair|Triple|Any|Nothing)\b/g, '<KEYWORD>$1</KEYWORD>')
      .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<STRING>$&</STRING>')
      .replace(/(\/\/.*$)/gm, '<COMMENT>$1</COMMENT>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<COMMENT>$1</COMMENT>')
      .replace(/\b(\d+\.?\d*)\b/g, '<NUMBER>$1</NUMBER>');
  } else if (language === "bash" || language === "shell") {
    highlighted = code
      .replace(/\b(curl|wget|npm|yarn|pip|git|cd|ls|mkdir|rm|cp|mv|echo|export|source|\.\/|\.\.\/)\b/g, '<KEYWORD>$1</KEYWORD>')
      .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<STRING>$&</STRING>')
      .replace(/(#.*$)/gm, '<COMMENT>$1</COMMENT>');
  } else if (language === "json") {
    highlighted = code
      .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<STRING>$&</STRING>')
      .replace(/\b(true|false|null)\b/g, '<KEYWORD>$1</KEYWORD>')
      .replace(/\b(\d+\.?\d*)\b/g, '<NUMBER>$1</NUMBER>');
  }
  
  // Now escape HTML entities
  const escaped = escapeHtml(highlighted);
  
  // Replace placeholders with styled spans
  return escaped
    .replace(/&lt;KEYWORD&gt;(.*?)&lt;\/KEYWORD&gt;/g, '<span class="text-keverd-blue">$1</span>')
    .replace(/&lt;STRING&gt;(.*?)&lt;\/STRING&gt;/g, '<span class="text-keverd-gold">$1</span>')
    .replace(/&lt;COMMENT&gt;(.*?)&lt;\/COMMENT&gt;/g, '<span class="text-gray-500">$1</span>')
    .replace(/&lt;NUMBER&gt;(.*?)&lt;\/NUMBER&gt;/g, '<span class="text-keverd-clay">$1</span>');
}

export function CodeSnippet({
  code,
  language = "javascript",
  showCopy = true,
  autoType = false,
  className,
}: CodeSnippetProps) {
  const [displayedCode, setDisplayedCode] = useState(autoType ? "" : code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!autoType) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Typing speed

    return () => clearInterval(typingInterval);
  }, [code, autoType]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = highlightCode(displayedCode, language);

  return (
    <div className={cn("relative group w-full", className)}>
      <div className="bg-white border border-gray-200 rounded-xl p-4 overflow-x-auto shadow-sm w-full max-w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            {language}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="text-green-600" size={16} />
              ) : (
                <Copy className="text-gray-400" size={16} />
              )}
            </button>
          )}
        </div>
        <pre className="text-sm text-gray-800 font-mono leading-relaxed overflow-x-auto w-full">
          <code 
            className="block w-full"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
          {autoType && displayedCode.length < code.length && (
            <span className="animate-pulse text-keverd-blue">|</span>
          )}
        </pre>
      </div>
    </div>
  );
}
