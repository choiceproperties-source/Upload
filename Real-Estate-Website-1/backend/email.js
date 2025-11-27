export const getSchedulingEmailTemplate = (appointment, date, time, notes) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header with Background -->
    <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Viewing Scheduled</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">BuildEstate Property Viewing</p>
    </div>

    <!-- Main Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <!-- Appointment Details -->
      <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Appointment Details</h2>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Property:</strong> ${appointment.propertyId.title}
        </p>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Time:</strong> ${time}
        </p>
        ${notes ? `
        <p style="margin: 8px 0; color: #374151;">
          <strong>Notes:</strong> ${notes}
        </p>
        ` : ''}
        <p style="margin: 8px 0; color: #374151;">
          <strong>Status:</strong> <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 14px; background: #fef3c7; color: #854d0e;">Pending</span>
        </p>
      </div>

      <!-- Next Steps -->
      <div style="margin-top: 30px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="display: inline-block; width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; margin-right: 10px; text-align: center; line-height: 24px; color: #854d0e;">!</span>
            We will confirm your appointment shortly
          </li>
        </ul>
      </div>

      <!-- Contact Support -->
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
        <p style="margin: 0; color: #4b5563;">
          Our support team is available 24/7 to assist you:
          <br>
          📧 <a href="mailto:support@buildestate.com" style="color: #2563eb; text-decoration: none;">support@buildestate.com</a>
          <br>
          📞 <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-890</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #6b7280; font-size: 14px;">
        © ${new Date().getFullYear()} BuildEstate. All rights reserved.
      </p>
      <div style="margin-top: 10px;">
        <a href="https://real-estate-website-sepia-two.vercel.app" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      </div>
    </div>
  </div>
`;


export const getEmailTemplate = (appointment, status) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header with Background -->
    <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">BuildEstate Property Viewing</p>
    </div>

    <!-- Main Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <!-- Appointment Details -->
      <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Appointment Details</h2>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Property:</strong> ${appointment.propertyId.title}
        </p>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Time:</strong> ${appointment.time}
        </p>
        <p style="margin: 8px 0; color: #374151;">
          <strong>Status:</strong> <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 14px; background: ${
            status === 'confirmed' ? '#dcfce7' : status === 'cancelled' ? '#fee2e2' : '#fef3c7'
          }; color: ${
            status === 'confirmed' ? '#166534' : status === 'cancelled' ? '#991b1b' : '#854d0e'
          };">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </p>
      </div>

      <!-- Next Steps -->
      <div style="margin-top: 30px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${status === 'confirmed' ? `
            <li style="margin-bottom: 10px; display: flex; align-items: center;">
              <span style="display: inline-block; width: 24px; height: 24px; background: #dcfce7; border-radius: 50%; margin-right: 10px; text-align: center; line-height: 24px; color: #166534;">✓</span>
              Arrive 10 minutes before your scheduled time
            </li>
            <li style="margin-bottom: 10px; display: flex; align-items: center;">
              <span style="display: inline-block; width: 24px; height: 24px; background: #dcfce7; border-radius: 50%; margin-right: 10px; text-align: center; line-height: 24px; color: #166534;">✓</span>
              Bring valid identification
            </li>
          ` : status === 'cancelled' ? `
            <li style="margin-bottom: 10px; display: flex; align-items: center;">
              <span style="display: inline-block; width: 24px; height: 24px; background: #fee2e2; border-radius: 50%; margin-right: 10px; text-align: center; line-height: 24px; color: #991b1b;">i</span>
              You can schedule another viewing at any time
            </li>
          ` : `
            <li style="margin-bottom: 10px; display: flex; align-items: center;">
              <span style="display: inline-block; width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; margin-right: 10px; text-align: center; line-height: 24px; color: #854d0e;">!</span>
              We will confirm your appointment shortly
            </li>
          `}
        </ul>
      </div>

      <!-- Contact Support -->
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
        <p style="margin: 0; color: #4b5563;">
          Our support team is available 24/7 to assist you:
          <br>
          📧 <a href="mailto:support@buildestate.com" style="color: #2563eb; text-decoration: none;">support@buildestate.com</a>
          <br>
          📞 <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-890</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #6b7280; font-size: 14px;">
        © ${new Date().getFullYear()} BuildEstate. All rights reserved.
      </p>
      <div style="margin-top: 10px;">
        <a href="https://real-estate-website-sepia-two.vercel.app" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      </div>
    </div>
  </div>
`;

