import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle back button click
  const handleBackButton = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="privacy-policy-container p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        className="mb-5 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={handleBackButton}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        NutriSmart ("we," "us," "our") is committed to protecting the privacy of
        our users ("you," "your"). This Privacy Policy outlines how we collect,
        use, and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p>We collect the following types of information:</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Personal Information:</strong> Name, email address, and other
          contact details when you create an account.
        </li>
        <li>
          <strong>Medical Information:</strong> Details about your medical
          conditions and dietary preferences to provide personalized recipes.
        </li>
        <li>
          <strong>Images and Illustrations:</strong> Photos and illustrations
          you upload to the Service for recipe recommendations.
        </li>
        <li>
          <strong>Usage Data:</strong> Information on how you interact with our
          Service, including IP address, device type, browser type, and pages
          visited.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <p>We use your information to:</p>
      <ul className="list-disc pl-6">
        <li>Provide, operate, and maintain the Service.</li>
        <li>
          Personalize your experience based on your medical conditions and
          dietary preferences.
        </li>
        <li>
          Improve the quality of our Service through analytics and user
          feedback.
        </li>
        <li>
          Communicate with you about updates, promotions, and other information
          related to NutriSmart.
        </li>
        <li>
          Comply with legal obligations and protect the rights and safety of
          NutriSmart and its users.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Data Sharing and Disclosure
      </h2>
      <p>
        We do not sell, rent, or trade your personal information to third
        parties. We may share your information in the following circumstances:
      </p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Service Providers:</strong> We may share your information with
          third-party service providers who assist us in providing and
          maintaining the Service, subject to confidentiality agreements.
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose your information
          if required by law or in response to valid requests by public
          authorities (e.g., a court or government agency).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p>
        NutriSmart employs reasonable security measures to protect your
        information from unauthorized access, disclosure, or destruction.
        However, no method of transmission over the Internet or electronic
        storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. User Rights and Choices
      </h2>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6">
        <li>Access, update, or delete your personal information.</li>
        <li>Withdraw consent for processing your personal data.</li>
        <li>
          Opt-out of receiving promotional communications from us by following
          the unsubscribe instructions in any email we send or by contacting us
          directly.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. Cookies and Tracking Technologies
      </h2>
      <p>
        NutriSmart uses cookies and similar tracking technologies to improve
        user experience and analyze usage patterns. You can control the use of
        cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Retention of Data</h2>
      <p>
        We retain your personal information for as long as necessary to provide
        the Service and fulfill the purposes outlined in this Privacy Policy.
        You may request the deletion of your data at any time by contacting us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Third-Party Links</h2>
      <p>
        Our Service may contain links to third-party websites or services. We
        are not responsible for the privacy practices or the content of these
        third-party sites. We encourage you to review the privacy policies of
        any third-party sites you visit.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        9. Children's Privacy
      </h2>
      <p>
        NutriSmart does not knowingly collect personal information from children
        under the age of 13. If you are a parent or guardian and believe that
        your child has provided us with personal information, please contact us
        immediately.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        10. Changes to This Privacy Policy
      </h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. Your
        continued use of the Service after such modifications will constitute
        your acknowledgment of the modified Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at [Insert Contact Information].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
