import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Terms: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle back button click
  const handleBackButton = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="terms-container p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        className="p-2 mb-5 bg-gray-800 text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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

      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>
        Welcome to NutriSmart! By using our web application, you agree to comply
        with and be bound by the following terms and conditions. Please review
        these terms carefully. If you do not agree with these terms, you should
        not use our application.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using NutriSmart, you agree to be bound by these Terms
        of Service ("Terms"). These Terms apply to all visitors, users, and
        others who access or use the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Description of Service
      </h2>
      <p>
        NutriSmart is an AI-based web application that provides personalized
        recipes based on user-provided illustrations and medical conditions. By
        using the Service, you agree to provide accurate, complete, and current
        information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Accounts</h2>
      <p>
        To use certain features of the Service, you must create an account. You
        are responsible for maintaining the confidentiality of your account and
        password and for restricting access to your computer. You agree to
        accept responsibility for all activities that occur under your account
        or password.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. User Obligations</h2>
      <ul className="list-disc pl-6">
        <li>
          You agree to provide accurate and complete medical and personal
          information.
        </li>
        <li>
          You agree not to use the Service for any unlawful purpose or in any
          way that could harm or impair the operation of the Service.
        </li>
        <li>
          You agree not to upload or share any content that is offensive,
          discriminatory, or violates any third-party rights.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p>
        NutriSmart takes user privacy and data security seriously. All personal
        and medical information provided by users is encrypted and securely
        stored. However, NutriSmart cannot guarantee absolute security of data
        transmitted over the internet.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. Use of AI and Content
      </h2>
      <p>
        NutriSmart uses artificial intelligence algorithms to generate
        personalized recipes. The generated content is for informational
        purposes only and should not replace professional medical advice. Users
        are responsible for ensuring that any suggested recipes align with their
        health conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. User-Generated Content
      </h2>
      <p>
        NutriSmart allows users to upload images and other content. By uploading
        content, you grant NutriSmart a non-exclusive, royalty-free, worldwide
        license to use, display, and distribute your content within the
        application. You represent and warrant that you have the right to upload
        and share the content and that it does not infringe any third-party
        rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        8. Third-Party Libraries and Resources
      </h2>
      <p>
        NutriSmart uses third-party libraries and resources to enhance the
        functionality of the Service. You agree that NutriSmart is not
        responsible for any content, services, or policies provided by these
        third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Termination</h2>
      <p>
        NutriSmart reserves the right to suspend or terminate your access to the
        Service at any time, without notice, for conduct that NutriSmart
        believes violates these Terms or is harmful to other users of the
        Service, NutriSmart, or third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        10. Disclaimer of Warranties
      </h2>
      <p>
        The Service is provided on an "as is" and "as available" basis.
        NutriSmart makes no warranties, either express or implied, regarding the
        Service, including the availability, accuracy, or reliability of the
        content.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        11. Limitation of Liability
      </h2>
      <p>
        To the fullest extent permitted by law, NutriSmart shall not be liable
        for any indirect, incidental, special, consequential, or punitive
        damages, including but not limited to damages for loss of profits,
        goodwill, use, data, or other intangible losses, resulting from your use
        or inability to use the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        12. Changes to the Terms
      </h2>
      <p>
        NutriSmart reserves the right to modify these Terms at any time. We will
        notify you of any changes by posting the new Terms on this page. Your
        continued use of the Service after such modifications will constitute
        your acknowledgment of the modified Terms and your agreement to abide by
        them.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">13. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at
        [Insert Contact Information].
      </p>
    </div>
  );
};

export default Terms;
