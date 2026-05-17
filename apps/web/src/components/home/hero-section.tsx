import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="space-y-8"
        >
          <div className="inline-flex items-center rounded-full border border-border/50 bg-muted px-4 py-2 text-sm">
            AI-Powered Collaborative Notes
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Your thoughts, organized beautifully.
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Create, organize, search, and collaborate on notes with AI-powered
            productivity tools.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg">Get Started</Button>

            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
