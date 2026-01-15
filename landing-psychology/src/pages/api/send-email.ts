import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import siteData from '../../data/site.json';
import { validateForm } from '../../utils/validators';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: 'Error al procesar los datos enviados.',
      }),
      { status: 400 }
    );
  }

  const { name, email, phone, message } = data;

  // Validation
  const validation = validateForm(data);

  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        message: 'Faltan campos obligatorios o son inválidos',
        errors: validation.errors
      }),
      { status: 400 }
    );
  }

  try {
    // 1. Enviar notificación al dueño (y copia a siteData)
    const { error: adminError } = await resend.emails.send({
      from: 'Consultas Web <onboarding@brandondev.me>',
      to: ['brandoncarrilloalvarez2@gmail.com', siteData.contact.email], 
      replyTo: email,
      subject: `Nueva consulta de ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Consulta</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 40px; margin-bottom: 40px;">
            
            <!-- Header -->
            <div style="background-color: #559A95; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 24px; letter-spacing: 1px;">Nueva Consulta Web</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #666666;">
                Hola Daniela, has recibido un nuevo mensaje a través de tu sitio web. Aquí están los detalles:
              </p>

              <div style="background-color: #f5fbfb; padding: 25px; border-radius: 6px; border-left: 4px solid #559A95; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                  <strong style="color: #559A95; display: inline-block; width: 80px;">Nombre:</strong> 
                  ${name}
                </p>
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                  <strong style="color: #559A95; display: inline-block; width: 80px;">Email:</strong> 
                  <a href="mailto:${email}" style="color: #333333; text-decoration: none;">${email}</a>
                </p>
                <p style="margin: 0; font-size: 15px;">
                  <strong style="color: #559A95; display: inline-block; width: 80px;">Teléfono:</strong> 
                  ${phone || 'No proporcionado'}
                </p>
              </div>

              <div style="margin-bottom: 10px;">
                <strong style="color: #333333; font-size: 16px;">Mensaje:</strong>
              </div>
              <p style="background-color: #fafafa; padding: 20px; border-radius: 6px; color: #555555; line-height: 1.6; margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>

              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #559A95; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 15px;">Responder a ${name}</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
              <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
              <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Daniela Rodriguez Psicóloga Clínica.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminError) {
      console.error('Error enviando al admin:', adminError);
      return new Response(JSON.stringify({ message: adminError.message }), { status: 500 });
    }

    // 2. Enviar correo de confirmación al usuario
    const { error: userError } = await resend.emails.send({
      from: 'Daniela Rodriguez <onboarding@brandondev.me>',
      to: [email],
      subject: 'He recibido tu mensaje - Daniela Rodriguez',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mensaje Recibido</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #faf9f6; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 40px; margin-bottom: 40px;">
            
            <!-- Header -->
            <div style="background-color: #ffffff; padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
              <h1 style="color: #333333; margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; letter-spacing: 0.5px;">Gracias por escribirme</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #666666;">
                Hola <strong>${name}</strong>,
              </p>
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #666666;">
                He recibido tu mensaje correctamente. Muchas gracias por contactarme y por la confianza.
              </p>
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 30px; color: #666666;">
                Revisaré tu consulta lo antes posible y te responderé en breve para coordinar o resolver tus dudas. Normalmente respondo en un plazo de 24 a 48 horas hábiles.
              </p>

              <div style="background-color: #f5fbfb; padding: 20px; border-radius: 6px; text-align: center;">
                <p style="font-size: 14px; color: #559A95; margin: 0;">
                  <em>"El primer paso para sanar es ser escuchado."</em>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #333333; padding: 30px; text-align: center; color: #ffffff;">
              <p style="margin: 0 0 10px 0; font-family: 'Playfair Display', serif; font-size: 18px;">Daniela Rodriguez</p>
              <p style="margin: 0; font-size: 12px; color: #aaaaaa; letter-spacing: 1px; text-transform: uppercase;">Psicóloga Clínica</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (userError) {
      console.error('Error enviando al usuario:', userError);
      // No fallamos la request completa si falla el correo de confirmación, pero lo logueamos
    }

    return new Response(
      JSON.stringify({
        message: 'Emails enviados correctamente',
      }),
      { status: 200 }
    );

    return new Response(
      JSON.stringify({
        message: 'Emails enviados correctamente',
      }),
      { status: 200 }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        message: e.message,
      }),
      { status: 500 }
    );
  }
};
