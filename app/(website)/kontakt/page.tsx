'use client'

import { useState } from 'react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefon: '',
    anliegen: '',
    nachricht: '',
  })
  const [anmeldungData, setAnmeldungData] = useState({
    name: '',
    email: '',
    kurs: '',
    nachricht: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [anmeldungStatus, setAnmeldungStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const handleAnmeldung = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnmeldungStatus('sending')
    try {
      const res = await fetch('/api/anmeldung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anmeldungData),
      })
      setAnmeldungStatus(res.ok ? 'success' : 'error')
    } catch {
      setAnmeldungStatus('error')
    }
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Kontakt</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nehmen Sie Kontakt auf – wir freuen uns auf Ihre Nachricht.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Nachricht senden</h2>

              {status === 'success' ? (
                <div className="bg-green-50 text-green-800 rounded-xl p-6 text-center">
                  <p className="text-lg font-semibold mb-2">Vielen Dank für Ihre Nachricht!</p>
                  <p>Wir melden uns so bald wie möglich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">E-Mail *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                      <input
                        type="tel"
                        value={formData.telefon}
                        onChange={e => setFormData({ ...formData, telefon: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Anliegen</label>
                      <select
                        value={formData.anliegen}
                        onChange={e => setFormData({ ...formData, anliegen: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="eltern-coaching">Eltern-Coaching</option>
                        <option value="supervision">Supervision</option>
                        <option value="weiterbildung">Weiterbildung / Kurs</option>
                        <option value="buendner-standard">Bündner Standard</option>
                        <option value="inhouse">Inhouse-Fortbildung</option>
                        <option value="anderes">Anderes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nachricht *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.nachricht}
                      onChange={e => setFormData({ ...formData, nachricht: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-600 text-sm">Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@bundu.ch</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Kursanmeldung</h2>

              {anmeldungStatus === 'success' ? (
                <div className="bg-green-50 text-green-800 rounded-xl p-6 text-center">
                  <p className="text-lg font-semibold mb-2">Anmeldung eingegangen!</p>
                  <p>Wir senden Ihnen eine Bestätigung per E-Mail.</p>
                </div>
              ) : (
                <form onSubmit={handleAnmeldung} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={anmeldungData.name}
                        onChange={e => setAnmeldungData({ ...anmeldungData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">E-Mail *</label>
                      <input
                        type="email"
                        required
                        value={anmeldungData.email}
                        onChange={e => setAnmeldungData({ ...anmeldungData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kurs / Angebot *</label>
                    <select
                      required
                      value={anmeldungData.kurs}
                      onChange={e => setAnmeldungData({ ...anmeldungData, kurs: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="erziehungsratgeber-7-12">Erziehungsratgeber 7–12 Jahre (CHF 350.–)</option>
                      <option value="neue-autoritaet-webinar">Neue Autorität für Fachpersonen Webinar (CHF 750.–)</option>
                      <option value="systemische-gespraechsfuehrung">Systemische Gesprächsführung (CHF 520.–)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bemerkungen</label>
                    <textarea
                      rows={3}
                      value={anmeldungData.nachricht}
                      onChange={e => setAnmeldungData({ ...anmeldungData, nachricht: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  {anmeldungStatus === 'error' && (
                    <p className="text-red-600 text-sm">Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.</p>
                  )}
                  <button
                    type="submit"
                    disabled={anmeldungStatus === 'sending'}
                    className="bg-amber text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {anmeldungStatus === 'sending' ? 'Wird gesendet...' : 'Jetzt anmelden'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-navy mb-6">Kontaktdaten</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-navy">Walter Uehli</p>
                  <p className="text-gray-600">BundU® – Bildung und Entwicklung</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Adresse</p>
                  <p className="text-gray-600">Klosterstrasse 5<br />CH-5626 Bremgarten</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Telefon</p>
                  <a href="tel:+41555056203" className="text-teal hover:underline">+41 (0)55 505 62 03</a>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">E-Mail</p>
                  <a href="mailto:info@bundu.ch" className="text-teal hover:underline">info@bundu.ch</a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-navy mb-3">Online-Beratung</h4>
                <p className="text-gray-600 text-sm">Alle Online-Beratungen und Coachings finden via coachingspace.net statt – DSGVO-konform und sicher.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
