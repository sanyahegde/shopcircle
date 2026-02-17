import { useState, useEffect, useCallback, useMemo } from 'react'

const CHAR_DELAY_MS = 28
const CURSOR_BLINK_MS = 530

function getReceiptLines(firstName: string, lastName: string) {
  const first = firstName.trim() || 'friend'
  const last = lastName.trim() || ''
  const customer = last ? `${first} ${last}` : first
  return [
    '        shopcircle',
    '    02/16/25  12:34 pm',
    '- - - - - - - - - - - - -',
    '',
    `customer: ${customer}`,
    '',
    'made yours',
    '',
    'the difference is in the',
    'details. a shared list, a',
    'real opinion, something',
    'your circle loves.',
    '',
    '- - - - - - - - - - - - -',
    `    thank you, ${first}`,
  ]
}

/** Barcode: many vertical lines */
function ReceiptBarcode() {
  const pattern = useMemo(
    () => [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1],
    []
  )
  return (
    <div className="flex items-center justify-center gap-px mt-4 flex-nowrap">
      {pattern.map((w, i) => (
        <div
          key={i}
          className="bg-warm-black shrink-0"
          style={{ width: w, height: 36, minWidth: w }}
        />
      ))}
    </div>
  )
}

type BuildReceiptProps = {
  firstName: string
  lastName: string
  /** When this changes to a new value, receipt builds with current names */
  buildTrigger: number
}

export function BuildReceipt({ firstName, lastName, buildTrigger }: BuildReceiptProps) {
  const [building, setBuilding] = useState(false)
  const [done, setDone] = useState(false)
  const [displayLength, setDisplayLength] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)

  const receiptText = useMemo(
    () => getReceiptLines(firstName, lastName).join('\n'),
    [firstName, lastName]
  )

  const startBuilding = useCallback(() => {
    setBuilding(true)
    setDone(false)
    setDisplayLength(0)
  }, [])

  useEffect(() => {
    if (buildTrigger > 0) startBuilding()
  }, [buildTrigger, startBuilding])

  useEffect(() => {
    if (!building || displayLength >= receiptText.length) {
      if (building && displayLength >= receiptText.length) setDone(true)
      setBuilding(false)
      return
    }
    const t = setTimeout(() => setDisplayLength((n) => n + 1), CHAR_DELAY_MS)
    return () => clearTimeout(t)
  }, [building, displayLength, receiptText.length])

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), CURSOR_BLINK_MS)
    return () => clearInterval(id)
  }, [])

  const displayed = receiptText.slice(0, displayLength)
  const showCursor = building || done
  const showBarcode = done || (building && displayLength > receiptText.length * 0.7)

  const showReceipt = buildTrigger > 0

  return (
    <div className="flex flex-col items-start gap-6">
      {showReceipt && (
        <div
          className="relative w-full max-w-[260px] rounded-sm pl-4 pr-4 pt-4 pb-4 text-left transition-opacity duration-300 overflow-hidden border-l-4 border-[#b8544a]"
          style={{
            background: 'linear-gradient(180deg, #FFFEFB 0%, #FDFBF7 100%)',
            boxShadow: '0 1px 3px rgba(43,40,37,0.06)',
            borderTop: '1px solid rgba(228,223,215,0.5)',
            borderRight: '1px solid rgba(228,223,215,0.5)',
            borderBottom: '1px solid rgba(228,223,215,0.5)',
          }}
        >
          <div
            className="absolute inset-0 rounded-sm pointer-events-none opacity-[0.02] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px',
            }}
          />
          <pre
            className="relative z-10 font-sans text-[13px] leading-[1.5] lowercase whitespace-pre-wrap break-words tracking-wide font-light text-warm-gray"
            style={{ fontFamily: 'ui-monospace, "SF Mono", monospace' }}
          >
            {displayed}
            {showCursor && (
              <span
                className={`inline-block w-1.5 h-3.5 -mb-0.5 ml-0.5 align-middle bg-warm-gray ${cursorOn ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
              />
            )}
          </pre>
          {showBarcode && <ReceiptBarcode />}
        </div>
      )}
      {done && (
        <button
          type="button"
          onClick={startBuilding}
          className="px-5 py-2.5 rounded-sm border border-cream-300 text-warm-black text-sm lowercase tracking-wide hover:bg-cream-100 hover:border-cream-400 transition-all duration-300"
        >
          build again
        </button>
      )}
    </div>
  )
}
