import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, telefon, anliegen, nachricht } = body

    if (!name || !email || !nachricht) {
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
      subject: `Neue Kontaktanfrage von ${name} – BundU® Website`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${telefon || '–'}`,
        `Anliegen: ${anliegen || '–'}`,
        ``,
        `Nachricht:`,
        nachricht,
      ].join('\n'),
      html: `
        <h2>Neue Kontaktanfrage – BundU®</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>E-Mail:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Telefon:</strong></td><td>${telefon || '–'}</td></tr>
          <tr><td><strong>Anliegen:</strong></td><td>${anliegen || '–'}</td></tr>
        </table>
        <h3>Nachricht:</h3>
        <p>${nachricht.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
