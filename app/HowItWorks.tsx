import { Upload, Sliders, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Media",
    description: "Drag and drop your videos and images. We support all major formats including MP4, MOV, JPG, PNG, and more."
  },
  {
    icon: Sliders,
    number: "02",
    title: "Customize & Optimize",
    description: "Choose your desired resolutions, formats, and compression settings. Our AI will recommend optimal configurations."
  },
  {
    icon: Download,
    number: "03",
    title: "Download & Share",
    description: "Get your optimized media instantly. Share via direct links or integrate with your favorite platforms."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mb-4">
            <span className="text-primary">How It Works</span>
          </div>
          <h2 className="mb-4">Simple Three-Step Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes. No technical knowledge required.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Connection line for desktop */}
          <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20 hidden md:block" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-xl opacity-50" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <span className="text-white">{step.number}</span>
                  </div>
                </div>
                <h3 className="mb-3">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8 backdrop-blur-sm">
            <h3 className="mb-4">Ready to Transform Your Media Workflow?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators and businesses who trust MediaVault for their media storage needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-white transition-opacity hover:opacity-90">
                Start Free Trial
              </button>
              <button className="rounded-lg border border-primary/20 bg-background/50 px-6 py-3 transition-colors hover:bg-primary/10">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
