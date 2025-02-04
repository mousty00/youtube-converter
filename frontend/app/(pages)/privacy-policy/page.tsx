import Card from "@/app/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy policy",
  description: "",
};

interface Policy {
  title: string;
  description: string;
}

const policies: Policy[] = [
  {
    title: "Information Collection",
    description:
      "We do not require any login or personal information from you to use our services. We do not collect any personally identifiable information unless you voluntarily provide it (such as through contact forms or support queries).",
  },
  {
    title: "Data Usage",
    description:
      "We do not store, share, or sell any personal data. The information collected is solely used to provide the service, troubleshoot issues, and improve user experience.",
  },
  {
    title: "Cookies",
    description:
      "We may use cookies for the functionality of our website and to track usage patterns in order to enhance the website experience. You can disable cookies in your browser settings if you prefer.",
  },
  {
    title: "Third-Party Links",
    description:
      "Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.",
  },
  {
    title: "Data Security",
    description:
      "We implement industry-standard security measures to protect your data, but please note that no method of data transmission over the internet is 100% secure.",
  },
  {
    title: "Changes to This Privacy Policy",
    description:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date of the most recent update will be shown at the top of the policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 mt-20 w-[80%] mx-auto">
      <h1 className="text-5xl font-bold text-center mb-8">
        Privacy Policy
      </h1>

      <center>
        <p className="text-lg mb-8 max-w-3xl">
          At ConvySnap, we value your privacy. This Privacy Policy explains how
          we collect, use, and protect your information when you use our
          website.
        </p>
      </center>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy,index)=>{
          return(
            <div key={index}>
              <Card title={policy.title}>
                <p>{policy.description}</p>
              </Card>
            </div>
          )
        })
        }
      </div>

      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold  mb-4 ">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or
          your data, please contact us at ConvySnap@gmail.com
        </p>
      </div>
    </main>
  );
}
