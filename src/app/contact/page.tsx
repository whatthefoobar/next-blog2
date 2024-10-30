import BackButton from "@/components/BackButton";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />

      <div className="bg-gray-50 min-h-screen p-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Contact Us</h1>
        </header>

        <main className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <ContactForm />
        </main>
      </div>
    </div>
  );
};

export default Contact;
