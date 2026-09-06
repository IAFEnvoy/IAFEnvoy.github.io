import { createBackgroundGridLines } from '@arwes/bgs'
import { createFrame, createFrameCornersSettings } from '@arwes/frames'
import { initTerminalInput } from './terminal'
import './index.css'
import './App.css'

const grid = document.querySelector<HTMLCanvasElement>('.grid-background')!
createBackgroundGridLines({ canvas: grid, settingsRef: { current: { distance: 46, lineColor: 'rgba(74, 197, 255, 0.12)', lineWidth: 1 } } })
document.querySelectorAll<SVGSVGElement>('.panel-corners, .terminal-corners').forEach((svg) => createFrame(svg, createFrameCornersSettings({ styled: true, animated: true, padding: 24, cornerLength: 22, strokeWidth: 1 })))
initTerminalInput()

const viewport = document.querySelector<HTMLElement>('.page-viewport')!
const directoryRail = document.querySelector<HTMLElement>('.directory-rail')!
const directoryItems = document.querySelectorAll<HTMLButtonElement>('.directory-item')
const pages = document.querySelectorAll<HTMLElement>('.page-section')
const homeScrollHint = document.querySelector<HTMLButtonElement>('.home-scroll-hint')
const goToPage = (index: number) => { const page = Math.max(0, Math.min(pages.length - 1, index)); viewport.scrollTo({ top: pages[page].offsetTop, behavior: 'smooth' }) }
directoryItems.forEach((item) => item.addEventListener('click', () => goToPage(Number(item.dataset.page))))
homeScrollHint?.addEventListener('click', () => goToPage(1))
const pageObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { root: viewport, threshold: 0.35 })
pages.forEach((page) => pageObserver.observe(page))
viewport.addEventListener('scroll', () => { const current = [...pages].reduce((best, page, index) => Math.abs(page.getBoundingClientRect().top - viewport.getBoundingClientRect().top) < Math.abs(pages[best].getBoundingClientRect().top - viewport.getBoundingClientRect().top) ? index : best, 0); directoryItems.forEach((item, index) => item.classList.toggle('is-active', index === current)); directoryRail.classList.toggle('is-revealed', viewport.scrollTop > pages[0].offsetHeight * 0.45); homeScrollHint?.classList.toggle('is-hidden', viewport.scrollTop > pages[0].offsetHeight * 0.2) })

const timeElement = document.querySelector<HTMLElement>('#time')
const utcTimeElement = document.querySelector<HTMLElement>('#utc-time')
const copyrightYearElement = document.querySelector<HTMLElement>('#copyright-year')
if (copyrightYearElement) copyrightYearElement.textContent = String(new Date().getFullYear())
const createdAt = Date.UTC(2005, 11, 27, 5, 45, 0)
const refreshTime = () => { const now = new Date(); if (utcTimeElement) { const offsetMinutes = -now.getTimezoneOffset(); const sign = offsetMinutes >= 0 ? '+' : '-'; const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0'); const offsetRemainder = String(Math.abs(offsetMinutes) % 60).padStart(2, '0'); utcTimeElement.textContent = `UTC${sign}${offsetHours}:${offsetRemainder} ${now.toLocaleTimeString([], { hour12: false })}` } if (!timeElement) return; let seconds = Math.max(0, Math.floor((now.getTime() - createdAt) / 1000)); const years = Math.floor(seconds / (365 * 24 * 3600)); seconds %= 365 * 24 * 3600; const days = Math.floor(seconds / (24 * 3600)); seconds %= 24 * 3600; const hours = Math.floor(seconds / 3600); seconds %= 3600; const minutes = Math.floor(seconds / 60); const remaining = seconds % 60; timeElement.textContent = `${years}年 ${days}天 ${hours}小时 ${minutes}分 ${remaining}秒` }
refreshTime()
window.setInterval(refreshTime, 1000)
