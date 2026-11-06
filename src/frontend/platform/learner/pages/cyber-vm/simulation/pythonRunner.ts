import { TARGET_IP } from '../constants';

export const runPythonCode = (code: string): string => {
  const lines = code.split('\n').map((l) => l.trim()).filter(Boolean);
  const prints: string[] = [];
  const scope: Record<string, number | string | boolean> = {};

  for (const line of lines) {
    if (line.startsWith('#')) continue;

    if (line.startsWith('print(') && line.endsWith(')')) {
      const expr = line.substring(6, line.length - 1).trim();
      if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
        prints.push(expr.slice(1, -1));
      } else if (expr.startsWith('f"') || expr.startsWith("f'")) {
        let res = expr.slice(2, -1);
        res = res.replace(/\{([^}]+)\}/g, (_, k) => {
          const trimmed = k.trim();
          if (scope[trimmed] !== undefined) return String(scope[trimmed]);
          if (trimmed === 'target') return TARGET_IP;
          return trimmed;
        });
        prints.push(res);
      } else if (scope[expr] !== undefined) {
        prints.push(String(scope[expr]));
      } else {
        try {
          const sanitized = expr.replace(/[^0-9+\-*/().% ]/g, '');
          if (sanitized) {
            const val = new Function(`return (${sanitized});`)();
            prints.push(String(val));
          } else {
            prints.push(expr);
          }
        } catch {
          prints.push(expr);
        }
      }
      continue;
    }

    const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const valExpr = assignMatch[2].trim();
      if ((valExpr.startsWith('"') && valExpr.endsWith('"')) || (valExpr.startsWith("'") && valExpr.endsWith("'"))) {
        scope[varName] = valExpr.slice(1, -1);
      } else if (!isNaN(Number(valExpr))) {
        scope[varName] = Number(valExpr);
      } else {
        scope[varName] = valExpr;
      }
      continue;
    }

    if (line.includes('for ') && line.includes('in ')) {
      prints.push('PORT 21/tcp: CLOSED');
      prints.push('PORT 22/tcp: OPEN (OpenSSH 8.9p1)');
      prints.push('PORT 80/tcp: OPEN (Apache 2.4.52)');
      prints.push('PORT 44321/tcp: OPEN (ssh-bruteforce-source)');
      continue;
    }
  }

  return prints.length > 0 ? prints.join('\n') : '[Finished with exit code 0]';
};
