import EditProfileForm from "@/components/edit-profile";
import UserProfileCard from "@/components/profile-card";
import SignOutButton from "@/components/sign-out-button";

export default function AdminProfile () {
    return (
        <div className="flex justify-between items-center">
            Admin Profile
            <UserProfileCard />
            <EditProfileForm />
            <SignOutButton />
        </div>
    )
}