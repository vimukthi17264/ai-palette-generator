"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const companies = [
  {
    name: "Cosco",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Cisco_1_ab0ee6173d.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvQ2lzY29fMV9hYjBlZTYxNzNkLnBuZyIsImlhdCI6MTczMzQ0MjkwMCwiZXhwIjoxNzY0OTc4OTAwfQ.yJrvsNzJ3ktvg5TiQtnEcDg2LepHSrVnwMQD6IW66WI&t=2024-12-05T23%3A55%3A00.461Z",
  },
  {
    name: "Ebay",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Ebay_1_dbfa7af44d.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvRWJheV8xX2RiZmE3YWY0NGQucG5nIiwiaWF0IjoxNzMzNDQyOTQ3LCJleHAiOjE3NjQ5Nzg5NDd9.S8olnwTjip6Yqbxi9h484f45EdrMHkaTTQtOrINNQ2s&t=2024-12-05T23%3A55%3A47.311Z",
  },
  {
    name: "Netflix",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Netflix_1_dabb0f82d5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvTmV0ZmxpeF8xX2RhYmIwZjgyZDUucG5nIiwiaWF0IjoxNzMzNDQyOTc3LCJleHAiOjE3NjQ5Nzg5Nzd9.cDNldsTHV4koTtPTypXyDIo4KMnRgBBG_XFFOGwprMM&t=2024-12-05T23%3A56%3A17.618Z",
  },
  {
    name: "Pinterest",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Pinterest_1_25eeb74ab0.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvUGludGVyZXN0XzFfMjVlZWI3NGFiMC5wbmciLCJpYXQiOjE3MzM0NDI5OTksImV4cCI6MTc2NDk3ODk5OX0.mTWaitjgAhpLBY2QiiSsjGdD1R7LjCVpmzmQuRsGL-8&t=2024-12-05T23%3A56%3A39.012Z",
  },
  {
    name: "Sony",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Sony_1_e475b6ed27.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvU29ueV8xX2U0NzViNmVkMjcucG5nIiwiaWF0IjoxNzMzNDQzMDE3LCJleHAiOjE3NjQ5NzkwMTd9.wr4KJ0-gMkchJvd8M8QlRyCroAuEcb79U4Nslkk3970&t=2024-12-05T23%3A56%3A57.765Z",
  },
  {
    name: "Uber",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Uber_1_338311f3dc.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvVWJlcl8xXzMzODMxMWYzZGMucG5nIiwiaWF0IjoxNzMzNDQzMDM1LCJleHAiOjE3NjQ5NzkwMzV9.bjFI0skhSaoe4m9vCAhb-xugR3Qw65GSv8bQoP89qkI&t=2024-12-05T23%3A57%3A15.694Z",
  },
  {
    name: "Walmart",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Walmart_1_0cd05c542e.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvV2FsbWFydF8xXzBjZDA1YzU0MmUucG5nIiwiaWF0IjoxNzMzNDQzMTE2LCJleHAiOjE3NjQ5NzkxMTZ9.fomkOzxzVWwCeKkxvw12BExDmC5EnzOmCpckWz989KY&t=2024-12-05T23%3A58%3A36.902Z",
  },
  {
    name: "Zoom",
    logo: "https://cygrwhvwlmwfpwpgmunr.supabase.co/storage/v1/object/sign/color%20pallet%20generator/Company-logos/Zoom_1_b5d03a6d69.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb2xvciBwYWxsZXQgZ2VuZXJhdG9yL0NvbXBhbnktbG9nb3MvWm9vbV8xX2I1ZDAzYTZkNjkucG5nIiwiaWF0IjoxNzMzNDQzMTMzLCJleHAiOjE3NjQ5NzkxMzN9.Bducak-tivQ2KF93Nr14ghfrTGBHYJZtarKitnRtsIc&t=2024-12-05T23%3A58%3A53.732Z",
  },
];

export function LogoSection() {
  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of companies using our color palette generator
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-8 gap-10 items-center"
        >
          {companies.map((company, index) => (
            <Card
              key={company.name}
              className="p-6 hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-md rounded-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-16 flex items-center justify-center"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
