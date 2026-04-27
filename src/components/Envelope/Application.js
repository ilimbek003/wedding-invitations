import React, { useState, useEffect, useRef } from 'react'
import '../../style/Application.css'

const ADMIN_PASSWORD = 'owner2024'
const STORAGE_KEY = 'event_responses'


const storage = {
  load() {
    console.log('%c[STORAGE] load() called', 'color:#8b6f5a;font-weight:bold')

    if (typeof window === 'undefined') {
      console.error('[STORAGE] ❌ window is undefined — not running in browser')
      return []
    }

    if (!window.localStorage) {
      console.error('[STORAGE] ❌ localStorage is not available in this browser')
      return []
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      console.log('[STORAGE] raw value from localStorage:', raw)

      if (!raw) {
        console.log('[STORAGE] ℹ️ No data found — returning empty array')
        return []
      }

      const parsed = JSON.parse(raw)
      console.log(`[STORAGE] ✅ Loaded ${parsed.length} records:`, parsed)
      return parsed
    } catch (err) {
      console.error('[STORAGE] ❌ JSON.parse failed:', err)
      console.error('[STORAGE] ❌ Corrupted value:', localStorage.getItem(STORAGE_KEY))
      return []
    }
  },

  save(data) {
    console.log('%c[STORAGE] save() called', 'color:#8b6f5a;font-weight:bold')
    console.log('[STORAGE] data to save:', data)

    if (typeof window === 'undefined') {
      console.error('[STORAGE] ❌ window is undefined — cannot save')
      return false
    }

    if (!window.localStorage) {
      console.error('[STORAGE] ❌ localStorage is not available — cannot save')
      return false
    }

    try {
      const json = JSON.stringify(data)
      console.log('[STORAGE] serialized JSON:', json)

      localStorage.setItem(STORAGE_KEY, json)

      // Verify it actually saved
      const verify = localStorage.getItem(STORAGE_KEY)
      if (verify === json) {
        console.log(`[STORAGE] ✅ Saved & verified. Total records: ${data.length}`)
        return true
      } else {
        console.error('[STORAGE] ❌ VERIFY FAILED — saved value does not match!')
        console.error('[STORAGE] Expected:', json)
        console.error('[STORAGE] Got:', verify)
        return false
      }
    } catch (err) {
      if (err.name === 'QuotaExceededError') {
        console.error('[STORAGE] ❌ QuotaExceededError — localStorage is full!')
      } else {
        console.error('[STORAGE] ❌ Unexpected error in save():', err)
      }
      return false
    }
  },

  clear() {
    console.log('%c[STORAGE] clear() called', 'color:#c0392b;font-weight:bold')
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('[STORAGE] ✅ Data cleared')
      return true
    } catch (err) {
      console.error('[STORAGE] ❌ clear() failed:', err)
      return false
    }
  }
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const ATTENDANCE_OPTIONS = [
  { value: 'yes',       label: 'Я с удовольствием приду' },
  { value: 'with_pair', label: 'Буду со своей парой' },
  { value: 'no',        label: 'К сожалению, не смогу присутствовать' },
  { value: 'later',     label: 'Сообщу позже' },
]

const SIDE_OPTIONS = [
  { value: 'father',     label: 'Со стороны отца',   icon: '👨' },
  { value: 'mother',     label: 'Со стороны матери', icon: '👩' },
  { value: 'friends',    label: 'Друзья',             icon: '🤝' },
  { value: 'colleagues', label: 'Коллеги',            icon: '💼' },
  { value: 'neighbors',  label: 'Соседи',             icon: '🏡' },
]

const SIDE_LABELS = {
  father:     'Со стороны отца',
  mother:     'Со стороны матери',
  friends:    'Друзья',
  colleagues: 'Коллеги',
  neighbors:  'Соседи',
}

const ATTENDANCE_LABELS = {
  yes:       'Приду',
  with_pair: 'Приду с парой',
  no:        'Не смогу',
  later:     'Сообщу позже',
}

