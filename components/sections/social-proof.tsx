"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Active Users", value: "100K+" },
  { label: "Global Clients", value: "500+" },
  { label: "Success Rate", value: "99%" },
  { label: "Team Members", value: "50+" },
];

const testimonials = [
  {
    content: "Working with this team has transformed our business operations completely.",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    content: "The level of expertise and dedication they bring is unmatched in the industry.",
    author: "Michael Chen",
    role: "CTO, InnovateCo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    content: "Their solutions have helped us achieve remarkable growth in record time.",
    author: "Emily Rodriguez",
    role: "Director, StartupX",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
];

const clientLogos = [
  "/logos/client1.svg",
  "/logos/client2.svg",
  "/logos/client3.svg",
  "/logos/client4.svg",
  "/logos/client5.svg",
];

export function SocialProof() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container space-y-20">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="space-y-8">
          <h3 className="text-center text-sm font-semibold text-muted-foreground">
            Trusted by leading companies worldwide
          </h3>
          <div className="flex flex-wrap justify-center gap-8 grayscale">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-12 w-32"
              >
                <Image
                  src={logo}
                  alt="Client logo"
                  fill
                  className="object-contain hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative space-y-6 rounded-lg border bg-background p-6"
            >
              <p className="text-muted-foreground">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}