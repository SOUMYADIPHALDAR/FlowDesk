"use client";

import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import CreateUserAction from "@/action/createUser.action";
import { toast } from "sonner";

const fieldClassName =
  "h-11 rounded-xl border-slate-200 bg-white px-3 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-[#5570F1] focus-visible:ring-[#5570F1]/20";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    try{
      const data = {
        name,
        email,
        phone: number,
        joiningDate: new Date(joiningDate),
        designation,
        department
      }

      const { error, warning } = await CreateUserAction(data);
      if(error){
        toast.error(error);
      } else {
        toast.success("New User created successfully..");
        if (warning) {
          toast.warning(warning);
        }
        setName("");
        setEmail("");
        setNumber("");
        setJoiningDate("");
        setDepartment("");
        setDesignation("");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="rounded-[24px] border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <CardContent className="p-5 sm:p-7">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-[#0E2040]"
              >
                Full Name
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter employee name"
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#0E2040]"
              >
                Email Address
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="joiningDate"
                className="text-sm font-medium text-[#0E2040]"
              >
                Joining Date
              </Label>
              <div className="relative">
                <Input
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  type="date"
                  className={`${fieldClassName} pr-10`}
                />
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-[#0E2040]"
              >
                Phone Number
              </Label>
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#0E2040]">
                Designation
              </Label>
              <Select
                value={designation}
                onValueChange={(value) => setDesignation(value ?? "")}
              >
                <SelectTrigger className={fieldClassName}>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="fullstack">
                    Full Stack Developer
                  </SelectItem>
                  <SelectItem value="designer">UI/UX Designer</SelectItem>
                  <SelectItem value="qa">QA Engineer</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#0E2040]">
                Department
              </Label>
              <Select
                value={department}
                onValueChange={(value) => setDepartment(value ?? "")}
              >
                <SelectTrigger className={fieldClassName}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="testing">QA Testing</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/admin/users"
              className="inline-flex h-11 items-center justify-center rounded-xl cursor-pointer border border-slate-200 px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 rounded-xl cursor-pointer bg-[#5570F1] px-5 text-sm hover:bg-[#4863ea]"
            >
              Create User
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