export const getNewsletterTemplate = (email) => `
<div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
  <!-- Header with Background -->
  <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to BuildEstate!</h1>
    <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">Your Premier Real Estate Newsletter</p>
  </div>

  <!-- Main Content -->
  <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
    <!-- Welcome Message -->
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="font-size: 18px; color: #374151; margin: 0;">Hello <strong style="color: #2563eb;">${email}</strong></p>
      <p style="font-size: 16px; color: #4b5563; margin-top: 10px;">
        Thank you for joining our community of property enthusiasts!
      </p>
    </div>

    <!-- Benefits Section -->
    <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">What You'll Get:</h2>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Latest Property Listings
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Real Estate Market Trends
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Exclusive Property Deals
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Investment Opportunities
        </li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="${process.env.WEBSITE_URL}"
         style="display: inline-block; padding: 16px 30px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
        Explore Properties
      </a>
    </div>

    <!-- Important Note -->
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 30px;">
      <p style="margin: 0; color: #4b5563; font-size: 14px;">
        <strong style="color: #1e40af;">📝 Note:</strong> To ensure you don't miss our updates, please add
        <a href="mailto:support@buildestate.com" style="color: #2563eb; text-decoration: none;">support@buildestate.com</a>
        to your contacts.
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px;">
    <div style="margin-bottom: 20px;">
      <a href="#" style="display: inline-block; margin: 0 8px; color: #2563eb; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/facebook-new.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px; color: #2563eb; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px; color: #2563eb; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin: 0;">
      © ${new Date().getFullYear()} BuildEstate. All rights reserved.
    </p>
    <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">
      You can <a href="#" style="color: #2563eb; text-decoration: none;">unsubscribe</a> at any time.
    </p>
  </div>
</div>
`;

export const getWelcomeTemplate = (name) => `
<div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
  <!-- Header with Background -->
  <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to BuildEstate!</h1>
    <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">Your Dream Home Awaits</p>
  </div>

  <!-- Main Content -->
  <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
    <!-- Welcome Message -->
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="font-size: 18px; color: #374151; margin: 0;">Hello <strong style="color: #2563eb;">${name}</strong></p>
      <p style="font-size: 16px; color: #4b5563; margin-top: 10px;">
        Welcome to our community of property enthusiasts! Your account has been successfully created.
      </p>
    </div>

    <!-- Features Section -->
    <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Unlock These Features:</h2>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Browse Premium Property Listings
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Schedule Property Viewings
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Save Favorite Properties
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Direct Contact with Property Owners
        </li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="${process.env.WEBSITE_URL}/properties"
         style="display: inline-block; padding: 16px 30px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
        Start Exploring Properties
      </a>
    </div>

    <!-- Support Section -->
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
      <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Need Assistance?</h3>
      <p style="margin: 0; color: #4b5563;">
        Our support team is available 24/7:
        <br>
        📧 <a href="mailto:support@buildestate.com" style="color: #2563eb; text-decoration: none;">support@buildestate.com</a>
        <br>
        📞 <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-890</a>
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px;">
    <div style="margin-bottom: 20px;">
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/facebook-new.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin: 0;">
      © ${new Date().getFullYear()} BuildEstate. All rights reserved.
    </p>
    <div style="margin-top: 10px;">
      <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    </div>
  </div>
</div>
`;

export const getPasswordResetTemplate = (resetUrl) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header with Background -->
    <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">BuildEstate Account Security</p>
    </div>

    <!-- Main Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <!-- Security Notice Box -->
      <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Password Reset Request</h2>
        <p style="margin: 8px 0; color: #374151;">
          We received a request to reset your password for your BuildEstate account. For your security, this link will expire in 10 minutes.
        </p>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetUrl}"
           style="display: inline-block; padding: 16px 30px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
          Reset Password
        </a>
      </div>

      <!-- Security Tips -->
      <div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">Security Notice</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="display: inline-block; width: 24px; height: 24px; background: #fde68a; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #92400e;">!</span>
            If you didn't request this password reset, please ignore this email
          </li>
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="display: inline-block; width: 24px; height: 24px; background: #fde68a; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #92400e;">!</span>
            Never share this email or your password with anyone
          </li>
        </ul>
      </div>

      <!-- Support Section -->
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
        <p style="margin: 0; color: #4b5563;">
          If you didn't request this reset or need assistance:
          <br>
          📧 <a href="mailto:security@buildestate.com" style="color: #2563eb; text-decoration: none;">security@buildestate.com</a>
          <br>
          📞 <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-890</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #6b7280; font-size: 14px;">
        © ${new Date().getFullYear()} BuildEstate. All rights reserved.
      </p>
      <div style="margin-top: 10px;">
        <a href="https://real-estate-website-sepia-two.vercel.app" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      </div>
    </div>
  </div>
