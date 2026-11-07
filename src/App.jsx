import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import {
  ArrowUpRight, Check, ChevronDown, ChevronRight, CircleHelp, Clock3,
  Braces, Code2, ExternalLink, FileCode2, Maximize2, PanelTop,
  RefreshCw, Send, ShieldCheck, Sparkles, X,
} from 'lucide-react'

const initialCode = {
  html: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Northstar — Find your next</title>\n</head>\n<body>\n  <nav class="nav">\n    <a class="brand" href="#">northstar<span>.</span></a>\n    <div class="nav-links"><a href="#discover">Discover</a><a href="#stories">Our story</a><a href="#">For teams</a></div>\n    <a class="nav-cta" href="#discover">Get started <span>↗</span></a>\n  </nav>\n  <main>\n    <section class="hero">\n      <div class="hero-copy">\n        <span class="eyebrow"><i></i> A little closer to what’s next</span>\n        <h1>Make room<br />for <em>possibility.</em></h1>\n        <p>Good things happen when you find the space to explore. Start your next chapter with Northstar.</p>\n        <a class="button" href="#discover">Explore what’s possible <span>→</span></a>\n        <div class="social-proof"><div class="avatars"><b>M</b><b>J</b><b>A</b></div><span><strong>12,000+</strong> people found their way</span></div>\n      </div>\n      <div class="hero-art">\n        <div class="sun"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>\n        <div class="art-label"><span>01 / 03</span><b>Start anywhere.</b><small>The rest will follow.</small></div>\n        <div class="sparkle">✳</div>\n      </div>\n    </section>\n    <section class="below" id="discover"><span>YOUR NEXT CHAPTER</span><h2>It starts with a first step.</h2><p>Big changes don’t happen overnight. They begin with a little curiosity.</p></section>\n  </main>\n  <footer><a class="brand" href="#">northstar<span>.</span></a><small>© 2025 Northstar Studio. Find your way.</small><a href="#">Instagram ↗</a></footer>\n</body>\n</html>`,
  css: `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap');\n:root { --ink: #202a25; --green: #607664; --cream: #f4f1e9; --orange: #e98e68; }\n* { box-sizing: border-box; }\nbody { margin: 0; color: var(--ink); background: var(--cream); font-family: 'DM Sans', sans-serif; }\na { color: inherit; text-decoration: none; }\n.nav { height: 76px; max-width: 1200px; margin: auto; padding: 0 44px; display: flex; align-items: center; justify-content: space-between; }\n.brand { font-size: 22px; font-weight: 700; letter-spacing: -1.2px; }.brand span { color: var(--orange); }\n.nav-links { display: flex; gap: 38px; font-size: 12px; color: #6b736b; }.nav-cta { font-size: 12px; font-weight: 600; border-bottom: 1px solid #abb0a7; padding-bottom: 6px; }.nav-cta span { color: var(--orange); margin-left: 7px; }\n.hero { max-width: 1200px; min-height: 520px; margin: 12px auto 0; padding: 24px 44px 56px; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 56px; }\n.hero-copy { padding: 18px 0 0 26px; }.eyebrow { display: flex; gap: 9px; align-items: center; color: #748074; font-size: 10px; letter-spacing: 1.1px; text-transform: uppercase; }.eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); }\nh1 { margin: 25px 0 18px; font-size: clamp(48px, 5vw, 70px); line-height: .99; letter-spacing: -4px; font-weight: 500; }h1 em { font-family: 'Playfair Display', serif; color: var(--green); font-weight: 500; }\n.hero-copy > p { max-width: 370px; color: #737970; font-size: 14px; line-height: 1.8; }.button { display: inline-flex; gap: 24px; align-items: center; margin-top: 14px; padding: 14px 18px; background: var(--green); color: white; font-size: 12px; border-radius: 3px; }.button span { font-size: 17px; }.social-proof { margin-top: 42px; display: flex; align-items: center; gap: 12px; color: #7c8178; font-size: 10px; }.social-proof strong { color: #3b443d; }.avatars { display: flex; padding-left: 4px; }.avatars b { width: 24px; height: 24px; margin-left: -4px; border: 2px solid var(--cream); border-radius: 50%; display: grid; place-items: center; color: #fff; background: #a88872; font-size: 8px; }.avatars b:nth-child(2) { background: #718273; }.avatars b:nth-child(3) { background: #c58567; }\n.hero-art { height: 430px; position: relative; overflow: hidden; background: #dce1d5; border-radius: 48% 48% 3px 3px; }.sun { position: absolute; width: 216px; height: 216px; border-radius: 50%; background: #e9a47e; left: 50%; top: 36px; transform: translateX(-50%); }.orbit { position: absolute; border: 1px solid rgba(54,77,64,.25); border-radius: 50%; width: 520px; height: 190px; left: 50%; top: 160px; transform: translateX(-50%) rotate(-24deg); }.orbit-two { top: 178px; transform: translateX(-50%) rotate(24deg); }.art-label { position: absolute; left: 34px; bottom: 30px; display: flex; flex-direction: column; gap: 6px; }.art-label span { font-size: 9px; letter-spacing: 1px; color: #778578; }.art-label b { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 500; }.art-label small { color: #778578; font-size: 11px; }.sparkle { position: absolute; right: 50px; top: 86px; color: #f4f1e9; font-size: 27px; }\n.below { padding: 48px 24px 66px; text-align: center; border-top: 1px solid #e6e3da; }.below > span { font-size: 9px; letter-spacing: 1.5px; color: var(--green); }.below h2 { margin: 13px 0 8px; font: 500 30px 'Playfair Display', serif; }.below p { color: #7b8077; font-size: 12px; }\nfooter { border-top: 1px solid #e6e3da; max-width: 1112px; margin: auto; padding: 22px 0; display: flex; align-items: center; justify-content: space-between; color: #7b8077; font-size: 10px; }footer .brand { color: var(--ink); font-size: 16px; }\n@media (max-width: 700px) { .nav { height: 64px; padding: 0 20px; }.nav-links { display: none; }.hero { grid-template-columns: 1fr; gap: 34px; padding: 24px 20px 40px; }.hero-copy { padding-left: 0; }.hero-art { height: 330px; }.hero-copy > p { max-width: 330px; }h1 { font-size: 58px; }footer { margin: 0 20px; gap: 12px; flex-wrap: wrap; } }`,
  javascript: `// Make the navigation feel a little more alive.\ndocument.querySelectorAll('a[href^="#"]').forEach((link) => {\n  link.addEventListener('click', (event) => {\n    const target = document.querySelector(link.getAttribute('href'));\n    if (target) {\n      event.preventDefault();\n      target.scrollIntoView({ behavior: 'smooth' });\n    }\n  });\n});`,
}

