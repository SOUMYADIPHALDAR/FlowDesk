import { transporter } from "@/lib/employee/email";

interface sendEmailActionProps {
    email: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    department: string;
    activationLink: string;
}

export async function sendEmail({email, employeeName, employeeId, designation, department, activationLink}: sendEmailActionProps) {
  await transporter.sendMail({
    from: `"FlowDesk" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Flowdesk",
     html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f5f7fb; padding:40px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:40px;">

          <h1 style="color:#036EFF; margin-bottom:20px;">
            Welcome to ${department}
          </h1>

          <p>Hello <strong>${employeeName}</strong>,</p>

          <p>
            Your employee account has been successfully created by the administrator.
            We are excited to have you on board.
          </p>

          <hr style="margin:30px 0;" />

          <h3>Your Account Details</h3>

          <table style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;"><strong>Employee ID</strong></td>
              <td style="padding:8px 20px;">${employeeId}</td>
            </tr>

            <tr>
              <td style="padding:8px 0;"><strong>Name</strong></td>
              <td style="padding:8px 20px;">${employeeName}</td>
            </tr>

            <tr>
              <td style="padding:8px 0;"><strong>Designation</strong></td>
              <td style="padding:8px 20px;">${designation}</td>
            </tr>

            <tr>
              <td style="padding:8px 0;"><strong>Email</strong></td>
              <td style="padding:8px 20px;">${email}</td>
            </tr>
          </table>

          <p style="margin-top:35px;">
            To activate your account and set your password, click the button below.
          </p>

          <div style="text-align:center; margin:35px 0;">
            <a
              href="${activationLink}"
              style="
                background:#036EFF;
                color:white;
                text-decoration:none;
                padding:14px 28px;
                border-radius:8px;
                display:inline-block;
                font-weight:bold;
              "
            >
              Activate Account
            </a>
          </div>

          <p>
            If the button above doesn't work, copy and paste the following URL into your browser:
          </p>

          <p style="word-break:break-word; color:#036EFF;">
            ${activationLink}
          </p>

          <hr style="margin:30px 0;" />

          <p style="color:#666;">
            <strong>Note:</strong> This invitation link will expire in <strong>24 hours</strong>.
          </p>

          <p style="color:#666;">
            If you were not expecting this invitation, please contact your administrator.
          </p>

          <br />

          <p>
            Best Regards,<br/>
            <strong>${department} Team</strong>
          </p>

        </div>
      </div>
    `,
  });
};