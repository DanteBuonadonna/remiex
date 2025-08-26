import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  name?: string;
  confirmationUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Send confirmation email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, confirmationUrl }: ConfirmationEmailRequest = await req.json();
    
    console.log("Sending confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Remi <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Remi - Confirm Your Account",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm Your Account</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                padding: 20px; 
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); 
                border-radius: 12px; 
                color: white; 
              }
              .logo { 
                font-size: 32px; 
                font-weight: bold; 
                margin-bottom: 10px; 
              }
              .button { 
                display: inline-block; 
                padding: 16px 32px; 
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); 
                color: white; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: 600; 
                margin: 20px 0; 
              }
              .footer { 
                margin-top: 40px; 
                padding-top: 20px; 
                border-top: 1px solid #eee; 
                font-size: 14px; 
                color: #666; 
                text-align: center; 
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">🤖 Remi</div>
              <p>AI Chat Clone Platform</p>
            </div>
            
            <h1>Welcome to Remi${name ? `, ${name}` : ''}!</h1>
            
            <p>Thank you for signing up for Remi, the AI platform that lets you create chat clones of your friends, family, and favorite people.</p>
            
            <p>To get started and confirm your account, please click the button below:</p>
            
            <div style="text-align: center;">
              <a href="${confirmationUrl}" class="button">Confirm Your Account</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; padding: 10px; background: #f5f5f5; border-radius: 4px; font-family: monospace;">
              ${confirmationUrl}
            </p>
            
            <p>Once confirmed, you'll be able to:</p>
            <ul>
              <li>📸 Upload chat screenshots from any messaging app</li>
              <li>🤖 Create AI clones that chat exactly like your friends</li>
              <li>💬 Have realistic conversations with your AI personalities</li>
              <li>🎯 Enjoy highly accurate personality matching</li>
            </ul>
            
            <p>If you didn't create this account, you can safely ignore this email.</p>
            
            <div class="footer">
              <p>This email was sent by Remi. If you have any questions, feel free to reply to this email.</p>
              <p>Happy chatting! 🎉</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);