const tabs = [
  { id: 'html', label: 'index.html', Icon: FileCode2, color: 'text-orange-300' },
  { id: 'css', label: 'styles.css', Icon: Braces, color: 'text-sky-300' },
  { id: 'javascript', label: 'script.js', Icon: Code2, color: 'text-yellow-300' },
]

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0')).join(':')
}

function App() {
  const [code, setCode] = useState(initialCode)
  const [activeTab, setActiveTab] = useState('html')
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60)
  const [taskOpen, setTaskOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [submittedTab, setSubmittedTab] = useState('html')
  const [refreshKey, setRefreshKey] = useState(0)
  const iframeRef = useRef(null)
  const codeRef = useRef(code)
  const submittedRef = useRef(false)
  codeRef.current = code

  const submitAssessment = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    setSubmitted(true)
    setModalOpen(true)
  }, [])

  useEffect(() => {
    if (submitted) return undefined
    const interval = window.setInterval(() => {
      setTimeLeft((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(interval)
          submitAssessment()
          return 0
        }
        return remaining - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [submitAssessment, submitted])

  const preview = useMemo(() => {
    const source = code.html.replace(/<head([^>]*)>/i, `<head$1><style>${code.css.replace(/<\/style/gi, '<\\/style')}</style>`)
    return `${source}\n<script>${code.javascript.replace(/<\/script/gi, '<\\/script')}<\/script>`
  }, [code])

  const handleEditorChange = (value) => setCode((current) => ({ ...current, [activeTab]: value ?? '' }))
  const language = activeTab === 'javascript' ? 'javascript' : activeTab

  return (
    <div className="min-h-screen bg-ink text-slate-200 flex flex-col">
      <header className="h-[66px] shrink-0 border-b border-line bg-[#0e1118] flex items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-8">
          <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="CodeArena home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white shadow-lg shadow-violet-950/40"><Code2 size={18} strokeWidth={2.5} /></span>
            <span className="text-[15px] font-bold tracking-tight text-white">Code<span className="text-violet-300">Arena</span></span>
          </a>
          <span className="hidden sm:block h-7 w-px bg-line" />
          <div className="min-w-0 hidden sm:block">
            <div className="truncate text-[13px] font-semibold text-slate-200">Build a Responsive Landing Page</div>
            <div className="mt-0.5 text-[10px] text-muted">Frontend coding assessment <span className="mx-1.5 text-slate-600">·</span> Question 1 of 1</div>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className={`hidden xs:flex items-center gap-2 font-mono text-[13px] ${timeLeft < 300 ? 'text-rose-300' : 'text-slate-300'}`}><Clock3 size={15} className={timeLeft < 300 ? 'text-rose-400' : 'text-muted'} /><span>{formatTime(timeLeft)}</span></div>
          <button onClick={submitAssessment} disabled={submitted} className="inline-flex h-9 items-center gap-2 rounded-md bg-violet-500 px-3 sm:px-4 text-[12px] font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"><Send size={13} /><span className="hidden xs:inline">{submitted ? 'Submitted' : 'Submit Assessment'}</span><span className="xs:hidden">Submit</span></button>
        </div>
      </header>

      <div className="flex min-h-[48px] items-center justify-between border-b border-line bg-[#0e1118] px-4 sm:px-6">
        <div className="flex items-center gap-2 text-[11px] text-muted"><span className="text-slate-500">Assessment</span><ChevronRight size={12} /><span className="text-slate-300">Landing page</span><span className="ml-2 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-900/70 bg-emerald-950/30 px-2 py-0.5 text-[9px] font-medium text-emerald-300"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> In progress</span></div>
        <div className="flex items-center gap-4 text-[11px] text-muted"><span className="hidden sm:inline-flex items-center gap-1.5"><ShieldCheck size={13} /> Autosaved</span><button className="inline-flex items-center gap-1.5 hover:text-slate-200"><CircleHelp size={14} /> Help</button></div>
      </div>

      <main className="flex-1 min-h-0 p-3 sm:p-4 lg:p-5">
        <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-3">
          <section className="overflow-hidden rounded-lg border border-line bg-panel">
            <button onClick={() => setTaskOpen(!taskOpen)} className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/[0.015]">
              <span className="flex items-center gap-2 text-[12px] font-semibold text-slate-200">{taskOpen ? <ChevronDown size={15} className="text-muted" /> : <ChevronRight size={15} className="text-muted" />}<span className="grid h-5 w-5 place-items-center rounded bg-violet-500/10 text-violet-300"><Sparkles size={12} /></span>Challenge brief</span>
              <span className="text-[10px] text-muted">{taskOpen ? 'Collapse' : 'View task'}</span>
            </button>
            {taskOpen && <div className="border-t border-line px-4 pb-3 pl-[3.7rem]"><p className="mb-2 mt-3 text-[12px] leading-5 text-slate-300">Create a responsive landing page with a navbar, hero section, call-to-action button, and footer.</p><div className="flex flex-wrap gap-2"><span className="rounded border border-line bg-[#171c27] px-2 py-1 text-[9px] text-muted">Responsive layout</span><span className="rounded border border-line bg-[#171c27] px-2 py-1 text-[9px] text-muted">Semantic HTML</span><span className="rounded border border-line bg-[#171c27] px-2 py-1 text-[9px] text-muted">HTML · CSS · JS</span></div></div>}
          </section>

          <div className="grid flex-1 min-h-[520px] grid-cols-1 gap-3 lg:grid-cols-2">
            <section className="flex min-h-[450px] flex-col overflow-hidden rounded-lg border border-line bg-[#10141c]">
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-[#11151e]">
                <div className="flex h-full items-stretch overflow-x-auto">{tabs.map(({ id, label, Icon, color }) => <button key={id} onClick={() => setActiveTab(id)} className={`relative flex shrink-0 items-center gap-2 border-r border-line px-3.5 text-[11px] transition ${activeTab === id ? 'bg-[#171c26] text-slate-100' : 'text-muted hover:text-slate-300'}`}><Icon size={14} className={color} />{label}{activeTab === id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-400" />}</button>)}</div>
                <div className="hidden sm:flex items-center gap-1 px-2"><button title="Editor settings" className="grid h-7 w-7 place-items-center rounded text-muted hover:bg-white/5 hover:text-white"><Maximize2 size={13} /></button></div>
              </div>
              <div className="flex min-h-0 flex-1">
                <div className="hidden w-11 shrink-0 flex-col items-center gap-4 border-r border-line py-4 text-slate-600 sm:flex"><FileCode2 size={16} className="text-violet-300" /><PanelTop size={15} /><ExternalLink size={15} /></div>
                <div className="min-h-[400px] flex-1"><Editor height="100%" language={language} theme="vs-dark" value={code[activeTab]} onChange={handleEditorChange} options={{ minimap: { enabled: false }, fontSize: 13, fontFamily: 'JetBrains Mono, SFMono-Regular, monospace', lineHeight: 22, padding: { top: 16, bottom: 16 }, scrollBeyondLastLine: false, automaticLayout: true, wordWrap: 'on', tabSize: 2, renderLineHighlight: 'gutter', lineNumbersMinChars: 3, overviewRulerBorder: false, scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 }, suggestOnTriggerCharacters: true, quickSuggestions: true }} /></div>
              </div>
              <div className="flex h-7 shrink-0 items-center justify-between border-t border-line bg-[#11151e] px-3 text-[9px] text-muted"><span className="flex items-center gap-2"><span className="text-violet-300">{language === 'javascript' ? 'JavaScript' : language.toUpperCase()}</span><span className="text-slate-700">|</span>UTF-8</span><span>Ln {code[activeTab].split('\n').length}, Col 1</span></div>
            </section>

            <section className="flex min-h-[450px] flex-col overflow-hidden rounded-lg border border-line bg-[#10141c]">
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-[#11151e] px-3.5"><div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200"><span className="grid h-5 w-5 place-items-center rounded bg-emerald-500/10 text-emerald-300"><PanelTop size={12} /></span>Live preview<span className="ml-1 flex items-center gap-1.5 text-[9px] font-normal text-muted"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live</span></div><button onClick={() => setRefreshKey((key) => key + 1)} className="inline-flex h-7 items-center gap-1.5 rounded border border-line px-2 text-[10px] text-muted transition hover:bg-white/5 hover:text-slate-200"><RefreshCw size={12} /> Refresh</button></div>
              <div className="flex h-8 shrink-0 items-center gap-2 border-b border-line bg-[#0e1118] px-3"><div className="flex gap-1"><i className="h-2 w-2 rounded-full bg-[#ed6a5e]"/><i className="h-2 w-2 rounded-full bg-[#f4bf4f]"/><i className="h-2 w-2 rounded-full bg-[#61c554]"/></div><div className="mx-auto flex h-[21px] max-w-[370px] flex-1 items-center justify-center gap-1.5 rounded bg-[#171c26] text-[9px] text-slate-500"><ShieldCheck size={10} className="text-emerald-500"/>localhost:3000/preview</div><ArrowUpRight size={12} className="text-slate-600" /></div>
              <div className="relative min-h-[400px] flex-1 bg-white"><iframe key={refreshKey} ref={iframeRef} title="Live coding challenge preview" srcDoc={preview} sandbox="allow-scripts" className="absolute inset-0 h-full w-full border-0" /></div>
              <div className="flex h-7 shrink-0 items-center justify-between border-t border-line bg-[#11151e] px-3 text-[9px] text-muted"><span>Preview updates as you type</span><span>Sandboxed environment</span></div>
            </section>
          </div>
        </div>
      </main>

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="submission-title"><div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-[#11151e] shadow-2xl shadow-black/50"><div className="flex items-start justify-between border-b border-line px-5 py-4"><div><span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300"><Check size={17} /></span><h2 id="submission-title" className="text-base font-semibold text-white">Assessment submitted</h2><p className="mt-1 text-[11px] text-muted">Your work has been securely recorded. Here’s your final submission.</p></div><button onClick={() => setModalOpen(false)} className="grid h-8 w-8 place-items-center rounded text-muted hover:bg-white/5 hover:text-white" aria-label="Close modal"><X size={17} /></button></div><div className="flex min-h-0 flex-1 flex-col p-4"><div className="mb-3 flex gap-1 border-b border-line">{tabs.map(({ id, label, Icon, color }) => <button key={id} onClick={() => setSubmittedTab(id)} className={`flex items-center gap-2 border-b-2 px-3 py-2 text-[11px] ${submittedTab === id ? 'border-violet-400 text-white' : 'border-transparent text-muted'}`}><Icon size={13} className={color}/>{label}</button>)}</div><pre className="editor-scrollbar max-h-[47vh] min-h-[220px] overflow-auto rounded-lg border border-line bg-[#0b0e14] p-4 font-mono text-[11px] leading-5 text-slate-300"><code>{code[submittedTab]}</code></pre></div><div className="flex items-center justify-between border-t border-line px-5 py-3"><span className="text-[10px] text-muted">Submitted with {formatTime(timeLeft)} remaining</span><button onClick={() => setModalOpen(false)} className="rounded-md bg-violet-500 px-4 py-2 text-[11px] font-semibold text-white hover:bg-violet-400">Done</button></div></div></div>}
    </div>
  )
}

export default App
