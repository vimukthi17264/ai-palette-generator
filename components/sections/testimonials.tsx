"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    content: "This tool has completely transformed our design workflow. The AI-generated palettes are spot-on every time.",
    author: "Sarah Chen",
    role: "Lead Designer at DesignCo",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    content: "The accessibility features alone make this worth every penny. It's become an essential part of our toolkit.",
    author: "Michael Torres",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    content: "Finally, a color tool that understands context! The AI suggestions are incredibly intuitive.",
    author: "Emma Watson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary">Testimonials</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">
            Loved by Designers & Developers
          </h2>
          <p className="text-muted-foreground">
            Join thousands of professionals who trust our tool for their color needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-lg">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}