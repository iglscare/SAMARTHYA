import React from 'react';
import { VFile, SubShellModeType } from '../types';
import { TARGET_IP } from '../constants';
import { runPythonCode } from './pythonRunner';

export interface CommandContext {
  currentDir: string;
  setCurrentDir: (d: string) => void;
  currentUser: 'kali' | 'root';
  setCurrentUser: (u: 'kali' | 'root') => void;
  envVars: Record<string, string>;
  setEnvVars: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  vfs: Record<string, VFile>;
  resolvePath: (p: string) => string;
  setSubShellMode: (m: SubShellModeType) => void;
  setNanoEditingFile: (f: string) => void;
  setNanoBuffer: (b: string) => void;
}

export const evaluateSingleCommand = (raw: string, ctx: CommandContext): string => {
  const {
    currentDir,
    setCurrentDir,
    currentUser,
    setCurrentUser,
    envVars,
    setEnvVars,
    vfs,
    resolvePath,
    setSubShellMode,
    setNanoEditingFile,
    setNanoBuffer,
  } = ctx;

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
        return evaluateSingleCommand(sub, ctx);
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

export const evaluatePipeline = (
  trimmed: string,
  runSingle: (cmd: string) => string
): string => {
  const parts = trimmed.split('|').map((s) => s.trim());
  let pipelineOutput = runSingle(parts[0]);

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

  return pipelineOutput;
};
