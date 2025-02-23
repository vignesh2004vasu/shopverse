import { Header } from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />
      
      <main className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Shopverse</h1>
          
          <div className="space-y-6 text-lg">
            <p>
              Welcome to Shopverse, your one-stop destination for all your shopping needs. 
              We pride ourselves on offering a diverse selection of products at competitive prices.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                To provide a seamless shopping experience with quality products and 
                exceptional customer service, making online shopping accessible to everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wide range of products</li>
                <li>Competitive prices</li>
                <li>Secure shopping experience</li>
                <li>Fast delivery</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;