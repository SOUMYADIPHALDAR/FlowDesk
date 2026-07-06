"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { X } from "lucide-react";
import CreateProjectAction from "@/action/createProject.action";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function CreateProjectForm() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [leaderId, setLeaderId] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPending, setIsPending] = useState(false);

  function addMember(user: User) {
    if (selectedMembers.some((member) => member.id === user.id)) return;

    const updatedMembers = [...selectedMembers, user];
    setSelectedMembers(updatedMembers);

    if (!leaderId) {
      setLeaderId(user.id);
    }
  }

  function removeMember(id: string) {
    const updatedMembers = selectedMembers.filter((member) => member.id !== id);
    setSelectedMembers(updatedMembers);

    if (leaderId === id) {
      setLeaderId(updatedMembers[0]?.id ?? "");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const projectName = String(formData.get("name"));
    const description = String(formData.get("description"));

    const data = {
      projectName,
      description,
      startDate,
      endDate,
      leaderId,
      memberIds: selectedMembers.map((member) => member.id),
    };

    const { error, result } = await CreateProjectAction(data);

    if(error){
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("New project created successfully.")
    }
  }

  return (
    <div className="w-full bg-slate-50 p-8">
      <Card className="mx-auto max-w-7xl rounded-2xl shadow-xl border-0">
        <CardContent className="space-y-8 p-8">
          <form onSubmit={handleSubmit}>
            {/* Top Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <Label className="mb-2 block text-base font-semibold">
                  Project Name
                </Label>
                <Input
                  id="name"
                  name="projectName"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <Label className="mb-2 block text-base font-semibold">
                  Start Date
                </Label>

                <Input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-11"
                />
              </div>

              <div>
                <Label className="mb-2 block text-base font-semibold">
                  End Date
                </Label>

                <Input
                  type="date"
                  name="endDate"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="mb-2 block text-base font-semibold">
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Write project description..."
                className="min-h-30 resize-none rounded-xl"
              />
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Search Members */}
              <div>
                <Label className="mb-2 block text-base font-semibold">
                  Add Team Members
                </Label>

                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded-xl border bg-white p-3">
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No users found.
                    </p>
                  ) : (
                    searchResults.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.image ?? ""} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => addMember(user)}
                          disabled={selectedMembers.some(
                            (member) => member.id === user.id,
                          )}
                        >
                          Add
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Members */}
              <div>
                <Label className="mb-2 block text-base font-semibold">
                  Selected Members
                </Label>

                <div className="min-h-67.5 space-y-3 rounded-xl border bg-white p-3">
                  {selectedMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No members selected.
                    </p>
                  ) : (
                    selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.image ?? ""} />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Team Leader */}
            <div>
              <Label className="mb-2 block text-base font-semibold">
                Team Leader
              </Label>

              <Select
                value={leaderId}
                onValueChange={(value) => setLeaderId(value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Team Leader" />
                </SelectTrigger>

                <SelectContent>
                  {selectedMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="rounded-xl px-8 py-6 text-base"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[#036EFF] px-8 py-6 text-base hover:bg-[#0257d6]"
              >
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
