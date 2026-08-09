import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, kurs, nachricht } = body

    if (!name || !email || !kurs) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'walter.uehli@bundu.ch',
      subject: `Neue Kursanmeldung: ${kurs} – BundU® Website`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Kurs: ${kurs}`,
        ``,
        `Bemerkungen:`,
        nachricht || '–',
      ].join('\n'),
      html: `
        <h2>Neue Kursanmeldung – BundU®</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>E-Mail:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Kurs:</strong></td><td>${kurs}</td></tr>
        </table>
        <h3>Bemerkungen:</h3>
        <p>${(nachricht || '–').replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    // Confirmation email to participant
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Anmeldung eingegangen – BundU®`,
      text: `Liebe/r ${name},\n\nVielen Dank für Ihre Anmeldung zum Kurs "${kurs}".\n\nWir bestätigen Ihnen die Anmeldung und melden uns in Kürze mit weiteren Informationen.\n\nFreundliche Grüsse\nWalter Uehli\nBundU® – Bildung und Entwicklung\ninfo@bundu.ch`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Anmeldung error:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
