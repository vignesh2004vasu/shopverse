import { Header } from "@/components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />
      
      <main className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 
                    transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>123 Shopping Street</p>
                  <p>Retail District, ST 12345</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>support@shopverse.com</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;