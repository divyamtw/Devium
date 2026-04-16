import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Character-set toggle pill ─── */
const CharToggle = ({ label, sub, checked, onChange }) => (
  <label
    className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 active:scale-[0.97] ${
      checked
        ? "bg-primary/10 border-primary/40 shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
        : "bg-secondary/20 border-border/40 hover:border-primary/30"
    }`}
    onClick={onChange}
  >
    <div>
      <p className="text-sm font-semibold text-foreground leading-none">
        {label}
      </p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
    {/* Custom toggle switch */}
    <div
      className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${
        checked
          ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
          : "bg-secondary border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
          checked
            ? "left-[calc(100%-1.15rem)] bg-primary-foreground"
            : "left-0.5 bg-muted-foreground"
        }`}
      />
    </div>
  </label>
);

/* ─── Vault item card ─── */
const VaultItem = ({ item, onCopy, onDelete }) => (
  <div className="group dashboard-card p-0 overflow-hidden border-border/30 hover:border-primary/30 bg-background/40 backdrop-blur-sm transition-all duration-200 hover:translate-x-1 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.15)]">
    <div className="p-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold truncate max-w-[55%] text-foreground/90">
          {item.name}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onCopy(item.string)}
            className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
            title="Copy string"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
            title="Delete"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-xs font-mono text-muted-foreground truncate bg-black/20 px-3.5 py-2.5 rounded-xl border border-white/5 group-hover:text-primary transition-colors">
        {item.string}
      </div>
    </div>
  </div>
);

