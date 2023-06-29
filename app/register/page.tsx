"use client";

import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/");
      }}
      className="flex items-center justify-center h-[100dvh]"
    >
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your desired name</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
