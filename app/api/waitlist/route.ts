import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Updated validation schema
const earlyAccessSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
  phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number is too long'),
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate data with Zod
    const validationResult = earlyAccessSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        { error: 'Invalid data', details: errors },
        { status: 400 }
      );
    }

    const { firstName, lastName, phone, email } = validationResult.data;

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Business Card <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL as string],
      subject: `New request - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #FB923C 0%, #F97316 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 600;">
              New Business Card Request
            </h1>
          </div>

          <div style="background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">
                Full Name
              </p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 600;">
                ${firstName} ${lastName}
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">
                Email
              </p>
              <p style="margin: 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #F97316; text-decoration: none;">
                  ${email}
                </a>
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">
                Phone
              </p>
              <p style="margin: 0; font-size: 16px;">
                <a href="tel:${phone}" style="color: #F97316; text-decoration: none;">
                  ${phone}
                </a>
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                📅 ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Request sent successfully',
        data,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
