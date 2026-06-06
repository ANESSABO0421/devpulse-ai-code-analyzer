"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { AISuggestion } from "@/types/review";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type EditorHandle = {
  deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => string[];
};

type MonacoHandle = {
  Range: new (startLine: number, startColumn: number, endLine: number, endColumn: number) => unknown;
  editor: {
    OverviewRulerLane: { Right: number };
  };
};

const typeColor: Record<string, string> = {
  error: "rgba(210, 70, 56, 0.25)",
  warning: "rgba(208, 160, 22, 0.25)",
  suggestion: "rgba(33, 118, 199, 0.25)",
  praise: "rgba(31, 157, 114, 0.25)",
};

export function CodeEditor({
  value,
  language,
  readOnly = false,
  suggestions = [],
  onChange,
}: {
  value: string;
  language: string;
  readOnly?: boolean;
  suggestions?: AISuggestion[];
  onChange?: (value: string) => void;
}) {
  const editorRef = useRef<EditorHandle | null>(null);
  const monacoRef = useRef<MonacoHandle | null>(null);
  const [editorTheme, setEditorTheme] = useState<"vs-light" | "vs-dark">("vs-dark");

  const applyDecorations = useCallback(() => {
    if (!editorRef.current || !monacoRef.current) {
      return;
    }

    const editor = editorRef.current;
    const monaco = monacoRef.current;

    editor.deltaDecorations(
      [],
      suggestions.map((item) => ({
        range: new monaco.Range(item.line, 1, item.line, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: "devpulse-glyph",
          className: "",
          lineDecorationsWidth: 6,
          linesDecorationsClassName: "",
          marginClassName: "",
          overviewRuler: {
            color: typeColor[item.type],
            position: monaco.editor.OverviewRulerLane.Right,
          },
          inlineClassName: "",
        },
      })),
    );
  }, [suggestions]);

  useEffect(() => {
    applyDecorations();
  }, [applyDecorations]);

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = document.documentElement.dataset.theme === "light" ? "vs-light" : "vs-dark";
      setEditorTheme(nextTheme);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--line)]">
      <MonacoEditor
        height="480px"
        defaultLanguage={language}
        language={language}
        value={value}
        theme={editorTheme}
        onChange={(nextValue) => onChange?.(nextValue || "")}
        onMount={(editor, monaco) => {
          editorRef.current = editor as EditorHandle;
          monacoRef.current = monaco as MonacoHandle;
          applyDecorations();
        }}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          glyphMargin: true,
          lineNumbersMinChars: 3,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
