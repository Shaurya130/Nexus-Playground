"use client";

import { Cloud, ImageIcon, Zap, Lock, Gauge, Cpu } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Unlimited Cloud Storage",
    description: "Store unlimited videos and images with enterprise-grade security and 99.9% uptime guarantee.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: ImageIcon,
    title: "Smart Image Resizing",
    description: "Automatically resize and optimize images for any device. Maintain quality while reducing file sizes.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Process and convert media files in seconds with our advanced cloud infrastructure.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Lock,
    title: "Military-Grade Security",
    description: "Your media is encrypted end-to-end with AES-256 encryption. Your data stays private.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Gauge,
    title: "Real-time Analytics",
    description: "Track storage usage, bandwidth, and access patterns with comprehensive analytics dashboard.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Cpu,
    title: "AI-Powered Optimization",
    description: "Machine learning algorithms automatically optimize your media for best quality and performance.",
    gradient: "from-red-500 to-rose-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mb-4">
            <span className="text-primary">Features</span>
          </div>
          <h2 className="mb-4">Everything You Need in One Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make media management effortless. From storage to optimization, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.gradient} opacity-0 blur-xl transition-opacity group-hover:opacity-10`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
