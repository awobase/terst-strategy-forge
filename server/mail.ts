import nodemailer from "nodemailer";
import { Resend } from "resend";

export type ContactPayload = {
  nom: string;
  email: string;
  entreprise?: string;
  telephone?: string;
  objet: string;
  objetLabel: string;
  message: string;
};

function getContactTo() {
  return process.env.CONTACT_TO ?? process.env.MAIL_TO ?? "contact@cayribepartners.com";
}

function getMailFrom() {
  return process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "contact@cayribepartners.com";
}

function buildContactHtml(data: ContactPayload) {
  return `
    <h2>Nouvelle demande de contact — CAYRIBE PARTNERS</h2>
    <p><strong>Nom :</strong> ${escapeHtml(data.nom)}</p>
    <p><strong>E-mail :</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Société :</strong> ${escapeHtml(data.entreprise || "Non renseignée")}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(data.telephone || "Non renseigné")}</p>
    <p><strong>Demande :</strong> ${escapeHtml(data.objetLabel)}</p>
    <p><strong>Message :</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;
}

function buildContactText(data: ContactPayload) {
  return [
    "Nouvelle demande de contact — CAYRIBE PARTNERS",
    "",
    `Nom : ${data.nom}`,
    `E-mail : ${data.email}`,
    `Société : ${data.entreprise || "Non renseignée"}`,
    `Téléphone : ${data.telephone || "Non renseigné"}`,
    `Demande : ${data.objetLabel}`,
    "",
    "Message :",
    data.message,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaSmtp(data: ContactPayload) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!host || !user || !password) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = getMailFrom();
  const to = getContactTo();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `[Contact] ${data.objetLabel} — ${data.nom}`,
    text: buildContactText(data),
    html: buildContactHtml(data),
  });

  return true;
}

async function sendViaResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const resend = new Resend(apiKey);
  const from = getMailFrom();
  const to = getContactTo();

  await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[Contact] ${data.objetLabel} — ${data.nom}`,
    text: buildContactText(data),
    html: buildContactHtml(data),
  });

  return true;
}

export function isMailConfigured() {
  const smtpOk = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
  const resendOk = Boolean(process.env.RESEND_API_KEY);
  return smtpOk || resendOk;
}

export async function sendContactEmail(data: ContactPayload) {
  if (!isMailConfigured()) {
    throw new Error("Envoi e-mail non configuré (SMTP ou RESEND_API_KEY manquant dans .env)");
  }

  if (await sendViaSmtp(data)) return { provider: "smtp" as const };
  if (await sendViaResend(data)) return { provider: "resend" as const };

  throw new Error("Impossible d'envoyer l'e-mail");
}
