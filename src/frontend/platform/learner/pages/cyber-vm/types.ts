export interface VFile {
  content: string;
  size: number;
  perms: string;
  owner: string;
  group: string;
  date: string;
}

export type ActiveWindowType =
  | 'terminal'
  | 'files'
  | 'editor'
  | 'wireshark'
  | 'zenmap'
  | 'burp'
  | 'browser'
  | 'none';

export type SubShellModeType = 'bash' | 'python' | 'msfconsole' | 'nano';

export interface TerminalHistoryItem {
  user: 'kali' | 'root';
  dir: string;
  cmd: string;
  output: string;
  promptPrefix?: string;
  isNeofetch?: boolean;
}

export interface PacketItem {
  no: number;
  time: string;
  src: string;
  dst: string;
  proto: string;
  port: number;
  info: string;
}