const normalizeName = (n) => n.trim().toLowerCase().replace(/\s+/g, ' ')

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Application() {
  const [view,       setView]       = useState('form')
  const [formData,   setFormData]   = useState({ name: '', attendance: '', side: '' })
  const [errors,     setErrors]     = useState({})
  const [responses,  setResponses]  = useState([])
  const [adminPass,  setAdminPass]  = useState('')
  const [adminError, setAdminError] = useState('')
  const [isLoading,  setIsLoading]  = useState(false)
  const [isUpdated,  setIsUpdated]  = useState(false)
  const [mounted,    setMounted]    = useState(false)

  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  useEffect(() => {
    console.log('%c[APP] Component mounted', 'color:#2c7a4b;font-weight:bold')
    console.log('[APP] localStorage available:', !!window.localStorage)
    setTimeout(() => setMounted(true), 50)
  }, [])

  const loadResponses = () => {
    console.log('%c[APP] loadResponses() called', 'color:#2c5fa1;font-weight:bold')
    const data = storage.load()
    setResponses(data)
    console.log('[APP] responses state updated with', data.length, 'items')
  }

  const handleTitleClick = () => {
    clickCount.current++
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 1200)
    if (clickCount.current >= 5) {
      clickCount.current = 0
      console.log('[APP] Admin panel triggered via title click')
      setView('admin-login')
    }
  }

  const validate = () => {
    console.log('%c[VALIDATE] Running...', 'color:#7d5a00')
    console.log('[VALIDATE] formData:', formData)
    const e = {}
    const parts = formData.name.trim().split(/\s+/)
    if (parts.length < 2 || parts.some(p => p.length < 2)) {
      e.name = 'Введите имя и фамилию'
      console.warn('[VALIDATE] ⚠️ name invalid — parts:', parts)
    }
    if (!formData.attendance) {
      e.attendance = 'Пожалуйста, выберите вариант'
      console.warn('[VALIDATE] ⚠️ attendance not selected')
    }
    if (!formData.side) {
      e.side = 'Пожалуйста, выберите вариант'
      console.warn('[VALIDATE] ⚠️ side not selected')
    }
    const valid = Object.keys(e).length === 0
    console.log('[VALIDATE]', valid ? '✅ PASSED' : '❌ FAILED', e)
    setErrors(e)
    return valid
  }

  const handleSubmit = () => {
    console.log('%c[SUBMIT] handleSubmit() called', 'color:#2c1f14;font-weight:bold;font-size:13px')

    if (!validate()) {
      console.warn('[SUBMIT] ❌ Stopped — validation failed')
      return
    }

    setIsLoading(true)

    const current = storage.load()
    const normalizedInput = normalizeName(formData.name)
    console.log('[SUBMIT] Checking duplicate for:', normalizedInput)

    const idx = current.findIndex(r => normalizeName(r.name) === normalizedInput)
    console.log('[SUBMIT] Duplicate index:', idx, idx >= 0 ? `(${current[idx].name})` : '(none)')

    const entry = {
      name:       formData.name.trim(),
      attendance: formData.attendance,
      side:       formData.side,
      timestamp:  new Date().toISOString(),
    }
    console.log('[SUBMIT] Entry:', entry)

    if (idx >= 0) {
      current[idx] = entry
      setIsUpdated(true)
      console.log('[SUBMIT] ♻️ Updating record at index', idx)
    } else {
      current.push(entry)
      setIsUpdated(false)
      console.log('[SUBMIT] ➕ Adding new record. Total:', current.length)
    }

    const saved = storage.save(current)
    console.log('[SUBMIT] Save result:', saved ? '✅ SUCCESS' : '❌ FAILED')

    if (!saved) {
      console.error('[SUBMIT] ❌ CRITICAL: Data was NOT saved. Check [STORAGE] errors above.')
    }

    setIsLoading(false)
    setView('success')
  }

  const handleAdminLogin = () => {
    console.log('[ADMIN] Login attempt')
    if (adminPass === ADMIN_PASSWORD) {
      console.log('[ADMIN] ✅ Correct password')
      setAdminError('')
      setView('admin')
      loadResponses()
    } else {
      console.warn('[ADMIN] ❌ Wrong password entered')
      setAdminError('Неверный пароль')
    }
  }

  const clearAllData = () => {
    if (window.confirm('Удалить все данные?')) {
      storage.clear()
      setResponses([])
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

  // ─── SUCCESS ────────────────────────────────────────────────────────────────
  if (view === 'success') {
    return (
      <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="card success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">
            {isUpdated ? 'Данные обновлены!' : 'Анкета отправлена!'}
          </h2>
          <p className="success-text">
            {isUpdated
              ? 'Ваша запись была обновлена. Спасибо!'
              : 'Спасибо, что заполнили анкету. Ждём вас на нашем торжестве!'}
          </p>
          <button
            className="btn-outline"
            onClick={() => { setFormData({ name: '', attendance: '', side: '' }); setView('form') }}
          >
            Вернуться
          </button>
        </div>
      </div>
    )
  }

  // ─── ADMIN LOGIN ─────────────────────────────────────────────────────────────
  if (view === 'admin-login') {
    return (
      <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="card admin-login-card">
          <h2 className="admin-login-title">Доступ для организатора</h2>
          <div className="field-wrap">
            <input
              type="password"
              className="text-input"
              placeholder="Пароль"
              value={adminPass}
              onChange={e => { setAdminPass(e.target.value); setAdminError('') }}
              onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
            />
          </div>
          {adminError && <p className="error-msg">{adminError}</p>}
          <button className="btn-primary" onClick={handleAdminLogin}>Войти</button>
          <button className="btn-ghost" onClick={() => setView('form')}>← Назад</button>
        </div>
      </div>
    )
  }

  // ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
  if (view === 'admin') {
    const maxSide = Math.max(...Object.values(stats.side), 1)
    return (
      <div className={`app-wrapper admin-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Статистика мероприятия</h1>
            <div className="admin-header-actions">
              <button className="btn-danger-sm" onClick={clearAllData}>Очистить</button>
              <button className="btn-ghost-sm" onClick={() => setView('form')}>← Выйти</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card accent">
              <span className="stat-num">{stats.total}</span>
              <span className="stat-label">Всего анкет</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{stats.coming}</span>
              <span className="stat-label">Придут</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{stats.attendance.no || 0}</span>
              <span className="stat-label">Не смогут</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{stats.attendance.later || 0}</span>
              <span className="stat-label">Сообщат позже</span>
            </div>
          </div>

          <div className="admin-section">
            <h3 className="section-label">Состав гостей</h3>
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
            <h3 className="section-label">Присутствие</h3>
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
            <h3 className="section-label">Все записи ({responses.length})</h3>
            {responses.length === 0 ? (
              <p className="empty-msg">Нет данных — проверьте Console (F12) на ошибки</p>
            ) : (
              <div className="table-wrap">
                <table className="responses-table">
                  <thead>
                    <tr>
                      <th>#</th><th>Имя</th><th>Присутствие</th><th>Сторона</th><th>Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'row-even' : ''}>
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
        </div>
      </div>
    )
  }

  // ─── MAIN FORM ───────────────────────────────────────────────────────────────
  return (
    <div className={`app-wrapper ${mounted ? 'mounted' : ''}`}>
      <div className="card form-card">

        <div className="title-wrap" onClick={handleTitleClick}>
          <h1 className="main-title">АНКЕТА</h1>
          <div className="title-line" />
        </div>

        <div className={`field-group ${errors.name ? 'has-error' : ''}`}>
          <label className="field-label">Напишите, пожалуйста, Ваши ФИО</label>
          <div className="input-wrap">
            <input
              type="text"
              className="text-input"
              placeholder="Ваши ФИО"
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
          <label className="field-label">Сможете ли присутствовать на нашем торжестве?</label>
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
          <label className="field-label">Вы приходите со стороны…</label>
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
          {isLoading ? <span className="spinner" /> : 'Отправить'}
        </button>

      </div>
    </div>
  )
}