/* ─── Main component ─── */
const RandomStringGenerator = () => {
  const [string, setString] = useState("");
  const [length, setLength] = useState(32);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const [saveName, setSaveName] = useState("");
  const [saveString, setSaveString] = useState("");

  const [savedItems, setSavedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedStrings") || "[]");
    } catch {
      return [];
    }
  });

  const labelRef = useRef(null);

  /* ─── Generator ─── */
  const generate = useCallback(() => {
    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!charset) charset = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setString(result);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  useEffect(() => {
    localStorage.setItem("savedStrings", JSON.stringify(savedItems));
  }, [savedItems]);

  /* ─── Copy ─── */
  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setSaveString(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      labelRef.current?.focus();
    }, 1500);
  }, []);

  /* ─── Save ─── */
  const handleSave = () => {
    if (!saveName.trim() || !saveString.trim()) return;
    setSavedItems((prev) => [
      { id: Date.now(), name: saveName.trim(), string: saveString.trim() },
      ...prev,
    ]);
    setSaveName("");
    setSaveString("");
    generate();
  };

  /* ─── Slider fill percentage ─── */
  const sliderPct = ((length - 8) / (128 - 8)) * 100;

  return (
    <div className="bg-background h-full w-full rounded-l-3xl border-l border-t border-b border-border shadow-2xl overflow-hidden relative flex flex-col lg:flex-row">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-primary/[0.03] blur-[120px] pointer-events-none" />

      {/* ═══════════ LEFT PANEL — Generator ═══════════ */}
      <div className="w-full lg:w-[55%] p-6 lg:p-10 overflow-y-auto scrollbar-thin relative z-10 flex flex-col gap-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight glow-text leading-tight">
            Random String
            <br />
            Generator
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Generate cryptographically randomized strings,
            tokens&nbsp;&amp;&nbsp;secrets with precision.
          </p>
        </header>

        {/* ── Output Display ── */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Generated String
          </label>
          <div className="relative group">
            <input
              type="text"
              value={string}
              readOnly
              className="w-full rounded-2xl bg-black/40 px-5 py-5 text-xl font-mono text-primary border border-primary/20 focus:border-primary outline-none transition-all pr-16 shadow-inner tracking-wide"
            />
            <button
              onClick={() => handleCopy(string)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-xl transition-all active:scale-90 shadow-lg ${
                copied
                  ? "bg-primary/80 text-primary-foreground shadow-primary/30"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
              }`}
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Controls Card ── */}
        <div className="dashboard-card p-7 space-y-7 bg-secondary/10 border-border/30">
          {/* Length slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Length
              </span>
              <span className="text-xl font-black text-primary bg-primary/10 px-4 py-1 rounded-xl border border-primary/20 min-w-[3rem] text-center">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={128}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(142,71%,45%) 0%, hsl(142,71%,45%) ${sliderPct}%, hsl(240,6%,15%) ${sliderPct}%, hsl(240,6%,15%) 100%)`,
              }}
            />
          </div>

          {/* Charset toggles */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Character Set
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CharToggle
                label="Uppercase"
                sub="A–Z"
                checked={useUppercase}
                onChange={() => setUseUppercase((p) => !p)}
              />
              <CharToggle
                label="Lowercase"
                sub="a–z"
                checked={useLowercase}
                onChange={() => setUseLowercase((p) => !p)}
              />
              <CharToggle
                label="Numbers"
                sub="0–9"
                checked={useNumbers}
                onChange={() => setUseNumbers((p) => !p)}
              />
              <CharToggle
                label="Symbols"
                sub="!@#$%..."
                checked={useSymbols}
                onChange={() => setUseSymbols((p) => !p)}
              />
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base hover:shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-all active:scale-[0.97] flex items-center justify-center gap-3"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M3 22v-6h6" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            </svg>
            Generate String
          </button>
        </div>

        {/* ── Quick Save Form ── */}
        <div className="dashboard-card p-7 space-y-4 border-dashed bg-transparent border-border/40">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground underline decoration-primary/40 underline-offset-8">
            Quick Save to Vault
          </h2>
          <div className="flex flex-col gap-3">
            <input
              ref={labelRef}
              type="text"
              placeholder="Label (e.g., API Key, Webhook Token)"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full rounded-xl bg-secondary/30 px-4 py-3 border border-border/50 focus:border-primary outline-none transition-all text-sm font-medium"
            />
            <input
              type="text"
              placeholder="String to save"
              value={saveString}
              onChange={(e) => setSaveString(e.target.value)}
              className="w-full rounded-xl bg-secondary/30 px-4 py-3 border border-border/50 focus:border-primary outline-none transition-all font-mono text-sm"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!saveName.trim() || !saveString.trim()}
            className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-xs"
          >
            Secure Save
          </button>
        </div>
      </div>

      {/* ═══════════ RIGHT PANEL — Vault ═══════════ */}
      <div className="w-full lg:w-[45%] bg-secondary/5 p-6 lg:p-10 overflow-y-auto scrollbar-thin relative z-10 border-t lg:border-t-0 lg:border-l border-border/50 flex flex-col gap-6">
        {/* Vault header */}
        <div className="flex items-center justify-between">
          <h2 className="font-black text-2xl flex items-center gap-3 tracking-tight">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Saved Vault
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            {savedItems.length} items
          </span>
        </div>

        {/* Vault items list */}
        <div className="space-y-3 flex-1">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <VaultItem
                key={item.id}
                item={item}
                onCopy={(s) => navigator.clipboard.writeText(s)}
                onDelete={(id) =>
                  setSavedItems((prev) => prev.filter((i) => i.id !== id))
                }
              />
            ))
          ) : (
            <div className="dashboard-card border-dashed border-2 py-24 flex flex-col items-center justify-center text-muted-foreground/40 bg-transparent gap-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-sm font-bold uppercase tracking-widest">
                Vault is empty
              </p>
              <p className="text-[11px] opacity-60 text-center px-4">
                Generate a string, copy it, then save it here
              </p>
            </div>
          )}
        </div>

        {/* Pro-tip */}
        <div className="dashboard-card bg-primary/5 border-primary/15 mt-auto">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary/70 mb-1.5">
            ⚡ Security Pro-Tip
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use a minimum length of{" "}
            <span className="text-foreground font-bold">24 characters</span> for
            production secrets. Enable all character sets to maximize entropy
            against brute-force attacks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
