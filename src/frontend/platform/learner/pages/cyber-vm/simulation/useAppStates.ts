import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VFile } from '../types';
import { TARGET_IP, INITIAL_VFS, ALL_PACKETS } from '../constants';

export const useAppStates = (
  currentUser: 'kali' | 'root',
  resetWindows: () => void
) => {
  const navigate = useNavigate();

  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(1455);
  const [copiedIp, setCopiedIp] = useState<boolean>(false);

  // Virtual Filesystem State
  const [vfs, setVfs] = useState<Record<string, VFile>>(INITIAL_VFS);

  // Mousepad / Text Editor State
  const [editorFile, setEditorFile] = useState<string>('/home/student/logs/network.log');
  const [editorContent, setEditorContent] = useState<string>(
    INITIAL_VFS['/home/student/logs/network.log']?.content || ''
  );
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
  const [burpRepeaterReq, setBurpRepeaterReq] = useState<string>(
    'GET /login.php HTTP/1.1\nHost: 192.168.1.105\nUser-Agent: Mozilla/5.0 Kali-Sandbox\nAccept: */*\n'
  );
  const [burpRepeaterResp, setBurpRepeaterResp] = useState<string>(
    'HTTP/1.1 200 OK\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Active SSH brute-force detected from this host (192.168.1.105).</p>'
  );

  // Firefox Browser State
  const [browserUrl, setBrowserUrl] = useState<string>('http://192.168.1.105');
  const [browserActiveTab, setBrowserActiveTab] = useState<'target' | 'google' | 'samarthya'>('target');
  const [browserSearchQuery, setBrowserSearchQuery] = useState<string>('kali linux');

  // Session timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleResetVm = () => {
    setSessionSecondsLeft(1455);
    resetWindows();
  };

  const handleEndSession = () => {
    if (window.opener) {
      window.close();
    } else {
      navigate('/learner/assessment');
    }
  };

  const filteredPackets = ALL_PACKETS.filter((p) => {
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

  return {
    sessionSecondsLeft,
    setSessionSecondsLeft,
    copiedIp,
    handleCopyIp,
    vfs,
    setVfs,
    editorFile,
    setEditorFile,
    editorContent,
    setEditorContent,
    editorSearch,
    setEditorSearch,
    editorSaveNotice,
    filesPath,
    setFilesPath,
    wiresharkFilter,
    setWiresharkFilter,
    appliedWiresharkFilter,
    setAppliedWiresharkFilter,
    selectedPacketNo,
    setSelectedPacketNo,
    burpIntercept,
    setBurpIntercept,
    burpTab,
    setBurpTab,
    burpRepeaterReq,
    setBurpRepeaterReq,
    burpRepeaterResp,
    setBurpRepeaterResp,
    browserUrl,
    setBrowserUrl,
    browserActiveTab,
    setBrowserActiveTab,
    browserSearchQuery,
    setBrowserSearchQuery,
    handleSaveEditor,
    handleResetVm,
    handleEndSession,
    filteredPackets,
    systemTimeFormatted,
  };
};
