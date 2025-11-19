const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <img src="logo.png" className="w-1/3" alt="" />
            <p className="text-muted-foreground mb-4">
              AI-powered resume analysis to help you land your dream job. 
              Get instant ATS scores, detailed feedback, and actionable improvements.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 ATS Resume Checker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
