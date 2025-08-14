import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface FormattedMessageContentProps {
  content: string;
}

const codeBlockStyle: React.CSSProperties = {
  backgroundColor: '#2d2d2d',
  color: '#f8f8f2',
  padding: '1rem',
  borderRadius: '8px',
  overflowX: 'auto',
  fontFamily: 'Fira Code, monospace',
  fontSize: '0.9em',
  margin: '1em 0',
  whiteSpace: 'pre-wrap',
};

const inlineCodeStyle: React.CSSProperties = {
  backgroundColor: '#e0e0e0',
  color: '#333',
  padding: '0.2em 0.4em',
  borderRadius: '4px',
  fontFamily: 'Fira Code, monospace',
  fontSize: '0.9em',
};

const headingStyle: React.CSSProperties = {
  margin: '1.5em 0 0.5em',
  fontWeight: 700,
  color: '#1a1a1a',
  fontSize: '1.5em',
};

const blockMathStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  padding: '1em',
  borderRadius: '8px',
  margin: '1em 0',
  textAlign: 'center',
};

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  margin: '1em 0',
};

const thTdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '0.5em 1em',
  textAlign: 'left',
};

const FormattedMessageContent: React.FC<FormattedMessageContentProps> = ({ content }) => {
  if (!content || typeof content !== 'string') return null;

  // Split content into code blocks, LaTeX, inline code, headings, and tables
  const regex = /(```[\s\S]*?```|\$\$[\s\S]*?\$\$|`[\s\S]*?`|\$[\s\S]*?\$|^## .*|(\|.*\|.*))/gm;
  const parts = content.split(regex).filter(Boolean);

  return (
    <div style={{ lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Heading
        if (part.startsWith('## ')) {
          return (
            <div key={index} style={headingStyle}>
              {part.slice(3).trim()}
            </div>
          );
        }

        // Code block
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).trim();
          return (
            <pre key={index} style={codeBlockStyle}>
              <code>{code}</code>
            </pre>
          );
        }

        // Block-level math
        if (part.startsWith('$$') && part.endsWith('$$')) {
          return (
            <div key={index} style={blockMathStyle}>
              <BlockMath math={part.slice(2, -2)} />
            </div>
          );
        }

        // Inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} style={inlineCodeStyle}>{part.slice(1, -1)}</code>;
        }

        // Inline math
        if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        }

        // Table row
        if (part.includes('|')) {
          const rows = part.split('\n').filter(r => r.trim() !== '');
          return (
            <table key={index} style={tableStyle}>
              <tbody>
                {rows.map((row, i) => {
                  const cells = row.split('|').map(c => c.trim()).filter(Boolean);
                  return (
                    <tr key={i}>
                      {cells.map((cell, j) => i === 0 ? (
                        <th key={j} style={thTdStyle}>{cell}</th>
                      ) : (
                        <td key={j} style={thTdStyle}>{cell}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }

        // Plain text
        return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
      })}
    </div>
  );
};

export default FormattedMessageContent;
