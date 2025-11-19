import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content: "This tool helped me identify issues in my resume I never noticed. After implementing the suggestions, I got 3x more interview calls!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    content: "The AI analysis was spot-on. The detailed suggestions helped me tailor my resume perfectly for the roles I was applying to.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    content: "Finally got past ATS filters! The score and improvement tips were exactly what I needed to land my dream job.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Job Seekers
          </h2>
          <p className="text-xl text-muted-foreground">
            See what others are saying about their experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
