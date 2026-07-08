"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import GetProjectAction from "@/action/getPorject.action";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandList } from "./ui/command";
import { Project, User } from "@/lib/generated/prisma/client";
import SearchUserAction from "@/action/searchUser.action";

export default function CreateTaskForm() {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [ownerName, setOwnerName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGetProject() {
    setLoading(true);
    console.log("button clicked");

    if (!projectName.trim()) {
      toast.error("Enter a project name..");
      return;
    }

    try {
      const { error, result } = await GetProjectAction(projectName);

      if (error) {
        toast.error(error);
        return;
      }

      if (!result) {
        toast.error("No project found with this name.");
        setProjectId("");
        setSelectedProject(null);
        return;
      }

      setSelectedProject(result);
    } finally {
      setLoading(false);
    }
  }

  async function handleGetUser() {
    setLoading(true);
    if (!ownerName.trim()) {
      toast.error("Eneter a User Name..");
      return;
    }

    try {
      const { error, result } = await SearchUserAction(ownerName);

      if (error) {
        toast.error(error);
        return;
      }
      if (!result) {
        toast.error("No user found with this user name..");
        setUserId("");
        setSelectedUser(null);
        return;
      }

      setSelectedUser(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start p-10">
      <Card className="w-full max-w-7xl rounded-[15px] shadow-[0_3px_35px_rgba(0,0,0,0.08)] border-0">
        <CardContent className="p-10 space-y-8">
          <form>
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Project Name */}
              <div className="lg:col-span-4 space-y-3">
                <Label className="text-[22px] font-semibold text-[#333]">
                  Project Name
                </Label>

                <div className="flex">
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Search project..."
                    className="h-[52px] rounded-r-none rounded-l-[15px] border-[1.5px] border-[#DDDDDD]"
                  />

                  <Button
                    type="button"
                    onClick={handleGetProject}
                    disabled={loading}
                    className="h-[52px] rounded-l-none rounded-r-[15px] px-5"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>

                {selectedProject && (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {selectedProject.name}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      onClick={() => {
                        setSelectedProject(null);
                        setProjectId(selectedProject.id);
                        setProjectName(selectedProject.name);
                        toast.success("Project selected successfully..");
                      }}
                    >
                      select
                    </Button>
                  </div>
                )}
              </div>

              {/* Owner */}
              <div className="lg:col-span-4 space-y-3">
                <Label className="text-[22px] font-semibold text-[#333]">
                  Assigned To
                </Label>

                <div className="flex">
                  <Input
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Search project..."
                    className="h-[52px] rounded-r-none rounded-l-[15px] border-[1.5px] border-[#DDDDDD]"
                  />

                  <Button
                    type="button"
                    onClick={handleGetUser}
                    disabled={loading}
                    className="h-[52px] rounded-l-none rounded-r-[15px] px-5"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>

                {selectedUser && (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {selectedUser.name}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(null);
                        setUserId(selectedUser.id);
                        setOwnerName(selectedUser.name);
                        toast.success("User selected successfully..");
                      }}
                    >
                      select
                    </Button>
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="lg:col-span-2 space-y-2">
                <Label className="text-[22px] font-semibold text-[#333]">
                  Start Date
                </Label>

                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="h-[52px] rounded-[15px] border-[1.5px] border-[#DDDDDD]"
                />
              </div>

              <div className="lg:col-span-2 space-y-2">
                <Label className="text-[22px] font-semibold text-[#333]">
                  End Date
                </Label>

                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="h-[52px] rounded-[15px] border-[1.5px] border-[#DDDDDD]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-[22px] font-semibold text-[#333]">
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Enter project description..."
                className="min-h-[106px] rounded-[15px] border-[1.5px] border-[#DDDDDD] resize-none"
              />
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {/* Status */}
              <div className="space-y-2">
                <Label className="text-[22px] font-semibold text-[#333]">
                  Status
                </Label>

                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value ?? "")}
                >
                  <SelectTrigger className="h-[52px] rounded-[12px] border border-[#D9D9D9]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="onhold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label className="text-[22px] font-semibold text-[#333]">
                  Priority
                </Label>

                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value ?? "")}
                >
                  <SelectTrigger className="h-[52px] rounded-[12px] border border-[#D9D9D9]">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="high">
                      <span className="text-red-600 font-medium">High</span>
                    </SelectItem>

                    <SelectItem value="medium">
                      <span className="text-amber-600 font-medium">Medium</span>
                    </SelectItem>

                    <SelectItem value="low">
                      <span className="text-green-600 font-medium">Low</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                variant="secondary"
                className="h-14 px-8 rounded-[15px] bg-[#EEF4FB] text-[#036EFF] hover:bg-[#E3EEF9]"
              >
                Cancel
              </Button>

              <Button className="h-14 px-8 rounded-[15px] bg-[#036EFF] hover:bg-[#0358d4]">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
