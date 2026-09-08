import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Power,
  Laptop,
  User,
  Maximize2,
  Minimize2,
  Folder,
  Terminal as TerminalIcon,
  Globe,
  X,
  Search,
  Copy,
  Check,
  RotateCcw,
  FileText,
  ArrowLeft,
  ShieldAlert,
  Radio,
  Settings,
  Activity,
  Layers,
  Save,
  Code,
  Cpu,
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

// Virtual File System Representation
interface VFile {
  content: string;
  size: number;
  perms: string;
  owner: string;
  group: string;
  date: string;
}

export const CyberVmFullScreenPage: React.FC = () => {
  // Mode: In-Browser Kali Sandbox vs Remote noVNC / Kasm Live Container
  const [vmMode, setVmMode] = useState<'sandbox' | 'remote'>('sandbox');
  const [remoteVmUrl, setRemoteVmUrl] = useState<string>('http://localhost:6080/vnc.html');
  const [showRemoteConfig, setShowRemoteConfig] = useState<boolean>(false);

  // Active GUI Windows in Kali desktop
  const [activeWindow, setActiveWindow] = useState<'terminal' | 'editor' | 'wireshark' | 'zenmap' | 'burp' | 'browser' | 'none'>('terminal');
  const [showWhiskerMenu, setShowWhiskerMenu] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(1457);
  const [copiedIp, setCopiedIp] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(true);

  // Shell State
  const [currentDir, setCurrentDir] = useState<string>('/home/kali');
  const [currentUser, setCurrentUser] = useState<'kali' | 'root'>('kali');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [envVars, setEnvVars] = useState<Record<string, string>>({
    USER: 'kali',
    HOME: '/home/kali',
    SHELL: '/bin/bash',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    TERM: 'xterm-256color',
  });

  // Interactive Sub-Shell Modes (Python REPL, Metasploit msfconsole, Nano Editor)
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

  // Installed Packages
  const [installedPackages, setInstalledPackages] = useState<Set<string>>(
    new Set(['nmap', 'wireshark', 'hydra', 'sqlmap', 'gobuster', 'nikto', 'john', 'python3', 'tcpdump', 'curl', 'wget', 'netcat', 'nano'])
  );

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // In-Memory Virtual Filesystem State
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
      content: 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User,,,:/home/kali:/bin/bash\nstudent:x:1001:1001:MoSPI Cadet:/home/student:/bin/bash\nsshd:x:110:65534::/run/sshd:/usr/sbin/nologin',
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

  // Mousepad Text Editor State
  const [editorFile, setEditorFile] = useState<string>('/home/student/logs/network.log');
  const [editorContent, setEditorContent] = useState<string>(DEFAULT_LOG_CONTENT);
  const [editorSearch, setEditorSearch] = useState<string>('');
  const [editorSaveNotice, setEditorSaveNotice] = useState<string>('');

  // Wireshark Filter State
  const [wiresharkFilter, setWiresharkFilter] = useState<string>('');
  const [appliedWiresharkFilter, setAppliedWiresharkFilter] = useState<string>('');
  const [selectedPacketNo, setSelectedPacketNo] = useState<number>(1);

  // Zenmap GUI State
  const [zenmapTarget, setZenmapTarget] = useState<string>('192.168.1.105');
  const [zenmapProfile, setZenmapProfile] = useState<string>('Intense scan');
  const [zenmapScanning, setZenmapScanning] = useState<boolean>(false);
  const [zenmapOutput, setZenmapOutput] = useState<string>(`Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-27 14:26 IST\nNmap scan report for 192.168.1.105\nHost is up (0.0012s latency).\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6\n80/tcp    open  http        Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\n\n[!] Alert: 192.168.1.105 initiated repeated failed SSH credentials.`);

  // Burp Suite State
  const [burpIntercept, setBurpIntercept] = useState<boolean>(false);
  const [burpTab, setBurpTab] = useState<'proxy' | 'repeater'>('proxy');
  const [burpRepeaterReq, setBurpRepeaterReq] = useState<string>('GET /login.php HTTP/1.1\nHost: 192.168.1.105\nUser-Agent: Mozilla/5.0 Kali-Sandbox\nAccept: */*\n');
  const [burpRepeaterResp, setBurpRepeaterResp] = useState<string>('HTTP/1.1 200 OK\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Login with administrative credentials.</p>');

  // Browser App State
  const [browserUrl, setBrowserUrl] = useState<string>('http://192.168.1.105');

  // Terminal Output History
  const [outputHistory, setOutputHistory] = useState<Array<{
    user: 'kali' | 'root';
    dir: string;
    cmd: string;
    output: string;
    promptPrefix?: string;
  }>>([
    {
      user: 'kali',
      dir: '~',
      cmd: 'uname -a && cat /home/student/logs/network.log | grep -m 3 "Failed password"',
      output: `Linux kali-sandbox 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 (2024-01-08) x86_64 GNU/Linux\nAug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2\nAug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2\nAug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2`,
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
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
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

      // Handle print(...)
      if (line.startsWith('print(') && line.endsWith(')')) {
        const expr = line.substring(6, line.length - 1).trim();
        // String literal
        if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
          prints.push(expr.slice(1, -1));
        } else if (expr.startsWith('f"') || expr.startsWith("f'")) {
          // f-string basic resolution
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
          // Try evaluating arithmetic expression
          try {
            // Safe evaluation of simple math
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

      // Variable assignments: var = value
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

      // For loop simulation: for p in ports: print(...)
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

    // =========================================================================
    // SUB-SHELL: PYTHON REPL (>>>)
    // =========================================================================
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

    // =========================================================================
    // SUB-SHELL: METASPLOIT FRAMEWORK (msf6 > )
    // =========================================================================
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
        const key = parts[1]?.toUpperCase();
        const val = parts[2];
        if (key && val) {
          setMsfOptions((p) => ({ ...p, [key]: val }));
          setOutputHistory((prev) => [
            ...prev,
            { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `${key} => ${val}`, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
          ]);
          return;
        }
      }

      if (trimmed === 'run' || trimmed === 'exploit') {
        const out = `[*] 192.168.1.105:22 - Starting SSH login scan\n[*] 192.168.1.105:22 - Trying 'admin:password'\n[+] 192.168.1.105:22 - Success: 'admin:password' 'uid=1001(admin) gid=1001(admin)'\n[*] Command shell session 1 opened (192.168.1.50:44321 -> 192.168.1.105:22)\n[*] Auxiliary module execution completed`;
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: out, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
        ]);
        return;
      }

      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[-] Unknown command: ${trimmed}. Type 'help', 'search', 'use', 'show options', 'set', 'run', or 'exit'.`, promptPrefix: msfModule ? `msf6 ${msfModule} > ` : 'msf6 > ' },
      ]);
      return;
    }

    // =========================================================================
    // PIPELINES & REDIRECTIONS (| and >)
    // =========================================================================
    if (trimmed.includes('|')) {
      const parts = trimmed.split('|').map((s) => s.trim());
      let pipelineOutput = '';

      for (let i = 0; i < parts.length; i++) {
        const sub = parts[i];
        if (i === 0) {
          pipelineOutput = runSingleCommand(sub);
        } else if (sub.startsWith('grep')) {
          const isInv = sub.includes('-v');
          const isIns = sub.includes('-i');
          const match = sub.replace(/^grep\s*/, '').replace(/-[a-zA-Z]+\s*/g, '').replace(/['"]/g, '').trim();
          pipelineOutput = pipelineOutput
            .split('\n')
            .filter((line) => {
              const has = isIns ? line.toLowerCase().includes(match.toLowerCase()) : line.includes(match);
              return isInv ? !has : has;
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

    // Command Chaining (&&)
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
        return 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168924 13540 ?        Ss   11:00   0:01 /sbin/init\nroot       412  0.0  0.1  24128  9520 ?        Ss   11:01   0:00 /usr/sbin/sshd -D\nkali       782  0.0  0.2 384120 28140 tty1     S+   11:02   0:02 /usr/bin/qterminal\nkali       810  0.0  0.1  12480  5400 pts/0    Ss   11:02   0:00 /bin/bash';

      case 'echo': {
        const text = args.join(' ');
        // Variable interpolation: $VAR
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
        return `bash: cd: ${target}: No such file or directory`;
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
          '/var': ['log', 'tmp', 'cache'],
          '/var/log': ['nginx', 'apt'],
          '/usr': ['bin', 'lib', 'share'],
          '/usr/share': ['wordlists'],
          '/usr/share/wordlists': ['dirb'],
        };

        const subdirs = standardSubdirs[targetDir] || [];

        if (showLong) {
          const dirLines = subdirs.map(
            (d) => `drwxr-xr-x 2 ${currentUser} ${currentUser} 4096 Aug 27 14:00 ${d}`
          );
          const fileLines = filesInDir.map((f) => {
            const basename = f.split('/').pop();
            const meta = vfs[f];
            return `${meta.perms} 1 ${meta.owner} ${meta.group} ${meta.size} ${meta.date} ${basename}`;
          });
          const allLines = [...dirLines, ...fileLines];
          return `total ${allLines.length * 4}\n${allLines.join('\n')}`;
        }

        const items = [...subdirs, ...filesInDir.map((f) => f.split('/').pop())];
        if (showAll) {
          items.unshift('.', '..');
        }
        return items.join('  ');
      }

      case 'cat': {
        if (!args[0]) return 'cat: missing operand';
        const targetPath = resolvePath(args[0]);
        if (vfs[targetPath]) {
          return vfs[targetPath].content;
        }
        return `cat: ${args[0]}: No such file or directory`;
      }

      case 'grep': {
        const isInv = args.some((a) => a.includes('v'));
        const isIns = args.some((a) => a.includes('i'));
        const pattern = args.find((a) => !a.startsWith('-'))?.replace(/['"]/g, '') || '';
        const file = args[args.length - 1];
        if (!file || file === pattern) return 'grep: missing file operand';
        const targetPath = resolvePath(file);
        if (vfs[targetPath]) {
          const matches = vfs[targetPath].content
            .split('\n')
            .filter((l) => {
              const has = isIns ? l.toLowerCase().includes(pattern.toLowerCase()) : l.includes(pattern);
              return isInv ? !has : has;
            })
            .join('\n');
          return matches || 'No matches found.';
        }
        return `grep: ${file}: No such file or directory`;
      }

      case 'head': {
        const file = args[args.length - 1];
        const targetPath = resolvePath(file);
        if (vfs[targetPath]) {
          return vfs[targetPath].content.split('\n').slice(0, 10).join('\n');
        }
        return `head: cannot open '${file}': No such file or directory`;
      }

      case 'tail': {
        const file = args[args.length - 1];
        const targetPath = resolvePath(file);
        if (vfs[targetPath]) {
          return vfs[targetPath].content.split('\n').slice(-10).join('\n');
        }
        return `tail: cannot open '${file}': No such file or directory`;
      }

      case 'wc': {
        const file = args[args.length - 1];
        const targetPath = resolvePath(file);
        if (vfs[targetPath]) {
          const content = vfs[targetPath].content;
          const lines = content.split('\n').length;
          const words = content.split(/\s+/).filter(Boolean).length;
          const bytes = content.length;
          if (args.includes('-l')) return `${lines} ${file}`;
          return `${lines} ${words} ${bytes} ${file}`;
        }
        return `wc: ${file}: No such file or directory`;
      }

      case 'touch': {
        if (!args[0]) return 'touch: missing file operand';
        const p = resolvePath(args[0]);
        setVfs((prev) => ({
          ...prev,
          [p]: {
            content: '',
            size: 0,
            perms: '-rw-r--r--',
            owner: currentUser,
            group: currentUser,
            date: 'Aug 27 14:26',
          },
        }));
        return '';
      }

      case 'mkdir': {
        if (!args[0]) return 'mkdir: missing operand';
        return `[+] Created directory ${args[0]}`;
      }

      case 'cp': {
        if (args.length < 2) return 'cp: missing destination file operand';
        const src = resolvePath(args[0]);
        const dst = resolvePath(args[1]);
        if (!vfs[src]) return `cp: cannot stat '${args[0]}': No such file or directory`;
        setVfs((prev) => ({
          ...prev,
          [dst]: { ...vfs[src], date: 'Aug 27 14:28' },
        }));
        return '';
      }

      case 'mv': {
        if (args.length < 2) return 'mv: missing destination file operand';
        const src = resolvePath(args[0]);
        const dst = resolvePath(args[1]);
        if (!vfs[src]) return `mv: cannot stat '${args[0]}': No such file or directory`;
        setVfs((prev) => {
          const next = { ...prev };
          next[dst] = { ...next[src] };
          delete next[src];
          return next;
        });
        return '';
      }

      case 'rm': {
        if (!args[0]) return 'rm: missing operand';
        const p = resolvePath(args[args.length - 1]);
        if (vfs[p]) {
          const next = { ...vfs };
          delete next[p];
          setVfs(next);
          return '';
        }
        return `rm: cannot remove '${args[0]}': No such file or directory`;
      }

      case 'chmod': {
        if (args.length < 2) return 'chmod: missing operand';
        const p = resolvePath(args[1]);
        if (vfs[p]) {
          setVfs((prev) => ({
            ...prev,
            [p]: { ...prev[p], perms: '-rwxr-xr-x' },
          }));
          return '';
        }
        return `chmod: cannot access '${args[1]}': No such file or directory`;
      }

      case 'find': {
        const searchPath = resolvePath(args[0] || '.');
        const nameIdx = args.indexOf('-name');
        const pattern = nameIdx !== -1 ? args[nameIdx + 1]?.replace(/['"]/g, '') : '';
        const matches = Object.keys(vfs).filter((p) => {
          if (!p.startsWith(searchPath)) return false;
          if (pattern) return p.includes(pattern);
          return true;
        });
        return matches.join('\n') || 'No files found.';
      }

      case 'tree':
        return `.\n├── Desktop\n├── Documents\n├── Downloads\n├── Tools\n├── analyze_traffic.sh\n├── network.log -> /home/student/logs/network.log\n├── notes.txt\n└── scan.py\n\n4 directories, 4 files`;

      case 'file': {
        const p = resolvePath(args[0] || '');
        if (vfs[p]) {
          if (p.endsWith('.py')) return `${args[0]}: Python script, ASCII text executable`;
          if (p.endsWith('.sh')) return `${args[0]}: Bourne-Again shell script, ASCII text executable`;
          if (p.endsWith('.log')) return `${args[0]}: ASCII text, with very long lines (1842)`;
          return `${args[0]}: ASCII text`;
        }
        return `${args[0]}: cannot open (No such file or directory)`;
      }

      case 'which': {
        const tool = args[0];
        if (installedPackages.has(tool) || ['ls', 'cd', 'cat', 'pwd', 'grep', 'bash', 'sh'].includes(tool)) {
          return `/usr/bin/${tool}`;
        }
        return '';
      }

      // =======================================================================
      // PYTHON RUNNER
      // =======================================================================
      case 'python':
      case 'python3': {
        if (args.length === 0) {
          setSubShellMode('python');
          return 'Python 3.11.8 (main, Feb  7 2024, 21:52:08) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\nUse exit() or quit() to return to bash.';
        }
        if (args[0] === '-c') {
          const code = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
          return runPythonCode(code);
        }
        const filePath = resolvePath(args[0]);
        if (vfs[filePath]) {
          return runPythonCode(vfs[filePath].content);
        }
        return `python3: can't open file '${args[0]}': [Errno 2] No such file or directory`;
      }

      // =======================================================================
      // BASH SCRIPT RUNNER
      // =======================================================================
      case 'bash':
      case 'sh': {
        if (!args[0]) return 'bash: Interactive subshell already active.';
        const filePath = resolvePath(args[0]);
        if (vfs[filePath]) {
          const lines = vfs[filePath].content.split('\n');
          const scriptOuts: string[] = [];
          for (const l of lines) {
            const tr = l.trim();
            if (!tr || tr.startsWith('#')) continue;
            const res = runSingleCommand(tr);
            if (res) scriptOuts.push(res);
          }
          return scriptOuts.join('\n');
        }
        return `bash: ${args[0]}: No such file or directory`;
      }

      // =======================================================================
      // KALI PENTESTING & CYBERSECURITY TOOLS
      // =======================================================================
      case 'msfconsole': {
        setSubShellMode('msfconsole');
        return `\n      .:okOOOkdc'           'cdkOOOko:.\n    .xOOOOOOOOOOOOc       cOOOOOOOOOOOOx.\n   :OOOOOOOOOOOOOOOk:   :kOOOOOOOOOOOOOOO:\n  'OOOOOOOOOOOOOOOOOO: :OOOOOOOOOOOOOOOOOO'\n  kOOOOOOOOOOOOOOOOOOO-OOOOOOOOOOOOOOOOOOOk\n  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO\n  kOOOOOOOOOOOOOOOOOOO-OOOOOOOOOOOOOOOOOOOk\n  'OOOOOOOOOOOOOOOOOO: :OOOOOOOOOOOOOOOOOO'\n   :OOOOOOOOOOOOOOOk:   :kOOOOOOOOOOOOOOO:\n    .xOOOOOOOOOOOOc       cOOOOOOOOOOOOx.\n      .:okOOOkdc'           'cdkOOOko:.\n\n       =[ metasploit v6.3.55-dev                          ]\n+ -- --=[ 2381 exploits - 1232 auxiliary - 413 post       ]\n+ -- --=[ 1391 payloads - 46 encoders - 11 nops            ]\n+ -- --=[ Free Kali Metasploit Sandbox Edition            ]\n\nType 'search ssh', 'use auxiliary/scanner/ssh/ssh_login', 'show options', 'run', or 'exit'`;
      }

      case 'nmap': {
        const target = args.find((a) => !a.startsWith('-')) || TARGET_IP;
        return `Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-27 14:26 IST\nNmap scan report for ${target}\nHost is up (0.0012s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6\n80/tcp    open  http        Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\nMAC Address: 08:00:27:B4:9A:12 (Cadmus Computer Systems)\n\n[!] Note: ${target} is the detected origin of repeated failed SSH authentication attempts.\nNmap done: 1 IP address (1 host up) scanned in 1.48 seconds`;
      }

      case 'hydra': {
        return `Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - For legal security testing only\n[DATA] max 16 tasks per target, 1 target, 10 login tries (l:admin/p:10)\n[DATA] attacking ssh://192.168.1.105:22/\n[STATUS] 10.00 tries/min, 10 tries in 00:01h, 0 to do in 00:00h, 1 active\n[22][ssh] host: 192.168.1.105   login: admin   password: password (SUCCESS)\n1 of 1 target completed, 1 valid password found`;
      }

      case 'sqlmap': {
        return `        ___\n       __H__\n ___ ___[.]_____ ___ ___  {1.7.11#stable}\n|_ -| . [)]     | .'| . |\n|___|_  ["]_|_|_|__,|  _|\n      |_|V...       |_|   https://sqlmap.org\n\n[*] starting @ 14:28:10 /2026-08-27/\n[14:28:10] [INFO] testing connection to the target URL\n[14:28:11] [INFO] checking if the target is vulnerable to SQL injection\n[14:28:12] [INFO] GET parameter 'id' is vulnerable: boolean-based blind, error-based\navailable databases [3]:\n[*] information_schema\n[*] mospi_cyber_lab\n[*] mysql`;
      }

      case 'gobuster':
      case 'dirb': {
        return `===============================================================\nGobuster v3.6 - Directory Enumeration Mode\n===============================================================\n[+] Url:         http://192.168.1.105\n[+] Wordlist:    /usr/share/wordlists/dirb/common.txt\n===============================================================\n/admin                (Status: 403) [Size: 277]\n/api                  (Status: 200) [Size: 142]\n/backup.tar.gz        (Status: 200) [Size: 84920]\n/index.html           (Status: 200) [Size: 1062]\n/login.php            (Status: 200) [Size: 3120]\n/robots.txt           (Status: 200) [Size: 45]\n===============================================================\nFinished`;
      }

      case 'nikto': {
        return `- Nikto v2.5.0\n---------------------------------------------------------------------------\n+ Target IP:          192.168.1.105:80\n+ Server:             Apache/2.4.52 (Ubuntu)\n+ [!] Missing anti-clickjacking X-Frame-Options header.\n+ [!] The X-Content-Type-Options header is not set.\n+ Root page / redirects to /login.php\n+ /admin/: Directory indexing found or forbidden access.\n+ /backup.tar.gz: Interesting backup archive file found.\n+ 7842 requests: 0 error(s) and 4 item(s) reported`;
      }

      case 'john': {
        return `Created directory: /home/kali/.john\nLoaded 1 password hash (sha512crypt [SHA512 256/256 AVX2 4x])\npassword         (admin)\n1g 0:00:00:00 DONE (2026-08-27 14:29) 50.00g/s 4500p/s 4500c/s 4500C/s password..admin\nUse the "--show" option to display all of the cracked passwords reliably`;
      }

      case 'curl': {
        const isHeaderOnly = args.includes('-I') || args.includes('-i');
        const url = args.find((a) => !a.startsWith('-')) || 'http://192.168.1.105';
        if (isHeaderOnly) {
          return `HTTP/1.1 200 OK\nDate: Tue, 27 Aug 2026 14:29:10 GMT\nServer: Apache/2.4.52 (Ubuntu)\nContent-Type: text/html; charset=UTF-8\nContent-Length: 420\nConnection: keep-alive\nURL: ${url}`;
        }
        return `<!DOCTYPE html>\n<html>\n<head><title>MoSPI Target Server - Authentication Portal</title></head>\n<body style="font-family:sans-serif;background:#111;color:#eee;text-align:center;padding:50px;">\n  <h1>MoSPI Cyber Range - Target Node</h1>\n  <p>Requested URL: ${url}</p>\n  <p>IP Address: 192.168.1.105</p>\n  <p>Status: Host is active. 5 failed SSH authentication attempts logged from this host.</p>\n  <div style="background:#222;display:inline-block;padding:20px;border-radius:8px;border:1px solid #444;">\n    <p>Target Identified: <strong>192.168.1.105</strong></p>\n    <p>Please enter this IP in your Assessment Portal.</p>\n  </div>\n</body>\n</html>`;
      }

      case 'wget': {
        const fileToGet = args[0] || 'http://192.168.1.105/backup.tar.gz';
        const filename = fileToGet.split('/').pop() || 'index.html';
        const targetPath = resolvePath(filename);
        setVfs((prev) => ({
          ...prev,
          [targetPath]: {
            content: '[TAR ARCHIVE DATA - MoSPI BACKUP FILE]',
            size: 84920,
            perms: '-rw-r--r--',
            owner: currentUser,
            group: currentUser,
            date: 'Aug 27 14:29',
          },
        }));
        return `--2026-08-27 14:29:30--  ${fileToGet}\nConnecting to 192.168.1.105:80... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 84920 (83K) [application/gzip]\nSaving to: '${filename}'\n\n${filename}        100%[===================>]  82.93K  --.-KB/s    in 0.002s\n\n2026-08-27 14:29:30 (41.5 MB/s) - '${filename}' saved [84920/84920]`;
      }

      case 'nc':
      case 'netcat': {
        if (args.includes('-lvnp')) {
          return 'listening on [any] 4444 ...\nconnect to [192.168.1.50] from (UNKNOWN) [192.168.1.105] 51234\nLinux target-host 5.15.0-89-generic #99-Ubuntu SMP\n$ whoami\nadmin';
        }
        return 'SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6\n^C';
      }

      case 'ifconfig':
      case 'ip':
        return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.50  netmask 255.255.255.0  broadcast 192.168.1.255\n        inet6 fe80::5054:ff:fe12:3456  prefixlen 64  scopeid 0x20<link>\n        ether 52:54:00:12:34:56  txqueuelen 1000  (Ethernet)\n        RX packets 14523  bytes 12984512 (12.3 MiB)\n        TX packets 9840  bytes 1420912 (1.3 MiB)\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n        loop  txqueuelen 1000  (Local Loopback)`;

      case 'netstat':
      case 'ss':
        return 'State      Recv-Q Send-Q Local Address:Port               Peer Address:Port\nLISTEN     0      128    0.0.0.0:22                      0.0.0.0:*\nLISTEN     0      511    0.0.0.0:80                      0.0.0.0:*\nESTAB      0      0      192.168.1.50:22                 10.0.0.12:52310\nSYN_RECV   0      0      192.168.1.50:22                 192.168.1.105:44328';

      case 'arp':
        return 'Address                  HWtype  HWaddress           Flags Mask            Iface\n192.168.1.1              ether   52:54:00:12:35:02   C                     eth0\n192.168.1.105            ether   08:00:27:b4:9a:12   C                     eth0';

      case 'ping': {
        const host = args.find((a) => !a.startsWith('-')) || '192.168.1.105';
        return `PING ${host} (${host}) 56(84) bytes of data.\n64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.842 ms\n64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.791 ms\n64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.815 ms\n--- ${host} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2003ms`;
      }

      case 'traceroute': {
        const host = args[0] || '192.168.1.105';
        return `traceroute to ${host} (${host}), 30 hops max, 60 byte packets\n 1  _gateway (192.168.1.1)  0.245 ms  0.198 ms  0.180 ms\n 2  ${host} (${host})  0.782 ms  0.741 ms  0.710 ms`;
      }

      case 'tcpdump':
        return `tcpdump: verbose output suppressed, use -v[v]... for full protocol decode\nlistening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes\n14:22:05.129482 IP 192.168.1.105.44321 > kali-sandbox.ssh: Flags [S], seq 382910481\n14:22:08.410291 IP 192.168.1.105.44322 > kali-sandbox.ssh: Flags [S], seq 920491820\n14:22:11.890124 IP 192.168.1.105.44324 > kali-sandbox.ssh: Flags [S], seq 481029381\n14:22:15.109284 IP 192.168.1.105.44326 > kali-sandbox.ssh: Flags [S], seq 192039182\n4 packets captured, 4 packets received by filter, 0 packets dropped by kernel`;

      case 'wireshark':
        setActiveWindow('wireshark');
        return '[+] Launching Wireshark Packet Analyzer on eth0...';

      case 'zenmap':
        setActiveWindow('zenmap');
        return '[+] Opening Zenmap Graphical Network Scanner...';

      case 'burpsuite':
      case 'burp':
        setActiveWindow('burp');
        return '[+] Launching Burp Suite Community Edition...';

      case 'chromium':
      case 'browser':
        setActiveWindow('browser');
        return '[+] Launching Chromium Web Browser...';

      case 'gedit':
      case 'mousepad': {
        const target = args[0] || '/home/student/logs/network.log';
        const p = resolvePath(target);
        if (vfs[p]) {
          setEditorFile(p);
          setEditorContent(vfs[p].content);
          setActiveWindow('editor');
          return `[+] Opened ${p} in Mousepad Text Editor.`;
        }
        return `mousepad: ${target}: File does not exist yet. Use 'nano ${target}' to create it.`;
      }

      case 'nano':
      case 'vim':
      case 'vi': {
        const target = args[0] || 'untitled.txt';
        const p = resolvePath(target);
        setNanoEditingFile(p);
        setNanoBuffer(vfs[p]?.content || '');
        setSubShellMode('nano');
        return '';
      }

      case 'apt':
      case 'apt-get': {
        const subAction = args[0];
        if (subAction === 'update') {
          return 'Get:1 http://http.kali.org/kali kali-rolling InRelease [41.2 kB]\nGet:2 http://http.kali.org/kali kali-rolling/main amd64 Packages [19.8 MB]\nFetched 19.8 MB in 1s (18.2 MB/s)\nReading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nAll packages are up to date.';
        }
        if (subAction === 'install') {
          const pkg = args[1] || 'tools';
          setInstalledPackages((prev) => new Set(prev).add(pkg));
          return `Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  ${pkg}\n0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 14.2 MB of archives.\nUnpacking ${pkg} (2024.1) ...\nSetting up ${pkg} (2024.1) ...\n[+] Package '${pkg}' successfully installed and ready to use!`;
        }
        return `Usage: apt [update | install <package> | search <name>]`;
      }

      case 'systemctl':
      case 'service': {
        const service = args[1] || args[0] || 'sshd';
        return `● ${service}.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/${service}.service; enabled; preset: enabled)\n     Active: active (running) since Tue 2026-08-27 11:00:00 IST; 3h 26min ago\n   Main PID: 412 (sshd)\n      Tasks: 1 (limit: 18841)\n     Memory: 9.2M`;
      }

      case 'sudo': {
        if (args[0] === 'su' || args[0] === '-i' || args[0] === 'bash') {
          setCurrentUser('root');
          return '[sudo] password for kali: *******\nroot@kali-sandbox:~# ';
        }
        const cmdAfterSudo = args.join(' ');
        return runSingleCommand(cmdAfterSudo);
      }

      case 'su': {
        if (!args[0] || args[0] === 'root') {
          setCurrentUser('root');
          return 'Password: \nroot@kali-sandbox:~# ';
        }
        if (args[0] === 'kali') {
          setCurrentUser('kali');
          return 'kali@kali-sandbox:~$ ';
        }
        return `su: user '${args[0]}' does not exist`;
      }

      case 'exit': {
        if (currentUser === 'root') {
          setCurrentUser('kali');
          return 'exit: switched to user kali';
        }
        return 'exit: session active (use top bar End Session to leave)';
      }

      case 'man': {
        const tool = args[0] || 'bash';
        return `NAME\n       ${tool} - Kali Linux system utility and pentesting tool\n\nSYNOPSIS\n       ${tool} [OPTIONS] [TARGET]\n\nDESCRIPTION\n       Kali Linux standard tool execution engine. Run with --help for command-specific flags.`;
      }

      case 'help':
        return `Kali Linux Sandbox Shell - User Freedom Suite:\n• File Ops: ls -la, cd <dir>, pwd, cat <f>, head, tail, grep, echo, touch, mkdir, cp, mv, rm, tree, wc\n• Scripting: python3 <script.py>, python3 -c "print('hello')", bash <script.sh>\n• In-Terminal Editor: nano <file> or vim <file>\n• Pentesting: nmap, msfconsole, hydra, sqlmap, gobuster, dirb, nikto, john, tcpdump, wireshark\n• Network: ifconfig, ip a, netstat, ss, arp, ping, traceroute, curl, wget, nc\n• Package Manager: apt update, apt install <package>\n• Redirection: pipes (|), output write (>), output append (>>), command chaining (&&)\n• Privilege: sudo su, su kali, exit\n• Lab Target: cat /home/student/logs/network.log (Target: 192.168.1.105)`;

      default:
        // If unknown command, check if user tried running arbitrary command or tool
        return `bash: ${cmd}: command not found. (Tip: Use 'apt install ${cmd}' or type 'help' for available tools).`;
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(nextIdx);
          setTerminalInput(commandHistory[nextIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete file names in current dir or common commands
      const tokens = terminalInput.split(' ');
      const last = tokens[tokens.length - 1];
      const match = Object.keys(vfs)
        .map((p) => p.split('/').pop() || '')
        .find((name) => name.startsWith(last));
      if (match) {
        tokens[tokens.length - 1] = match;
        setTerminalInput(tokens.join(' '));
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
    setTerminalInput('');
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Save changes from Mousepad back to VFS
  const handleSaveEditor = () => {
    setVfs((prev) => ({
      ...prev,
      [editorFile]: {
        content: editorContent,
        size: editorContent.length,
        perms: '-rw-r--r--',
        owner: currentUser,
        group: currentUser,
        date: 'Aug 27 14:30',
      },
    }));
    setEditorSaveNotice('Saved to disk successfully!');
    setTimeout(() => setEditorSaveNotice(''), 2500);
  };

  // Save changes from Nano modal
  const handleSaveNano = () => {
    setVfs((prev) => ({
      ...prev,
      [nanoEditingFile]: {
        content: nanoBuffer,
        size: nanoBuffer.length,
        perms: '-rw-r--r--',
        owner: currentUser,
        group: currentUser,
        date: 'Aug 27 14:30',
      },
    }));
    setSubShellMode('bash');
    setOutputHistory((prev) => [
      ...prev,
      {
        user: currentUser,
        dir: currentDir.replace('/home/kali', '~'),
        cmd: `nano ${nanoEditingFile.split('/').pop()}`,
        output: `[+] File '${nanoEditingFile}' saved (${nanoBuffer.length} bytes).`,
      },
    ]);
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

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0A0E17] flex flex-col select-none text-slate-200 font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP SIMULATED BROWSER / SESSION BAR                                    */}
      {/* ========================================================================= */}
      <header className="bg-[#121824] text-slate-200 border-b border-cyan-900/40 px-4 py-2 flex items-center justify-between gap-4 shrink-0 shadow-md z-40">
        {/* Left: Window traffic lights & Tab */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => window.close()}
              className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
              title="Close Tab"
            />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-xs" />
            <button
              type="button"
              onClick={toggleNativeFullscreen}
              className="w-3 h-3 rounded-full bg-[#10B981] hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
              title="Toggle Fullscreen"
            />
          </div>

          {/* Browser Active Tab */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1A2333] border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Kali Linux 2024 · Real Sandbox VM</span>
            <button type="button" onClick={() => window.close()} title="Close VM session">
              <X className="w-3 h-3 text-slate-400 hover:text-white cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Center: Address Bar + Mode Toggle */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={() => setSessionSecondsLeft(1457)}
              title="Reset Sandbox Session"
              className="p-1 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between px-3.5 py-1 rounded-full bg-[#0B101B] border border-cyan-900/60 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">🔒</span>
              <span className="text-slate-200">lab.samarthya.gov.in/kali/session-id-4912</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60 font-sans font-bold">
              {vmMode === 'sandbox' ? 'Isolated Sandbox VM' : 'Live Docker / noVNC VM'}
            </span>
          </div>

          {/* Remote VM Config Button */}
          <button
            type="button"
            onClick={() => setShowRemoteConfig(!showRemoteConfig)}
            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              showRemoteConfig ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-[#1A2333] border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Configure Remote Docker / noVNC VM"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="text-[11px] font-sans">VM Link</span>
          </button>
        </div>

        {/* Right: Timer, Fullscreen & End Session */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-[#0B101B] px-3 py-1 rounded-md border border-cyan-900/60 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTimer(sessionSecondsLeft)}</span>
          </div>

          <button
            type="button"
            onClick={toggleNativeFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1A2333] hover:bg-[#223046] text-slate-200 text-xs font-semibold transition-all cursor-pointer border border-slate-700"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.close()}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Power className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </header>

      {/* Optional Remote VM Configuration Modal */}
      {showRemoteConfig && (
        <div className="bg-[#141C2B] border-b border-cyan-800/50 p-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs z-40 animate-fadeIn">
          <div className="space-y-1.5 flex-1 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-bold text-slate-200">Connect to Real Local / Cloud Kali Docker VM (noVNC / Kasm):</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={remoteVmUrl}
                onChange={(e) => setRemoteVmUrl(e.target.value)}
                placeholder="e.g. http://localhost:6080/vnc.html or http://localhost:6901"
                className="flex-1 px-3 py-1 rounded bg-[#0A0E17] border border-cyan-700/50 text-cyan-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Quick run command for real container: <code className="text-emerald-400">docker run --rm -p 6080:6901 -e VNC_PW=password kasmweb/kali:1.15.0</code>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setVmMode(vmMode === 'sandbox' ? 'remote' : 'sandbox');
                setShowRemoteConfig(false);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer transition-colors shadow-xs"
            >
              {vmMode === 'sandbox' ? 'Switch to Live Container (noVNC)' : 'Switch to High-Speed Sandbox VM'}
            </button>
            <button
              type="button"
              onClick={() => setShowRemoteConfig(false)}
              className="px-2.5 py-1 text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KALI LINUX ENVIRONMENT (SANDBOX OR REMOTE NOVNC EMBED)                 */}
      {/* ========================================================================= */}
      {vmMode === 'remote' ? (
        <iframe
          src={remoteVmUrl}
          title="Remote Kali Linux VM (noVNC)"
          className="flex-1 w-full h-full border-0 bg-black"
          allow="fullscreen; clipboard-read; clipboard-write"
        />
      ) : (
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0E17]">
          {/* --------------------------------------------------------------------- */}
          {/* KALI XFCE / WHISKER TOP PANEL                                         */}
          {/* --------------------------------------------------------------------- */}
          <div className="h-7 bg-[#0E1524] px-3 flex items-center justify-between text-xs text-slate-300 font-medium border-b border-cyan-900/30 shrink-0 select-none z-30">
            {/* Left: Kali Dragon Whisker Menu Button & App Launchers */}
            <div className="flex items-center gap-2.5">
              {/* Kali Dragon Menu Icon */}
              <button
                type="button"
                onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                  showWhiskerMenu
                    ? 'bg-cyan-500 text-black font-bold shadow-sm'
                    : 'bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/40'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="font-bold text-[11px] tracking-wide">Applications</span>
              </button>

              <div className="h-4 w-px bg-slate-700" />

              {/* Workspaces */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="px-1.5 py-0.2 rounded bg-cyan-600 text-white font-bold">1</span>
                <span className="px-1.5 py-0.2 rounded hover:bg-white/10 text-slate-400 cursor-pointer">2</span>
              </div>

              <div className="h-4 w-px bg-slate-700" />

              {/* Quick Launchers */}
              <button
                type="button"
                onClick={() => setActiveWindow('terminal')}
                className="p-1 rounded hover:bg-white/10 text-emerald-400 cursor-pointer transition-colors"
                title="QTerminal"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditorFile('/home/student/logs/network.log');
                  setEditorContent(DEFAULT_LOG_CONTENT);
                  setActiveWindow('editor');
                }}
                className="p-1 rounded hover:bg-white/10 text-amber-400 cursor-pointer transition-colors"
                title="Mousepad Text Editor"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveWindow('wireshark')}
                className="p-1 rounded hover:bg-white/10 text-blue-400 cursor-pointer transition-colors"
                title="Wireshark"
              >
                <Activity className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveWindow('zenmap')}
                className="p-1 rounded hover:bg-white/10 text-purple-400 cursor-pointer transition-colors"
                title="Zenmap (Nmap GUI)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveWindow('burp')}
                className="p-1 rounded hover:bg-white/10 text-orange-400 cursor-pointer transition-colors"
                title="Burp Suite Community"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveWindow('browser')}
                className="p-1 rounded hover:bg-white/10 text-cyan-400 cursor-pointer transition-colors"
                title="Chromium Web Browser"
              >
                <Globe className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Center: System Status */}
            <div className="text-center font-mono text-[11px] text-slate-300">
              Aug 27 14:26:30 | <span className="text-cyan-400 font-bold">kali-sandbox</span> (6.6.9-amd64)
            </div>

            {/* Right: Net / User / Audio / Power */}
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span className="hidden lg:inline">eth0: 192.168.1.50</span>
              </span>
              <span className="flex items-center gap-1 text-slate-200 font-semibold text-[11px]">
                <User className="w-3 h-3 text-cyan-400" />
                <span>{currentUser}</span>
              </span>
              <span className="text-[11px]">🔊</span>
              <button type="button" onClick={() => window.close()} title="Power off / End session">
                <Power className="w-3 h-3 text-slate-300 hover:text-red-400 cursor-pointer" />
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* WHISKER APPLICATION MENU POPUP                                        */}
          {/* --------------------------------------------------------------------- */}
          {showWhiskerMenu && (
            <div className="absolute top-7 left-3 w-84 bg-[#121A28] border border-cyan-500/40 rounded-b-xl shadow-2xl z-50 p-2.5 space-y-2 animate-fadeIn text-xs">
              <div className="px-2 py-1 border-b border-cyan-900/60 flex items-center justify-between text-cyan-400 font-bold">
                <span>Kali Linux 2024.x Tools</span>
                <span className="text-[10px] text-slate-400 font-normal">Full Sandbox Suite</span>
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-[11px]">
                <div
                  onClick={() => {
                    setActiveWindow('terminal');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>01 - QTerminal (Bash Sandbox)</span>
                </div>
                <div
                  onClick={() => {
                    setEditorFile('/home/student/logs/network.log');
                    setEditorContent(DEFAULT_LOG_CONTENT);
                    setActiveWindow('editor');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>02 - Mousepad Text Editor</span>
                </div>
                <div
                  onClick={() => {
                    setActiveWindow('wireshark');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>03 - Wireshark Packet Inspector</span>
                </div>
                <div
                  onClick={() => {
                    setActiveWindow('zenmap');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-purple-400" />
                  <span>04 - Zenmap (Nmap Network Scanner)</span>
                </div>
                <div
                  onClick={() => {
                    setActiveWindow('burp');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-orange-400" />
                  <span>05 - Burp Suite Community Edition</span>
                </div>
                <div
                  onClick={() => {
                    setActiveWindow('browser');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>06 - Chromium Web Browser</span>
                </div>
                <div
                  onClick={() => {
                    executeCommand('msfconsole');
                    setActiveWindow('terminal');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Code className="w-3.5 h-3.5 text-red-400" />
                  <span>07 - Metasploit Framework</span>
                </div>
                <div
                  onClick={() => {
                    executeCommand('python3');
                    setActiveWindow('terminal');
                    setShowWhiskerMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5 text-yellow-400" />
                  <span>08 - Python 3.11 Interactive REPL</span>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* MAIN DESKTOP CANVAS (AUTHENTIC KALI DRAGON WALLPAPER)                 */}
          {/* --------------------------------------------------------------------- */}
          <div
            className="flex-1 relative p-6 overflow-hidden flex flex-col justify-start"
            style={{
              background: 'radial-gradient(ellipse at 60% 40%, #152238 0%, #0c1422 50%, #050810 100%)',
            }}
          >
            {/* The Legendary Kali Linux Dragon Watermark */}
            <div className="absolute right-10 bottom-6 w-[520px] h-[520px] opacity-[0.10] pointer-events-none select-none">
              <svg viewBox="0 0 500 500" fill="none" className="w-full h-full text-cyan-400">
                <path
                  d="M250 50 C 180 90, 80 160, 90 280 C 95 340, 150 420, 250 450 C 350 420, 405 340, 410 280 C 420 160, 320 90, 250 50 Z"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="currentColor"
                  fillOpacity="0.05"
                />
                <path
                  d="M190 190 Q 250 140 310 190 Q 340 280 250 350 Q 160 280 190 190 Z"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle cx="210" cy="210" r="14" fill="currentColor" />
                <circle cx="290" cy="210" r="14" fill="currentColor" />
                <path d="M220 280 Q 250 310 280 280" stroke="currentColor" strokeWidth="6" />
                <path d="M120 220 L 60 170 M 380 220 L 440 170" stroke="currentColor" strokeWidth="6" />
              </svg>
            </div>

            {/* Desktop Icons */}
            <div className="flex flex-col gap-5 z-10 w-fit select-none">
              {/* Home */}
              <div
                onClick={() => {
                  executeCommand('cd /home/kali && ls -la');
                  setActiveWindow('terminal');
                }}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="kali's Home (/home/kali)"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-cyan-400/40">
                  <Folder className="w-7 h-7 fill-white" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide">Home</span>
              </div>

              {/* network.log */}
              <div
                onClick={() => {
                  setEditorFile('/home/student/logs/network.log');
                  setEditorContent(DEFAULT_LOG_CONTENT);
                  setActiveWindow('editor');
                }}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="Open /home/student/logs/network.log"
              >
                <div className="w-13 h-13 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform relative border border-amber-400/40">
                  <FileText className="w-7 h-7 text-amber-300" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide underline decoration-cyan-400 underline-offset-4">
                  network.log
                </span>
              </div>

              {/* Terminal Launcher */}
              <div
                onClick={() => setActiveWindow('terminal')}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="Open QTerminal Sandbox"
              >
                <div className="w-13 h-13 rounded-2xl bg-black text-emerald-400 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-emerald-500/40">
                  <TerminalIcon className="w-7 h-7" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide">Terminal</span>
              </div>

              {/* Wireshark */}
              <div
                onClick={() => setActiveWindow('wireshark')}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="Open Wireshark Network Analyzer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#004B87] text-cyan-200 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-cyan-300/40">
                  <Activity className="w-7 h-7" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide">Wireshark</span>
              </div>

              {/* Zenmap (Nmap GUI) */}
              <div
                onClick={() => setActiveWindow('zenmap')}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="Open Zenmap Network Scanner"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#4C1D95] text-purple-200 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-purple-400/40">
                  <Search className="w-7 h-7" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide">Zenmap</span>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 1: KALI QTERMINAL (FULL BASH SANDBOX SHELL)                */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'terminal' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-cyan-500/40 bg-[#0B101B]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                {/* Terminal Titlebar */}
                <div className="bg-[#121A28] border-b border-cyan-900/60 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <TerminalIcon className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm font-mono text-cyan-300">
                      {subShellMode === 'python'
                        ? 'python3 (interactive REPL)'
                        : subShellMode === 'msfconsole'
                        ? `msfconsole ${msfModule}`
                        : `${currentUser}@kali-sandbox:${currentDir.replace('/home/kali', '~')}`}
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden md:inline">
                      — QTerminal (Execute any Linux command, Python, or Pentest tool!)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => executeCommand('help')}
                      className="px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 text-[11px] font-mono border border-cyan-800/50 cursor-pointer"
                    >
                      help
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWindow('none')}
                      className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                      title="Minimize Terminal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subshell: Nano In-Terminal Editor Modal */}
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
                  /* Standard Terminal Monospace Output & Input Body */
                  <div
                    className="flex-1 p-5 overflow-y-auto font-mono text-xs sm:text-sm bg-[#070B12] space-y-2.5 selection:bg-cyan-600 selection:text-white"
                    onClick={() => terminalInputRef.current?.focus()}
                  >
                    <div className="text-slate-400 text-xs border-b border-cyan-900/40 pb-2">
                      <span className="text-cyan-400 font-bold">Kali Linux 2024.x (Live Sandbox VM)</span>
                      <br />* Full arbitrary shell: <code className="text-emerald-400">python3, nmap, hydra, sqlmap, gobuster, nikto, john, msfconsole, nano, cat, grep, bash</code>.
                      <br />* File operations, redirection (<code className="text-cyan-300">&gt;</code>), pipes (<code className="text-cyan-300">|</code>), and environment variables active.
                    </div>

                    {outputHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        {item.promptPrefix ? (
                          <div className="text-slate-200 flex items-center gap-1.5">
                            <span className="text-amber-400 font-bold">{item.promptPrefix}</span>
                            <span className="text-white font-medium">{item.cmd}</span>
                          </div>
                        ) : (
                          <>
                            <div className="text-slate-200 flex items-center gap-1.5 flex-wrap">
                              <span className="text-cyan-400 font-bold">┌──({item.user}㉿kali-sandbox)-[{item.dir}]</span>
                            </div>
                            <div className="text-slate-200 flex items-center gap-1.5">
                              <span className="text-cyan-400 font-bold">└─{item.user === 'root' ? '#' : '$'}</span>
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
                            placeholder="Type python code (e.g. print(10+20), exit())..."
                            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-amber-400"
                            autoFocus
                          />
                        </div>
                      ) : subShellMode === 'msfconsole' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 font-bold">{msfModule ? `msf6 ${msfModule} >` : 'msf6 >'}</span>
                          <input
                            ref={terminalInputRef}
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            placeholder="Type metasploit command (e.g. search ssh, use, show options, run, exit)..."
                            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-red-400"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <>
                          <div className="text-cyan-400 font-bold text-xs">
                            ┌──({currentUser}㉿kali-sandbox)-[{currentDir.replace('/home/kali', '~')}]
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">└─{currentUser === 'root' ? '#' : '$'}</span>
                            <input
                              ref={terminalInputRef}
                              type="text"
                              value={terminalInput}
                              onChange={(e) => setTerminalInput(e.target.value)}
                              onKeyDown={handleTerminalKeyDown}
                              placeholder="Type command (e.g. cat network.log, nmap 192.168.1.105, python3, nano, help)..."
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

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 2: MOUSEPAD TEXT EDITOR / LOG VIEWER                       */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'editor' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-amber-500/40 bg-[#141A26] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#1A2333] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-sm text-amber-300">{editorFile.split('/').pop()} — Mousepad Text Editor</span>
                    <span className="text-xs text-slate-400 font-mono">({editorFile})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveEditor}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWindow('none')}
                      className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                      title="Minimize Editor"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0F1622] px-4 py-2 border-b border-cyan-950 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2.5 flex-1 max-w-sm bg-[#090D14] px-3 py-1.5 rounded-lg border border-cyan-900/40">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={editorSearch}
                      onChange={(e) => setEditorSearch(e.target.value)}
                      placeholder="Find in file..."
                      className="bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {editorSaveNotice && (
                      <span className="text-emerald-400 font-semibold text-xs animate-fadeIn">{editorSaveNotice}</span>
                    )}
                    <span className="text-xs text-slate-400 hidden sm:inline">Identified Attacker:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyIp(TARGET_IP)}
                      className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{TARGET_IP}</span>
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded ml-1">
                        {copiedIp ? 'Copied!' : 'Copy IP'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-5 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 bg-[#090D14] space-y-1.5 leading-relaxed selection:bg-blue-600 selection:text-white">
                  {editorContent
                    .split('\n')
                    .filter((l) => !editorSearch || l.toLowerCase().includes(editorSearch.toLowerCase()))
                    .map((line, idx) => {
                      const hasTarget = line.includes(TARGET_IP);
                      const isFailed = line.includes('Failed password');

                      return (
                        <div
                          key={idx}
                          onClick={() => handleCopyIp(TARGET_IP)}
                          className={`px-3 py-1 rounded-lg cursor-pointer transition-colors flex items-start gap-3 ${
                            hasTarget
                              ? 'bg-amber-950/50 border border-amber-500/50 text-amber-200'
                              : isFailed
                              ? 'bg-red-950/30 text-red-300'
                              : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <span className="text-slate-600 select-none w-8 text-right shrink-0">{idx + 1}</span>
                          <span className="break-all flex-1">
                            {line.split(TARGET_IP).map((part, pIdx, arr) => (
                              <React.Fragment key={pIdx}>
                                {part}
                                {pIdx < arr.length - 1 && (
                                  <span className="bg-[#1D4ED8] text-white px-1.5 py-0.5 rounded font-bold shadow-xs">
                                    {TARGET_IP}
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 3: WIRESHARK PACKET INSPECTOR                              */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'wireshark' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-blue-500/40 bg-[#0F1726] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#192336] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-cyan-300">Wireshark Network Capture [eth0]</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                    title="Minimize Wireshark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Wireshark Display Filter Bar */}
                <div className="bg-[#0B101B] p-2 px-4 border-b border-cyan-900/40 flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono">Apply a display filter:</span>
                  <input
                    type="text"
                    value={wiresharkFilter}
                    onChange={(e) => setWiresharkFilter(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setAppliedWiresharkFilter(wiresharkFilter);
                    }}
                    placeholder="e.g. ip.addr == 192.168.1.105 or tcp.port == 22 or ssh"
                    className="flex-1 bg-[#121A28] border border-cyan-700/50 rounded px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setAppliedWiresharkFilter(wiresharkFilter)}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWiresharkFilter('');
                      setAppliedWiresharkFilter('');
                    }}
                    className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                {/* Packet Table */}
                <div className="flex-1 overflow-y-auto font-mono text-xs p-4 bg-[#090E17] space-y-1">
                  <div className="grid grid-cols-6 gap-2 text-slate-400 font-bold border-b border-slate-700 pb-2">
                    <span>No.</span>
                    <span>Time</span>
                    <span>Source</span>
                    <span>Destination</span>
                    <span>Protocol</span>
                    <span>Info</span>
                  </div>
                  {filteredPackets.map((pkt) => (
                    <div
                      key={pkt.no}
                      onClick={() => {
                        setSelectedPacketNo(pkt.no);
                        handleCopyIp(pkt.src);
                      }}
                      className={`grid grid-cols-6 gap-2 p-1.5 rounded cursor-pointer transition-colors ${
                        selectedPacketNo === pkt.no
                          ? 'bg-blue-900/60 text-white border border-blue-400/50'
                          : pkt.src === TARGET_IP
                          ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-700/40 hover:bg-cyan-900/60'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span>{pkt.no}</span>
                      <span>{pkt.time}</span>
                      <span className="font-bold text-cyan-400">{pkt.src}</span>
                      <span>{pkt.dst}</span>
                      <span className="text-amber-400 font-bold">{pkt.proto}</span>
                      <span className="truncate">{pkt.info}</span>
                    </div>
                  ))}
                </div>

                {/* Packet Details Tree */}
                <div className="h-32 border-t border-cyan-950 bg-[#070B12] p-3 text-[11px] font-mono overflow-y-auto space-y-1 text-slate-300">
                  <div className="text-cyan-400 font-bold">▶ Frame {selectedPacketNo}: 74 bytes on wire (592 bits)</div>
                  <div className="text-slate-300">▶ Ethernet II, Src: 08:00:27:b4:9a:12, Dst: 52:54:00:12:34:56</div>
                  <div className="text-emerald-400">▼ Internet Protocol Version 4, Src: 192.168.1.105, Dst: 192.168.1.50</div>
                  <div className="pl-4 text-slate-400">Total Length: 60 | Identification: 0x4f21 | TTL: 64</div>
                  <div className="text-purple-400">▼ Transmission Control Protocol, Src Port: 44321, Dst Port: 22</div>
                  <div className="pl-4 text-slate-400">Header Length: 32 bytes | Flags: 0x002 (SYN)</div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 4: ZENMAP (NMAP GRAPHICAL SCANNER)                         */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'zenmap' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-purple-500/40 bg-[#121324] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#1C1A36] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-sm text-purple-300">Zenmap 7.94 — Network Scanner</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                    title="Minimize Zenmap"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Zenmap Control Header */}
                <div className="bg-[#0E0D1C] p-3 px-4 border-b border-purple-900/40 flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                    <span className="font-bold text-slate-300">Target:</span>
                    <input
                      type="text"
                      value={zenmapTarget}
                      onChange={(e) => setZenmapTarget(e.target.value)}
                      placeholder="e.g. 192.168.1.105"
                      className="flex-1 bg-[#1A1830] border border-purple-700/50 rounded px-2.5 py-1 text-purple-200 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-300">Profile:</span>
                    <select
                      value={zenmapProfile}
                      onChange={(e) => setZenmapProfile(e.target.value)}
                      className="bg-[#1A1830] border border-purple-700/50 rounded px-2.5 py-1 text-purple-200 text-xs focus:outline-none"
                    >
                      <option>Intense scan</option>
                      <option>Quick scan</option>
                      <option>Ping scan</option>
                      <option>Slow comprehensive scan</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    disabled={zenmapScanning}
                    onClick={() => {
                      setZenmapScanning(true);
                      setTimeout(() => {
                        setZenmapScanning(false);
                        setZenmapOutput(
                          `Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-27 14:32 IST\nNmap scan report for ${zenmapTarget}\nHost is up (0.0011s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6\n80/tcp    open  http        Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\nMAC Address: 08:00:27:B4:9A:12 (Cadmus Computer Systems)\n\n[!] Note: ${zenmapTarget} is active and verified as the brute-force host.`
                        );
                      }, 1200);
                    }}
                    className="px-4 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    {zenmapScanning ? 'Scanning...' : 'Scan'}
                  </button>
                </div>

                <div className="flex-1 p-5 overflow-y-auto font-mono text-xs bg-[#090814] text-purple-200 leading-relaxed whitespace-pre-wrap selection:bg-purple-600 selection:text-white">
                  {zenmapOutput}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 5: BURP SUITE COMMUNITY EDITION                            */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'burp' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-orange-500/40 bg-[#18130E] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#241B12] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-sm text-orange-300">Burp Suite Community Edition v2024.1</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                    title="Minimize Burp"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Burp Tabs */}
                <div className="bg-[#120D08] px-4 pt-2 border-b border-orange-950 flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBurpTab('proxy')}
                    className={`px-3 py-1.5 rounded-t-lg font-bold cursor-pointer ${
                      burpTab === 'proxy' ? 'bg-[#241B12] text-orange-400 border-t border-x border-orange-800' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Proxy
                  </button>
                  <button
                    type="button"
                    onClick={() => setBurpTab('repeater')}
                    className={`px-3 py-1.5 rounded-t-lg font-bold cursor-pointer ${
                      burpTab === 'repeater' ? 'bg-[#241B12] text-orange-400 border-t border-x border-orange-800' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Repeater
                  </button>
                </div>

                {burpTab === 'proxy' ? (
                  <div className="flex-1 flex flex-col p-4 bg-[#0A0704] text-xs space-y-3 font-mono">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBurpIntercept(!burpIntercept)}
                        className={`px-3 py-1 rounded font-bold cursor-pointer transition-colors ${
                          burpIntercept ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {burpIntercept ? 'Intercept is on' : 'Intercept is off'}
                      </button>
                      <span className="text-slate-400">Proxy running on 127.0.0.1:8080</span>
                    </div>

                    <div className="flex-1 border border-orange-950 rounded-lg p-3 bg-[#120D08] overflow-y-auto space-y-1.5 text-slate-300">
                      <div className="text-orange-400 font-bold border-b border-orange-900/50 pb-1">HTTP History</div>
                      <div className="grid grid-cols-5 gap-2 text-slate-400 font-bold text-[11px] pt-1">
                        <span>#</span>
                        <span>Host</span>
                        <span>Method</span>
                        <span>URL</span>
                        <span>Status</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2 p-1 rounded hover:bg-white/5 cursor-pointer text-[11px]">
                        <span>1</span>
                        <span className="text-cyan-400 font-bold">192.168.1.105</span>
                        <span>GET</span>
                        <span>/login.php</span>
                        <span className="text-emerald-400">200 OK</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2 p-1 rounded hover:bg-white/5 cursor-pointer text-[11px]">
                        <span>2</span>
                        <span className="text-cyan-400 font-bold">192.168.1.105</span>
                        <span>POST</span>
                        <span>/login.php</span>
                        <span className="text-red-400">401 Unauthorized</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x divide-orange-950 bg-[#0A0704] font-mono text-xs">
                    <div className="p-3 flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-orange-400 font-bold">Request</span>
                        <button
                          type="button"
                          onClick={() => {
                            setBurpRepeaterResp('HTTP/1.1 200 OK\nDate: Tue, 27 Aug 2026 14:33:00 GMT\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Active SSH brute-force detected from this host (192.168.1.105).</p>');
                          }}
                          className="px-2.5 py-0.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                      <textarea
                        value={burpRepeaterReq}
                        onChange={(e) => setBurpRepeaterReq(e.target.value)}
                        className="flex-1 bg-[#120D08] border border-orange-950 rounded p-2.5 text-slate-200 resize-none focus:outline-none"
                      />
                    </div>
                    <div className="p-3 flex flex-col space-y-2">
                      <span className="text-emerald-400 font-bold">Response</span>
                      <pre className="flex-1 bg-[#120D08] border border-orange-950 rounded p-2.5 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                        {burpRepeaterResp}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 6: CHROMIUM WEB BROWSER                                    */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'browser' && (
              <div className="absolute inset-5 sm:inset-8 lg:inset-x-16 lg:inset-y-6 rounded-2xl border border-cyan-500/40 bg-[#0E1524] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#162136] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-cyan-300">Chromium — Kali Web Browser</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                    title="Minimize Browser"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* URL Bar */}
                <div className="bg-[#0B101B] p-2 px-4 border-b border-cyan-900/40 flex items-center gap-2 text-xs">
                  <span className="text-cyan-400 font-bold">🔒</span>
                  <input
                    type="text"
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    placeholder="Enter URL (e.g. http://192.168.1.105)"
                    className="flex-1 bg-[#121A28] border border-cyan-700/50 rounded px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold cursor-pointer"
                  >
                    Go
                  </button>
                </div>

                {/* Web Page View */}
                <div className="flex-1 bg-[#070B12] p-8 text-center text-slate-200 overflow-y-auto">
                  <div className="max-w-xl mx-auto bg-[#121A28] border border-cyan-800/50 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3">
                      <h2 className="text-lg font-bold text-white">MoSPI Target Server Portal</h2>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 text-xs font-bold">
                        Target: {TARGET_IP}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You have reached the HTTP service running on the remote attacker node (Port 80 / Apache 2.4.52).
                      Security logs show this specific address launched 5 brute-force SSH logins against the laboratory server.
                    </p>
                    <div className="p-3 bg-[#0A0E17] rounded-xl border border-cyan-900/40 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-slate-400">Host IP:</span> <strong className="text-cyan-400 font-mono">{TARGET_IP}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyIp(TARGET_IP)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Target IP</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* FLOATING LAB MISSION HUD OVERLAY                                  */}
            {/* ----------------------------------------------------------------- */}
            {showHud && (
              <div className="absolute top-4 right-6 z-30 max-w-md bg-[#0D1422]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-2.5 text-left animate-fadeIn">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>MoSPI Cyber Investigation Task</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHud(false)}
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
                    onClick={() => window.close()}
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

          {/* ----------------------------------------------------------------- */}
          {/* BOTTOM KALI TASKBAR / STATUS BAR                                  */}
          {/* ----------------------------------------------------------------- */}
          <div className="bg-[#0B101B] border-t border-cyan-900/40 px-5 py-2 flex items-center justify-between text-xs text-slate-300 select-none shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block shadow-xs" />
              <span className="font-bold text-emerald-400 text-xs">Kali VM Sandbox Active</span>
            </div>

            <div className="flex items-center gap-4 hidden sm:flex">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>Kali Linux 2024.x Rolling (Live Sandbox)</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-1 text-slate-400">
                <span>RAM: 3.2GB / 16GB</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveWindow('terminal')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Terminal</span>
              </button>

              <button
                type="button"
                onClick={toggleNativeFullscreen}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold cursor-pointer transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
