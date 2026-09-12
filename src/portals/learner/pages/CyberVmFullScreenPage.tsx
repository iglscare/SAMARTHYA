import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Power,
  Maximize2,
  Minimize2,
  RotateCcw,
  Terminal as TerminalIcon,
  Folder,
  Globe,
  X,
  Search,
  Copy,
  Check,
  FileText,
  ArrowLeft,
  ShieldAlert,
  Settings,
  Activity,
  Layers,
  Save,
  Code,
  Volume2,
  Bell,
  Lock,
  HelpCircle,
  Shield,
} from 'lucide-react';

const TARGET_IP = '192.168.1.105';

const DEFAULT_LOG_CONTENT = `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`;

// Virtual File System representation
interface VFile {
  content: string;
  size: number;
  perms: string;
  owner: string;
  group: string;
  date: string;
}

export const CyberVmFullScreenPage: React.FC = () => {
  const navigate = useNavigate();

  // Active GUI Windows in Kali desktop
  const [activeWindow, setActiveWindow] = useState<'terminal' | 'files' | 'editor' | 'wireshark' | 'zenmap' | 'burp' | 'browser' | 'none'>('terminal');
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());
  const [maximizedWindow, setMaximizedWindow] = useState<string | null>(null);

  // UI Modals & Popups
  const [showWhiskerMenu, setShowWhiskerMenu] = useState<boolean>(false);
  const [showLabGuide, setShowLabGuide] = useState<boolean>(false);
  const [activeWorkspace, setActiveWorkspace] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(1455);
  const [copiedIp, setCopiedIp] = useState<boolean>(false);

  // Shell State
  const [currentDir, setCurrentDir] = useState<string>('/home/kali');
  const [currentUser, setCurrentUser] = useState<'kali' | 'root'>('kali');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [envVars, setEnvVars] = useState<Record<string, string>>({
    USER: 'kali',
    HOME: '/home/kali',
    SHELL: '/bin/zsh',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    TERM: 'xterm-256color',
  });

  // Sub-Shell Modes (Python REPL, Metasploit msfconsole, Nano Editor)
  const [subShellMode, setSubShellMode] = useState<'bash' | 'python' | 'msfconsole' | 'nano'>('bash');
  const [msfModule, setMsfModule] = useState<string>('');
  const [msfOptions, setMsfOptions] = useState<Record<string, string>>({
    RHOSTS: '192.168.1.105',
    RPORT: '22',
    USER_FILE: '/usr/share/wordlists/rockyou.txt',
    STOP_ON_SUCCESS: 'true',
  });
  const [nanoEditingFile, setNanoEditingFile] = useState<string>('');
  const [nanoBuffer, setNanoBuffer] = useState<string>('');

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Virtual Filesystem State
  const [vfs, setVfs] = useState<Record<string, VFile>>({
    '/home/kali/network.log': {
      content: DEFAULT_LOG_CONTENT,
      size: 1842,
      perms: '-rw-r--r--',
      owner: 'kali',
      group: 'kali',
      date: 'Aug 27 14:24',
    },
    '/home/kali/notes.txt': {
      content: 'MoSPI Security Mission:\n1. Identify brute-force source IP from network.log.\n2. Submit IP (192.168.1.105) into the assessment portal.\n3. Verify services using nmap or wireshark.',
      size: 198,
      perms: '-rw-r--r--',
      owner: 'kali',
      group: 'kali',
      date: 'Aug 27 14:10',
    },
    '/home/kali/scan.py': {
      content: `# Kali Python Network Scanner\nimport socket\n\ntarget = "192.168.1.105"\nports = [21, 22, 80, 443, 44321]\nprint(f"[*] Scanning {target}...")\nfor p in ports:\n    print(f"PORT {p}/tcp: OPEN")\nprint("[+] Scan completed.")\n`,
      size: 215,
      perms: '-rwxr-xr-x',
      owner: 'kali',
      group: 'kali',
      date: 'Aug 27 14:15',
    },
    '/home/kali/analyze_traffic.sh': {
      content: `#!/bin/bash\necho "[*] Analyzing SSH authentication failures in /home/student/logs/network.log:"\ngrep "Failed password" /home/student/logs/network.log | awk '{print $(NF-3)}' | sort | uniq -c\n`,
      size: 192,
      perms: '-rwxr-xr-x',
      owner: 'kali',
      group: 'kali',
      date: 'Aug 27 14:18',
    },
    '/home/student/logs/network.log': {
      content: DEFAULT_LOG_CONTENT,
      size: 1842,
      perms: '-rw-r--r--',
      owner: 'student',
      group: 'student',
      date: 'Aug 27 14:24',
    },
    '/var/log/auth.log': {
      content: DEFAULT_LOG_CONTENT,
      size: 1842,
      perms: '-rw-r-----',
      owner: 'root',
      group: 'adm',
      date: 'Aug 27 14:24',
    },
    '/etc/hosts': {
      content: '127.0.0.1\tlocalhost\n127.0.1.1\tkali-sandbox\n192.168.1.50\tkali-sandbox\n192.168.1.105\tsuspicious-host',
      size: 98,
      perms: '-rw-r--r--',
      owner: 'root',
      group: 'root',
      date: 'Aug 27 12:00',
    },
    '/etc/passwd': {
      content: 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User,,,:/home/kali:/bin/zsh\nstudent:x:1001:1001:MoSPI Cadet:/home/student:/bin/bash\nsshd:x:110:65534::/run/sshd:/usr/sbin/nologin',
      size: 240,
      perms: '-rw-r--r--',
      owner: 'root',
      group: 'root',
      date: 'Aug 27 12:00',
    },
    '/etc/os-release': {
      content: 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nVERSION_ID="2024.1"\nVERSION="2024.1"\nID=kali\nID_LIKE=debian\nHOME_URL="https://www.kali.org/"',
      size: 154,
      perms: '-rw-r--r--',
      owner: 'root',
      group: 'root',
      date: 'Aug 27 12:00',
    },
    '/usr/share/wordlists/rockyou.txt': {
      content: '123456\npassword\n12345678\nqwerty\nadmin\nwelcome\nlogin\nshadow\nroot123\nmospi2026',
      size: 104,
      perms: '-rw-r--r--',
      owner: 'root',
      group: 'root',
      date: 'Aug 27 10:00',
    },
    '/usr/share/wordlists/dirb/common.txt': {
      content: 'admin\napi\nbackup.tar.gz\nconfig\ncss\ndatabase\nimages\nindex.html\nlogin.php\nrobots.txt\nuploads',
      size: 110,
      perms: '-rw-r--r--',
      owner: 'root',
      group: 'root',
      date: 'Aug 27 10:00',
    },
  });

  // Mousepad / Text Editor State
  const [editorFile, setEditorFile] = useState<string>('/home/student/logs/network.log');
  const [editorContent, setEditorContent] = useState<string>(DEFAULT_LOG_CONTENT);
  const [editorSearch, setEditorSearch] = useState<string>('');
  const [editorSaveNotice, setEditorSaveNotice] = useState<string>('');

  // Files Explorer State
  const [filesPath, setFilesPath] = useState<string>('/home/kali');

  // Wireshark State
  const [wiresharkFilter, setWiresharkFilter] = useState<string>('');
  const [appliedWiresharkFilter, setAppliedWiresharkFilter] = useState<string>('');
  const [selectedPacketNo, setSelectedPacketNo] = useState<number>(1);


  // Burp Suite State
  const [burpIntercept, setBurpIntercept] = useState<boolean>(false);
  const [burpTab, setBurpTab] = useState<'proxy' | 'repeater'>('proxy');
  const [burpRepeaterReq, setBurpRepeaterReq] = useState<string>('GET /login.php HTTP/1.1\nHost: 192.168.1.105\nUser-Agent: Mozilla/5.0 Kali-Sandbox\nAccept: */*\n');
  const [burpRepeaterResp, setBurpRepeaterResp] = useState<string>('HTTP/1.1 200 OK\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Active SSH brute-force detected from this host (192.168.1.105).</p>');

  // Firefox Browser State
  const [browserUrl, setBrowserUrl] = useState<string>('http://192.168.1.105');
  const [browserActiveTab, setBrowserActiveTab] = useState<'target' | 'google' | 'samarthya'>('target');
  const [browserSearchQuery, setBrowserSearchQuery] = useState<string>('kali linux');

  // Terminal Output History - Default initialized with neofetch matching image 2
  const [outputHistory, setOutputHistory] = useState<Array<{
    user: 'kali' | 'root';
    dir: string;
    cmd: string;
    output: string;
    promptPrefix?: string;
    isNeofetch?: boolean;
  }>>([
    {
      user: 'kali',
      dir: '~',
      cmd: '',
      output: '',
      isNeofetch: true,
    },
  ]);

  // Session timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Broadcast IP copy to parent assessment tab
  const handleCopyIp = (ipToCopy: string = TARGET_IP) => {
    navigator.clipboard.writeText(ipToCopy);
    setCopiedIp(true);
    localStorage.setItem('cyber_vm_attacker_ip', ipToCopy);
    localStorage.setItem('cyber_vm_attacker_timestamp', Date.now().toString());

    try {
      const channel = new BroadcastChannel('cyber_vm_channel');
      channel.postMessage({ type: 'IP_COPIED', ip: ipToCopy });
      channel.close();
    } catch {
      // Fallback
    }

    setTimeout(() => setCopiedIp(false), 2500);
  };

  // Helper to resolve paths
  const resolvePath = (p: string): string => {
    let clean = p.trim();
    if (!clean || clean === '.') return currentDir;
    if (clean === '~') return currentUser === 'root' ? '/root' : '/home/kali';
    if (clean.startsWith('~/')) {
      return `${currentUser === 'root' ? '/root' : '/home/kali'}/${clean.slice(2)}`.replace(/\/+/g, '/');
    }
    if (clean.startsWith('/')) return clean.replace(/\/+/g, '/');
    return `${currentDir}/${clean}`.replace(/\/+/g, '/');
  };

  // Python Code Runner
  const runPythonCode = (code: string): string => {
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

  // Main Command Execution Handler
  const executeCommand = (fullCmd: string) => {
    const trimmed = fullCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Python REPL
    if (subShellMode === 'python') {
      if (trimmed === 'exit()' || trimmed === 'quit()' || trimmed === 'exit') {
        setSubShellMode('bash');
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: 'Exiting Python REPL.', promptPrefix: '>>> ' },
        ]);
        return;
      }
      const pyOut = runPythonCode(trimmed);
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: pyOut, promptPrefix: '>>> ' },
      ]);
      return;
    }

    // Metasploit Framework Mode
    if (subShellMode === 'msfconsole') {
      if (trimmed === 'exit' || trimmed === 'quit') {
        setSubShellMode('bash');
        setMsfModule('');
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '[-] Exiting msfconsole.', promptPrefix: 'msf6 > ' },
        ]);
        return;
      }

      if (trimmed === 'back') {
        setMsfModule('');
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '', promptPrefix: `msf6 ${msfModule} > ` },
        ]);
        return;
      }

      if (trimmed.startsWith('search')) {
        const query = trimmed.replace(/^search\s*/, '').trim() || 'ssh';
        const output = `Matching Modules for '${query}'\n================\n   #  Name                                         Disclosure Date  Rank    Check  Description\n   -  ----                                         ---------------  ----    -----  -----------\n   0  auxiliary/scanner/ssh/ssh_login              .                normal  Yes    SSH Login Check Scanner\n   1  auxiliary/scanner/ssh/ssh_version            .                normal  Yes    SSH Version Scanner\n   2  exploit/linux/ssh/sshd_priv_escalation       2023-07-19       manual  No     Linux OpenSSH Privilege Escalation`;
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
        ]);
        return;
      }

      if (trimmed.startsWith('use')) {
        const mod = trimmed.replace(/^use\s*/, '').trim() || 'auxiliary/scanner/ssh/ssh_login';
        setMsfModule(`auxiliary(${mod.split('/').pop()})`);
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[+] Using module ${mod}`, promptPrefix: 'msf6 > ' },
        ]);
        return;
      }

      if (trimmed === 'show options' || trimmed === 'options') {
        const out = `Module options (${msfModule || 'auxiliary/scanner/ssh/ssh_login'}):\n\n   Name             Current Setting                   Required  Description\n   ----             ---------------                   --------  -----------\n   RHOSTS           ${msfOptions.RHOSTS}                     yes       The target host(s)\n   RPORT            ${msfOptions.RPORT}                              yes       The target port\n   USER_FILE        ${msfOptions.USER_FILE}  no        File containing usernames\n   STOP_ON_SUCCESS  ${msfOptions.STOP_ON_SUCCESS}                              yes       Stop after finding valid login`;
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: out, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
        ]);
        return;
      }

      if (trimmed.startsWith('set')) {
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 3) {
          const opt = parts[1].toUpperCase();
          const val = parts.slice(2).join(' ');
          setMsfOptions((prev) => ({ ...prev, [opt]: val }));
          setOutputHistory((prev) => [
            ...prev,
            { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `${opt} => ${val}`, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
          ]);
          return;
        }
      }

      if (trimmed === 'run' || trimmed === 'exploit') {
        const out = `[*] Starting SSH login brute-force check on ${msfOptions.RHOSTS}:${msfOptions.RPORT}...\n[*] 192.168.1.105:22 - Trying 'admin:admin'\n[-] 192.168.1.105:22 - Failed: 'admin:admin'\n[*] 192.168.1.105:22 - Trying 'root:toor'\n[-] 192.168.1.105:22 - Failed: 'root:toor'\n[*] 192.168.1.105:22 - Trying 'student:password'\n[+] 192.168.1.105:22 - Success: 'student:password'\n[*] Command shell session 1 opened (192.168.1.50:44321 -> 192.168.1.105:22)\n[*] Scanned 1 of 1 hosts (100% complete)`;
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: out, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
        ]);
        return;
      }

      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[-] Unknown msf command: ${trimmed}`, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
      ]);
      return;
    }

    // Direct app launch commands from terminal CLI
    if (trimmed === 'firefox' || trimmed === 'browser') {
      openWindow('browser');
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '[+] Launched Mozilla Firefox browser window.' },
      ]);
      return;
    }
    if (trimmed === 'wireshark') {
      openWindow('wireshark');
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '[+] Launched Wireshark packet analyzer window.' },
      ]);
      return;
    }
    if (trimmed === 'burp' || trimmed === 'burpsuite') {
      openWindow('burp');
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '[+] Launched Burp Suite Community Edition window.' },
      ]);
      return;
    }
    if (trimmed === 'files' || trimmed === 'thunar' || trimmed === 'nautilus') {
      openWindow('files');
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '[+] Launched Files manager window.' },
      ]);
      return;
    }
    if (trimmed === 'neofetch' || trimmed === 'fastfetch') {
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '', isNeofetch: true },
      ]);
      return;
    }

    // Pipeline processing (|)
    if (trimmed.includes('|')) {
      const parts = trimmed.split('|').map((s) => s.trim());
      let pipelineOutput = runSingleCommand(parts[0]);

      for (let i = 1; i < parts.length; i++) {
        const sub = parts[i];
        if (sub.startsWith('grep')) {
          const isInv = sub.includes('-v');
          const isIgnoreCase = sub.includes('-i');
          const mMatch = sub.match(/-m\s*(\d+)/);
          const maxLines = mMatch ? parseInt(mMatch[1], 10) : Infinity;
          const matchPattern = sub
            .replace(/^grep(\s+-[a-zA-Z0-9]+)*/, '')
            .replace(/^["']|["']$/g, '')
            .trim();

          const lines = pipelineOutput.split('\n');
          let matchedCount = 0;
          pipelineOutput = lines
            .filter((l) => {
              if (matchedCount >= maxLines) return false;
              const has = isIgnoreCase
                ? l.toLowerCase().includes(matchPattern.toLowerCase())
                : l.includes(matchPattern);
              const keep = isInv ? !has : has;
              if (keep) matchedCount++;
              return keep;
            })
            .join('\n');
        } else if (sub.startsWith('head')) {
          const count = parseInt(sub.match(/\d+/)?.[0] || '10', 10);
          pipelineOutput = pipelineOutput.split('\n').slice(0, count).join('\n');
        } else if (sub.startsWith('tail')) {
          const count = parseInt(sub.match(/\d+/)?.[0] || '10', 10);
          pipelineOutput = pipelineOutput.split('\n').slice(-count).join('\n');
        } else if (sub.startsWith('wc')) {
          if (sub.includes('-l')) {
            pipelineOutput = `${pipelineOutput.split('\n').filter(Boolean).length}`;
          } else {
            const linesCount = pipelineOutput.split('\n').length;
            const wordsCount = pipelineOutput.split(/\s+/).filter(Boolean).length;
            pipelineOutput = `  ${linesCount}  ${wordsCount}  ${pipelineOutput.length}`;
          }
        } else if (sub.startsWith('sort')) {
          pipelineOutput = pipelineOutput.split('\n').sort().join('\n');
        } else if (sub.startsWith('uniq')) {
          const linesList = pipelineOutput.split('\n');
          pipelineOutput = Array.from(new Set(linesList)).join('\n');
        } else if (sub.startsWith('awk')) {
          pipelineOutput = pipelineOutput
            .split('\n')
            .map((line) => line.split(/\s+/).filter(Boolean).join(' '))
            .join('\n');
        }
      }

      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: pipelineOutput },
      ]);
      return;
    }

    // Output redirection (>)
    if (trimmed.includes('>')) {
      const isAppend = trimmed.includes('>>');
      const [cmdPart, filePart] = trimmed.split(isAppend ? '>>' : '>').map((s) => s.trim());
      const res = runSingleCommand(cmdPart);
      const filePath = resolvePath(filePart);

      setVfs((prev) => ({
        ...prev,
        [filePath]: {
          content: isAppend && prev[filePath] ? `${prev[filePath].content}\n${res}` : res,
          size: (res || '').length,
          perms: '-rw-r--r--',
          owner: currentUser,
          group: currentUser,
          date: 'Aug 27 14:26',
        },
      }));

      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[+] Written to ${filePath}` },
      ]);
      return;
    }

    // Command chaining (&&)
    if (trimmed.includes('&&')) {
      const subCmds = trimmed.split('&&').map((s) => s.trim());
      const outputs: string[] = [];
      for (const sc of subCmds) {
        const out = runSingleCommand(sc);
        if (out) outputs.push(out);
      }
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: outputs.join('\n') },
      ]);
      return;
    }

    // Single standard command
    const out = runSingleCommand(trimmed);
    if (trimmed === 'clear') {
      setOutputHistory([]);
      return;
    }

    setOutputHistory((prev) => [
      ...prev,
      { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: out },
    ]);
  };

  // Single Command Evaluation Engine
  const runSingleCommand = (raw: string): string => {
    const tokens = raw.trim().split(/\s+/);
    const cmd = tokens[0];
    const args = tokens.slice(1);

    switch (cmd) {
      case 'clear':
        return '';

      case 'pwd':
        return currentDir;

      case 'whoami':
        return currentUser;

      case 'id':
        return currentUser === 'root'
          ? 'uid=0(root) gid=0(root) groups=0(root)'
          : 'uid=1000(kali) gid=1000(kali) groups=1000(kali),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),120(wireshark)';

      case 'uname':
        if (args.includes('-a')) {
          return 'Linux kali-sandbox 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 (2024-01-08) x86_64 GNU/Linux';
        }
        return 'Linux';

      case 'hostname':
        return 'kali-sandbox';

      case 'date':
        return new Date().toString();

      case 'uptime':
        return '14:26:15 up 3:42, 1 user, load average: 0.08, 0.12, 0.09';

      case 'free':
        return '               total        used        free      shared  buff/cache   available\nMem:           15.6Gi       3.2Gi       9.4Gi       210Mi       3.0Gi      12.0Gi\nSwap:           2.0Gi          0B       2.0Gi';

      case 'df':
        return 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   14G   34G  30% /\ntmpfs           7.8G     0  7.8G   0% /dev/shm';

      case 'ps':
      case 'top':
        return 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168924 13540 ?        Ss   11:00   0:01 /sbin/init\nroot       412  0.0  0.1  24128  9520 ?        Ss   11:01   0:00 /usr/sbin/sshd -D\nkali       782  0.0  0.2 384120 28140 tty1     S+   11:02   0:02 /usr/bin/gnome-terminal\nkali       810  0.0  0.1  12480  5400 pts/0    Ss   11:02   0:00 /bin/zsh';

      case 'echo': {
        const text = args.join(' ');
        const interpolated = text.replace(/\$([a-zA-Z_]\w*)/g, (_, v) => envVars[v] || '');
        return interpolated.replace(/^["']|["']$/g, '');
      }

      case 'export': {
        if (args.length === 0) {
          return Object.entries(envVars).map(([k, v]) => `declare -x ${k}="${v}"`).join('\n');
        }
        const eqIdx = args[0].indexOf('=');
        if (eqIdx !== -1) {
          const k = args[0].substring(0, eqIdx);
          const v = args[0].substring(eqIdx + 1).replace(/^["']|["']$/g, '');
          setEnvVars((prev) => ({ ...prev, [k]: v }));
          return '';
        }
        return '';
      }

      case 'env':
        return Object.entries(envVars).map(([k, v]) => `${k}=${v}`).join('\n');

      case 'cd': {
        const target = args[0] || '~';
        const resolved = resolvePath(target);
        const exists = Object.keys(vfs).some((p) => p.startsWith(resolved));
        if (
          resolved === '/' ||
          resolved === '/home' ||
          resolved === '/home/kali' ||
          resolved === '/home/student' ||
          resolved === '/home/student/logs' ||
          resolved === '/var' ||
          resolved === '/var/log' ||
          resolved === '/etc' ||
          resolved === '/tmp' ||
          resolved === '/usr' ||
          resolved === '/usr/share' ||
          exists
        ) {
          setCurrentDir(resolved);
          return '';
        }
        return `zsh: cd: ${target}: No such file or directory`;
      }

      case 'ls': {
        const showAll = args.some((a) => a.includes('a'));
        const showLong = args.some((a) => a.includes('l'));
        const pathArg = args.find((a) => !a.startsWith('-')) || '.';
        const targetDir = resolvePath(pathArg);

        const filesInDir = Object.keys(vfs).filter((p) => {
          const parent = p.substring(0, p.lastIndexOf('/')) || '/';
          return parent === targetDir;
        });

        const standardSubdirs: Record<string, string[]> = {
          '/': ['bin', 'etc', 'home', 'root', 'usr', 'var', 'tmp'],
          '/home': ['kali', 'student'],
          '/home/kali': ['Desktop', 'Documents', 'Downloads', 'Tools'],
          '/home/student': ['logs'],
          '/var': ['log', 'backups', 'mail'],
          '/var/log': [],
        };

        const subdirs = standardSubdirs[targetDir] || [];
        const allItems: string[] = [];

        if (showAll) {
          allItems.push('.');
          allItems.push('..');
        }

        subdirs.forEach((d) => allItems.push(`${d}/`));
        filesInDir.forEach((f) => allItems.push(f.split('/').pop() || ''));

        if (allItems.length === 0) return '';

        if (showLong) {
          const header = `total ${allItems.length * 4}\n`;
          const lines = allItems.map((item) => {
            const isDir = item.endsWith('/');
            const cleanName = isDir ? item.slice(0, -1) : item;
            const fullPath = `${targetDir}/${cleanName}`.replace(/\/+/g, '/');
            const fileObj = vfs[fullPath];
            if (fileObj) {
              return `${fileObj.perms} 1 ${fileObj.owner} ${fileObj.group} ${fileObj.size.toString().padStart(6)} ${fileObj.date} ${cleanName}`;
            }
            return `${isDir ? 'drwxr-xr-x' : '-rw-r--r--'} 2 ${currentUser} ${currentUser}   4096 Aug 27 12:00 ${item}`;
          });
          return header + lines.join('\n');
        }

        return allItems.join('  ');
      }

      case 'cat': {
        if (args.length === 0) return 'cat: missing operand';
        const targetFile = resolvePath(args[0]);
        if (vfs[targetFile]) {
          return vfs[targetFile].content;
        }
        return `cat: ${args[0]}: No such file or directory`;
      }

      case 'head': {
        const targetFile = resolvePath(args[args.length - 1]);
        const nMatch = args.join(' ').match(/-n\s*(\d+)/) || args.join(' ').match(/-(\d+)/);
        const count = nMatch ? parseInt(nMatch[1], 10) : 10;
        if (vfs[targetFile]) {
          return vfs[targetFile].content.split('\n').slice(0, count).join('\n');
        }
        return `head: cannot open '${args[args.length - 1]}' for reading: No such file or directory`;
      }

      case 'tail': {
        const targetFile = resolvePath(args[args.length - 1]);
        const nMatch = args.join(' ').match(/-n\s*(\d+)/) || args.join(' ').match(/-(\d+)/);
        const count = nMatch ? parseInt(nMatch[1], 10) : 10;
        if (vfs[targetFile]) {
          return vfs[targetFile].content.split('\n').slice(-count).join('\n');
        }
        return `tail: cannot open '${args[args.length - 1]}' for reading: No such file or directory`;
      }

      case 'grep': {
        const targetFile = resolvePath(args[args.length - 1]);
        const isInv = args.includes('-v');
        const isIgnoreCase = args.includes('-i');
        const mMatch = args.join(' ').match(/-m\s*(\d+)/);
        const maxLines = mMatch ? parseInt(mMatch[1], 10) : Infinity;
        const pattern = args
          .filter((a) => !a.startsWith('-') && a !== args[args.length - 1])
          .join(' ')
          .replace(/^["']|["']$/g, '');

        if (!vfs[targetFile]) {
          return `grep: ${args[args.length - 1]}: No such file or directory`;
        }

        const lines = vfs[targetFile].content.split('\n');
        let matched = 0;
        const filtered = lines.filter((l) => {
          if (matched >= maxLines) return false;
          const has = isIgnoreCase
            ? l.toLowerCase().includes(pattern.toLowerCase())
            : l.includes(pattern);
          const keep = isInv ? !has : has;
          if (keep) matched++;
          return keep;
        });

        return filtered.join('\n');
      }

      case 'sudo': {
        if (args[0] === '-i' || args[0] === 'su' || args[0] === 'bash') {
          setCurrentUser('root');
          setEnvVars((prev) => ({ ...prev, USER: 'root', HOME: '/root' }));
          return '[sudo] password for kali: [accepted]\nroot@kali-sandbox:~#';
        }
        if (args.length > 0) {
          const sub = args.join(' ');
          return runSingleCommand(sub);
        }
        return 'usage: sudo [-i] [command]';
      }

      case 'su': {
        if (args[0] === 'kali') {
          setCurrentUser('kali');
          setEnvVars((prev) => ({ ...prev, USER: 'kali', HOME: '/home/kali' }));
          return 'kali@kali-sandbox:~$';
        }
        setCurrentUser('root');
        setEnvVars((prev) => ({ ...prev, USER: 'root', HOME: '/root' }));
        return 'root@kali-sandbox:~#';
      }

      case 'nmap': {
        const target = args[args.length - 1] || TARGET_IP;
        return `Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-27 14:26 IST\nNmap scan report for ${target}\nHost is up (0.00098s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)\n80/tcp    open  http        Apache httpd 2.4.52 ((Ubuntu))\n443/tcp   open  ssl/http    Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\n\nNmap done: 1 IP address (1 host up) scanned in 1.42 seconds`;
      }

      case 'python3':
      case 'python': {
        if (args.length === 0) {
          setSubShellMode('python');
          return 'Python 3.11.8 (main, Feb  7 2024, 21:52:08) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n(Type exit() or quit() to return to bash)';
        }
        const pyFile = resolvePath(args[0]);
        if (vfs[pyFile]) {
          return runPythonCode(vfs[pyFile].content);
        }
        return `python3: can't open file '${args[0]}': [Errno 2] No such file or directory`;
      }

      case 'nano': {
        const fileToEdit = resolvePath(args[0] || 'newfile.txt');
        setNanoEditingFile(fileToEdit);
        setNanoBuffer(vfs[fileToEdit] ? vfs[fileToEdit].content : '');
        setSubShellMode('nano');
        return '';
      }

      case 'curl': {
        const target = args.find((a) => !a.startsWith('-')) || `http://${TARGET_IP}`;
        if (target.includes(TARGET_IP) || target.includes('80') || target.includes('login')) {
          return `<!DOCTYPE html>\n<html>\n<head><title>MoSPI Remote Node</title></head>\n<body>\n  <h1>MoSPI Regional Data Hub</h1>\n  <p>Warning: All access attempts are monitored under the Collection of Statistics Act.</p>\n  <form action="/login.php" method="POST">\n    <input type="text" name="user" placeholder="Username" />\n    <input type="password" name="pass" placeholder="Password" />\n    <button type="submit">Login</button>\n  </form>\n</body>\n</html>`;
        }
        return `HTTP/1.1 200 OK\nDate: Fri, 11 Sep 2026 07:10:00 GMT\nServer: Apache/2.4.52\nContent-Type: text/html\n\n[Response from ${target}]`;
      }

      case 'ping': {
        const target = args[0] || TARGET_IP;
        return `PING ${target} (${target}) 56(84) bytes of data.\n64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.482 ms\n64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.395 ms\n64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.412 ms\n\n--- ${target} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2004ms\nrtt min/avg/max/mdev = 0.395/0.429/0.482/0.037 ms`;
      }

      case 'ifconfig':
      case 'ip': {
        return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.50  netmask 255.255.255.0  broadcast 192.168.1.255\n        inet6 fe80::5054:ff:fe12:3456  prefixlen 64  scopeid 0x20<link>\n        ether 52:54:00:12:34:56  txqueuelen 1000  (Ethernet)\n        RX packets 4892  bytes 3912048 (3.7 MiB)\n        TX packets 3812  bytes 2490192 (2.3 MiB)\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n        loop  txqueuelen 1000  (Local Loopback)`;
      }

      case 'hydra': {
        return `Hydra v9.5 (c) 2023 by van Hauser / THC - Please do not use in military or secret service organizations, or for illegal purposes.\n[DATA] max 16 tasks per 1 target, overall 16 tasks, 10 login tries (l:1/p:10), ~1 tries per task\n[STATUS] attack finished for 192.168.1.105 (waiting for children)\n[22][ssh] host: 192.168.1.105   login: student   password: password\n1 of 1 target successfully completed, 1 valid password found`;
      }

      case 'sqlmap': {
        return `        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.11#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|...        |_|   https://sqlmap.org

[*] starting at 14:30:12
[INFO] testing connection to the target URL: http://${TARGET_IP}/login.php
[INFO] testing if the target URL content is stable
[INFO] target URL content is stable
[+] Parameter 'user' is vulnerable to Boolean-based blind SQL injection
[*] Fetched databases: ['information_schema', 'mospi_surveys', 'cadre_mgmt']`;
      }

      case 'gobuster': {
        return `===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://${TARGET_IP}
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/admin                (Status: 301) [Size: 312] [--> http://${TARGET_IP}/admin/]
/images               (Status: 301) [Size: 313] [--> http://${TARGET_IP}/images/]
/index.html           (Status: 200) [Size: 1042]
/login.php            (Status: 200) [Size: 2480]
/robots.txt           (Status: 200) [Size: 45]
Progress: 11 / 11 (100.00%)
===============================================================`;
      }

      case 'nikto': {
        return `- Nikto v2.5.0
+ Target IP:          ${TARGET_IP}
+ Target Hostname:    suspicious-host
+ Target Port:        80
+ Server: Apache/2.4.52 (Ubuntu)
+ /login.php: Authentication form found without CSRF protection token.
+ /admin/: Directory indexing enabled or accessible.
+ 6544 requests: 0 error(s) and 2 item(s) reported on remote host`;
      }

      case 'john': {
        return `Using default input encoding: UTF-8\nLoaded 1 password hash (sha512crypt)\nCost 1 (iteration count) is 5000 for all loaded hashes\nWill run 4 OpenMP threads\npassword         (admin)\n1g 0:00:00:00 DONE (2026-08-27 14:31) 50.00g/s 51200p/s 51200c/s 51200C/s 123456..password\nUse the "--show" option to display all of the cracked passwords reliably\nSession completed.`;
      }

      case 'msfconsole': {
        setSubShellMode('msfconsole');
        return `
                          .==.
                         ()''()-.
              .---'''''--''''''()
             ( () ___       _      )
              '--(___)-----(___)--'
                ||||       ||||
                ||||       ||||
                ()()       ()()

       =[ metasploit v6.3.55-dev                          ]
+ -- --=[ 2398 exploits - 1235 auxiliary - 422 post       ]
+ -- --=[ 1391 payloads - 47 encoders - 11 nops           ]
+ -- --=[ Free & Open Source Penetration Testing Platform ]

msf6 > `;
      }

      case 'help': {
        return `Kali Linux Sandbox - Supported Commands:
  • Forensics: cat, grep, head, tail, wc, awk, sort, uniq
  • Network:   nmap, ping, curl, wget, ifconfig, ip, netstat
  • Pentest:   hydra, sqlmap, gobuster, nikto, john, msfconsole
  • Scripting: python3, nano, bash, sh
  • System:    uname, whoami, id, sudo, su, pwd, cd, ls, ps, uptime, df, free
  • GUI Apps:  firefox, wireshark, burpsuite, files
  • Misc:      clear, history, echo, export, env, neofetch, help`;
      }

      default:
        return `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const handleSaveNano = () => {
    setVfs((prev) => ({
      ...prev,
      [nanoEditingFile]: {
        content: nanoBuffer,
        size: nanoBuffer.length,
        perms: '-rw-r--r--',
        owner: currentUser,
        group: currentUser,
        date: 'Aug 27 14:32',
      },
    }));
    setSubShellMode('bash');
    setOutputHistory((prev) => [
      ...prev,
      { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: `nano ${nanoEditingFile}`, output: `[+] Saved ${nanoEditingFile} (${nanoBuffer.length} bytes)` },
    ]);
  };

  const handleSaveEditor = () => {
    setVfs((prev) => ({
      ...prev,
      [editorFile]: {
        content: editorContent,
        size: editorContent.length,
        perms: '-rw-r--r--',
        owner: currentUser,
        group: currentUser,
        date: 'Aug 27 14:35',
      },
    }));
    setEditorSaveNotice('File saved successfully');
    setTimeout(() => setEditorSaveNotice(''), 2500);
  };

  // Window Manager Helpers
  const openWindow = (win: 'terminal' | 'files' | 'editor' | 'wireshark' | 'zenmap' | 'burp' | 'browser') => {
    setActiveWindow(win);
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(win);
      return next;
    });
  };

  const minimizeWindow = (win: string) => {
    setMinimizedWindows((prev) => new Set(prev).add(win));
  };

  const closeWindow = (win: string) => {
    if (activeWindow === win) {
      setActiveWindow('none');
    }
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(win);
      return next;
    });
    if (maximizedWindow === win) {
      setMaximizedWindow(null);
    }
  };

  const toggleMaximize = (win: string) => {
    setMaximizedWindow((prev) => (prev === win ? null : win));
  };

  const handleResetVm = () => {
    setSessionSecondsLeft(1455);
    setOutputHistory([
      {
        user: 'kali',
        dir: '~',
        cmd: '',
        output: '',
        isNeofetch: true,
      },
    ]);
    setActiveWindow('terminal');
    setMinimizedWindows(new Set());
    setMaximizedWindow(null);
  };

  const handleEndSession = () => {
    if (window.opener) {
      window.close();
    } else {
      navigate('/learner/assessment');
    }
  };

  // Wireshark Packets List
  const allPackets = [
    { no: 1, time: '0.000', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', port: 22, info: '44321 → 22 [SYN] Seq=0 Win=64240' },
    { no: 2, time: '0.001', src: '192.168.1.50', dst: '192.168.1.105', proto: 'TCP', port: 22, info: '22 → 44321 [SYN, ACK] Seq=0 Ack=1' },
    { no: 3, time: '0.002', src: '192.168.1.105', dst: '192.168.1.50', proto: 'SSHv2', port: 22, info: 'Client: SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6' },
    { no: 4, time: '0.015', src: '192.168.1.105', dst: '192.168.1.50', proto: 'SSHv2', port: 22, info: 'Encrypted packet (Password auth attempt: admin)' },
    { no: 5, time: '3.284', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', port: 22, info: '44322 → 22 [SYN] Seq=0 Win=64240' },
    { no: 6, time: '6.480', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', port: 22, info: '44324 → 22 [SYN] Seq=0 Win=64240' },
    { no: 7, time: '9.712', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', port: 22, info: '44326 → 22 [SYN] Seq=0 Win=64240' },
    { no: 8, time: '12.940', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', port: 22, info: '44328 → 22 [SYN] Seq=0 Win=64240' },
    { no: 9, time: '15.110', src: '10.0.0.12', dst: '192.168.1.50', proto: 'SSHv2', port: 22, info: 'Accepted publickey for student' },
  ];

  const filteredPackets = allPackets.filter((p) => {
    if (!appliedWiresharkFilter) return true;
    const f = appliedWiresharkFilter.toLowerCase();
    return (
      p.src.toLowerCase().includes(f) ||
      p.dst.toLowerCase().includes(f) ||
      p.proto.toLowerCase().includes(f) ||
      p.info.toLowerCase().includes(f) ||
      (f.includes('105') && p.src.includes('105')) ||
      (f.includes('ssh') && p.proto.toLowerCase().includes('ssh'))
    );
  });

  const now = new Date();
  const timeHours = now.getHours().toString().padStart(2, '0');
  const timeMinutes = now.getMinutes().toString().padStart(2, '0');
  const systemTimeFormatted = `Fri Sep 11  ${timeHours}:${timeMinutes}`;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0A0E17] flex flex-col select-none text-slate-200 font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER: SAMARTHYA VIRTUAL LAB HEADER (MATCHING SCREENSHOT 2)       */}
      {/* ========================================================================= */}
      <header className="bg-[#0A101D] text-white border-b border-slate-800/80 px-5 py-2.5 flex items-center justify-between shrink-0 select-none z-40">
        {/* Left: Samarthya Logo & Breadcrumbs & VM Running Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/samarthya_emblem.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('samarthya%20logo.png')) {
                  target.src = '/assets/samarthya logo.png';
                }
              }}
              className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
            />
            <span className="font-bold text-lg tracking-tight text-white">Samarthya</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-slate-400">Virtual Lab</span>
            <span className="text-slate-500">&gt;</span>
            <span className="text-slate-200">Kali Linux (Cyber Investigation)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>VM Running</span>
          </div>
        </div>

        {/* Right: Timer, Reset VM, Fullscreen, End Session */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-[#141C2B] px-3.5 py-1.5 rounded-xl border border-slate-700/60 font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{formatTimer(sessionSecondsLeft)}</span>
          </div>

          <button
            type="button"
            onClick={handleResetVm}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold transition-all border border-slate-700/60 cursor-pointer"
            title="Reset sandbox state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
            <span>Reset VM</span>
          </button>

          <button
            type="button"
            onClick={toggleNativeFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold transition-all border border-slate-700/60 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>Fullscreen</span>
          </button>

          <button
            type="button"
            onClick={handleEndSession}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Power className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. KALI SYSTEM PANEL (XFCE / GNOME BAR MATCHING SCREENSHOT 2)             */}
      {/* ========================================================================= */}
      <div className="h-8 bg-[#0B0F19] text-slate-300 px-4 flex items-center justify-between text-xs font-medium border-b border-slate-800/80 shrink-0 select-none z-30">
        {/* Left Items: Applications, Places, Terminal */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer py-1"
          >
            {/* Kali Dragon Icon */}
            <svg className="w-4 h-4 text-[#00A3FF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="font-semibold text-slate-100">Applications</span>
          </button>

          <button
            type="button"
            onClick={() => openWindow('files')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Places
          </button>

          <button
            type="button"
            onClick={() => openWindow('terminal')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
          </button>
        </div>

        {/* Right Items: Volume, Notification, Lock, Time */}
        <div className="flex items-center gap-3.5 text-slate-400">
          <Volume2 className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
          <Bell className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
          <Lock className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
          <span className="text-slate-600">|</span>
          <span className="text-slate-200 font-mono text-[11px]">{systemTimeFormatted}</span>
        </div>
      </div>

      {/* Whisker Application Menu Popover */}
      {showWhiskerMenu && (
        <div className="absolute top-18 left-3 w-84 bg-[#121A28] border border-cyan-500/40 rounded-xl shadow-2xl z-50 p-3 space-y-2 text-xs">
          <div className="px-2 py-1 border-b border-cyan-900/60 flex items-center justify-between text-cyan-400 font-bold">
            <span>Kali Linux 2024.x Tools</span>
            <span className="text-[10px] text-slate-400 font-normal">Full Sandbox Suite</span>
          </div>
          <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-[11px]">
            <div
              onClick={() => {
                openWindow('terminal');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>01 - GNOME Terminal (zsh sandbox)</span>
            </div>
            <div
              onClick={() => {
                openWindow('browser');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>02 - Mozilla Firefox (Web Browser)</span>
            </div>
            <div
              onClick={() => {
                openWindow('files');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Folder className="w-3.5 h-3.5 text-blue-400" />
              <span>03 - Files Manager</span>
            </div>
            <div
              onClick={() => {
                openWindow('wireshark');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>04 - Wireshark Packet Inspector</span>
            </div>
            <div
              onClick={() => {
                openWindow('burp');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>05 - Burp Suite Community Edition</span>
            </div>
            <div
              onClick={() => {
                openWindow('zenmap');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span>06 - Zenmap (Nmap Security Scanner)</span>
            </div>
            <div
              onClick={() => {
                executeCommand('msfconsole');
                openWindow('terminal');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <Code className="w-3.5 h-3.5 text-rose-400" />
              <span>07 - Metasploit Framework</span>
            </div>
            <div
              onClick={() => {
                setEditorFile('/home/student/logs/network.log');
                setEditorContent(DEFAULT_LOG_CONTENT);
                openWindow('editor');
                setShowWhiskerMenu(false);
              }}
              className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>08 - Mousepad Text Editor</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN KALI DESKTOP AREA: LEFT DOCK + WALLPAPER + FLOATING WINDOWS       */}
      {/* ========================================================================= */}
      <div className="flex-1 relative overflow-hidden flex bg-gradient-to-br from-[#060D1A] via-[#0A162B] to-[#040913]">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT DOCK / DESKTOP LAUNCHER ICONS (EXACTLY MATCHING SCREENSHOT 2)       */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-20 bg-[#0B101C]/70 backdrop-blur-xs border-r border-slate-800/60 py-3 flex flex-col items-center gap-3.5 z-20 shrink-0 select-none overflow-y-auto">
          {/* 1. Kali Linux Icon */}
          <button
            type="button"
            onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066CC] to-[#00A3FF] p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-300 font-medium tracking-tight">Kali Linux</span>
          </button>

          {/* 2. Home Folder Icon */}
          <button
            type="button"
            onClick={() => {
              setFilesPath('/home/kali');
              openWindow('files');
            }}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-sm group-hover:bg-blue-500/30 transition-colors">
              <Folder className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] text-slate-300 font-medium">Home</span>
          </button>

          {/* 3. Terminal Icon */}
          <button
            type="button"
            onClick={() => openWindow('terminal')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${activeWindow === 'terminal' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${activeWindow === 'terminal'
              ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/30'
              : 'bg-black/40 border-slate-700/80 text-slate-300 group-hover:bg-black/60'
              }`}>
              <TerminalIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-medium">Terminal</span>
          </button>

          {/* 4. Firefox Browser Icon */}
          <button
            type="button"
            onClick={() => openWindow('browser')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${activeWindow === 'browser' ? 'text-orange-400' : 'text-slate-300 hover:text-white'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${activeWindow === 'browser'
              ? 'bg-orange-500/25 border-orange-400 text-orange-300 ring-2 ring-orange-500/30'
              : 'bg-gradient-to-tr from-amber-600/30 to-orange-500/30 border-orange-500/40 text-orange-400 group-hover:scale-105'
              }`}>
              <Globe className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-[10px] font-medium">Firefox</span>
          </button>

          {/* 5. Files Icon */}
          <button
            type="button"
            onClick={() => openWindow('files')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${activeWindow === 'files' ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${activeWindow === 'files'
              ? 'bg-blue-500/25 border-blue-400 text-blue-300 ring-2 ring-blue-500/30'
              : 'bg-blue-500/20 border-blue-500/40 text-blue-400 group-hover:bg-blue-500/30'
              }`}>
              <Folder className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] font-medium">Files</span>
          </button>

          {/* 6. Burp Suite Icon */}
          <button
            type="button"
            onClick={() => openWindow('burp')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${activeWindow === 'burp' ? 'text-orange-400' : 'text-slate-300 hover:text-white'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${activeWindow === 'burp'
              ? 'bg-orange-500/25 border-orange-400 text-orange-300 ring-2 ring-orange-500/30'
              : 'bg-orange-950/40 border-orange-600/40 text-orange-400 group-hover:scale-105'
              }`}>
              <Layers className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-[10px] font-medium">Burp Suite</span>
          </button>

          {/* 7. Metasploit Icon */}
          <button
            type="button"
            onClick={() => {
              executeCommand('msfconsole');
              openWindow('terminal');
            }}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-600/40 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] font-medium">Metasploit</span>
          </button>

          {/* 8. Wireshark Icon */}
          <button
            type="button"
            onClick={() => openWindow('wireshark')}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${activeWindow === 'wireshark' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${activeWindow === 'wireshark'
              ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
              : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-400 group-hover:scale-105'
              }`}>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-medium">Wireshark</span>
          </button>

          {/* 9. Show Apps Grid Icon */}
          <button
            type="button"
            onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group mt-1"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-center shadow-sm group-hover:bg-slate-700/60 transition-colors">
              <div className="grid grid-cols-3 gap-1">
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
              </div>
            </div>
            <span className="text-[10px] font-medium">Show Apps</span>
          </button>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* DESKTOP BACKGROUND WALLPAPER (GLOWING KALI DRAGON & EMBOSSED TYPOGRAPHY) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center select-none">
          {/* Stylized Neon Waves & Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>

          {/* Glowing Samarthya Emblem & Typography (Right half of screen) */}
          <div className="absolute right-8 lg:right-16 xl:right-28 top-1/2 -translate-y-1/2 flex flex-col items-center text-center pointer-events-none select-none">
            {/* Samarthya Official Logo Emblem with Cyber Aura Glow */}
            <div className="relative flex items-center justify-center">
              {/* Glowing Cyber Backdrop Aura */}
              <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-blue-600/35 via-cyan-400/25 to-transparent rounded-full blur-2xl transform scale-110 pointer-events-none" />
              <div className="absolute inset-0 -m-3 bg-cyan-400/15 rounded-full blur-xl pointer-events-none" />

              {/* Official Samarthya Logo Image */}
              <img
                src="/assets/samarthya logo.png"
                alt="SAMARTHYA (सामर्थ्य) Official Logo"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('samarthya%20logo.png')) {
                    target.src = '/assets/samarthya logo.png';
                  }
                }}
                className="w-56 sm:w-68 lg:w-80 xl:w-92 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] drop-shadow-[0_0_55px_rgba(2,132,199,0.4)] transition-all select-none"
              />
            </div>

            {/* Typography */}
            <div className="mt-5 text-center">

            </div>
          </div>

          {/* Bottom Right Corner Motto (Image 2) */}
          <div className="absolute bottom-6 right-8 text-right font-mono text-[11px] tracking-widest leading-relaxed text-slate-500/70 uppercase font-bold pointer-events-none select-none">
            <div>SECURE</div>
            <div>ANALYZE</div>
            <div>LEARN</div>
            <div>GROW</div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: TERMINAL (DEFAULT ACTIVE WINDOW AS IN IMAGE 2)     */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'terminal' && !minimizedWindows.has('terminal') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'terminal'
                ? 'inset-2 rounded-xl'
                : 'left-4 sm:left-10 top-4 sm:top-6 w-[580px] sm:w-[640px] max-w-[92%] h-[490px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420]/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              {/* Terminal Titlebar (Mutter / Kali-Dark Theme) */}
              <div className="bg-[#161D2B] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 select-none">
                <div className="flex items-center gap-2.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-xs text-slate-200">
                    {subShellMode === 'python'
                      ? 'python3 (interactive REPL)'
                      : subShellMode === 'msfconsole'
                        ? `msfconsole ${msfModule}`
                        : `${currentUser}@kali: ~`}
                  </span>
                </div>

                {/* Window Control Buttons: Minimize, Maximize, Close */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('terminal')}
                    className="w-5 h-5 rounded hover:bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
                    title="Minimize"
                  >
                    <span className="text-xs">―</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('terminal')}
                    className="w-5 h-5 rounded hover:bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
                    title="Maximize / Restore"
                  >
                    <span className="text-xs">□</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('terminal')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                    title="Close"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Submenu Bar: File, Actions, Edit, View, Help */}
              <div className="bg-[#121824] px-3 py-1 border-b border-slate-800/80 flex items-center gap-4 text-[11px] text-slate-400 font-medium select-none">
                <span className="hover:text-white cursor-pointer">File</span>
                <span className="hover:text-white cursor-pointer">Actions</span>
                <span className="hover:text-white cursor-pointer">Edit</span>
                <span className="hover:text-white cursor-pointer">View</span>
                <span className="hover:text-white cursor-pointer">Help</span>
              </div>

              {/* Nano In-Terminal Editor Modal (If Active) */}
              {subShellMode === 'nano' ? (
                <div className="flex-1 flex flex-col bg-[#050810] font-mono text-xs text-slate-200">
                  <div className="bg-[#1A2333] px-4 py-1 text-center font-bold text-cyan-300 border-b border-cyan-900/50 flex items-center justify-between">
                    <span>GNU nano 7.2</span>
                    <span>File: {nanoEditingFile}</span>
                    <span>Modified</span>
                  </div>
                  <textarea
                    value={nanoBuffer}
                    onChange={(e) => setNanoBuffer(e.target.value)}
                    placeholder="Type file contents or code here..."
                    className="flex-1 p-4 bg-transparent resize-none focus:outline-none font-mono text-sm text-white caret-cyan-400 leading-relaxed"
                    autoFocus
                  />
                  <div className="bg-[#121A28] border-t border-cyan-900/50 p-2 flex items-center justify-between gap-4 text-xs select-none">
                    <div className="flex items-center gap-4 text-slate-400">
                      <span><strong className="text-cyan-400">^O</strong> WriteOut</span>
                      <span><strong className="text-cyan-400">^X</strong> Exit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveNano}
                        className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Return to Shell</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubShellMode('bash')}
                        className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Terminal Body with Neofetch / Prompt */
                <div
                  className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm bg-[#0C101A] space-y-3 selection:bg-cyan-600 selection:text-white"
                  onClick={() => terminalInputRef.current?.focus()}
                >
                  {outputHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      {item.isNeofetch ? (
                        /* Authentic Neofetch Terminal Banner (Screenshot 2) */
                        <div className="space-y-2">
                          <div className="text-slate-200">
                            <span className="text-[#38BDF8] font-bold">┌──({item.user}㉿kali)-[{item.dir}]</span>
                            <br />
                            <span className="text-[#38BDF8] font-bold">└─$</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-1">
                            {/* Left: Cyan Kali Dragon ASCII Art */}
                            <pre className="text-[#38BDF8] font-mono text-[11px] sm:text-xs leading-tight select-none">
                              {`           .....:::::.....
      ..:::::::iiiii:::..
     .:::::::!iiiiii192x.
    .::::::!!iiii11:::::Q
   .:::::!!iiiii111:::::20.
  .:::::!!iiiii11111::::008::;..
 .:::::!!iiiii111111:::10000009c::1;
 .:::::!!iiiii1111111::;20!       208,
.:::::!!iiiii11111111::.08!       008,
.:::::!!iiiii111111111::'08!      "0y
 :::::!!iiiii111111111::.'001,
  ::::!!iiiii11111111:::.'\`*001,....
   :::!!iiiii1111111:::.'\`   \`*??0011:::.
    ::!!iiiii111111:::.'\`          '?0:.'\`;.
     :!!iiiii11111:::.'\`            ?0,  !,
      !iiiii11111:::.'\`              '8.  !
       1iii11111:::.'\`                !i  ;
        1111111:::.'\`                 !;
         11111:::.'\`                  ;`}
                            </pre>

                            {/* Right: Kali Neofetch System Information */}
                            <div className="text-xs font-mono space-y-0.5 leading-snug">
                              <div className="font-bold text-[#38BDF8]">kali@kali</div>
                              <div className="text-slate-500">---------</div>
                              <div><span className="text-[#38BDF8] font-semibold">OS:</span> Kali GNU/Linux Rolling x86_64</div>
                              <div><span className="text-[#38BDF8] font-semibold">Host:</span> Virtual Machine</div>
                              <div><span className="text-[#38BDF8] font-semibold">Kernel:</span> 6.6.9-amd64</div>
                              <div><span className="text-[#38BDF8] font-semibold">Uptime:</span> 5 mins</div>
                              <div><span className="text-[#38BDF8] font-semibold">Packages:</span> 2785 (dpkg)</div>
                              <div><span className="text-[#38BDF8] font-semibold">Shell:</span> zsh 5.9</div>
                              <div><span className="text-[#38BDF8] font-semibold">Resolution:</span> 1920x1080</div>
                              <div><span className="text-[#38BDF8] font-semibold">DE:</span> GNOME 45.4</div>
                              <div><span className="text-[#38BDF8] font-semibold">WM:</span> Mutter</div>
                              <div><span className="text-[#38BDF8] font-semibold">Theme:</span> Kali-Dark</div>
                              <div><span className="text-[#38BDF8] font-semibold">Icons:</span> Kali-Dark</div>
                              <div><span className="text-[#38BDF8] font-semibold">Terminal:</span> gnome-terminal</div>
                              <div><span className="text-[#38BDF8] font-semibold">CPU:</span> Intel(R) Xeon(R) (4) @ 2.30GHz</div>
                              <div><span className="text-[#38BDF8] font-semibold">GPU:</span> 00:02.0 VMware SVGA II Adapter</div>
                              <div><span className="text-[#38BDF8] font-semibold">Memory:</span> 812MiB / 3947MiB</div>

                              {/* 8 Color Blocks Palette */}
                              <div className="flex items-center gap-1.5 pt-2">
                                <span className="w-4 h-3.5 bg-slate-700 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-rose-600 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-emerald-500 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-amber-400 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-blue-500 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-fuchsia-500 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-cyan-400 inline-block rounded-xs" />
                                <span className="w-4 h-3.5 bg-white inline-block rounded-xs" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {item.promptPrefix ? (
                            <div className="text-slate-200 flex items-center gap-1.5">
                              <span className="text-amber-400 font-bold">{item.promptPrefix}</span>
                              <span className="text-white font-medium">{item.cmd}</span>
                            </div>
                          ) : (
                            <>
                              <div className="text-slate-200 flex items-center gap-1.5 flex-wrap">
                                <span className="text-[#38BDF8] font-bold">┌──({item.user}㉿kali)-[{item.dir}]</span>
                              </div>
                              <div className="text-slate-200 flex items-center gap-1.5">
                                <span className="text-[#38BDF8] font-bold">└─{item.user === 'root' ? '#' : '$'}</span>
                                <span className="text-white font-medium">{item.cmd}</span>
                              </div>
                            </>
                          )}
                          {item.output && (
                            <pre className="text-slate-300 whitespace-pre-wrap pl-3 border-l-2 border-cyan-700/60 font-mono text-xs sm:text-[13px] leading-relaxed">
                              {item.output}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Active Prompt Input */}
                  <form onSubmit={handleFormSubmit} className="space-y-1 pt-1">
                    {subShellMode === 'python' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">&gt;&gt;&gt;</span>
                        <input
                          ref={terminalInputRef}
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type python code (e.g. print(10+20), exit())..."
                          className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-amber-400"
                          autoFocus
                        />
                      </div>
                    ) : subShellMode === 'msfconsole' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">msf6 {msfModule} &gt;</span>
                        <input
                          ref={terminalInputRef}
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="set RHOSTS 192.168.1.105, run, options, exit..."
                          className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-rose-400"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <>
                        <div className="text-slate-200">
                          <span className="text-[#38BDF8] font-bold">┌──({currentUser}㉿kali)-[{currentDir.replace('/home/kali', '~')}]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#38BDF8] font-bold">└─{currentUser === 'root' ? '#' : '$'}</span>
                          <input
                            ref={terminalInputRef}
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="cat network.log, nmap 192.168.1.105, python3, nano, firefox, help..."
                            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-cyan-400"
                            autoFocus
                          />
                        </div>
                      </>
                    )}
                  </form>

                  <div ref={terminalBottomRef} />
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: FIREFOX BROWSER                                    */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'browser' && !minimizedWindows.has('browser') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'browser'
                ? 'inset-2 rounded-xl'
                : 'left-12 sm:left-20 top-8 sm:top-10 w-[680px] sm:w-[760px] max-w-[92%] h-[510px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              {/* Firefox Titlebar */}
              <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span className="font-semibold text-xs text-slate-200">Mozilla Firefox — Kali Linux</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('browser')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    ―
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('browser')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('browser')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Firefox Tabs Bar */}
              <div className="bg-[#101624] px-2 pt-1.5 flex items-center gap-1 border-b border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setBrowserActiveTab('target');
                    setBrowserUrl('http://192.168.1.105');
                  }}
                  className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${browserActiveTab === 'target'
                    ? 'bg-[#182236] text-white border-t border-x border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Target: 192.168.1.105</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBrowserActiveTab('google');
                    setBrowserUrl('https://www.google.com');
                  }}
                  className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${browserActiveTab === 'google'
                    ? 'bg-[#182236] text-white border-t border-x border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Google Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBrowserActiveTab('samarthya');
                    setBrowserUrl('https://samarthya.gov.in');
                  }}
                  className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${browserActiveTab === 'samarthya'
                    ? 'bg-[#182236] text-white border-t border-x border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Samarthya Academy</span>
                </button>
              </div>

              {/* URL Address Bar */}
              <div className="bg-[#141C2B] p-2 px-3 border-b border-slate-800 flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => { }}
                  className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Back"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => { }}
                  className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Forward"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => { }}
                  className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Reload"
                >
                  ↻
                </button>

                <div className="flex-1 flex items-center gap-2 bg-[#0A0F1A] border border-slate-700 rounded-lg px-3 py-1 text-slate-200 font-mono text-xs">
                  <span className="text-emerald-400">🔒</span>
                  <input
                    type="text"
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (browserUrl.includes('192.168.1.105')) setBrowserActiveTab('target');
                        else if (browserUrl.includes('google')) setBrowserActiveTab('google');
                        else if (browserUrl.includes('samarthya')) setBrowserActiveTab('samarthya');
                        else setBrowserActiveTab('google');
                      }
                    }}
                    placeholder="Search with Google or enter address"
                    className="flex-1 bg-transparent text-slate-200 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (browserUrl.includes('192.168.1.105')) setBrowserActiveTab('target');
                    else if (browserUrl.includes('google')) setBrowserActiveTab('google');
                    else if (browserUrl.includes('samarthya')) setBrowserActiveTab('samarthya');
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold cursor-pointer transition-colors"
                >
                  Go
                </button>
              </div>

              {/* Web Page Viewport */}
              <div className="flex-1 bg-[#090D17] p-6 overflow-y-auto">
                {browserActiveTab === 'target' ? (
                  /* MoSPI Target Server Web Page */
                  <div className="max-w-md mx-auto bg-[#141C2B] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                      <div>
                        <h2 className="text-base font-bold text-white">MoSPI Target Server Portal</h2>
                        <p className="text-[11px] text-slate-400">Apache/2.4.52 (Ubuntu Linux)</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 text-xs font-bold font-mono">
                        {TARGET_IP}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You have reached the HTTP service running on the remote target node (Port 80).
                      Security logs show this specific address launched multiple failed brute-force SSH logins against the national survey server.
                    </p>
                    <div className="p-3 bg-[#0A0F1A] rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-slate-400">Attacker IP:</span>{' '}
                        <strong className="text-cyan-400 font-mono">{TARGET_IP}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyIp(TARGET_IP)}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedIp ? 'Copied!' : 'Copy IP'}</span>
                      </button>
                    </div>
                  </div>
                ) : browserActiveTab === 'google' ? (
                  /* Google Search Simulated View */
                  <div className="max-w-xl mx-auto space-y-5 text-left">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                      <span className="text-blue-400">G</span>
                      <span className="text-red-400">o</span>
                      <span className="text-amber-400">o</span>
                      <span className="text-blue-400">g</span>
                      <span className="text-emerald-400">l</span>
                      <span className="text-red-400">e</span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={browserSearchQuery}
                        onChange={(e) => setBrowserSearchQuery(e.target.value)}
                        placeholder="Search Google or type a URL..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#141C2B] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <div className="text-xs text-slate-400 font-mono">https://www.kali.org › docs</div>
                        <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                          Kali Linux Official Documentation &amp; Penetration Testing Tools
                        </h3>
                        <p className="text-xs text-slate-300 leading-snug">
                          The most advanced Penetration Testing Distribution ever. Kali Linux documentation for information gathering, vulnerability analysis, and network forensics.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-slate-400 font-mono">https://cve.mitre.org › cve-2024-ssh</div>
                        <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                          Detection of SSH Brute Force Attacks from {TARGET_IP}
                        </h3>
                        <p className="text-xs text-slate-300 leading-snug">
                          Guidance on analyzing /var/log/auth.log and /home/student/logs/network.log for rapid incident mitigation.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Samarthya Learning Portal View */
                  <div className="max-w-lg mx-auto bg-[#141C2B] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-3 text-left">
                    <h2 className="text-base font-bold text-white">SAMARTHYA National Statistical Academy</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Official competency and assessment platform for officers of the Indian Statistical Service (ISS) &amp; Subordinate Statistical Service (SSS).
                    </p>
                    <div className="p-3 bg-[#0A0F1A] rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400 font-semibold">Active Lab Assessment:</div>
                      <div className="text-slate-300">MoSPI Cadre Cyber Security &amp; Network Forensics Assessment (Question 6)</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: FILES MANAGER                                      */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'files' && !minimizedWindows.has('files') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'files'
                ? 'inset-2 rounded-xl'
                : 'left-16 sm:left-24 top-10 sm:top-14 w-[600px] sm:w-[680px] max-w-[92%] h-[460px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-xs text-slate-200">Files — {filesPath}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('files')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    ―
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('files')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('files')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Breadcrumbs */}
              <div className="bg-[#121824] px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span className="text-slate-500">Path:</span>
                <span className="bg-[#0A0F1A] px-2 py-0.5 rounded border border-slate-700 text-blue-300">{filesPath}</span>
              </div>

              {/* Files Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar Places */}
                <div className="w-40 bg-[#0C111C] border-r border-slate-800 p-2 space-y-1 text-xs">
                  <div
                    onClick={() => setFilesPath('/home/kali')}
                    className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${filesPath === '/home/kali' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-blue-400" />
                    <span>Home</span>
                  </div>
                  <div
                    onClick={() => setFilesPath('/home/student/logs')}
                    className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${filesPath === '/home/student/logs' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Student Logs</span>
                  </div>
                  <div
                    onClick={() => setFilesPath('/var/log')}
                    className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${filesPath === '/var/log' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                    <span>System Logs</span>
                  </div>
                  <div
                    onClick={() => setFilesPath('/etc')}
                    className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${filesPath === '/etc' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>/etc</span>
                  </div>
                </div>

                {/* Right: Files Grid */}
                <div className="flex-1 p-4 bg-[#090D17] overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(Object.entries(vfs) as [string, VFile][])
                      .filter(([path]) => {
                        const parent = path.substring(0, path.lastIndexOf('/')) || '/';
                        return parent === filesPath;
                      })
                      .map(([path, file]) => {
                        const fileName = path.split('/').pop() || '';
                        return (
                          <div
                            key={path}
                            onDoubleClick={() => {
                              setEditorFile(path);
                              setEditorContent(file.content);
                              openWindow('editor');
                            }}
                            className="p-3 rounded-xl bg-[#141C2B] border border-slate-700/60 hover:border-blue-500/60 hover:bg-slate-800/50 cursor-pointer flex flex-col items-center text-center gap-1.5 transition-all group"
                          >
                            <FileText className="w-8 h-8 text-amber-400 group-hover:scale-105 transition-transform" />
                            <span className="text-xs font-medium text-slate-200 truncate max-w-full">{fileName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{file.size} bytes</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: MOUSEPAD / TEXT EDITOR                             */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'editor' && !minimizedWindows.has('editor') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'editor'
                ? 'inset-2 rounded-xl'
                : 'left-14 sm:left-24 top-10 sm:top-12 w-[660px] sm:w-[720px] max-w-[92%] h-[480px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              {/* Mousepad Titlebar */}
              <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-xs text-slate-200">Mousepad — {editorFile}</span>
                  {editorSaveNotice && (
                    <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 bg-emerald-500/20 rounded">
                      {editorSaveNotice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('editor')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    ―
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('editor')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('editor')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Menubar & Action Bar */}
              <div className="bg-[#121824] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <span className="hover:text-white cursor-pointer">File</span>
                  <span className="hover:text-white cursor-pointer">Edit</span>
                  <span className="hover:text-white cursor-pointer">Search</span>
                  <span className="hover:text-white cursor-pointer">View</span>
                  <span className="hover:text-white cursor-pointer">Help</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#0B0F19] rounded px-2 py-1 border border-slate-700/60">
                    <Search className="w-3 h-3 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      value={editorSearch}
                      onChange={(e) => setEditorSearch(e.target.value)}
                      placeholder="Find in file..."
                      className="bg-transparent text-[11px] text-white focus:outline-none w-28"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveEditor}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1 p-3 bg-[#0A0D16] overflow-hidden flex flex-col">
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="flex-1 w-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-2 focus:outline-none resize-none selection:bg-blue-600 selection:text-white leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Status Bar */}
              <div className="h-6 bg-[#141B29] border-t border-slate-800 px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono select-none">
                <div className="flex items-center gap-3">
                  <span>Lines: {editorContent.split('\n').length}</span>
                  <span>Size: {editorContent.length} bytes</span>
                  <span>UTF-8</span>
                  {editorSearch && (
                    <span className="text-cyan-400">
                      Matches: {(editorContent.match(new RegExp(editorSearch, 'gi')) || []).length}
                    </span>
                  )}
                </div>
                {editorContent.includes(TARGET_IP) && (
                  <button
                    type="button"
                    onClick={() => handleCopyIp(TARGET_IP)}
                    className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy Attacker IP ({TARGET_IP})</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: WIRESHARK PACKET ANALYZER                          */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'wireshark' && !minimizedWindows.has('wireshark') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'wireshark'
                ? 'inset-2 rounded-xl'
                : 'left-8 sm:left-16 top-6 sm:top-8 w-[680px] sm:w-[760px] max-w-[92%] h-[500px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-xs text-slate-200">The Wireshark Network Analyzer (eth0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('wireshark')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    ―
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('wireshark')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('wireshark')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Wireshark Filter Input */}
              <div className="bg-[#121824] p-2 px-3 border-b border-slate-800 flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Filter:</span>
                <input
                  type="text"
                  value={wiresharkFilter}
                  onChange={(e) => setWiresharkFilter(e.target.value)}
                  placeholder="e.g. ip.addr == 192.168.1.105 or tcp.port == 22"
                  className="flex-1 bg-[#0A0F1A] border border-slate-700 rounded px-2.5 py-1 text-emerald-400 font-mono text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setAppliedWiresharkFilter(wiresharkFilter)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Packet List Table */}
              <div className="flex-1 overflow-y-auto bg-[#090D17]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#141C2B] text-slate-400 sticky top-0 border-b border-slate-800">
                    <tr>
                      <th className="py-1.5 px-3">No.</th>
                      <th className="py-1.5 px-3">Time</th>
                      <th className="py-1.5 px-3">Source</th>
                      <th className="py-1.5 px-3">Destination</th>
                      <th className="py-1.5 px-3">Protocol</th>
                      <th className="py-1.5 px-3">Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredPackets.map((pkt) => (
                      <tr
                        key={pkt.no}
                        onClick={() => setSelectedPacketNo(pkt.no)}
                        className={`cursor-pointer transition-colors ${selectedPacketNo === pkt.no
                          ? 'bg-blue-600/30 text-white font-semibold'
                          : pkt.src === TARGET_IP
                            ? 'bg-rose-950/20 hover:bg-rose-950/40 text-rose-300'
                            : 'hover:bg-slate-800/40 text-slate-300'
                          }`}
                      >
                        <td className="py-1.5 px-3">{pkt.no}</td>
                        <td className="py-1.5 px-3">{pkt.time}</td>
                        <td className="py-1.5 px-3">{pkt.src}</td>
                        <td className="py-1.5 px-3">{pkt.dst}</td>
                        <td className="py-1.5 px-3">{pkt.proto}</td>
                        <td className="py-1.5 px-3 truncate max-w-xs">{pkt.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING WINDOW: BURP SUITE COMMUNITY EDITION                       */}
          {/* ------------------------------------------------------------------- */}
          {activeWindow === 'burp' && !minimizedWindows.has('burp') && (
            <div
              className={`absolute transition-all ${maximizedWindow === 'burp'
                ? 'inset-2 rounded-xl'
                : 'left-10 sm:left-18 top-8 sm:top-12 w-[660px] sm:w-[740px] max-w-[92%] h-[490px] max-h-[90%] rounded-xl'
                } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
            >
              <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span className="font-semibold text-xs text-slate-200">Burp Suite Community Edition v2024.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => minimizeWindow('burp')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    ―
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMaximize('burp')}
                    className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('burp')}
                    className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Burp Suite Tabs */}
              <div className="bg-[#121824] px-3 pt-1 border-b border-slate-800 flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBurpTab('proxy')}
                  className={`px-3 py-1 font-semibold rounded-t cursor-pointer ${burpTab === 'proxy' ? 'bg-[#1A2333] text-orange-400 border-t-2 border-orange-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  Proxy
                </button>
                <button
                  type="button"
                  onClick={() => setBurpTab('repeater')}
                  className={`px-3 py-1 font-semibold rounded-t cursor-pointer ${burpTab === 'repeater' ? 'bg-[#1A2333] text-orange-400 border-t-2 border-orange-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  Repeater
                </button>
              </div>

              {/* Burp Tab Body */}
              <div className="flex-1 bg-[#090D17] p-4 flex flex-col font-mono text-xs">
                {burpTab === 'proxy' ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBurpIntercept(!burpIntercept)}
                        className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${burpIntercept ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                      >
                        Intercept is {burpIntercept ? 'ON' : 'OFF'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { }}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                      >
                        Forward
                      </button>
                      <button
                        type="button"
                        onClick={() => { }}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                      >
                        Drop
                      </button>
                    </div>

                    <pre className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {`POST /login.php HTTP/1.1
Host: 192.168.1.105
User-Agent: Mozilla/5.0 Kali-Sandbox
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

username=admin&password=password123`}
                    </pre>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Request</span>
                        <button
                          type="button"
                          onClick={() => {
                            setBurpRepeaterResp('HTTP/1.1 200 OK\nDate: Fri, 11 Sep 2026 07:15:00 GMT\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Active brute-force attempt logged.</p>');
                          }}
                          className="px-2.5 py-0.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                      <textarea
                        value={burpRepeaterReq}
                        onChange={(e) => setBurpRepeaterReq(e.target.value)}
                        className="flex-1 p-3 rounded bg-[#0E1524] border border-slate-800 text-slate-200 resize-none focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-emerald-400 font-bold">Response</span>
                      <pre className="flex-1 p-3 rounded bg-[#0E1524] border border-slate-800 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                        {burpRepeaterResp}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* FLOATING LAB GUIDE TASK CARD (TOGGLED BY NEED HELP? OPEN LAB GUIDE) */}
          {/* ------------------------------------------------------------------- */}
          {showLabGuide && (
            <div className="absolute top-4 right-6 z-40 max-w-md bg-[#0D1422]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-2.5 text-left animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>MoSPI Cyber Investigation Task</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLabGuide(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Hide
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Use the Kali terminal or log viewer to find the suspicious external IP repeatedly attempting SSH logins.
                Type <code className="text-cyan-300 font-bold">cat /home/student/logs/network.log</code> or{' '}
                <code className="text-cyan-300 font-bold">nmap 192.168.1.105</code>.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyIp(TARGET_IP)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIp ? 'IP Copied to Clipboard!' : `Copy Attacker IP (${TARGET_IP})`}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.opener) window.close();
                    else navigate('/learner/assessment');
                  }}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer border border-slate-700"
                  title="Return to Assessment Tab"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM BAR: WORKSPACE SWITCHER & LAB GUIDE (MATCHING SCREENSHOT 2)     */}
      {/* ========================================================================= */}
      <div className="h-8 bg-[#0B0F19] text-slate-300 px-4 flex items-center justify-between border-t border-slate-800/80 shrink-0 select-none z-30 text-xs">
        {/* Left: Workspaces 1 2 3 4 */}
        <div className="flex items-center gap-1.5 font-mono">
          {[1, 2, 3, 4].map((ws) => (
            <button
              key={ws}
              type="button"
              onClick={() => setActiveWorkspace(ws)}
              className={`w-7 h-5.5 rounded-md flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${activeWorkspace === ws
                ? 'bg-[#1D4ED8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
            >
              {ws}
            </button>
          ))}
        </div>

        {/* Right: Need Help? Open Lab Guide */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLabGuide(!showLabGuide)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Need Help? <strong className="text-white hover:underline">Open Lab Guide</strong></span>
          </button>
        </div>
      </div>
    </div>
  );
};
