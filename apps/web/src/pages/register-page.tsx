import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/auth.schema";
import { authService } from "@/features/auth/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const RegisterMutation = useMutation({
    mutationFn: authService.register,

    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);

      toast.success("Logged in successfully");

      navigate("/dashboard");
    },

    onError: () => {
      toast.error("Invalid credentials");
    },
  });

  const onSubmit = (data: RegisterInput) => {
    RegisterMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="text-muted-foreground">Register to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button className="w-full" disabled={RegisterMutation.isPending}>
            {RegisterMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
