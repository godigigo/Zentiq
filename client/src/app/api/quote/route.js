import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SALESJET_HOOK_URL =
  "https://salesjet-v5-hooks-5l4ms6ueta-el.a.run.app/hook/eyJvIjoiWmJSUVBJSDNYMGJrenhlV19LSVlTQSIsInMiOiJ3ZWIiLCJ0IjoibGVhZCIsInYiOjEsImkiOjE3ODU3NTk1Mjg5MjV9.vZ5AKk-fpdU5q0jq4Ux6ZqVphkWPbSsXnvqC4O4TfWw";

const SALESJET_KEY = process.env.SALESJET_HOOK_KEY;

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      date,
      movingFrom,
      movingTo,
      moveSize,
      notes,
    } = body;

    if (!fullName || !email || !phone || !date || !movingFrom || !movingTo) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeDate = escapeHtml(date);
    const safeFrom = escapeHtml(movingFrom);
    const safeTo = escapeHtml(movingTo);
    const safeMoveSize = moveSize ? escapeHtml(moveSize) : "";
    const safeNotes = notes ? escapeHtml(notes) : "";

    // Send internal notification email
    await resend.emails.send({
      from: "Zentiq  <move@zentiq.ca>",
      to: ["move@zentiq.ca", "godigigoit@gmail.com"],
      replyTo: email,
      subject: `New Quote Request from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color:#004FEC;">New Moving Quote Request</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
            <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td>${safeName}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>${safeEmail}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td>${safePhone}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Moving Date:</strong></td><td>${safeDate}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Moving From:</strong></td><td>${safeFrom}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Moving To:</strong></td><td>${safeTo}</td></tr>
            ${safeMoveSize ? `<tr><td style="padding:6px 0;"><strong>Move Size:</strong></td><td>${safeMoveSize}</td></tr>` : ""}
            ${safeNotes ? `<tr><td style="padding:6px 0;"><strong>Notes:</strong></td><td>${safeNotes}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Zentiq <move@zentiq.ca>",
      to: [email],
      subject: "We received your moving quote request — Zentiq",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color:#004FEC;">Thanks, ${safeName}!</h2>
          <p>We've received your quote request for a move from <strong>${safeFrom}</strong> to <strong>${safeTo}</strong> on <strong>${safeDate}</strong>.</p>
          <p>Our team will reach out shortly with a tailored quote.</p>
          <p style="margin-top:24px;color:#666;font-size:12px;">Zentiq Moving Company · Toronto, Ontario, Canada</p>
        </div>
      `,
    });

    // Send lead to SalesJet webhook
    try {
      const salesjetPayload = {
        full_name: fullName,
        phone: phone,
        email: email,
        origin_address: movingFrom,
        origin: movingFrom,
        origin_postcode: "",
        destination_address: movingTo,
        destination: movingTo,
        destination_postcode: "",
        move_on: date,
        move_size: moveSize || "",
        estimate_amount: null,
        notes: notes || "",
      };

      await fetch(SALESJET_HOOK_URL, {
        method: "POST",
        headers: {
          "X-SJT-Key": SALESJET_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesjetPayload),
      });
    } catch (hookErr) {
      console.error("SalesJet hook error:", hookErr);
      // Don't fail the request if hook fails - emails already sent
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again." },
      { status: 500 },
    );
  }
}