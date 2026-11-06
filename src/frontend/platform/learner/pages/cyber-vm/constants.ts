import { VFile, PacketItem } from './types';

export const TARGET_IP = '192.168.1.105';

export const DEFAULT_LOG_CONTENT = `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`;

export const INITIAL_VFS: Record<string, VFile> = {
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
};

export const ALL_PACKETS: PacketItem[] = [
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

export const formatTimer = (totalSec: number) => {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
