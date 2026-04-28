import React, { useState, useEffect, useRef } from 'react'
import '../../style/Application.css'

// =============================================
// 🔧 ЗАМЕНИ ЭТИ ЗНАЧЕНИЯ НА СВОИ ИЗ SUPABASE
// Settings → API → Project URL и anon public key
// =============================================
const SUPABASE_URL = 'https://ozoxyjwbaheyjyndgqgp.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_234Uyg8bkm4IoRra8cLPOg_i_4ovg5h'
// =============================================

const ADMIN_PASSWORD = 'owner2024'

// Простой Supabase клиент без установки пакета
const supabase = {
  async getAll() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/responses?select=*&order=timestamp.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  async upsert(entry) {
    // Сначала проверяем — есть ли уже запись с таким именем
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/responses?name=ilike.${encodeURIComponent(entry.name.trim())}&select=id`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
    const existing = await checkRes.json()

    if (existing.length > 0) {
      // Обновляем
      const id = existing[0].id
      const res = await fetch(`${SUPABASE_URL}/rest/v1/responses?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          attendance: entry.attendance,
          side: entry.side,
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      return { updated: true }
    } else {
      // Добавляем новую
      const res = await fetch(`${SUPABASE_URL}/rest/v1/responses`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: entry.name.trim(),
          attendance: entry.attendance,
          side: entry.side,
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      return { updated: false }
    }
  },

  async clearAll() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/responses?id=neq.00000000-0000-0000-0000-000000000000`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
    })
    if (!res.ok) throw new Error(await res.text())
  },
}

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'Мен кубаныч менен келем' },
  { value: 'with_pair', label: 'Жубайым менен келем' },
  { value: 'no', label: 'Өкүнүчтүүсү, катышалбайм' },
  { value: 'later', label: 'Кийинчерээк билдирем' },
]

const SIDE_OPTIONS = [
  { value: 'father', label: 'Ата журт', icon: '👨' },
  { value: 'mother', label: 'Эне журт', icon: '👩' },
  { value: 'friends', label: 'Досторлор', icon: '🤝' },
  { value: 'colleagues', label: 'Кесиптештер', icon: '💼' },
  { value: 'neighbors', label: 'Көршүлөр', icon: '🏡' },
]

const SIDE_LABELS = {
  father: 'Атанын жагынан',
  mother: 'Эненин жагынан',
  friends: 'Досторлор',
  colleagues: 'Кесиптештер',
  neighbors: 'Көршүлөр',
}

const ATTENDANCE_LABELS = {
  yes: 'Келем',
  with_pair: 'Жубайым менен келем',
  no: 'Катышалбайм',
  later: 'Кийинчерээк билдирем',
}

export default function Application() {
  const [view, setView] = useState('form')
  const [formData, setFormData] = useState({ name: '', attendance: '', side: '' })
  const [errors, setErrors] = useState({})
  const [responses, setResponses] = useState([])
  const [adminPass, setAdminPass] = useState('')
  const [adminError, setAdminError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)

  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  const loadResponses = async () => {
    setAdminLoading(true)
    try {
      const data = await supabase.getAll()
      setResponses(data)
    } catch (err) {
      console.error('Supabase load error:', err)
      alert('Маалыматты жүктөөдө ката: ' + err.message)
    } finally {
      setAdminLoading(false)
    }
  }

  const handleTitleClick = () => {
    clickCount.current++
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 1200)
    if (clickCount.current >= 5) {
      clickCount.current = 0
      setView('admin-login')
    }
  }

  const validate = () => {
    const e = {}
    const parts = formData.name.trim().split(/\s+/)
    if (parts.length < 2 || parts.some(p => p.length < 2)) {
      e.name = 'Атыңызды жана фамилияңызды жазыңыз'
    }
    if (!formData.attendance) e.attendance = 'Сураныч, вариантты тандаңыз'
    if (!formData.side) e.side = 'Сураныч, вариантты тандаңыз'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setIsLoading(true)
    try {
      const result = await supabase.upsert({
        name: formData.name,
        attendance: formData.attendance,
        side: formData.side,
      })
      setIsUpdated(result.updated)
      setView('success')
    } catch (err) {
      console.error('Submit error:', err)
      alert('Жиберүүдө ката болду: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setAdminError('')
      setView('admin')
      loadResponses()
    } else {
      setAdminError('Туура эмес сырсөз')
    }
  }

  const clearAllData = async () => {
    if (window.confirm('Бардык маалыматтарды жок кылуу?')) {
      try {
        await supabase.clearAll()
        setResponses([])
      } catch (err) {
        alert('Тазалоодо ката: ' + err.message)
      }
    }
  }

  const stats = {
    total: responses.length,
    attendance: ATTENDANCE_OPTIONS.reduce((acc, o) => {
      acc[o.value] = responses.filter(r => r.attendance === o.value).length
      return acc
    }, {}),
    side: SIDE_OPTIONS.reduce((acc, o) => {
      acc[o.value] = responses.filter(r => r.side === o.value).length
      return acc
    }, {}),
    coming: responses.filter(r => r.attendance === 'yes' || r.attendance === 'with_pair').length,
  }

  // ── SUCCESS ──────────────────────────────────────────
  if (view === 'success') {
    return (
      <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="card success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">
            {isUpdated ? 'Маалыматтар жаңыртылды!' : 'Анкета жиберилди!'}
          </h2>
          <p className="success-text">
            {isUpdated
              ? 'Сиздин жазуу жаңыртылды. Рахмат!'
              : 'Анкетаны толтурганыңыз үчүн рахмат. Сиздерди тоюбузда күтөбүз!'}
          </p>
          <button
            className="btn-outline"
            onClick={() => { setFormData({ name: '', attendance: '', side: '' }); setView('form') }}
          >
            Артка кайтуу
          </button>
        </div>
      </div>
    )
  }

  // ── ADMIN LOGIN ───────────────────────────────────────
  if (view === 'admin-login') {
    return (
      <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="card admin-login-card">
          <h2 className="admin-login-title">Уюштуруучуга кирүү</h2>
          <div className="field-wrap">
            <input
              type="password"
              className="text-input"
              placeholder="Сырсөз"
              value={adminPass}
              onChange={e => { setAdminPass(e.target.value); setAdminError('') }}
              onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
            />
          </div>
          {adminError && <p className="error-msg">{adminError}</p>}
          <button className="btn-primary" onClick={handleAdminLogin}>Кирүү</button>
          <button className="btn-ghost" onClick={() => setView('form')}>← Артка</button>
        </div>
      </div>
    )
  }

  // ── ADMIN PANEL ───────────────────────────────────────
  if (view === 'admin') {
    const maxSide = Math.max(...Object.values(stats.side), 1)
    return (
      <div className={`app-wrapper admin-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Иш-чаранын статистикасы</h1>
            <div className="admin-header-actions">
              <button className="btn-ghost-sm" onClick={loadResponses} disabled={adminLoading}>
                {adminLoading ? '...' : '↻ Жаңылоо'}
              </button>
              <button className="btn-danger-sm" onClick={clearAllData}>Тазалоо</button>
              <button className="btn-ghost-sm" onClick={() => setView('form')}>← Чыгуу</button>
            </div>
          </div>

          {adminLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Жүктөлүүдө…</div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-card accent">
                  <span className="stat-num">{stats.total}</span>
                  <span className="stat-label">Бардык анкеталар</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">{stats.coming}</span>
                  <span className="stat-label">Келишет</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">{stats.attendance.no || 0}</span>
                  <span className="stat-label">Катышалбайт</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">{stats.attendance.later || 0}</span>
                  <span className="stat-label">Кийинчерээк билдиришет</span>
                </div>
              </div>

              <div className="admin-section">
                <h3 className="section-label">Коноктордун курамы</h3>
                <div className="bar-chart">
                  {SIDE_OPTIONS.map(o => (
                    <div key={o.value} className="bar-row">
                      <span className="bar-icon">{o.icon}</span>
                      <span className="bar-name">{o.label}</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: `${(stats.side[o.value] / maxSide) * 100}%` }}
                        />
                      </div>
                      <span className="bar-count">{stats.side[o.value]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-section">
                <h3 className="section-label">Катышуу</h3>
                <div className="attendance-pills">
                  {ATTENDANCE_OPTIONS.map(o => (
                    <div key={o.value} className="att-pill">
                      <span className="att-pill-count">{stats.attendance[o.value] || 0}</span>
                      <span className="att-pill-label">{o.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-section">
                <h3 className="section-label">Бардык жазуулар ({responses.length})</h3>
                {responses.length === 0 ? (
                  <p className="empty-msg">Азырынча маалымат жок</p>
                ) : (
                  <div className="table-wrap">
                    <table className="responses-table">
                      <thead>
                        <tr>
                          <th>#</th><th>Аты</th><th>Катышуу</th><th>Тарап</th><th>Дата</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map((r, i) => (
                          <tr key={r.id || i} className={i % 2 === 0 ? 'row-even' : ''}>
                            <td>{i + 1}</td>
                            <td>{r.name}</td>
                            <td>
                              <span className={`badge badge-${r.attendance}`}>
                                {ATTENDANCE_LABELS[r.attendance]}
                              </span>
                            </td>
                            <td>{SIDE_LABELS[r.side]}</td>
                            <td>{new Date(r.timestamp).toLocaleDateString('ru-RU')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── MAIN FORM ─────────────────────────────────────────
  return (
    <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
      <div className="card form-card">

        <div className="title-wrap" onClick={handleTitleClick}>
          <h1 className="main-title">АНКЕТА</h1>
          <div className="title-line" />
        </div>

        <div className={`field-group ${errors.name ? 'has-error' : ''}`}>
          <label className="field-label">Сураныч, Атыңызды жана Фамилияңызды жазыңыз</label>
          <div className="input-wrap">
            <input
              type="text"
              className="text-input"
              placeholder="Атыңыз жана Фамилияңыз"
              value={formData.name}
              onChange={e => {
                setFormData(p => ({ ...p, name: e.target.value }))
                setErrors(p => ({ ...p, name: '' }))
              }}
            />
          </div>
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className={`field-group ${errors.attendance ? 'has-error' : ''}`}>
          <label className="field-label">Биздин тоюбузга катыша аласызбы?</label>
          <div className="options-list">
            {ATTENDANCE_OPTIONS.map((opt, i) => (
              <label key={opt.value} className="radio-label" style={{ '--delay': `${i * 0.06}s` }}>
                <input
                  type="radio"
                  name="attendance"
                  value={opt.value}
                  checked={formData.attendance === opt.value}
                  onChange={() => {
                    setFormData(p => ({ ...p, attendance: opt.value }))
                    setErrors(p => ({ ...p, attendance: '' }))
                  }}
                />
                <span className="custom-radio" />
                <span className="option-text">{opt.label}</span>
              </label>
            ))}
          </div>
          {errors.attendance && <span className="error-msg">{errors.attendance}</span>}
        </div>

        <div className={`field-group ${errors.side ? 'has-error' : ''}`}>
          <label className="field-label">Сиз кимдин жагынан келесиз…</label>
          <div className="side-grid">
            {SIDE_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                type="button"
                className={`side-chip ${formData.side === opt.value ? 'selected' : ''}`}
                style={{ '--delay': `${i * 0.07}s` }}
                onClick={() => {
                  setFormData(p => ({ ...p, side: opt.value }))
                  setErrors(p => ({ ...p, side: '' }))
                }}
              >
                <span className="chip-icon">{opt.icon}</span>
                <span className="chip-label">{opt.label}</span>
              </button>
            ))}
          </div>
          {errors.side && <span className="error-msg">{errors.side}</span>}
        </div>

        <button
          className={`btn-primary submit-btn ${isLoading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner" /> : 'Жиберүү'}
        </button>

      </div>
    </div>
  )
}