`;
export const getApplicationConfirmationTemplate = (applicationId, email) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Application Received!</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0;">Your tenant screening process has begun</p>
    </div>

    <!-- Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #374151;">Thank you for submitting your application to Choice Properties!</p>
      
      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #059669; margin: 0 0 10px 0;">Application ID</h2>
        <p style="font-size: 20px; font-weight: bold; color: #10b981; margin: 0;">${applicationId}</p>
        <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">Save this for your records</p>
      </div>

      <h3 style="color: #1f2937; margin-top: 30px;">What's Next?</h3>
      <ol style="color: #374151; line-height: 2;">
        <li>We'll contact your references within 24-48 hours</li>
        <li>Background check will be processed</li>
        <li>You'll receive results within 3-5 business days</li>
      </ol>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <p style="color: #4b5563; margin: 0;">
          📧 Email: support@choiceproperties.com<br>
          📞 Phone: +1 (234) 567-8900<br>
          🕐 Available 24/7
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
      © ${new Date().getFullYear()} Choice Properties. All rights reserved.
    </div>
  </div>
`;

export const getPaymentConfirmationTemplate = (transactionId, amount, email) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">✓ Payment Confirmed</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0;">Your transaction was successful</p>
    </div>

    <!-- Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #1e40af; margin: 0 0 15px 0;">Transaction Details</h2>
        <p style="margin: 10px 0; color: #374151;"><strong>Transaction ID:</strong> ${transactionId}</p>
        <p style="margin: 10px 0; color: #374151;"><strong>Amount:</strong> $${amount}</p>
        <p style="margin: 10px 0; color: #374151;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Completed</span></p>
        <p style="margin: 10px 0; color: #374151;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <p style="color: #6b7280;">A detailed receipt has been sent separately. Keep it for your records.</p>
      <p style="color: #6b7280;">Your payment is secure and protected by SSL encryption.</p>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
        <p style="color: #4b5563; margin: 0;">Need help? Contact support@choiceproperties.com</p>
      </div>
    </div>
  </div>
`;

export const getNewsletterWelcomeTemplate = (email) => `
  <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Choice Properties!</h1>
      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0;">Your trusted source for rental insights</p>
    </div>

    <!-- Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #374151;">Hi there!</p>
      <p style="color: #6b7280;">Thank you for subscribing to the Choice Properties newsletter. You'll now receive:</p>
      
      <ul style="color: #374151; line-height: 2; margin: 20px 0;">
        <li>✓ New property listings in your area</li>
        <li>✓ Rental market trends and insights</li>
        <li>✓ Moving tips and guides</li>
        <li>✓ Exclusive offers and promotions</li>
      </ul>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <p style="color: #4b5563; margin: 0;">You'll receive updates weekly. You can manage your preferences or unsubscribe anytime.</p>
      </div>

      <p style="text-align: center; margin-top: 30px;">
        <a href="https://choiceproperties.com" style="display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 8px;">Browse Properties</a>
      </p>
    </div>
  </div>
`;

export const getApplicationStatusChangeTemplate = (status, applicationId, firstName) => {
  const statusColors = {
    'screening': { bg: '#fef3c7', border: '#f59e0b', text: '#b45309', badge: '#fbbf24' },
    'approved': { bg: '#dcfce7', border: '#10b981', text: '#166534', badge: '#86efac' },
    'rejected': { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', badge: '#fca5a5' }
  };
  
  const colors = statusColors[status] || { bg: '#dbeafe', border: '#0284c7', text: '#0c4a6e', badge: '#7dd3fc' };
  const messages = {
    'screening': 'Your application is now under review by our team.',
    'approved': 'Congratulations! Your application has been approved!',
    'rejected': 'Thank you for your application. Unfortunately, it does not meet our requirements at this time.'
  };
  
  return `
    <div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
      <div style="background: linear-gradient(135deg, ${colors.border}, ${colors.border}); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Application ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
      </div>
      <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 16px; color: #374151;">Hello ${firstName},</p>
        <div style="background: ${colors.bg}; border-left: 4px solid ${colors.border}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 0; color: ${colors.text}; font-size: 16px;">${messages[status] || 'Your application status has been updated.'}</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 8px 0; color: #4b5563;"><strong>Application ID:</strong> <span style="font-family: monospace;">${applicationId}</span></p>
          <p style="margin: 8px 0; color: #4b5563;"><strong>Status:</strong> <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; background: ${colors.badge}; color: ${colors.text}; font-weight: bold;">${status.toUpperCase()}</span></p>
        </div>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
          <p style="color: #4b5563; margin: 0;">📧 Email: support@choiceproperties.com | 📞 Phone: +1 (234) 567-8900</p>
        </div>
      </div>
    </div>
  `;
};
